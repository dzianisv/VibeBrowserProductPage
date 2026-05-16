---
title: "How We Implemented vibebrowser-mcp + vibebrowser-cli with Chrome DevTools Fallback"
description: "A practical engineering walkthrough of our MCP/CLI architecture: extension-first routing, relay-owned Chrome DevTools fallback, explicit --devtools mode, and upload/snapshot compatibility."
date: "2026-04-09"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - VibeBrowser
  - MCP
  - CLI
  - Chrome DevTools MCP
  - Engineering
published: true
---

If you've tried automating your browser with AI agents, you've probably hit one of two walls:

- **"Headless tools don't have my logins."** You want your agent to act inside the real browser you already have open — with all your sessions, cookies, and saved state intact. Spinning up a fresh Playwright/Puppeteer instance means re-authenticating everything, fighting 2FA, and missing extension-dependent workflows entirely.
- **"Extension-based tools break in CI."** You're running in a headless pipeline or a remote dev box where no browser extension can load. Your nicely working local automation simply doesn't run.

Most tools make you pick one. VibeBrowser MCP + CLI gives you both — automatically, with the same commands.

This post explains exactly how we built that: **extension-first behavior with a transparent Chrome DevTools fallback**, and what it means for how you can use it today.

## TL;DR

- **Default mode**: your real browser, logged-in sessions, everything working — no re-auth needed
- **Fallback mode**: headless/CI environments, no extension required — same commands still work
- **`--devtools` flag**: force Chrome DevTools-only for debugging — predictable, no surprises
- **Same CLI commands work in all modes** — no rewiring your scripts when switching environments

## Why this matters for you

The key pain this solves: your agent should work whether you're at your desk with the extension loaded, or running a pipeline at 2am on a headless VM. Today you probably maintain two separate automation setups — one for "real browser" work and one for CI. With VibeBrowser, one set of commands covers both.

The routing rule is simple:

> If the extension is connected, it is authoritative — you get your logged-in browser.  
> If the extension is disconnected, fallback takes over silently — CI and headless work.  
> If you pass `--devtools`, use only Chrome DevTools — explicit, deterministic debugging.

## Architecture in practice

At the highest level:

```text
AI Agent / CLI
      |
      v
vibebrowser-mcp
      |
      v
Relay (extension-first routing + shared fallback backend)
   |                               |
   v                               v
Vibe Extension                 Chrome DevTools MCP
```

Two implementation details mattered a lot:

### 1) Relay-owned fallback backend

Instead of spinning up multiple fallback processes per request, we run one shared fallback connection owned by the relay.  
That gives consistent tool listing and avoids duplicated process churn.

### 2) Deterministic tool routing

When a tool exists on both sides, extension wins while connected.  
Fallback is used only when extension is unavailable (or forced by `--devtools`).

This avoids the worst kind of bug in mixed-mode systems: silent backend drift where half your commands hit one backend and half hit another without you realizing it.

## `--devtools` mode for both server and CLI

We added explicit `--devtools` mode to:

- `vibebrowser-mcp start`
- `vibebrowser-cli` (browser command surface)

That gives operators a clean switch:

- no flag -> extension-first behavior
- `--devtools` -> Chrome DevTools-only behavior

This is especially useful for debugging sessions where you want DevTools semantics directly and do not want relay/extension variability.

## Keeping CLI behavior compatible across backends

A major pain point in fallback systems is argument shape mismatch.  
Upload is the perfect example:

- extension-native flow often uses payload fields like `filename`, `mimeType`, `contentBase64`
- DevTools-style flows often use filesystem paths (`filePath`, `path`, `paths`)

We implemented **schema-aware argument mapping** in CLI so one user intent can be translated to the backend's expected shape.

This keeps command ergonomics stable even when backend capabilities differ.

## Snapshot and interaction parity choices

We aligned toward dedicated snapshot tools (`take_md_snapshot`, `take_a11y_snapshot`, `take_html_snapshot`) and kept interactions canonical with refs (`A*`, `M*`, numeric shorthand where appropriate).

In operational terms:

- snapshot output stays explicit and easier to reason about
- interactions are more portable between CLI and MCP tool calls
- backend routing remains deterministic

## Upload flow: extension-native first, CDP path where needed

File upload was one of the most important real-world checks because it crosses UI interaction, payload handling, and backend routing.

Implementation strategy:

- markdown refs (`M*`) run through extension content-script interaction path
- accessibility refs (`A*`) route via CDP path
- strict payload validation (filename, MIME type, base64 content)
- clear diagnostics on failure

We also validated this in an isolated environment (fresh browser profile + isolated relay ports) to avoid false confidence from a developer's pre-existing local extension state.

## Reliability hardening we had to add

A fallback architecture is mostly a reliability project.  
The critical hardening points were:

- stale socket close handling in relay session ownership
- deterministic "extension unavailable" error behavior
- explicit backend selection (`--devtools`) to remove ambiguity
- focused e2e and CLI routing tests for mode-specific behavior

The most valuable lesson: **"list tools" success is not enough**.  
You need end-to-end proof that `call_tool -> extension/fallback execution -> tool_result` is correct for the selected mode.

## How to use it

Extension-first (default):

```bash
npx -y -p @vibebrowser/mcp@latest vibebrowser-mcp start
npx -y @vibebrowser/cli@latest --json status
```

Force DevTools mode:

```bash
npx -y -p @vibebrowser/mcp@latest vibebrowser-mcp start --devtools
npx -y @vibebrowser/cli@latest --devtools --json snapshot
```

## Why this fallback model works — and what you can do now

Before this architecture, you had to choose: use your real logged-in browser and lose CI/headless support, or use a headless tool and lose your sessions. Here's what that means concretely now:

- **You can write one automation script** and run it locally with the extension (hitting your real accounts, your real tabs) and in CI without the extension (falling back to DevTools automatically).
- **You don't re-authenticate for every agent run.** The extension bridges your logged-in session to the AI agent — no cookie injection, no Playwright auth state files, no per-run 2FA.
- **When something behaves unexpectedly**, you can add `--devtools` to pin the backend and remove relay/extension variability from the equation.
- **This is production-tested** — it powers OpenClaw's remote browser infrastructure today, not just a demo.

The implementation delivers three things at once:

1. **Best default UX**: extension-first, logged-in browser automation — your real browser, your real sessions
2. **Operational resilience**: useful behavior when extension is absent/disconnected — CI just works
3. **Explicit operator control**: deterministic `--devtools` lane for debugging — no guessing which backend ran

One tool. One set of commands. Works everywhere.
