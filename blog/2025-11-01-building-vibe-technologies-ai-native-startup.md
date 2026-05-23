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
---

Vibe Technologies is one person — me — running a company with AI agents instead of employees. The agents have names and roles: Gilfoyle Bertram handles engineering, Jared Dunn handles customer support, Monica Hall runs growth, Einstein manages releases, and Harvey Specter covers legal. This post explains who each agent is, what they own, and how the system connects them — Slack, Linear, Chatwoot, and a dev workstation reachable from the cloud.

## The Problem

Customer support, code review, incident response, and growth work all compete for the same hours. Running all of it manually would require three to five people. I have one. Before the agents, I handled triage, bug routing, email replies, and release coordination by hand — which meant each task blocked the others. The agents replace that headcount. We haven't measured time savings yet, but the forcing function is simple: the work would not get done otherwise.

## How the Pieces Fit Together

Before: I did everything manually — replied to support emails, routed bugs, kicked off deploys, and wrote release notes. After: named agents own each of those domains and execute autonomously, escalating to me only when human judgment or money movement is involved.

Before the philosophy, the stack at a glance — so the rest of this series has a map to point at:

- **OpenClaw** — the operations brain in the cloud. Slack-facing, multi-role. Each "employee" is a named agent: Gilfoyle Bertram (SoftwareEngineer / Opus), Monica Hall (GrowthManager / GPT-5.4), Jared Dunn (SupportEngineer / GPT-5.4-mini), Einstein (ReleaseEngineer), Harvey Specter (LegalAdvisor / Opus). Explained in [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team).
- **OpenCode** — the coding worker. Runs on a dev workstation, exposes `opencode serve` over HTTP, reachable from OpenClaw via Tailscale. Opus supervises, cheaper models execute. See [Vibe Engineering Stack](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode).
- **docs.vibebrowser.app chat** — Azure AI Foundry RAG over our markdown docs. Tier-0 deflection. Escalates to email when stuck. See [the docs support chat post](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation).
- **Chatwoot** — self-hosted on AKS. Three inboxes: the web widget on openclaw.vibebrowser.app, Telegram, and email. AI bot handles tier-1; unresolved goes `needs-human` → Jared Dunn. See [the Chatwoot post](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app).
<!-- TODO: add screenshot of Jared Dunn Slack message and Chatwoot conversation -->
- **Gmail (support@vibebrowser.app)** — Jared Dunn's primary inbox for direct customer email.
- **Linear** — every bug, feature request, or account issue above a routing threshold becomes a Linear issue. See [the Linear pipeline post](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot).
- **VibeBrowser co-pilot chat** — the in-product chat where users can report issues directly to the team. End-to-end submit path is planned for Q3 2026; see the Linear pipeline post for the current state.
- **Model routing** — DeepSeek-V4-Flash / GPT-5.4 / Opus selected per role. See [the DeepSeek switch](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) and [token optimization](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman).

Humans architect. Agents execute. The rest is plumbing.

## How the Company Runs — End-to-End Process Picture

The list above is the parts list. This section is the wiring diagram — what is connected to what, who owns each process, and where the human (me) sits on top.

### System diagram

```
                          ┌──────────────────────────────────────────┐
                          │           Dzianis (1.0 human)            │
                          │      architect · review · approve        │
                          └────────────────────┬─────────────────────┘
                                               │
                                       Slack (DM + channels)
                                               │
            ┌──────────────────────────────────┼──────────────────────────────────┐
            │                                  │                                  │
            ▼                                  ▼                                  ▼
   ┌────────────────────┐         ┌────────────────────────┐         ┌──────────────────────┐
   │  Inbound channels  │         │   OpenClaw (cloud)     │ Tailscale│ OpenCode (dev box)  │
   │ ────────────────── │ ──────▶│  Slack-facing agents:  │◀────────▶│  opencode serve     │
   │ docs.vibebrowser   │         │  • Gilfoyle Bertram    │  HTTPS   │  real working tree  │
   │   (Azure RAG)      │         │     SoftwareEngineer   │          │  builds · tests · PR │
   │ Chatwoot           │         │  • Jared Dunn          │          └──────────┬───────────┘
   │   web/Telegram/    │         │     SupportEngineer    │                     │
   │   email            │         │  • Einstein            │                     │ gh CLI
   │ Gmail support@     │         │     ReleaseEngineer    │                     ▼
   │ VibeBrowser        │         │  • Monica Hall         │             ┌──────────────┐
   │   co-pilot chat    │         │     GrowthManager      │             │   GitHub     │
   └──────────┬─────────┘         │  • Sam · MarketingMgr  │             │ PRs · CI     │
              │                   │  • Jordan · ProductMgr │             └──────┬───────┘
              │  webhooks /       │  • Harvey Specter      │                    │ merge
              │  poll             │     LegalAdvisor       │                    ▼
              │                   │  • Michael Burry       │             ┌──────────────┐
              ▼                   │     Accountant         │             │  Deploy /    │
   ┌────────────────────┐         └───────────┬────────────┘             │  Kubernetes  │
   │  Cloud Chrome      │◀── CDP ────────────┘                           └──────┬───────┘
   │  (per-agent        │                                                       │
   │   profile)         │  cookies pushed by chrome-sync                        ▼
   │  Stripe · Mercury  │  from local laptop ─────────────┐                ┌─────────┐
   │  LinkedIn · GA     │                                  │                │ Sentry  │
   └────────────────────┘                                  │                └────┬────┘
                                                           │                     │ alert
   ┌─────────────────────────── Internal systems ──────────┼─────────────────────┘
   │                                                       │
   │   Linear (issues + Finance receipts)   ◀──── all roles write here
   │   Sentry (errors + alerts)             ◀──── Gilfoyle resolves
   │   Stripe (revenue · read-only)         ◀──── Michael Burry reads
   │   Mercury (banking · read-only)        ◀──── Michael Burry reads
   │   GitHub (code · PRs)                  ◀──── Gilfoyle writes via OpenCode
   │
   └─────────────────────────────────────────────────────────────────────────────┘
```

A few things the diagram is trying to make obvious:

- **Slack is the central nervous system.** Every agent, every escalation, every approval flows through it. If Slack goes down, the company effectively pauses — which is a real risk and is one reason every role's `AGENTS.md` keeps a fallback contact (email) in scope.
- **OpenClaw lives in the cloud; OpenCode lives on a desk.** The bridge between them is [Tailscale](https://tailscale.com), not a public endpoint. The dev workstation never opens a port to the internet.
- **The browser layer is shared.** Cloud Chrome instances per agent profile, hydrated with my login state via [`@vibetechnologies/chrome-sync`](https://www.npmjs.com/package/@vibetechnologies/chrome-sync). That is what lets Monica Hall read Google Analytics and Michael Burry read Mercury without me handing over passwords.
- **Linear is the universal substrate.** Bugs, features, support tickets, growth experiments, and receipts all live as Linear issues. One API, one mental model, one place to filter.

### Process matrix

Every named operational flow, who triggers it, who owns it, what tooling carries it, and where it escalates if the agent gets stuck:

| Process | Trigger | Primary agent | Tooling | Escalation | Reference |
|---|---|---|---|---|---|
| Code change → PR → merge → deploy | Slack request or Linear issue | Gilfoyle Bertram (SoftwareEngineer) | OpenCode over Tailscale · `gh` CLI · reflection layer · Einstein for deploy | `@Dzianis` for any unreviewed merge; `@Einstein` for rollout questions | [Engineering Stack](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) · [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Customer email → triage → reply | New email at `support@vibebrowser.app` | Jared Dunn (SupportEngineer) | Gmail API · Linear · Sentry read · sandboxed browser | `@GilfoyleBertram` for bugs · `@Einstein` for outages · `@Dzianis` for refunds above threshold | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Customer chat (Chatwoot widget/Telegram/email) → bot → human-escalation | Inbound message on Chatwoot inbox | Chatwoot AI bot → Jared Dunn | Chatwoot · OpenClaw bridge · `needs-human` label | `@Dzianis` for anything financial or contractual | [Chatwoot AI Chatbot](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) |
| Customer report from VibeBrowser co-pilot → Linear issue | User clicks "report issue" in co-pilot chat | Jared Dunn (triage) → Gilfoyle Bertram (fix) | VibeBrowser API · Linear API · Slack | `@ProductManager` for repeated friction; `@Dzianis` for sensitive data | [Linear pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) |
| Docs chat (RAG) → escalation | User question on docs.vibebrowser.app | Azure AI Foundry RAG → Jared Dunn | Azure AI Foundry · markdown index · email handoff | Jared Dunn picks up via Gmail when RAG can't answer | [Docs Support Chat](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) |
| Production incident (Sentry alert) → triage → fix → deploy | Sentry alert webhook | Jared Dunn (triage) → Gilfoyle Bertram (fix) → Einstein (deploy) | `sentry-cli` · OpenCode · `kubectl` · reflection review | `@Dzianis` for any destructive verb (`delete`, `drain`) | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Growth experiment → idea → run → measure → report | Weekly cron or Jared Dunn's repeated-request log | Monica Hall (GrowthManager) | Cloud Chrome · GA · Search Console · PostHog · chrome-sync | `@ProductManager` for recurring friction; `@Dzianis` for spend approvals | [OpenClaw switch · Monica Hall section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Marketing content → draft → review → publish | Cron or shipped feature | Sam (MarketingManager) with Monica Hall on SEO | OpenCode for repo PR · Gilfoyle for tech accuracy review | `@Dzianis` for tone or strategic claims | [VibeTeam post](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) |
| Receipt intake → Linear → quarterly close | Photo or email forwarded to `@MichaelBurry` | Michael Burry (Accountant) | Vision extraction · Linear Finance team · Stripe/Mercury read · CSV export | `@HarveySpecter` for legal classification; `@Dzianis` for payment approval | [OpenClaw switch · Michael Burry section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Legal question (LLC / tax / contracts) → Harvey Specter → CPA/attorney | Slack `@HarveySpecter` mention or referral from Michael Burry | Harvey Specter (LegalAdvisor) | Doc search · contract templates · Linear `Legal` team | `@Dzianis` for any binding action; external attorney for filings | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Bill payment → review → approve → execute | Recurring vendor invoice | Michael Burry (prepare) → Dzianis (approve) | Mercury read · Linear · Slack approval thread | `@Dzianis` is always the executor for money movement | [OpenClaw switch · Michael Burry section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |

Two patterns repeat across the matrix:

1. **Every process has an explicit escalation target.** No agent is allowed to silently give up. Either it ships the work, hands off to a named role, or pings `@Dzianis`. "Stuck and quiet" is the failure mode this scaffolding exists to prevent.
2. **Money movement and binding legal action are never agent-executed.** Michael Burry prepares payments, Harvey Specter drafts contracts, but the executor is always me. That is the one rule no agent can override and no skill can patch around.

The rest of this series fills in each row.

We haven't measured deflection rate yet — that tracking starts in Q1 2026.

## The Company Structure

Vibe Technologies runs with:

- **1.0 human employee** — me, as architect and decision-maker
- **AI engineering agents** — write code, run tests, submit PRs
- **AI operations agents** — handle incident response, Slack communication, customer triage

This is not a side project. It ships production software, maintains infrastructure, and operates 24/7 without me at the keyboard.

The agents are not magic. They fail, loop, and produce incorrect output. The discipline is in the scaffolding around them: failure detection, retry logic, escalation paths to me when human judgment is required.

## What We Are Building

Our primary product is [VibeBrowser](https://vibebrowser.app) — a browser co-pilot that gives AI agents control of a real Chrome session. Unlike headless browsers or HTML scrapers, VibeBrowser provides full JavaScript execution, authenticated sessions, and human-like interaction patterns.

Use cases: automating complex authenticated workflows, navigating dynamic pages, running repeatable browser tasks that previously required a human at a keyboard.

## Core Principle: Minimum Proprietary Technology

Every infrastructure decision defaults to open-source and self-hostable:

- **AI coding**: Claude Code → OpenCode (open-source, multi-model)
- **Operations agents**: custom OpenHands build — [VibeTeam](https://github.com/VibeTechnologies/VibeTeam)
- **Browser protocol**: Chrome DevTools Protocol (open standard)
- **Model layer**: model-agnostic routing across Anthropic, OpenAI, Google, local Ollama
- **Infrastructure**: Kubernetes, standard cloud primitives

Proprietary SaaS is a liability for a one-person company. Open-source gives you escape hatches when vendors change pricing, deprecate APIs, or go down.

## What Comes Next

This is the first post in a series on how Vibe Technologies actually operates:

1. **[The Engineering Stack](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)** — moving from Claude Code to OpenCode, the orchestrator model, and how code ships without me writing it
2. **[VibeTeam: AI Agents for Operations](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)** — the OpenHands-based agent team handling incidents, Slack, and customer communication

Questions or building something similar: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

## What Does Not Work Yet

- **No cross-source deduplication.** A customer who emails `support@vibebrowser.app` and also messages via Chatwoot creates two separate Linear issues. There is no merge logic today.
- **No SLA tracking on Linear status.** Issues are created and assigned but there is no measurement of time-to-first-response or time-to-resolution against any target.
- **Screenshots missing.** The UI flows described in this post (Jared Dunn Slack messages, Chatwoot conversation view) are not yet illustrated with real screenshots.
- **Deflection rate not measured.** We haven't measured how often docs RAG or the Chatwoot bot resolves a question without reaching Jared Dunn — that tracking starts in Q1 2026.

## Related reading

The full `#ainativecompany` series:

- **[Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)**
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)

*This is the first post in the series.*
