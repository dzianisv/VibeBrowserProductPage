---
title: "Automating Android App Tests with a Computer-Use Agent on CI"
description: "How we built an adb + vision model test loop for Android apps, replaced flaky Espresso tests with a computer-use agent, and wired it into GitHub Actions with android-emulator-runner."
date: "2026-06-27"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - testing
  - android
  - computer-use
  - ci
  - a-test
  - open-source
  - adb
published: true
---

Espresso tests pass. The user still can't log in.

That's the failure mode we kept hitting. The test taps by element ID. The element is there. The test is green. But the animation is still playing, the button isn't responding yet, and a real user would have given up. Espresso doesn't see that. It sees the DOM tree — IDs, text, bounds. It does not see what a user sees.

We built a different kind of test loop: take a screenshot of the device, send it to a vision model, let the model decide what to tap, execute the tap via adb, repeat. The model sees a rendered frame, not an element tree. It can tell when a button looks unresponsive. It can read a loading spinner. It fails when the UX fails.

We called this [a-test](https://github.com/dzianisv/a-test).

## Why Espresso Misses Real Bugs

Espresso (and UIAutomator) tests are implementation tests. You call `onView(withId(R.id.signup_button)).perform(click())`. The framework waits for the IdlingResource, taps the element, checks an assertion. If the element is present and the animation completes eventually, the test passes.

This misses:

- **Render timing bugs.** The button exists but the parent view hasn't finished laying out. Tap coordinates land outside the hit area.
- **State-dependent screens.** Onboarding that behaves differently with a slow network — the test mocks the network, the user doesn't.
- **Invisible-but-present elements.** A dialog is obscured by another view. The ID is in the tree; the user can't reach it.
- **Accessibility failures.** Elements with no content description, wrong contrast ratio, labels that don't match the visible text.

Monkey testing (random input) is the other common fallback. It's noise. It finds crashes, not UX failures.

What we wanted was a test that reasons like a user: look at the screen, decide what to do next, do it.

## The adb + Vision Loop

The core loop is simple. Each step:

1. **Screenshot**: `adb exec-out screencap -p` pipes a raw PNG directly from the emulator.
2. **Vision call**: base64-encode the PNG, send it to the model with the test instruction. The model returns one action JSON.
3. **Execute**: dispatch the action via adb.
4. **Record**: save the frame for GIF assembly.
5. **Repeat** up to `maxSteps`.

The action schema is small by design:

```json
{"action": "tap", "x": 540, "y": 960}
{"action": "type", "text": "hello@example.com"}
{"action": "key", "keycode": "KEYCODE_BACK"}
{"action": "swipe", "x1": 540, "y1": 1200, "x2": 540, "y2": 400}
{"action": "wait", "ms": 1000}
{"action": "done"}
{"action": "fail", "reason": "Signup button is unresponsive after 3 taps"}
```

Execution maps directly to adb shell commands:

```sh
adb shell input tap 540 960
adb shell input text "hello@example.com"
adb shell input keyevent KEYCODE_BACK
```

The model never sees the implementation. It sees pixels. If the button looks disabled, it says so. If the screen didn't change after a tap, it tries something else or fails explicitly.

## Anti-Hallucination: Verification Step

The loop exiting with `done` is not a pass. After the loop completes, we run one more vision call with the `verification.prompt` from the test case — cold, no loop context, no history:

```
"Is the user signed in and looking at the dashboard? Answer yes or no."
```

If it returns `no`, the test fails. This catches the case where the model convinced itself it was done when the screen shows something else. The verification call is deliberately stateless — it can't be anchored to a false memory of earlier steps.

## Deterministic Checks Alongside LLM Judgment

The vision model drives the flow. Deterministic assertions check critical facts.

```sh
adb shell uiautomator dump /sdcard/ui.xml
adb pull /sdcard/ui.xml
```

This gives you structured XML of every on-screen element. `check_ui_text(xml, "Welcome")` is a grep — no model involved. Use it for assertions that must be exact (an error message, a required element). The LLM navigates; deterministic checks assert.

Belt and suspenders. Either can catch a failure the other misses.

## Pre-Test State Injection

One of the practical problems with E2E tests is setup time. You don't want the test to complete onboarding every time just to reach the feature you're testing.

The framework includes `inject_shared_preferences(package, {key: value})`, which pushes app state via adb before the test starts. Use it to skip login, set feature flags, or put the app in a specific configuration state. The test case starts where you need it to start.

## SharedPreferences Injection Example

```yaml
name: onboarding-complete
instruction: "Open the app. Complete the onboarding flow: tap through welcome screens,
  enter email 'test@example.com', set a password 'TestPass123!', tap 'Sign Up',
  and wait for the dashboard to appear."
successCriteria: "The dashboard screen is visible with a welcome message"
failureCriteria: "App shows an error dialog, or the signup button is unresponsive"
maxSteps: 40
verification:
  prompt: "Is the user signed in and looking at the dashboard? Answer yes or no."
```

## GIF Output

Every step captures a frame. After the test, `ffmpeg` assembles them into a GIF and writes it to `--output-dir` as `run.gif`. Upload it as a CI artifact and post the URL in the PR comment.

Reviewers see exactly what happened, step by step. No screen recording, no reproduction steps, no "works on my machine." The GIF is the test report.

## Multi-Provider Support

The `make_client()` helper picks the AI provider from environment variables:

- `AZURE_DEV_AI_API_KEY` + `AZURE_DEV_AI_BASE_URL` → Azure Dev AI
- `OPENAI_API_KEY` → OpenAI
- `GEMINI_API_KEY` → Gemini
- `XAI_API_KEY` → xAI

BYOK — your app's screenshots go to your AI provider, not through any third-party test service. We don't intermediate any API calls. Your runner, your keys, your logs.

## GitHub Actions with android-emulator-runner

```yaml
# .github/workflows/android-cua.yml
name: Android CUA Tests
on: [push, pull_request]

jobs:
  android-cua:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a-test on Android
        uses: dzianisv/a-test/.github/actions/a-test-android@main
        with:
          case: cases/onboarding.yaml
          api-level: '33'
          output-dir: artifacts
          model: gpt-5.4
        env:
          AZURE_CUA_API_KEY: ${{ secrets.AZURE_CUA_API_KEY }}
          AZURE_CUA_BASE_URL: ${{ secrets.AZURE_CUA_BASE_URL }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cua-artifacts
          path: artifacts/
```

The reusable action installs a-test from the same pinned action revision, enables KVM, boots an API 33 x86_64 emulator, runs the case, and writes the screenshots, GIF, and verdict into the requested output directory.

## pytest Integration

The framework ships a pytest plugin with a `cua_case` fixture. Pass it a `TestCase`, then assert on the returned verdict alongside the rest of your pytest suite.

```python
from a_test import TestCase

def test_onboarding(cua_case):
    result = cua_case(TestCase(
        name="onboarding-complete",
        package="com.example.app",
        instruction="Complete onboarding and reach the dashboard",
        successCriteria=["Dashboard is visible"],
        maxSteps=40,
    ))
    assert result["verdict"] == "pass"
```

CUA cases run inside your existing pytest suite. They appear in the same test report, annotated with the GIF artifact path.

## Tradeoffs

**Slower.** Each step takes 2–5 seconds: screenshot round-trip plus vision API latency. Keep CUA tests for E2E flows only. Unit tests and Espresso tests still own logic verification and fast regression coverage. We run the CUA suite on PR merge, not on every push.

**Coordinate drift on small screens.** The vision model can misplace taps on high-density small screens. Call `get_screen_size()` and scale tap coordinates against the emulator resolution before dispatching. The `Nexus 6` profile at `x86_64` is a reliable baseline — large screen, consistent tap targets.

**No access to internals.** That's the point. The test can't be fooled by an implementation that passes assertions but breaks the UX. The cost is that diagnosing why a step failed requires looking at the GIF, not a stack trace. In practice the GIF is more useful than a stack trace for UX bugs.

## What This Doesn't Replace

Espresso for unit-level UI logic. Fast feedback on render correctness. Any test where you need implementation access (mocking network, injecting state mid-flow). CUA tests complement that layer — they don't replace it.

The right breakdown: unit tests own behavior, Espresso owns component rendering, CUA tests own user-facing flows end to end.

## Get Started

Repo: [https://github.com/dzianisv/a-test](https://github.com/dzianisv/a-test)

```sh
pip install "git+https://github.com/dzianisv/a-test.git@<commit-sha>"
a-test run --target android --case cases/onboarding.yaml --model gpt-5.4
```

MIT licensed. Fork it, add action types, wire a new provider. We use the same code internally — the public repo is the production version.

The browser extension testing path is also there if you need it — but that's a separate post. This one is Android.
