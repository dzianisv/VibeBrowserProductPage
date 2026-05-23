---
title: "How AI Agents Talk to Each Other at Vibe Technologies — Slack Apps, OpenClaw Bindings, and the AGENTS.md Handoff Matrix"
description: "Every agent at Vibe Technologies has its own Slack app, bound to a dedicated OpenClaw channel. When one Slack bot @mentions another, OpenClaw routes the message to the target agent's session. AGENTS.md in each workspace is the plain-text contract that tells each agent when to pass work and to whom."
date: "2026-05-23"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - openclaw
  - ai-agents
  - support-engineer
  - software-engineer
  - vibe-technologies
  - operations
published: true
---

Vibe Technologies has one human and ten AI agents. The human rarely coordinates handoffs directly — agents hand off to each other. Jared Dunn (SupportEngineer) escalates to Gilfoyle Bertram (SoftwareEngineer), who hands off to the CTO when the fix requires architecture authority. This post explains the exact mechanism: one Slack app per agent, one OpenClaw channel binding per agent, and a per-workspace `AGENTS.md` that every agent reads at session start.

> **Note on the previous architecture:** Earlier in the series ([VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)), agents were wired through a custom FastAPI gateway (`vibeteam-gateway`) with per-agent `agents.yaml` definitions. That is the OpenHands-era stack. Everything described in this post is the current OpenClaw stack.

## The Problem

When the team ran on the OpenHands gateway, all agent traffic flowed through a single service with a single Slack bot. There was no way to address one agent without the others picking up the event. Handoffs required manual context copy-paste between sessions.

Switching to OpenClaw changed the model: each agent is an independent process with its own channel binding. Slack apps replaced the shared bot. `AGENTS.md` replaced hardcoded routing tables.

## What We Built

### Agents Defined in openclaw.json

All agents are declared in `openclaw.json` under `agents.list`. Each entry has an ID and an isolated workspace:

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "litellm/gpt-5.3-codex",
        "fallbacks": ["litellm/gpt-5.1", "litellm/gpt-4.1"]
      }
    },
    "list": [
      { "id": "support-engineer",  "workspace": "~/.openclaw/workspace/support-engineer" },
      { "id": "software-engineer", "workspace": "~/.openclaw/workspace/software-engineer" },
      { "id": "product-manager",   "workspace": "~/.openclaw/workspace/product-manager" },
      { "id": "marketing-manager", "workspace": "~/.openclaw/workspace/marketing-manager" },
      { "id": "growth-manager",    "workspace": "~/.openclaw/workspace/growth-manager" },
      { "id": "cto",               "workspace": "~/.openclaw/workspace/cto" },
      { "id": "investor",          "workspace": "~/.openclaw/workspace/investor" },
      { "id": "taxadvisor",        "workspace": "~/.openclaw/workspace/taxadvisor" },
      { "id": "immigration-lawyer","workspace": "~/.openclaw/workspace/immigration-lawyer" },
      { "id": "claw",              "workspace": "~/.openclaw/workspace/claw", "default": true }
    ]
  }
}
```

Config hot-reloads — no restart needed after adding or removing an agent.

### One Slack App Per Agent, Bound via OpenClaw

Each agent gets its own Slack app. That app registers a bot user in Slack — `@SupportEngineer`, `@SoftwareEngineer`, etc. — with its own bot token and webhook endpoint.

The binding that connects the Slack app to the OpenClaw agent is a single CLI command:

```bash
openclaw agents bind --agent support-engineer  --bind slack:support-channel
openclaw agents bind --agent software-engineer --bind slack:software-channel
openclaw agents bind --agent product-manager   --bind slack:product-channel
```

Or as a JSON block in `openclaw.json`:

```json
"bindings": [
  { "agentId": "support-engineer",  "match": { "channel": "slack", "accountId": "support-channel" } },
  { "agentId": "software-engineer", "match": { "channel": "slack", "accountId": "software-channel" } },
  { "agentId": "product-manager",   "match": { "channel": "slack", "accountId": "product-channel" } }
]
```

When a Slack message arrives on the `support-channel` account, OpenClaw routes it to Jared Dunn's session. When a message arrives on `software-channel`, it goes to Gilfoyle Bertram.

### @mention Is the Handoff Trigger

When Jared Dunn's response contains `@SoftwareEngineer`, OpenClaw detects the mention and delivers the message to the `software-channel` binding — which triggers Gilfoyle Bertram's session with the full thread context:

```
Customer email → Jared Dunn (support-channel)
  Jared writes: "@SoftwareEngineer — login flow returns 500 for subdomain X.
                 Sentry issue VIBE-4821. Please investigate."
                ↓
OpenClaw detects @SoftwareEngineer mention
                ↓
Routes to software-channel → Gilfoyle Bertram's session
                ↓
Gilfoyle opens PR, links "Fixes VIBE-4821"
                ↓
PR merge event → Jared notified → replies to customer
```

No custom gateway code. No regex parsing in application code. OpenClaw's multi-agent routing handles it.

### AGENTS.md Is the Handoff Contract

Every agent workspace contains an `AGENTS.md`. At session start, the agent reads this file. It includes a handoff table — the plain-text contract that tells the agent when to pass work and to whom:

```markdown
## Handoff Guidelines

| Situation | Handoff To | Example |
|-----------|------------|---------|
| Infrastructure outage (5xx errors) | @ReleaseEngineer | "API returning 503. @ReleaseEngineer check service health." |
| Code bug or feature request | @SoftwareEngineer | "Found login bug. @SoftwareEngineer investigate issue #345." |
| Product prioritization | @ProductManager | "Customer asking about roadmap. @ProductManager advise on timeline." |
| Public announcement needed | @MarketingManager | "Outage resolved. @MarketingManager post status update." |
```

This is not a config file. It is instructions. The agent reads it, applies the rules, writes the @mention into its response, and OpenClaw delivers the message. The routing is data-driven without being over-engineered.

When responsibility shifts — a new agent is added, an existing role expands — the handoff table changes in one file. Every agent picks up the update on next session start.

### GitHub Identity Per Agent

Each agent also carries its own GitHub App credentials in its binding config. PRs opened by Gilfoyle Bertram appear under his bot identity. Issues created by Jared Dunn show his bot as the author. Audit trail intact.

## Evidence It Works

We haven't measured handoff latency systematically. What we can confirm:

- Jared Dunn escalates to Gilfoyle Bertram via @mention multiple times per week without human involvement.
- `openclaw agents list --bindings` shows all ten agents active with their respective Slack bindings.
- Each agent's GitHub PRs appear under the correct bot identity — no mixed authorship.

## What Does Not Work Yet

- **No handoff acknowledgment.** When Jared hands off to Gilfoyle, there is no explicit "received" signal back. Jared doesn't know Gilfoyle acted on the task until a PR appears.
- **No circular handoff guard.** OpenClaw prevents self-handoffs but doesn't detect multi-agent loops (A → B → A). Not seen in practice, but the guardrail is absent.
- **No priority queue.** A P0 incident and a low-priority feature request hit Gilfoyle's Slack channel in the same order. Jared labels Linear issues by severity, but that label doesn't influence routing speed.
- **Cost not yet reported.** Active tuning phase — cost numbers during debugging don't reflect steady-state. Will publish once the system stabilizes.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — series root, company principles
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — how Gilfoyle Bertram ships PRs
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the predecessor stack (agents.yaml + vibeteam-gateway)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — why we moved to OpenClaw
- [6 Months of Momentum](/blog/2026-03-17-6-months-momentum) — what the agent team looks like at scale
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) — one of the inbound channels Jared monitors
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) — another inbound channel
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — model routing that powers the agents
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping agent costs flat
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — how Jared's handoffs land in Linear
- **You are here** — Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

*Previous in series: [Linear Customer Support Pipeline →](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)*

*Next in series: [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework →](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework)*
