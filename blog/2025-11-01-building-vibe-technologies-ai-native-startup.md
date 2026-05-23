---
title: "Building Vibe Technologies: An AI-Native Startup with 1.0 Human Employees"
description: "How I founded Vibe Technologies as a solo founder with AI agents handling engineering, QA, DevOps, and operations — and what 'AI-native' actually means in a real production company."
date: "2025-11-01"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - ai-native
  - startup
  - founder
  - ai-agents
  - vibe-technologies
published: true
---

I am one person running a company. No headcount, no plans for headcount. This post is the thesis I wrote for myself before founding Vibe Technologies — the bet I am making, the stack I started with, what I am building first, and where the gaps are today.

## Why Solo, Why Now

The constraint is not ideology. It is economics. Hiring engineers to build a browser co-pilot for AI agents would mean raising money, which means a board, which means quarterly targets, which means the product gets shaped by investors rather than by what agents actually need. I do not want that.

The only viable alternative is to make the agents do most of the work.

AI coding tools in late 2025 are good enough that a single experienced engineer can multiply output by 5-10x if the tooling is wired correctly — parallelism, overnight runs, reflection loops to catch bad output. The agents are not autonomous yet; they need supervision and correction. But they are capable enough to hold down engineering velocity without a full team.

That is the founding bet: the ratio of headcount required to output produced is changing fast enough that a solo founder with the right AI stack can build and ship production software, serve customers, and iterate — without hiring until revenue demands it.

## The AI-Native Thesis

"AI-native" is overloaded, so I will define what I mean for Vibe Technologies.

Not: using GPT as a feature inside a product.

Not: automating one or two workflows with an LLM call.

AI-native means: every function that would normally require a person has a named agent or a defined process to handle it. Engineering, QA, incident response, customer triage, release coordination. These are not augmented with AI — they are owned by AI agents. I sit above them as architect and reviewer, not as the primary executor.

The practical version of this in November 2025: a coding agent that writes code overnight while I sleep, and an operations agent skeleton that handles Slack triage, incident response, and customer routing. Neither is perfect. Both are good enough to save the hours that would otherwise block the company.

## First Stack at Founding

Three pieces.

**OpenCode** — the coding agent. Runs on a dev workstation, exposes `opencode serve` over HTTP, reachable over Tailscale from wherever I am. Model-agnostic: Opus for orchestration, cheaper models for execution. Open-source, which matters — I need to be able to add reflection layers, custom tools, GitHub integration. Closed coding agents lock you out of the internals at the moment you most need to debug them.

We also maintain a [fork of OpenCode](https://github.com/dzianisv/opencode) with specific changes: planning-loop detection, cross-model review (one model reviewing another's output), and a GitHub integration plugin.

The orchestration model is explicit: an Opus-class orchestrator decomposes work, delegates to cheaper subagents running in parallel, and never writes code itself. Spec quality drives output quality. The orchestrator's job is turning a vague requirement into a precise spec the subagents can execute against.

**VibeTeam** — the operations skeleton, forked from OpenHands. [github.com/VibeTechnologies/VibeTeam](https://github.com/VibeTechnologies/VibeTeam). OpenHands gives you a sandboxed agent runtime with tool access: bash, kubectl, web APIs, file system. We forked it to add operations-specific workflows — Slack integration, structured runbooks, webhook ingestion, PagerDuty-style alerting paths.

At founding, this is a skeleton, not a full team. There is a generic ops agent that handles Slack triage and basic incident runbooks. No named roster yet, no specialized roles per domain. The intent is to grow roles as I understand what each domain actually needs.

**Slack** — the nervous system. Every agent posts here. I direct them from here. Incidents surface here. Escalations land here. When I am mobile, Slack is the control plane. The architecture is intentionally simple: if an agent needs to reach me, it sends a Slack message. If I need to direct an agent, I send a Slack message. No custom dashboards, no operator UI to maintain.

## What We Are About to Build

The primary product is [VibeBrowser](https://vibebrowser.app) — a browser co-pilot that gives AI agents control of a real Chrome session.

The problem it solves: most browser automation for AI agents relies on headless Chromium, HTML scraping, or Playwright scripts. Those break on dynamic pages, fail on sites that detect non-human behavior, and cannot handle authenticated workflows without brittle session management.

VibeBrowser is different. It connects to a real Chrome instance via Chrome DevTools Protocol, gives agents a proper accessibility tree plus screenshot context, and handles the authenticated state via the user's actual browser profile. The agent sees what a human sees and can interact the same way.

Use cases: automating complex authenticated workflows, navigating multi-step dynamic pages, running repeatable browser tasks that previously required a human at the keyboard.

We are building the agent side of this — the co-pilot layer — first. The browser is the product, not an internal tool. Other companies building AI agents need this too.

## Core Principle: Minimum Proprietary Technology

Every infrastructure decision defaults to open-source and self-hostable:

- **AI coding**: OpenCode (open-source, multi-model) — not Claude Code alone
- **Operations agents**: VibeTeam, forked from OpenHands — not a SaaS ops platform
- **Browser protocol**: Chrome DevTools Protocol — open standard, not a vendor-specific SDK
- **Model layer**: model-agnostic routing across Anthropic, OpenAI, Google, local Ollama
- **Infrastructure**: Kubernetes, standard cloud primitives

Proprietary SaaS is a liability for a one-person company. When a vendor changes pricing, deprecates an API, or goes down, I have no leverage and no alternatives. Open-source defaults give escape hatches. The stack I build should be something I can run myself if every vendor disappeared tomorrow.

## What Does Not Work Yet

Honest accounting from November 2025:

- **The ops skeleton is thin.** VibeTeam handles Slack triage and runbook execution for known incident types. Novel incidents still land on me. Runbook coverage is the bottleneck, and I have maybe 40% of real incident types covered.
- **No specialization in operations roles.** The generic ops agent handles everything from customer email routing to incident response. That works at low volume but will not scale — different domains need different context windows, different tool access, different escalation logic.
- **Overnight coding runs fail silently sometimes.** OpenCode hits context limits on large refactors and stops without a clear error. I wake up to nothing merged. Detection and retry logic is partial.
- **No measurement yet.** No deflection rate for customer triage, no latency benchmarks for the coding agent, no cost tracking per task. The signals are qualitative: the work gets done that otherwise would not. Numbers come later.

## What This Series Covers

This is the first post in the `#ainativecompany` series. Follow-up posts cover the engineering stack in detail and the operations agent skeleton.

- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — the coding agent setup, orchestrator model, and how code ships without me at the keyboard
- [VibeTeam: AI Agents for Operations](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the OpenHands-based agent team handling incidents, Slack, and customer communication

Questions or building something similar: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)
