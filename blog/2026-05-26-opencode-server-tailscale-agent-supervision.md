---
title: "OpenCode in Server Mode: Tailscale Access and AI Session Supervision"
description: "Running OpenCode in server mode on a VM and exposing it via Tailscale turns it from a one-person CLI tool into a persistent coding service. The software-engineer agent on OpenClaw can then open sessions, supervise progress, and follow up — acting more like a staff engineer than a solo coder."
date: "2026-05-22"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - opencode
  - tailscale
  - openclaw
  - ai-agents
  - software-engineer
  - vibe-technologies
published: true
---

Running OpenCode as a CLI tool means one session, one terminal, one project at a time. That works for a human who sits at a desk. It does not work for an AI agent that needs to manage multiple coding tasks in parallel, check back on a session it started an hour ago, and follow up when a test fails.

OpenCode has a server mode. It runs as a persistent web application — a session manager you can reach over HTTP. Expose that over Tailscale and you have a coding operations hub reachable from any device, including from another AI agent running on OpenClaw.

## The Setup

OpenCode starts in server mode on a remote VM:

```bash
opencode serve
```

This launches the OpenCode web UI on a local port. Tailscale puts that VM on your private mesh — no port forwarding, no dynamic DNS, no ingress rule. The VM gets a stable Tailscale hostname, and that hostname is reachable from every device on the mesh: laptop, phone, and OpenClaw's agent runtime.

From anywhere on the mesh:

```
https://<vm-hostname>.ts.net:PORT
```

The OpenCode web app appears. Multiple sessions, multiple projects, session history — all persistent, all reachable.

## What Gilfoyle (SoftwareEngineer) Does With It

In the Vibe Technologies stack, Gilfoyle is the `software-engineer` agent on OpenClaw. He receives handoffs from Grace (support-engineer) via `@SoftwareEngineer` Slack mentions — typically a Linear issue URL, a Sentry short ID, and a fix request.

Before server mode, Gilfoyle handled coding work inside a single OpenClaw session — running tools, editing files, committing. That works for short tasks. For longer or parallel work, session context grows, costs climb, and Gilfoyle loses the ability to track what is still open.

With OpenCode in server mode, Gilfoyle's workflow changes:

1. Receives a handoff from Grace: "VIBE-4821 — login 500 on subdomain X"
2. Opens a new OpenCode session via the web UI (or API call) with a task description
3. The session runs independently on the VM — its own context, its own tool calls
4. Gilfoyle checks back: reads session output, reviews intermediate commits, asks clarifying questions if the session stalls
5. When the PR is ready, Gilfoyle links "Fixes VIBE-4821" and pings Grace

Gilfoyle acts as a staff engineer who delegates implementation and supervises output — not as the sole coder who does everything in one long session.

## Multiple Sessions, Multiple Projects

OpenCode's web UI lets Gilfoyle maintain multiple active sessions simultaneously:

- One session working on the login bug (VIBE-4821)
- Another session running a test suite on a separate branch
- A third session investigating a Sentry regression from the previous deploy

Each session has its own context window and its own tool-call history. Gilfoyle doesn't hold all of this in a single OpenClaw session — he delegates and checks back. The supervision cost is low; the implementation cost is distributed.

For a one-person company running AI agents around the clock, this is the practical alternative to hiring. The human reviews at the PR level. Gilfoyle reviews at the session level. OpenCode does the implementation.

## The Permission Model (Or Lack Of One)

OpenCode has no per-user permission control. Any client on the Tailscale mesh can reach the web UI and open, read, or close any session.

For a one- or two-person company, this is fine. The "multi-user" scenario is: the human founder and Gilfoyle. Tailscale handles authentication at the network layer — if a device is on the mesh, it is authorized. OpenCode does not need to duplicate that.

This design does not scale to teams. If you add a third person or a second AI agent with different access requirements, you need an auth proxy in front of OpenCode. The current setup is intentionally personal.

## What Changed in Practice

Two things shifted when server mode went into the workflow:

**Gilfoyle stopped losing work to context pressure.** In single-session mode, a long debugging task fills the context window and triggers compaction. Compaction loses intermediate state. In server mode, each OpenCode session is independent and has its own context budget. Gilfoyle manages the meta-level; OpenCode manages the implementation-level.

**Mobile access became real.** The Tailscale mobile app puts the OpenCode web UI one tap away on a phone. Not great UX for starting complex sessions, but enough to check status, review a session that stalled, or manually close one that went wrong. This is good enough for the "check from the couch" case.

For proper mobile-first access, see [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control).

## What Does Not Work Yet

- **No session priority.** A P0 incident and a low-priority refactor sit in the same session list with no visual differentiation. Gilfoyle sorts by recency; priority is in the Linear label, not in OpenCode.
- **No Gilfoyle-to-session API.** Right now Gilfoyle uses browser CDP (via OpenClaw's browser plugin) to interact with the OpenCode web UI. A clean HTTP API from OpenClaw to OpenCode would be more reliable. Not built yet.
- **Session cleanup is manual.** Stale sessions accumulate. Gilfoyle does not automatically close sessions when work is done. Periodic cleanup is manual.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [6 Months of Momentum](/blog/2026-03-17-6-months-momentum)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix)
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework)
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- **You are here** — OpenCode in Server Mode: Tailscale Access and AI Session Supervision
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control)

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

*Previous in series: [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review →](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)*

*Next in series: [Claude Code Remote Control: Managing Coding Sessions from Mobile →](/blog/2026-05-27-claude-code-mobile-remote-control)*
