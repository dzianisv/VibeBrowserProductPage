---
title: "Vibe Engineering: From Claude Code to OpenCode — How We Set Up AI Coding Agents"
description: "How Vibe Technologies structures its AI coding stack: starting with Claude Code, switching to OpenCode for multi-model flexibility, setting up orchestrator and subagent roles, and running parallel agents 24/7."
date: "2025-11-10"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - ai-engineering
  - claude-code
  - opencode
  - ai-agents
  - vibe-technologies
  - developer-tools
---

When I started Vibe Technologies, my coding setup was simple: Claude Code in the terminal, me typing prompts, agents writing code. Three months later, the setup looks very different. This post covers the evolution, why I switched, and how the current orchestrator model works.

## Starting Point: Claude Code

Claude Code was the right first tool. It understands large codebases, reasons about architecture, and produces working code for complex tasks. I used it for everything early on — new features, bug fixes, PR review, documentation.

The friction points appeared as the workload scaled:

- **Provider lock-in**: Claude Code runs on Anthropic models only. I needed to route different tasks to different models based on cost and capability — GPT for code generation, Gemini for UI, cheaper models for tests. Every overnight run went through a single provider at full Opus pricing with no way to downgrade individual steps.
- **Context limit failures on long tasks**: Claude Code would hit context limits mid-task on large refactors, dropping state and requiring a manual restart. Overnight runs failed silently — I'd wake up to nothing merged and no clear error.
- **Closed internals**: when I wanted to add reflection layers (detecting when an agent is stuck in a loop) or custom task automation, Claude Code's architecture made it difficult. We had no exact cost baseline — we just knew overnight runs were failing and we couldn't tell why.
- **Single session**: no way to run multiple agents in parallel on independent tasks. Tasks queued instead of running concurrently, which made the async-overnight model unworkable.

Claude Code remains excellent for complex reasoning tasks. But as an orchestration substrate for a multi-agent company, it was the wrong layer.

## The Switch to OpenCode

[OpenCode](https://opencode.ai) is an open-source coding agent with multi-model support and a composable architecture. The key properties I needed:

- **Model-agnostic**: switch between Anthropic, OpenAI, Azure OpenAI, Google, local Ollama in config
- **Open architecture**: add reflection layers, custom tools, GitHub plugins without forking closed source
- **Remote serve mode**: `opencode serve` exposes a session over HTTP — I can send tasks from mobile, route tasks from other agents, run 24/7 on a remote VM
- **Community ecosystem**: problems I hit have usually been solved already

We also maintain a [fork of OpenCode](https://github.com/dzianisv/opencode) with specific changes: planning-loop detection, cross-model review (Claude reviewing Codex output), GitHub integration plugin, and self-healing Cloudflare tunnel watchdogs for the remote serve layer.

## The Orchestrator Model

The current setup runs one **Opus-class orchestrator** and multiple specialized **subagents**:

```
Orchestrator (Claude Opus)
├── BackendDeveloper  (GPT-5 Codex) — APIs, databases, server logic
├── FrontendDeveloper (Gemini Pro)  — UI, styling, client-side
├── QAEngineer        (MiniMax)     — tests, edge cases, validation
├── DevOpsEngineer    (Claude Sonnet) — CI/CD, infra, deployments
└── SEOEngineer       (Gemini)      — release notes, blog posts, SEO
```

The orchestrator never writes code. Its system prompt is explicit:<!-- TODO: link to orchestrator system prompt in repo -->

> 1. When given a task, create a GitHub issue first.
> 2. Keep the issue updated throughout.
> 3. Decompose and delegate to subagents.
> 4. Run independent subagents in parallel.
> 5. When complete, review and reflect.
> 6. Create a PR if code changes were made.
> 7. Watch GitHub Actions and ensure tests pass.
> **Never implement changes yourself — design, delegate, review.**

Expensive models (Opus) doing expensive reasoning. Cheap models doing execution. Spec quality is what determines output quality — Opus turns a vague requirement into a proper technical spec, then routes it to the right subagent.

## Cross-Model Review

One quality gate that consistently catches issues: having one model review another's output.

After a subagent submits a PR, the orchestrator sends the diff to a different model: "Codex, do you agree with what Claude wrote here?" They usually do not agree completely. The disagreements surface real issues — logic gaps, missing edge cases, incorrect assumptions.

This is not expensive in practice. Diff review is a small context window. The catch rate justifies the cost.

## Running 24/7

The `opencode serve` command runs a persistent session on a remote VM (DigitalOcean, ~$12/month). I send tasks from:

- Terminal on the work machine
- Mobile via voice → TypeWhisper transcribes → sends to the remote session<!-- TODO: screenshot of TypeWhisper voice input in action -->
- Other agents (VibeTeam operations agents can spawn coding tasks)

I check in asynchronously. Most mornings start with reviewing what the agents shipped overnight.

**Forward note (Jan 2026+):** the current production setup moved OpenCode off the DigitalOcean VM and onto a real dev workstation. `opencode serve` still exposes the session over HTTP — but instead of a cloud VM, it runs on a workstation sitting on my desk. The cloud-side OpenClaw SoftwareEngineer agent (Gilfoyle Bertram) reaches that endpoint over [Tailscale](https://tailscale.com), so the dev box has no public ingress. Gilfoyle Bertram is the supervisor in the cloud; OpenCode on the dev machine is the worker. Full architecture is in [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team).

## What This Replaces

Before this setup, a feature from spec to merged PR required me at the keyboard for several hours. Now:

1. Voice message (2 min) → transcribed spec
2. Orchestrator creates GitHub issue, decomposes, delegates
3. Subagents work in parallel (1-3 hours depending on complexity)
4. I review the PR (15-30 min)
5. CI passes, merge

The bottleneck shifted from coding to reviewing. That is the right bottleneck for a product company.

## Evidence It Works

We haven't measured this yet — no latency benchmarks or cost deltas captured at time of writing. OpenCode *feels* faster for context switching but we have no numbers.

## What Does Not Work Yet

- **TypeWhisper voice interface is unstable on long sessions**: transcription drops or the connection to the remote session resets after 20–30 minutes, requiring a manual reconnect.
- **Orchestrator model selection is manual**: choosing which model handles which subagent role is hand-tuned config, not automatic. There is no runtime mechanism that reassigns a role to a cheaper model when cost spikes.
- **No objective model benchmark**: the model assignments in the diagram above are based on intuition and informal testing, not a controlled benchmark. A cheaper model might do just as well for several of those roles.

## Next in This Series

[VibeTeam: How We Run Operations with AI Agents →](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- **You are here** — [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)

*Previous in series: [Building Vibe Technologies: An AI-Native Startup →](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)*
