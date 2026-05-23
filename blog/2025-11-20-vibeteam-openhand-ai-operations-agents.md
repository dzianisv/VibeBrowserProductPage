---
title: "VibeTeam: How We Run Company Operations with AI Agents on OpenHands"
description: "How Vibe Technologies uses a custom OpenHands build (VibeTeam) to handle incident response, Slack communication, customer triage, and operations — without a human operations team."
date: "2025-11-20"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ai-agents
  - operations
  - openhand
  - vibeteam
  - ai-native
  - vibe-technologies
  - automation
---

Engineering with AI agents is relatively well-covered territory. Running company operations with AI agents is not. This post covers [VibeTeam](https://github.com/VibeTechnologies/VibeTeam) — our custom OpenHands build that handles incidents, Slack communication, and customer triage.

## The Problem: Operations Does Not Scale with 1.0 Humans

A one-person company has a fundamental tension: customers and systems do not wait for business hours. Incidents happen at 3am. Customer messages arrive when I am focused on engineering. Slack notifications pile up.

The choices are:
- Ignore it (bad for customers)
- Always be on-call (bad for focus)
- Build an AI operations layer (the right answer)

VibeTeam is that layer.

## What Is OpenHands

[OpenHands](https://github.com/All-Hands-AI/OpenHands) (formerly OpenDevin) is an open-source platform for AI software agents. It provides a sandboxed environment where agents can run shell commands, browse the web, edit files, and call APIs. The architecture is designed for agents that take multi-step actions, not just single LLM calls.

We forked it as [VibeTeam](https://github.com/VibeTechnologies/VibeTeam) with modifications for operations-specific tasks: Slack integration, PagerDuty-style alerting, structured runbooks, and customer communication workflows.

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

The agent does not pretend to be human. It signs messages as "VibeBot" and includes a note that I am available for complex discussions.

### Customer Triage

Inbound customer messages (email, contact form) go through VibeTeam first:

- **Routing**: bug reports → GitHub issue created automatically; feature requests → tagged and added to backlog; billing questions → template response with support contact
- **Initial response**: acknowledgment sent within minutes, not hours
- **Context assembly**: when I do need to respond, VibeTeam has already pulled the customer's account history, recent interactions, and any related GitHub issues

The time I spend on customer communication dropped significantly. More importantly, response quality improved because the agent never forgets context I would have had to look up manually.

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

## What Does Not Work (Yet)

Honest accounting:

- **Novel incidents**: if the failure mode is new and not in a runbook, the agent thrashes. Runbook coverage is the bottleneck.
- **Nuanced customer situations**: angry or frustrated customers need human empathy. The agent handles routine communication well but escalates emotional situations correctly.
- **Cross-system reasoning**: incidents that span multiple services require context assembly that still requires me to connect the dots.

These are runbook gaps and context problems, not fundamental agent limitations. They improve as coverage grows.

## The Minimum Proprietary Stack

VibeTeam is built on entirely open-source foundations:

- [OpenHands](https://github.com/All-Hands-AI/OpenHands) — agent runtime
- Model-agnostic: routes to Claude, GPT, or local models based on task type
- Slack API (Bolt SDK)
- Standard Kubernetes tooling for infra operations
- GitHub API for issue management

No vendor-specific ops platforms. No $500/month incident management SaaS. The operational cost is compute for the agent container and LLM API calls.

## Why This Matters Beyond Vibe Technologies

The operations agent model is not just a startup hack. It is a preview of how engineering organizations will run.

Every engineering team has an operations burden that consumes engineering time: incident response, on-call, status updates, runbook execution, triage. AI agents do not replace good engineering judgment — they eliminate the routine execution that distracts from it.

VibeTeam is open-source. If you are building something similar or want to adapt it for your stack: [github.com/VibeTechnologies/VibeTeam](https://github.com/VibeTechnologies/VibeTeam)

---

*Previous in this series: [Vibe Engineering: From Claude Code to OpenCode →](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)*

*Start of series: [Building Vibe Technologies: An AI-Native Startup →](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)*
