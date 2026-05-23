---
title: "VibeTeam: How We Run Company Operations with AI Agents on OpenHands"
description: "How Vibe Technologies uses a custom OpenHands build (VibeTeam) to handle incident response, Slack communication, customer triage, and operations — without a human operations team."
date: "2025-11-20"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - ai-agents
  - operations
  - openhands
  - vibeteam
  - ai-native
  - vibe-technologies
  - automation
published: true
---

Vibe Technologies runs on one human and a team of AI agents. The agents own incident response, Slack triage, customer routing, and code review — the work that would normally require a full ops team. Below is a breakdown of which agent handles what, and how they hand off work to each other.

## The Problem: Operations Does Not Scale with 1.0 Humans

A one-person company has a fundamental tension: customers and systems do not wait for business hours. Incidents happen at 3am. Customer messages arrive when I am focused on engineering. Slack notifications pile up.

The choices are:
- Ignore it (bad for customers)
- Always be on-call (bad for focus)
- Build an AI operations layer (the right answer)

VibeTeam is that layer.

We had no incident count, no SLA data, and no ops time tracking before building VibeTeam. The pain was qualitative: every customer issue and every infrastructure alert landed in Dzianis's personal queue.

OpenHands is an open-source AI software agent platform ([github.com/All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands)). We forked it as [VibeTeam](https://github.com/VibeTechnologies/VibeTeam) with modifications for operations-specific tasks: Slack integration, PagerDuty-style alerting, structured runbooks, and customer communication workflows.

## What VibeTeam Handles

### Incident Response

When a Kubernetes alert fires or an uptime check fails, VibeTeam:

1. Receives the alert via webhook
2. Pulls recent logs and metrics context
3. Runs the relevant runbook (shell commands, kubectl, API calls)
4. Attempts automated remediation (restart pod, clear queue, rollback deployment)
5. Posts a structured incident report to Slack
6. Escalates to me via push notification if remediation fails

Most incidents — pod restarts, memory pressure, stuck queues — resolve without me. The ones that escalate are genuinely novel problems requiring judgment.

### Slack Communication

VibeTeam monitors our Slack workspace. When a message requires a response:

1. Agent reads thread context and recent conversation history
2. Drafts a response appropriate to the channel and sender
3. Posts response or flags for my review if outside its confidence threshold

This covers: partnership inquiries routed to the wrong channel, community questions about VibeBrowser setup, status update requests, and internal reminders.

<!-- TODO: screenshot of VibeBot Slack incident report -->
The agent does not pretend to be human. It signs messages as "VibeBot" (model: varies by task — Claude Sonnet or GPT-4o depending on routing config) and includes a note that I am available for complex discussions.

### Customer Triage

Inbound customer messages (email, contact form) go through VibeTeam first:

- **Routing**: bug reports → GitHub issue created automatically; feature requests → tagged and added to backlog; billing questions → template response with support contact
- **Initial response**: acknowledgment sent within minutes, not hours
- **Context assembly**: when I do need to respond, VibeTeam has already pulled the customer's account history, recent interactions, and any related GitHub issues

We haven't measured this. The perception is faster — not a number. Response quality feels better because the agent never forgets context I would have had to look up manually — but that is also not measured.

## Architecture

```
VibeTeam Agent
├── Triggers: webhook, Slack event, email, cron
├── Tools: bash, kubectl, gh CLI, Slack API, email API
├── Runbooks: markdown files defining step-by-step procedures
├── Escalation: push notification → me if confidence < threshold
└── Audit log: every action recorded with reasoning
```

The agent runs in a sandboxed container with explicit tool permissions. It cannot push to production directly — deployments require CI to pass and produce a URL it can verify. The constraint is intentional: the agent handles ops, humans merge code.

## What Does Not Work Yet

Honest accounting:

- **Novel incidents**: if the failure mode is new and not in a runbook, the agent thrashes. Runbook coverage is the bottleneck. Adding ~2 runbooks/week; currently at ~40% novel-incident coverage.
- **Nuanced customer situations**: angry or frustrated customers need human empathy. The agent handles routine communication well but escalates emotional situations correctly. Escalation accuracy not yet tracked.
- **Cross-system reasoning**: incidents spanning multiple services still require ~15 min manual triage to connect the dots. Context assembly across service boundaries not yet automated.

These are runbook gaps and context problems, not fundamental agent limitations. They improve as coverage grows.

## The Minimum Proprietary Stack

VibeTeam is built on entirely open-source foundations:

- [OpenHands](https://github.com/All-Hands-AI/OpenHands) — agent runtime
- Model-agnostic: routes to Claude Sonnet or GPT-4o depending on task type (routing config determines which; not hardcoded)
- Slack API (Bolt SDK)
- Standard Kubernetes tooling for infra operations
- GitHub API for issue management

No vendor-specific ops platforms. No $500/month incident management SaaS. The operational cost is compute for the agent container and LLM API calls.

## Why This Matters Beyond Vibe Technologies

The operations agent model is not just a startup hack. It is how we run ours today.

Every engineering team has an operations burden that consumes engineering time: incident response, on-call, status updates, runbook execution, triage. AI agents do not replace good engineering judgment — they eliminate the routine execution that distracts from it.

VibeTeam is open-source. If you are building something similar or want to adapt it for your stack: [github.com/VibeTechnologies/VibeTeam](https://github.com/VibeTechnologies/VibeTeam)

---

*Previous in series: [Vibe Engineering Stack: Claude Code to OpenCode →](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)*

*Start of series: [Building Vibe Technologies: An AI-Native Startup →](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)*

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- **You are here** — [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — the post that replaces this one
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

*Next in series: [Switching From OpenHands to VibeBrowser Agentic Team →](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)*
