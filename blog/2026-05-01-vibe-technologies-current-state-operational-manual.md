---
title: "Vibe Technologies, Six Months In: What We Built and How We Operate"
description: "Six months after founding, here's the current operational state — agent roster, system diagram, process matrix, model routing — and what changed from the Nov 2025 plan."
date: "2026-05-01"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - ai-native
  - vibe-technologies
  - openclaw
  - operations
  - retrospective
published: true
---

Six months ago I wrote a [founding thesis](/blog/2025-11-01-building-vibe-technologies-ai-native-startup): one human, AI agents doing the rest, minimum proprietary technology. This post is the retrospective and the operational manual — what the system looks like today, what changed, and what still does not work.

## What Changed Since November 2025

The thesis held. The implementation changed significantly.

- **OpenHands → OpenClaw (February 2026).** VibeTeam, our OpenHands fork, worked for the skeleton phase. Once the agent roster grew past three roles and the context requirements per role diverged, OpenHands became a friction point. We switched to OpenClaw — a lighter Slack-native agent framework I built specifically for the Vibe operations use case. OpenClaw handles multi-role Slack dispatch, per-agent AGENTS.md files, and model routing without the full OpenHands sandbox overhead. [VibeTeam](https://github.com/VibeTechnologies/VibeTeam) is still public but no longer the production framework.
- **Named agent roster crystallized.** Starting with a generic ops agent was the right call — it forced me to observe what domains actually needed specialized handling before committing to a structure. By February the roles had stabilized: software engineering, support, growth, legal, finance, marketing, product. Naming agents cleaned up Slack significantly. `@GilfoyleBertram` is unambiguous. `@opsagent` was not.
- **Einstein (ReleaseEngineer) was removed as a separate role.** The release function was thin enough that it made more sense for the SoftwareEngineer to own deploy end-to-end. Gilfoyle Bertram now runs the full cycle: code → PR → CI → deploy. One fewer agent handoff, fewer escalation paths.
- **Slack remained the nervous system.** No regrets on that choice. Every alternative I looked at — custom operator dashboards, PagerDuty-style tools, purpose-built agent UIs — would have required me to maintain more software. Slack is the one interface I check anyway.
- **Model routing matured.** Started with Opus for everything because it was simplest. Switched cheaper roles (support triage, marketing drafts) to GPT-5.4-mini / GPT-5.4 once I had enough output to calibrate quality. Opus reserved for engineering, legal, finance — roles where errors are expensive.

## Stack at a Glance

- **OpenClaw** — the operations brain in the cloud. Slack-facing, multi-role. Each "employee" is a named agent with its own AGENTS.md and model config. Explained in [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team).
- **OpenCode** — the coding worker. Runs on a dev workstation, exposes `opencode serve` over HTTP, reachable from OpenClaw via Tailscale. Opus supervises, cheaper models execute. See [Vibe Engineering Stack](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode).
- **docs.vibebrowser.app chat** — Azure AI Foundry RAG over our markdown docs. Tier-0 deflection. Escalates to email when stuck. See [the docs support chat post](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation).
- **Chatwoot** — self-hosted on AKS. Three inboxes: the web widget on openclaw.vibebrowser.app, Telegram, and email. AI bot handles tier-1; unresolved goes `needs-human` → Jared Dunn. See [the Chatwoot post](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app).
- **Gmail (support@vibebrowser.app)** — Jared Dunn's primary inbox for direct customer email.
- **Linear** — every bug, feature request, or account issue above a routing threshold becomes a Linear issue. See [the Linear pipeline post](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot).
- **VibeBrowser co-pilot chat** — the in-product chat where users can report issues directly to the team.
- **Model routing** — GPT-5.4-mini / GPT-5.4 / Opus selected per role. See [token optimization](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman).

## System Diagram

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
   │   email            │         │  • Monica Hall         │                     │ gh CLI
   │ Gmail support@     │         │     GrowthManager      │                     ▼
   │ VibeBrowser        │         │  • Sam · MarketingMgr  │             ┌──────────────┐
   │   co-pilot chat    │         │  • Jordan · ProductMgr │             │   GitHub     │
   └──────────┬─────────┘         │  • Harvey Specter      │             │ PRs · CI     │
              │                   │     LegalAdvisor       │             └──────┬───────┘
              │  webhooks /       │  • Michael Burry       │                    │ merge
              │  poll             │     Accountant         │                    ▼
              │                   │  • Gordon Gekko        │
              │                   │     PaymentsGate       │
              │                   └───────────┬────────────┘             ┌──────────────┐
              ▼                               │                          │  Deploy /    │
   ┌────────────────────┐◀── CDP ────────────┘                           │  Kubernetes  │
   │  Cloud Chrome      │                                                └──────┬───────┘
   │  (per-agent        │  cookies pushed by chrome-sync                        │
   │   profile)         │  from local laptop ─────────────┐                    ▼
   │  Stripe · Mercury  │                                  │                ┌─────────┐
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

A few things the diagram makes obvious:

- **Slack is the central nervous system.** Every agent, every escalation, every approval flows through it. If Slack goes down, the company effectively pauses — which is a real risk and is one reason every role's `AGENTS.md` keeps a fallback contact (email) in scope.
- **OpenClaw lives in the cloud; OpenCode lives on a desk.** The bridge between them is [Tailscale](https://tailscale.com), not a public endpoint. The dev workstation never opens a port to the internet.
- **The browser layer is shared.** Cloud Chrome instances per agent profile, hydrated with my login state via [`@vibetechnologies/chrome-sync`](https://www.npmjs.com/package/@vibetechnologies/chrome-sync). That is what lets Monica Hall read Google Analytics and Michael Burry read Mercury without me handing over passwords.
- **Linear is the universal substrate.** Bugs, features, support tickets, growth experiments, and receipts all live as Linear issues. One API, one mental model, one place to filter.

## Agent Roster

Eight production agents. Roster as of May 2026:

| Agent | Role | Model | Owns |
|---|---|---|---|
| Gilfoyle Bertram | SoftwareEngineer | Claude Opus | Code, PRs, CI, deploys |
| Jared Dunn | SupportEngineer | GPT-5.4-mini | Customer email, Chatwoot, Linear triage |
| Monica Hall | GrowthManager | GPT-5.4 | GA, Search Console, PostHog, growth experiments |
| Harvey Specter | LegalAdvisor | Claude Opus | LLC questions, contracts, tax classification |
| Michael Burry | Accountant | Claude Opus | Receipts, Stripe read, Mercury read, quarterly close |
| Gordon Gekko | PaymentsGate | Claude Opus | Virtual card issuance, payment approvals under monthly budget cap |
| Sam | MarketingManager | — | Content drafts, blog posts, SEO |
| Jordan | ProductManager | — | Roadmap triage, repeated-friction patterns |

The Einstein (ReleaseEngineer) role was removed. Releases are owned by Gilfoyle Bertram end-to-end.

## Process Matrix

Every named operational flow — who triggers it, who owns it, what tooling carries it, and where it escalates when the agent gets stuck:

| Process | Trigger | Primary agent | Tooling | Escalation | Reference |
|---|---|---|---|---|---|
| Code change → PR → merge → deploy | Slack request or Linear issue | Gilfoyle Bertram (SoftwareEngineer) | OpenCode over Tailscale · `gh` CLI · reflection layer | `@Dzianis` for any unreviewed merge | [Engineering Stack](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) · [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Customer email → triage → reply | New email at `support@vibebrowser.app` | Jared Dunn (SupportEngineer) | Gmail API · Linear · Sentry read · sandboxed browser | `@GilfoyleBertram` for bugs · `@Dzianis` for refunds above threshold | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Customer chat (Chatwoot widget/Telegram/email) → bot → human-escalation | Inbound message on Chatwoot inbox | Chatwoot AI bot → Jared Dunn | Chatwoot · OpenClaw bridge · `needs-human` label | `@Dzianis` for anything financial or contractual | [Chatwoot AI Chatbot](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) |
| Customer report from VibeBrowser co-pilot → Linear issue | User clicks "report issue" in co-pilot chat | Jared Dunn (triage) → Gilfoyle Bertram (fix) | VibeBrowser API · Linear API · Slack | `@ProductManager` for repeated friction; `@Dzianis` for sensitive data | [Linear pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) |
| Docs chat (RAG) → escalation | User question on docs.vibebrowser.app | Azure AI Foundry RAG → Jared Dunn | Azure AI Foundry · markdown index · email handoff | Jared Dunn picks up via Gmail when RAG can't answer | [Docs Support Chat](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) |
| Production incident (Sentry alert) → triage → fix → deploy | Sentry alert webhook | Jared Dunn (triage) → Gilfoyle Bertram (fix + deploy) | `sentry-cli` · OpenCode · `kubectl` · reflection review | `@Dzianis` for any destructive verb (`delete`, `drain`) | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Growth experiment → idea → run → measure → report | Weekly cron or Jared Dunn's repeated-request log | Monica Hall (GrowthManager) | Cloud Chrome · GA · Search Console · PostHog · chrome-sync | `@ProductManager` for recurring friction; `@Dzianis` for spend approvals | [OpenClaw switch · Monica Hall section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Marketing content → draft → review → publish | Cron or shipped feature | Sam (MarketingManager) with Monica Hall on SEO | OpenCode for repo PR · Gilfoyle for tech accuracy review | `@Dzianis` for tone or strategic claims | [VibeTeam post](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) |
| Receipt intake → Linear → quarterly close | Photo or email forwarded to `@MichaelBurry` | Michael Burry (Accountant) | Vision extraction · Linear Finance team · Stripe/Mercury read · CSV export | `@HarveySpecter` for legal classification; `@Dzianis` for payment approval | [OpenClaw switch · Michael Burry section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Legal question (LLC / tax / contracts) → Harvey Specter → CPA/attorney | Slack `@HarveySpecter` mention or referral from Michael Burry | Harvey Specter (LegalAdvisor) | Doc search · contract templates · Linear `Legal` team | `@Dzianis` for any binding action; external attorney for filings | [OpenClaw switch](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |
| Bill payment → review → approve → execute | Recurring vendor invoice | Michael Burry (prepare) → Gordon Gekko (auto-approve under cap) → Dzianis (above cap) | Mercury virtual cards · monthly budget ledger · Linear · Slack approval thread | `@Dzianis` for cap-raise or new vendor; Gordon Gekko refuses anything that would breach the monthly cap | [OpenClaw switch · Michael Burry section](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) |

Two patterns repeat across the matrix:

1. **Every process has an explicit escalation target.** No agent is allowed to silently give up. Either it ships the work, hands off to a named role, or pings `@Dzianis`. "Stuck and quiet" is the failure mode this scaffolding exists to prevent.
2. **Money movement above the cap and binding legal action remain human-executed.** This is an evolution from the original rule. Routine recurring payments — LLM API bills, cloud, SaaS subscriptions — are now agent-executed by Gordon Gekko, but only up to a hard monthly budget cap. Above the cap, or for any new vendor, the executor is still me. Harvey Specter drafts contracts; I sign them. The structural guardrail (a budget ceiling Gordon Gekko enforces by refusing, not just flagging) replaces the blanket prohibition on agent-executed payments for the routine case.

## What Changed Since November 2025

Concrete delta from founding plan to current state:

- **OpenHands → OpenClaw.** The OpenHands sandbox was right for phase one. Once per-agent context, tool sets, and escalation paths diverged across seven roles, a lighter framework was the correct call. OpenClaw is leaner and purpose-built for Slack-native multi-agent operation.
- **Named agents made communication cleaner.** This sounds cosmetic. It is not. Naming an agent forces you to define its scope, its escalation paths, its model, and what it is not responsible for. The generic ops agent had none of that. Named agents made the AGENTS.md files writable — you cannot define rules for a role that does not have a name.
- **ReleaseEngineer role eliminated.** Einstein was a separate agent whose only job was deploys. In practice, Gilfoyle Bertram already owned the code and the PR — handing deploy to a separate agent created a handoff with no benefit. Gilfoyle now runs the full cycle. One fewer Slack thread, one fewer escalation path.
- **Model routing matured past intuition.** Started with Opus everywhere (safe, expensive). Now: Opus for Gilfoyle, Harvey, Michael — roles where errors compound. GPT-5.4-mini for Jared — high volume, lower stakes per message. GPT-5.4 for Monica — quality matters but not at Opus cost. The routing is driven by observed output quality on real tasks, not benchmarks.
- **Chatwoot + Azure RAG added.** In November 2025 customer support was just email and Slack. Now there are three Chatwoot inboxes and a docs RAG layer doing tier-0 deflection. The escalation chain got longer but more of it resolves without me.
- **Gordon Gekko (PaymentsGate) added.** Recurring vendor payments — LLM API bills, cloud, SaaS subscriptions — were the largest manual-toil item left after support automation. Gordon Gekko now executes payments under a hard monthly cap, refuses anything that would breach it, and escalates new vendors or cap-raise requests to me. Routine money movement is no longer a human chokepoint.

## What Still Does Not Work

- **No cross-source deduplication.** A customer who emails `support@vibebrowser.app` and also messages via Chatwoot creates two separate Linear issues. There is no merge logic today.
- **No SLA tracking on Linear status.** Issues are created and assigned but there is no measurement of time-to-first-response or time-to-resolution against any target.
- **Screenshots missing.** The UI flows described in this post (Jared Dunn Slack messages, Chatwoot conversation view) are not yet illustrated with real screenshots.
- **Deflection rate not measured.** We do not know how often docs RAG or the Chatwoot bot resolves a question without reaching Jared Dunn. The plumbing to track it is not in place.
- **No cross-vendor anomaly detection.** Gordon Gekko enforces a monthly cap but won't catch a sudden 10x spike on a single recurring vendor unless I look at the ledger. The cap is a blunt instrument — a line-item spike within the cap goes unnoticed until the quarterly close with Michael Burry.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control)
