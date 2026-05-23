---
title: "Why OpenCode, Not Claude Code: Five Reasons I Use Open-Source for the Coding Agent"
description: "Claude Code is excellent. I still chose OpenCode for the coding agent at Vibe Technologies. Here are the five reasons — open-source forkability, subagent observability, remote control via opencode serve, model flexibility, and where Claude Code still wins."
date: "2026-05-28"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - opencode
  - claude-code
  - ai-coding
  - open-source
  - model-routing
published: true
---

Claude Code is excellent. I used it first, and I still recommend it for people who want one tool that works out of the box. I don't use it as my primary coding agent. This post is the honest accounting of why.

## 1. OpenCode is open-source. Claude Code is not.

My [fork of OpenCode](https://github.com/dzianisv/opencode) ships changes that Anthropic will never prioritize because they have no reason to: planning-loop detection that kills runaway agents before they burn $40 in tokens, a cross-model review step where Claude checks GPT-4o output before it hits a PR, a GitHub integration plugin that syncs task state to Linear without a webhook server, and self-healing Cloudflare tunnel watchdogs for the remote serve layer.

None of that was on any product roadmap. I needed it, I built it, I shipped it in a day.

With closed-source tools the flow is: notice something is wrong → open a support ticket → wait → get told it's not a priority → adapt around the limitation. With open-source: notice something is wrong → fix it → ship today. The gap compounds. Over six months of daily use, the fork has diverged in ways that are load-bearing for how I run the company.

The vendor relationship also changes. Claude Code's roadmap serves Anthropic's interests. That is not a criticism — it's a structural fact. An open-source tool's roadmap is mine to influence by pull request. I'll take that deal.

## 2. Claude Code spawns subagents but you cannot list them.

Claude Code's `Task` tool returns a subagent ID. There is no `TaskList` equivalent you can call at any point in time to say "what is currently running, and what has completed." In a single-session workflow that barely matters. In a system where I'm dispatching multiple agents in parallel and walking away for two hours, it matters a lot.

Two failure modes I hit repeatedly before switching:

**Compaction eats the references.** After context compression, the subagent IDs returned by earlier `Task` calls are gone. The main agent no longer knows what it spawned. It may re-spawn work, skip it, or sit idle wondering.

**Completed subagents don't reliably wake the parent.** The more pernicious failure: a subagent finishes its work and the parent never gets the callback. The main loop sits stuck, waiting, accumulating idle compute time, while the result it was waiting for has been sitting there done for thirty minutes. I've lost overnight runs to this.

OpenCode's session model fixes both. Every subagent is a named session. The server API exposes a session list at any time — I can query it from OpenClaw, from my phone, from a cron job. Nothing is implicit. Nothing disappears on compaction.

## 3. OpenCode shipped `opencode serve` from day one.

`opencode serve` exposes the coding session over HTTP. It's been there since the early releases. I deployed it on a dev workstation, punched a [Tailscale](https://tailscale.com) tunnel from the workstation to OpenClaw in the cloud and to my phone, and now:

- OpenClaw (the operations brain) dispatches coding tasks to OpenCode over that tunnel without a public endpoint anywhere.
- I read session state and send steering instructions from mobile.
- I can kill a runaway session, reprioritize a queue, or inject context into a running session from a coffee shop.

The architecture this enables — cloud operations agent supervising a local coding agent over a private network — is the thing I wrote about in [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision). It only works because the HTTP API exists and is stable.

Claude Code in its early form was a CLI tied to a terminal. You had to be there. `opencode serve` changed the mental model entirely: the coding agent is infrastructure, not a tool you open.

## 4. OpenCode is model-agnostic. Claude Code is mostly Anthropic-bound.

I run `opencode/deepseek-v4-fast` for spec decomposition and delegation work. It is fast enough and smart enough for that layer, at a fraction of the Anthropic token rate. When I'm running hundreds of sessions a day, the per-token cost is not an abstraction — it's a real line item.

The mixed-model orchestration pattern I run: Opus decides what is hard and what is easy. DeepSeek or GPT-5.4-mini executes the easy parts. Opus only handles the steps where the cost of error outweighs the cost of the model. This is covered in detail in [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) and [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash).

Claude Code has a Codex plugin for mixed-model use. It works. It feels grafted on — a bolt added after the fact to a system designed around a single provider. OpenCode treats model selection as a first-class config option that applies consistently across every session type, every tool call, every subagent. The mental model is cleaner and the routing is more reliable.

## 5. Where Claude Code still wins — and what I'm doing about it.

The Claude Code mobile app is better than the OpenCode web app. Not slightly. Noticeably: faster, cleaner, better session presentation, more responsive on a phone screen.

But I cannot supervise Claude Code sessions from OpenClaw. There is no API surface that lets another agent read what a CC session is doing, steer it, kill it, or inject context. That makes Claude Code sessions opaque to my operations layer — and at this stage, every coding session must be observable and steerable from OpenClaw. That is not optional. A coding agent I cannot supervise is one I cannot trust to run overnight unsupervised.

My fix is [opencode-mobile](https://github.com/dzianisv/opencode-mobile): take OpenCode's session API, which already exists and is observable, and build Claude-Code-quality mobile UX on top of it. The goal is to close the one gap where CC has a real advantage, without giving up the observability that makes the rest of the system work.

## Bottom line

Closed-source means vendor leverage. The vendor decides when your pain gets fixed and whether it gets fixed at all.

Observability, remote control, and model flexibility outweigh polish on every decision I make here. The polish gap is real and I'm closing it with opencode-mobile. The observability gap in Claude Code is structural — it would take architectural changes from Anthropic to fix, and there is no indication that's coming.

For a one-person AI-native company where the coding agent is load-bearing infrastructure — running overnight, being supervised by another agent, handling production PRs without me at the keyboard — the forkability of OpenCode is non-negotiable. It is not a nice-to-have. It is the thing that makes the whole stack trustworthy.

## Related reading

- [Vibe Engineering Stack: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [Vibe Technologies, Six Months In: What We Built and How We Operate](/blog/2026-05-01-vibe-technologies-current-state-operational-manual)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
