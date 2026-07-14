---
title: "Testing Browser Extensions with Computer Use on CI"
description: "How we automated end-to-end browser extension tests using the Chrome CDP + xdotool computer-use loop, running on GitHub Actions without mocks or Selenium."
date: "2026-06-27"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - testing
  - browser-extensions
  - computer-use
  - ci
  - a-test
  - open-source
published: true
---

Browser extension testing has a gap that Playwright, Puppeteer, and Selenium all leave open. The gap is the extension itself — the sidepanel, the popup, the background service worker. These run in a privileged Chrome context that DOM automation can't reach cleanly.

Here's what that looks like in practice: we ship a Chrome extension with a sidepanel UI. We wanted a CI test that verifies the sidepanel actually opens when the toolbar icon is clicked. Playwright can't drive the Chrome toolbar. Puppeteer can load an unpacked extension but can't easily interact with sidepanel pages as a first-class target. Writing a Selenium layer against an ever-changing Chrome version is a maintenance trap.

What worked: a computer-use loop that sees Chrome the same way a human does — as pixels on a screen — and uses `xdotool` to click things.

## The Problem with Test Doubles for Extensions

The integration bug in a browser extension usually isn't in one component. It's in the seam between components: does the content script message the background service worker correctly? Does the sidepanel open when the action icon is clicked, or does it silently fail because `openPanelOnActionClick` wasn't set? Does the auth flow open the right tab?

A mock doesn't catch that. The mock substitutes the thing that's broken. You end up with green CI and a broken extension.

We also can't rely on DOM assertions for sidepanel state. Chrome's CDP `/json` endpoint lists open targets by type and URL — that's how you verify a sidepanel actually opened, not by asserting on the DOM of a page you think should be open. Visual confirmation on a real screenshot closes the loop.

## The Computer-Use Loop

The loop is simple. Here's the actual sequence:

1. Chrome starts with `--load-extension ./dist` and `--remote-debugging-port=9222`.
2. `scrot` captures a full-desktop screenshot as a raw PNG. `sharp` optimizes and resizes it.
3. The PNG (base64) goes to a vision model — GPT-5.4 via Azure AI Foundry — along with the test instruction.
4. The model returns a `computer_call` action: `click(x, y)`, `type(text)`, `key(combo)`, `scroll`, or `wait`.
5. `xdotool` executes the action against the virtual display (Xvfb at `:99`, 1920×1080).
6. New screenshot. Back to step 3.
7. The loop ends when the model emits `TEST_PASSED`, `TEST_FAILED`, or when `maxSteps` is hit.

One thing worth noting: `xdotool` delivers a real X11 mouse event to Chrome. That matters. Chrome requires a genuine user gesture to open a sidepanel. `xdotool mousemove` + `xdotool click 1` satisfies that requirement — a CDP-synthesized click in a service worker context does not.

## The Verification Step

The loop can hallucinate success. We've seen the model emit `TEST_PASSED` while looking at the wrong page — an auth redirect that loaded, a settings tab that auto-opened on first install.

The fix is a second model call after the loop completes, with a fresh screenshot and no context from the loop. The `verification.prompt` in the test case is a yes/no question:

```
"Is the browser sidepanel open and showing the application UI (not an error page)?"
```

The verifier takes a new screenshot at that moment and asks the question cold. If the response doesn't start with `YES`, the test fails regardless of what the loop reported. If the verification API call itself errors, the test also fails — there's no silent pass.

This is a cheap call (~$0.01) but it catches the class of failures where the agent convinced itself it succeeded in a broken state.

## A Real Test Case

```yaml
name: sidepanel-open-test
instruction: "Click the extension icon in the Chrome toolbar, then click 'Open Sidepanel'. The sidepanel should appear on the right side of the browser."
successCriteria: "The sidepanel is visible and shows the main UI"
failureCriteria: "The extension popup shows an error or the sidepanel doesn't open"
maxSteps: 15
verification:
  prompt: "Is the browser sidepanel open and showing the application UI (not an error page)?"
```

The `instruction` is natural language. The `verification.prompt` is a yes/no question with enough specificity that the model can answer it from a screenshot without ambiguity.

## Running on GitHub Actions

The reusable browser action installs a-test, Bun, Chrome dependencies, Xvfb, xdotool, scrot, and ffmpeg before running the case:

```yaml
# .github/workflows/browser-cua.yml
name: Browser Extension CUA Tests
on: [push, pull_request]

jobs:
  browser-cua:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run a-test in Chrome
        uses: dzianisv/a-test/.github/actions/a-test-browser@main
        with:
          case: cases/install-extension.yaml
          output-dir: artifacts
        env:
          AZURE_CUA_API_KEY: ${{ secrets.AZURE_CUA_API_KEY }}
          AZURE_CUA_BASE_URL: ${{ secrets.AZURE_CUA_BASE_URL }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cua-artifacts
          path: artifacts/
```

The action points all X11 calls (scrot, xdotool, Chrome) at its virtual framebuffer. If the test fails, the artifacts directory has every screenshot plus the verification result JSON.

## GIF Artifacts for PR Review

Every run assembles a GIF from the step screenshots via ffmpeg — two-pass encoding with an optimized palette, 1.5 seconds per frame. The loop screenshots (`step-*.png`) and the runner's phase screenshots (Chrome started, sidepanel opened, verification) all sort into chronological order.

Post that GIF in the PR comment. Reviewers see exactly what the agent saw and what it did. Debugging a flaky test becomes much faster when you can watch the failure happen rather than reading a log of pixel coordinates.

## Android: the Same Idea, Different Plumbing

On Android the screen capture path is `adb screencap -p`, the action path is `adb shell input tap x y` / `adb shell input text`, and the emulator is `android-emulator-runner@v2` (API 28). The vision model is the same.

```bash
DISPLAY=:99 a-test run \
  --target android \
  --avd pixel_4_api28 \
  --case cases/mobile-flow.yaml \
  --output-dir artifacts/
```

One difference from the browser path: on Android we also run `adb shell uiautomator dump` to get structured XML of the accessibility tree. That gives deterministic element presence checks — grep for a button ID without needing the model's judgment. We use both: vision model for flow decisions, `uiautomator` XML for specific state assertions. The combination is more reliable than either alone.

## Deterministic Fallback

The vision model picks actions and reads state. But "is this element present" is a question with a binary answer that doesn't need model judgment. On Android, `uiautomator dump` gives you the full XML tree. On desktop, CDP's `Runtime.evaluate` can query the DOM directly.

Running both in parallel — model-driven interaction plus deterministic assertions on specific state — is more reliable than a pure vision approach. The model handles flow and visual reasoning; the structured checks verify the specific conditions that matter.

## BYOK and Why It Matters

`a-test` brings your own API key. Azure AI Foundry, OpenAI, Gemini via `--model` flag. The test runner runs on your CI runner. Nothing goes through a vendor's test infrastructure.

For teams with security requirements or air-gapped CI, that matters. The extension code and the test credentials stay in your pipeline. MIT licensed.

## The Practical Tradeoff

Computer-use tests cost more per run than DOM assertions. Each test step is an image upload + model call. A 15-step test with a verification call runs around $0.50–2.00 depending on model and screenshot size. That's not cheap if you're running on every PR for a large test suite.

For this case — verifying that an extension sidepanel opens and shows the right UI — there's no cheaper alternative that's actually testing the real thing. Running it nightly and on extension-related PRs is the reasonable scope. Running DOM tests for everything else.

---

The full tooling, including test case schema, runner, and GitHub Actions templates, is at [https://github.com/dzianisv/a-test](https://github.com/dzianisv/a-test).
