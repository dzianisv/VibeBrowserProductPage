---
title: "How opencode Got Better for Long-Running Local Agents"
description: "Recent opencode work tightened memory behavior for long-lived sessions and made `opencode serve` a more practical remote-control surface for sessions, shell, MCP, and human approvals."
date: "2026-03-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - engineering
  - opencode
  - local-coding-tools
  - memory
  - remote-control
  - serve
published: true
---

If a local coding tool is going to stay open all day, two things matter more than glossy demos:

1. it needs to keep memory bounded under real session churn, and
2. it needs a clean control surface so other tools can drive it without scraping a terminal.

Recent work in `opencode` improved both.

The March 2026 commits are especially interesting because they were not just about one leak fix. They tightened several different growth paths at once: instance caching, MCP process fanout, shell-output buffering, per-session file state, and diagnostics. At the same time, `opencode serve` kept getting more useful as a headless API surface for remote orchestration.

## The real problem: local agents need to stay alive

Short interactive demos hide a lot of pain.

The hard case for a local coding tool is the one developers actually live in:

- multiple sessions open
- repeated prompts over hours
- large shell output
- MCP servers spawning child processes
- switching across directories and workspaces
- a desktop app, plugin, or another controller talking to the same runtime

That is where memory behavior starts to matter. It is also where a plain terminal interface stops being enough.

## opencode tightened several memory pressure paths at once

The strongest recent `opencode` improvements are not one giant rewrite. They are a series of targeted guardrails.

### 1) The instance cache is now bounded

One recent fix added a bounded per-directory instance cache with reference tracking, idle eviction, and max-size eviction. Another follow-up deduplicated concurrent instance bootstraps so the same instance is not opened twice under parallel pressure.

Why that matters:

- long-running `serve` setups can touch many directories
- repeated workspace attachment should not accumulate stale instances forever
- concurrent requests should not stampede into duplicate startup work

This is exactly the kind of operational detail that separates "works in a demo" from "stays healthy under all-day use."

### 2) MCP clients are now shared, cleaned up harder, and not spawned eagerly

Another important change was around MCP lifecycle management.

Recent commits made `opencode`:

- share MCP clients across instances instead of multiplying them
- hard-close descendant processes when needed
- avoid eager MCP connections on status/bootstrap paths

That last point matters more than it sounds. If a status check causes subprocess fanout, memory growth starts from completely normal product behavior. Making `/mcp` lazy removes a whole class of accidental background expansion.

### 3) Per-session runtime state is capped more aggressively

Two other changes are directly about unbounded in-memory growth:

- file read timestamps are now capped per session
- shell capture is capped and throttled to reduce in-memory output accumulation

Then the bash tool got an even more useful improvement: large output can now be spooled to disk instead of forcing everything to stay in RAM.

That is a better design for a local coding tool. Developers still need access to big command output, but the runtime should not pay the full in-memory cost just to preserve inspectability.

## The memory story is stronger because the diagnostics got better too

One of the best recent additions is not a guardrail at all. It is visibility.

`opencode` now ships a much better memory forensics workflow for `serve`:

- a one-shot memory diagnostic
- continuous monitor support in `opencode serve`
- a `/global/memory` API endpoint
- snapshot artifacts when thresholds are breached
- a synthetic workload profiler that drives sessions, prompts, and shell churn

That is the right way to debug long-running agent systems. Starting a server and staring at Activity Monitor rarely tells you enough. You need a way to distinguish:

- root JavaScript heap growth
- child-process growth
- session churn
- PTY activity
- instance-cache accumulation

The current docs even include a 1-hour reference workload:

- `24,584` prompts
- `7,990` shell calls
- `478` session creates and `439` deletes
- root RSS from `287.19 MB` to `364.66 MB`
- tree RSS from `507.41 MB` to `533.61 MB`
- no threshold hit at `5120 MB`

That is not proof that memory work is "done." But it is exactly the kind of instrumentation you want if you are serious about making a local agent runtime stable.

## Why `opencode serve` is more than a convenience flag

The other big reason these commits matter is that `opencode` is not only a terminal tool anymore. `opencode serve` is a real control surface.

It exposes HTTP routes for things like:

- session creation and session history
- sending messages to a session
- shell execution
- question and permission handoffs
- MCP status and connect/disconnect flows
- health, config, and memory endpoints
- a global event stream

In practice, that means another process can orchestrate a live local coding runtime without pretending to be a human typing into a terminal.

That is powerful for at least three reasons:

1. a desktop UI can talk to a real background runtime
2. plugins or remote controllers can subscribe to events and answer approvals
3. teams can build higher-level workflows on top of a stable local agent surface

There is also newer `workspace-serve` work in the repo, which pushes in the same direction: cleaner remote workspace handling and event/session routing for multi-workspace setups.

## The important architectural shift

Put together, these changes make `opencode` look more like a local agent runtime and less like a single interactive shell app.

That matters because the next generation of coding tools will not live in one surface:

- part terminal
- part desktop UI
- part background server
- part remote orchestrator
- part human approval loop

If your runtime leaks memory or explodes subprocess count, that architecture collapses quickly. If your runtime stays bounded and exposes a clean server API, it becomes much easier to build around.

## One caveat worth stating clearly

`opencode serve` is useful, but it is not something to expose carelessly.

The repo's own security docs are explicit: server mode is opt-in, and if you enable it, you should set `OPENCODE_SERVER_PASSWORD` so HTTP access requires Basic Auth. Without that, the server is unauthenticated.

So the interesting story here is not "remote control with magic security." It is "a capable local runtime with real control surfaces, plus explicit responsibility to secure them properly."

## Update: `chrome-devtools-mcp` is the primary memory leak culprit (2026-03-15)

After the original post, we caught a real overnight crash: a macOS kernel watchdog panic caused by swap exhaustion at 07:33 UTC.

The built-in memory monitor data showed process-tree RSS peaking at **8,472 MB** at 23:00 with 55 child processes. opencode itself was only ~1.7 GB — the remaining 6+ GB was child processes.

We caught a live reproduction the same day:

| Process | RSS after ~2 hours |
|---------|-------------------|
| `chrome-devtools-mcp --autoConnect` | **1,661 MB** (growing ~13 MB/min) |
| opencode serve (root) | 366 MB |
| `playwriter` | 54 MB |
| `mcp-server-memory` | 49 MB |
| `whisper-mcp` | 30 MB |

The `--autoConnect` mode of `chrome-devtools-mcp` leaks memory at a rate that will exhaust a 16 GB machine overnight. The leak is in `chrome-devtools-mcp` itself — opencode is the host, not the source — but opencode's lack of MCP idle disposal means the leaking process is never terminated.

### What we patched locally

1. **MCP idle sweep** — added `lastUsed` timestamp tracking to the `shared` MCP client map and a periodic sweep that closes clients with `refs === 0` after a configurable idle period (`OPENCODE_MCP_IDLE_MS`, default 10 minutes).

2. **Session idle archival** — added a periodic sweep in serve mode that archives sessions not updated within a configurable window (`OPENCODE_SESSION_IDLE_MS`, default 30 minutes). This prevents the 238-session accumulation we saw overnight.

3. **Graceful shutdown handler** — `SIGTERM`/`SIGINT` now capture a final memory snapshot before exiting, so forensics data covers the moment of shutdown instead of having a gap.

4. **External memory watchdog** — a `launchd`-managed shell script that polls process-tree RSS every 30 seconds independently of opencode. This runs even when opencode crashes, filling the evidence gap we had between 01:17 and 07:33.

These patches are documented on [anomalyco/opencode#16697](https://github.com/anomalyco/opencode/issues/16697).

### The deeper lesson

The hardest memory problems in agent runtimes are not JavaScript heap leaks. They are **child-process lifecycle failures**. An MCP server that leaks 13 MB/min will exhaust any machine if the host never disposes it. The fix has two sides:

- upstream MCP servers need to be memory-safe
- the host runtime needs idle disposal as a safety net regardless

## Why we are paying attention

We care about this direction because the boundary between local coding agents and remotely orchestrated agent systems is disappearing.

The most useful tools will be the ones that can:

- stay alive for long sessions
- expose state and events cleanly
- let humans step in on approvals
- support other controllers without fragile hacks

Recent `opencode` work moved meaningfully in that direction.

## References

- `fix(opencode): bound instance cache to prevent serve memory blowups`  
  https://github.com/dzianisv/opencode/commit/a5578e1f3f02b266a1dc682c1396314748bffe31
- `fix(opencode): dedupe instance bootstraps and restore cache headroom`  
  https://github.com/dzianisv/opencode/commit/1be1224859bb9849711c10d2c6587dc0cbaf3523
- `fix(opencode): share and hard-close mcp clients across instances`  
  https://github.com/dzianisv/opencode/commit/7720454da3579a334c31539de6f374c2c706522a
- `lazy-load MCP clients for status and bootstrap paths`  
  https://github.com/dzianisv/opencode/commit/597dc7d4049ab46a99f189180df612f41fbb0fcb
- `cap file read timestamps per session to prevent unbounded growth`  
  https://github.com/dzianisv/opencode/commit/ee069fc524fecc8c95d5b8ca00ae0ee598a37784
- `cap and throttle shell output streaming to reduce memory pressure`  
  https://github.com/dzianisv/opencode/commit/8e30a85eccfc3f79778e78ad7450bf7a49f7dd57
- `fix(bash): spool output to disk instead of in-memory capping`  
  https://github.com/dzianisv/opencode/commit/9b16b0c332c0cfeb6e53a90984f3d1ed73156ba5
- `feat(opencode): add serve memory forensics and diagnostics`  
  https://github.com/dzianisv/opencode/commit/41c594673532a557271907517fc81bacf1d0e93e
- `feat(opencode): add serve memory workload profiler`  
  https://github.com/dzianisv/opencode/commit/1f1ddc86e6d29966522e867f68ef9ced9912a8a7
- `feat(core): add workspace-serve command (experimental)`  
  https://github.com/dzianisv/opencode/commit/2c00eb60bdc6e6ff0362e792e731eaa39204bf72
- `feat(core): basic implementation of remote workspace support`  
  https://github.com/dzianisv/opencode/commit/c12ce2ffff38fae11e22762292c56f1e71c387e7
- `Memory Forensics for opencode serve`  
  https://github.com/dzianisv/opencode/blob/dev/docs/memory-forensics.md
- `SECURITY.md`  
  https://github.com/dzianisv/opencode/blob/dev/SECURITY.md
