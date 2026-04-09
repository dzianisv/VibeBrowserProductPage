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

When we started shipping `vibebrowser-mcp` and `vibebrowser-cli` to real users, one requirement kept coming up:

1. it must work great with the Vibe extension (your real logged-in browser)
2. it must still be useful if the extension is unavailable

This post explains exactly how we implemented that: **extension-first behavior with a Chrome DevTools fallback**.

## The design goal

We wanted one control plane that can run in two modes without making users relearn commands:

- **Vibe extension mode** for normal daily browser automation
- **Chrome DevTools mode** as fallback or explicit debug lane

The key principle is simple:

> If the extension is connected, it is authoritative.  
> If the extension is disconnected, fallback tools can take over.  
> If the operator passes `--devtools`, use only Chrome DevTools.

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
npx -y --package @vibebrowser/mcp@latest vibebrowser-mcp start
npx -y --package @vibebrowser/mcp@latest vibebrowser-cli --json status
```

Force DevTools mode:

```bash
npx -y --package @vibebrowser/mcp@latest vibebrowser-mcp start --devtools
npx -y --package @vibebrowser/mcp@latest vibebrowser-cli --devtools --json snapshot
```

## Why this fallback model works

The implementation gives us three things at once:

1. **Best default UX**: extension-first, logged-in browser automation
2. **Operational resilience**: useful behavior when extension is absent/disconnected
3. **Explicit operator control**: deterministic `--devtools` lane for debugging

In other words, we get a production control plane, not a demo path that breaks when one component goes missing.
