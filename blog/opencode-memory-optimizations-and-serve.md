---
title: "Stabilizing AI Coding Agents for All-Day Use: Memory Fixes, MCP Lifecycle, and Why Browser Extensions Beat Standalone Servers"
description: "A deep dive into fixing opencode for production use as a long-running coding agent: MCP memory leaks, tool deadlocks, session recovery, and why Vibe Browser's extension architecture avoids the chrome-devtools-mcp memory trap entirely."
date: "2026-03-16"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - ai-coding-agent
  - opencode
  - mcp-server
  - memory-optimization
  - browser-automation
  - devtools
  - vibe-browser
published: true
---

AI coding agents look great in demos. Then you leave one running overnight and your laptop kernel-panics from swap exhaustion.

We use [opencode](https://github.com/anomalyco/opencode) and OpenAI's [Codex CLI](https://github.com/openai/codex) as our daily coding tools at [Vibe](https://vibebrowser.app). Not wrappers around ChatGPT. Not experiments. The tools we ship production code with, across multiple repositories, sometimes from a phone while away from the desk.

We chose opencode for specific engineering reasons:

- **Any provider** — Claude, GPT, Gemini, DeepSeek, local models. As pricing drops and capabilities shift, we switch without changing workflows.
- **Hackable** — add tools, agents, MCP servers, custom skills. Open source means we fix what breaks.
- **Web UI from anywhere** — `opencode serve` exposes a full web app. Check session status, approve permissions, or send prompts from a phone browser. No VPN, no SSH.
- **Codex CLI for focused work** — tight OpenAI integration, fast for single-session tasks, good sandboxing defaults. Different strengths, no lock-in.

But running these agents all day on real projects — dozens of sessions, MCP servers for browser automation, voice transcription, memory analysis — exposed problems that no demo ever shows.

This post documents every fix we shipped, the `chrome-devtools-mcp` memory leak that caused a kernel panic, and why [Vibe Browser's](https://vibebrowser.app) extension architecture solves the browser automation memory problem at the architectural level.

## What breaks when AI coding agents run all day

The failure mode is not a single leak. It is a cascade:

1. **MCP child processes grow unbounded** — the host never terminates idle servers
2. **Sessions accumulate** — 238 sessions open after 12 hours, each holding in-memory state
3. **Tool executions deadlock** — permission prompts block the entire AI SDK stream forever
4. **Orphaned state survives restarts** — tools stuck in "running," assistant messages never completed, sidebar shows spinners for dead sessions
5. **Shell output fills RAM** — large build/test output held entirely in memory

We hit all five simultaneously. The result was 8.4 GB RSS, macOS swap exhaustion, and a watchdog kernel panic at 07:33 UTC.

## Every fix we shipped

### MCP idle sweep

Upstream opencode has **zero process lifecycle management** for MCP servers. Once spawned, they run forever.

We added `lastUsed` timestamp tracking to every MCP client and a periodic sweep that closes clients idle beyond a configurable threshold.

```bash
# Default: 10 minutes. Set to 0 to disable.
export OPENCODE_MCP_IDLE_MS=600000
```

This is the single most impactful fix. A `chrome-devtools-mcp` process leaking 13 MB/min gets terminated after 10 minutes of inactivity instead of growing to 1.6 GB.

### Session idle archival

Sessions accumulate in serve mode with no upper bound. Each holds messages, tool state, and file timestamps in memory.

We added a sweep that archives sessions not updated within a configurable window, freeing associated state.

```bash
# Default: 3 days. Set to 0 to disable.
export OPENCODE_SESSION_IDLE_MS=259200000
```

### Tool execution deadlock fix

This one is subtle. The AI SDK's `streamText` runs tool executions internally. The stream iterator blocks until ALL tool calls complete. But `Question.ask()` and `PermissionNext.ask()` create an Effect `Deferred` and await it with no timeout and no abort signal.

When the model issues three tool calls and one is a permission prompt, the stream deadlocks. The cleanup code that marks stuck tools as errors runs AFTER the stream exits — a perfect circular deadlock.

**Fix**: race both `Question.ask()` and `PermissionNext.ask()` against `ctx.abort`. When the session is cancelled, stuck tools resolve immediately.

### Startup recovery

Server restarts leave database state inconsistent:

- Tool parts stuck in `running` or `pending` — show spinners forever
- Assistant messages without `time.completed` — sidebar shows active indicator on dead sessions

`Session.recover()` now runs at startup and fixes both: tools get marked as `error`, messages get `time.completed` set to their last update timestamp.

### Graceful shutdown

`SIGTERM`/`SIGINT` now call `Instance.disposeAll()` and `MCP.closeAll()` before exit, properly terminating all child processes instead of orphaning them.

### External watchdog

A launchd-managed shell script that monitors process-tree RSS independently of opencode. If the tree exceeds a threshold, it kills the process. This runs even when opencode itself is hung or crashed.

### Web UI improvements

- **Recently Active dashboard** — `/recent` page showing sessions across all projects in one view, with diff stats and relative timestamps. No more clicking through project sidebars.
- **Local app serving** — server serves from built assets instead of proxying to `app.opencode.ai`. Local UI changes work immediately. Fully offline.
- **AI-driven session naming** — built-in tool lets agents rename sessions to reflect current task. Sidebar shows "Fix auth token refresh" instead of "curious-river."

### Earlier memory optimizations

- Bounded instance cache with reference tracking and idle eviction
- Shared MCP clients across instances (no duplication)
- Lazy MCP connections on status/bootstrap paths
- Capped per-session file timestamps
- Disk-spooled shell output instead of in-memory buffering
- Memory diagnostics API (`/global/memory`) with threshold alerting

## The `chrome-devtools-mcp` problem: why MCP architecture matters for browser automation

After all the opencode fixes, we caught the real overnight killer.

The memory monitor showed process-tree RSS peaking at **8,472 MB** with 55 child processes. opencode itself was ~1.7 GB. The remaining 6+ GB was one process:

| Process | RSS | Growth rate |
|---------|-----|-------------|
| `chrome-devtools-mcp --autoConnect` | **1,661 MB** | ~13 MB/min |
| opencode serve (root) | 366 MB | stable |
| All other MCP servers combined | ~133 MB | stable |

The `--autoConnect` mode of `chrome-devtools-mcp` leaks memory continuously. It maintains persistent CDP WebSocket connections to every Chrome tab, buffers DevTools Protocol events in its Node.js heap, and never releases them. On a machine with 20+ tabs open, this exhausts 16 GB overnight.

We filed [ChromeDevTools/chrome-devtools-mcp#1192](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/1192) upstream.

### The architectural problem with standalone MCP servers for browser automation

`chrome-devtools-mcp` represents a common pattern: a Node.js process that connects to Chrome via CDP WebSocket, maintains its own event listeners and state caches, and exposes browser automation as MCP tools.

The problem is structural:

```
AI Agent → MCP Server (Node.js) → CDP WebSocket → Chrome
```

Every layer in this chain must independently manage memory for the same browser state that Chrome already tracks internally. The MCP server duplicates Chrome's tab lifecycle, event buffering, and cleanup logic — but in userland JavaScript with no access to Chrome's native memory pressure signals.

When the MCP server's garbage collector falls behind Chrome's event rate, memory grows without bound. Even if the specific leak is patched, the architecture remains fundamentally wasteful: an entire Node.js runtime maintaining a shadow copy of browser state that Chrome already manages.

### How Vibe Browser solves this at the architecture level

[Vibe Browser](https://vibebrowser.app) takes a different approach to browser automation for AI agents. Instead of running a separate process that connects to Chrome from outside, Vibe's Copilot extension **runs inside Chrome's existing process model**.

```
AI Agent → Vibe Extension (Chrome process) → Chrome APIs
```

The difference is not incremental. It eliminates an entire class of problems:

| | chrome-devtools-mcp | Vibe Browser Extension |
|---|---|---|
| **Runtime** | Separate Node.js process | Chrome extension service worker |
| **Browser connection** | CDP WebSocket (external) | `chrome.debugger` API (internal) |
| **Tab lifecycle** | Must track independently | Chrome manages automatically |
| **Memory pressure** | No visibility | Chrome suspends/evicts as needed |
| **Event buffering** | Unbounded in JS heap | Event-driven, no persistent buffer |
| **Idle behavior** | Runs forever unless killed | Service worker sleeps when inactive |
| **Process count** | +1 per agent connection | Zero additional processes |

A [Vibe Browser](https://vibebrowser.app) session can run for days without memory growth because there is no separate process to leak. Chrome's own lifecycle management handles everything the MCP server tries (and fails) to replicate.

For teams running AI coding agents with browser automation — testing web apps, scraping documentation, automating deployments, managing cloud consoles — this is the difference between a workflow that crashes overnight and one that runs indefinitely.

### What this means for MCP server design

The `chrome-devtools-mcp` leak is not unique. Any MCP server that maintains persistent connections to external systems (databases, browsers, APIs) and buffers events in-process will eventually exhibit the same pattern.

The fix has two sides:

1. **Host-side**: the agent runtime needs idle disposal as a safety net. Our MCP idle sweep handles this.
2. **Server-side**: MCP servers should be stateless where possible, event-driven rather than polling, and designed for short lifetimes.

Or, for browser automation specifically: skip the MCP server entirely and use a browser extension that shares Chrome's native lifecycle. That is what [Vibe Browser](https://vibebrowser.app) does.

## The developer experience we actually want

The combination we landed on:

- **opencode** for long-running multi-session coding work, any provider, web UI from mobile
- **Codex CLI** for focused single-session tasks with OpenAI models
- **[Vibe Browser](https://vibebrowser.app)** for browser automation that does not leak memory or crash the machine

All three are open or extensible. None locks us into a single provider. The web UI means an engineer on a walk can check if the agent finished the PR, approve a permission prompt, or kick off the next task — from their phone.

That is what "AI-assisted development" actually looks like in practice: not a single magical tool, but a stable stack of tools that each do their part without falling over under real workload.

If you are building AI-powered workflows that touch the browser — testing, scraping, cloud console automation, or anything that needs a real browser session — [try Vibe Browser](https://vibebrowser.app). It is the only browser automation tool designed to run alongside long-lived AI agents without eating your machine's memory.

## All commits

- [`ff20a133f`](https://github.com/dzianisv/opencode/commit/ff20a133f) — MCP idle sweep, session archival, graceful shutdown, external watchdog
- [`e54c70911`](https://github.com/dzianisv/opencode/commit/e54c70911) — make permission and question tools respect abort signals
- [`97879b4a3`](https://github.com/dzianisv/opencode/commit/97879b4a3) — recover orphaned running/pending tool parts on startup
- [`04b29542c`](https://github.com/dzianisv/opencode/commit/04b29542c) — recover orphaned assistant messages on startup
- [`5198db9b4`](https://github.com/dzianisv/opencode/commit/5198db9b4) — Recently Active dashboard with global session list
- [`9d95eea49`](https://github.com/dzianisv/opencode/commit/9d95eea49) — rename tool for AI-driven session naming
- [`889d20385`](https://github.com/dzianisv/opencode/commit/889d20385) — serve local app build instead of proxying to cloud
- [`450a73c5b`](https://github.com/dzianisv/opencode/commit/450a73c5b) — fix scoped package resolution in fork publish
- [`a5578e1f3`](https://github.com/dzianisv/opencode/commit/a5578e1f3) — bound instance cache to prevent serve memory blowups
- [`7720454da`](https://github.com/dzianisv/opencode/commit/7720454da) — share and hard-close MCP clients across instances
- [`9b16b0c33`](https://github.com/dzianisv/opencode/commit/9b16b0c33) — spool bash tool output to disk instead of in-memory capping
- [`41c594673`](https://github.com/dzianisv/opencode/commit/41c594673) — add memory diagnostics endpoints and monitor hooks

## References

- [anomalyco/opencode#16697](https://github.com/anomalyco/opencode/issues/16697) — upstream memory issue with field evidence
- [ChromeDevTools/chrome-devtools-mcp#1192](https://github.com/ChromeDevTools/chrome-devtools-mcp/issues/1192) — MCP server memory leak report
- [Vibe Browser](https://vibebrowser.app) — browser automation without the MCP memory trap
- Internal guide: Memory Forensics for `opencode serve`
- [Fork README](https://github.com/dzianisv/opencode/blob/dev/README.md) — full diff from upstream
