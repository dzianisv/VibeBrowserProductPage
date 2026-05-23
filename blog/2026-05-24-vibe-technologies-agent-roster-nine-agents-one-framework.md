---
title: "Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework"
description: "A complete roster of the ten AI agents running on OpenClaw at Vibe Technologies — their names, roles, primary model, and how they divide responsibility for customer support, engineering, product, growth, legal, finance, and operations."
date: "2026-05-24"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - openclaw
  - ai-agents
  - vibe-technologies
  - agent-roster
  - team-structure
published: true
---

Vibe Technologies has ten AI agents and one human. The agents do not share a brain or a model instance — each one runs as an independent OpenClaw process with its own workspace, its own channel bindings, and its own `AGENTS.md` persona file. The human (me) architects the system and handles things the agents explicitly cannot: legal sign-offs, Stripe disputes above $100, irreversible infrastructure changes.

This post documents the full roster: who each agent is, what they own, and what model they run. If you want to understand how they hand off work to each other, read [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix). This post is the reference document that describes the players, not the rules.

## The Framework: OpenClaw

Every agent in this list runs on [OpenClaw](https://openclaw.vibebrowser.app). Each is declared in `openclaw.json` under `agents.list` with an ID and an isolated workspace path:

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

The `defaults.model` block applies to every agent unless overridden. Primary model is `litellm/gpt-5.3-codex`. If the primary fails, OpenClaw tries `litellm/gpt-5.1`, then `litellm/gpt-4.1`. All three are served through our LiteLLM proxy, so routing, retry, and fallback logic is centralized — agents do not implement their own retry. Config hot-reloads; no process restart is needed after adding or changing an agent.

## The Ten Agents

### Claw 🦀 (`claw`)

**Persona**: Claw  
**Default binding**: All unbound channels — this agent is the fallback handler  
**Role**: General personal assistant — coding, research, writing, project coordination, anything that does not fit a specialist

Claw is the catch-all. Every message that does not match a more specific binding lands here. It is also the agent a user talks to before they have decided which specialist to engage. Claw knows the full agent catalog and can forward a question to the right specialist by asking the user, or by issuing an `@mention` to trigger the handoff routing directly.

The `"default": true` flag in `openclaw.json` is what makes Claw the fallback — it is not wired to a specific channel account, so any channel traffic with no more-specific match routes to it.

---

### Grace 🎧 (`support-engineer`)

**Persona**: Jared Dunn (internal) / Grace (public-facing)  
**Channel bindings**: Slack `support-channel`, Gmail `support@vibebrowser.app`  
**Role**: Customer triage, Sentry error monitoring, LLM observability via Langfuse, Linear issue creation

Grace owns the support inbox. New email arrives via the OpenClaw Gmail PubSub integration — Google Cloud Pub/Sub pushes new messages into the agent's event queue rather than waiting for a polling cycle. Grace reads, classifies (bug / feature request / account issue / billing / answer inline), creates a structured Linear issue via `openclaw-linearj`, posts the issue link back into the reply, and syncs the content to Chatwoot as a private note when the originating channel was a Chatwoot conversation.

Sentry is checked before escalating any code bug — Grace finds the issue, closes it as resolved, and hands the fix task to `@SoftwareEngineer` with the Sentry short ID and repo. Langfuse traces are reviewed when customers report quality problems with the AI co-pilot.

Grace does not write code, does not run `kubectl`, and does not modify infrastructure. Write access is scoped to Gmail replies, Linear support-team issues, and Chatwoot private notes. Everything else is read-only or escalated.

For the full inbox pipeline — four sources of tickets, Linear templates, the reverse path from PR merge to customer notification — see [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot).

---

### Gilfoyle 💻 (`software-engineer`)

**Persona**: Gilfoyle Bertram  
**Channel bindings**: Slack `software-channel`, GitHub (repository events)  
**Role**: Feature development, bug fixes, CI/CD, infrastructure operations, incident response

Gilfoyle handles all code changes and infrastructure operations. He receives handoffs from Grace via `@SoftwareEngineer` Slack mentions — typically a Linear issue URL, a Sentry short ID, and a clear fix request. He opens PRs under his own GitHub bot identity, writes `Fixes <LINEAR-ID>` in the PR description to auto-close the Linear issue on merge, and pings Grace in `#support-escalations` when the fix ships.

Gilfoyle is also wired into GitHub repository events directly — PR comments and issue assignments can trigger his session without Grace as an intermediary. For complex or long-running tasks, he spins up OpenCode coding subagents rather than doing all the work in a single session.

For the engineering workflow — the OpenCode + Claude Code toolchain that Gilfoyle uses to ship PRs — see [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode).

---

### Jordan 🗺️ (`product-manager`)

**Persona**: Jordan  
**Channel bindings**: Slack `product-channel`  
**Role**: Backlog management, PRDs, user stories, roadmap communication

Jordan owns the product backlog. Escalations from Grace about customer feature requests land here as `@ProductManager` mentions. Jordan reads the Linear issue, assesses against the roadmap, and either adds the request to the active sprint backlog or labels it `deferred` with a reason. Customer-facing roadmap questions that Grace cannot answer from current documentation get routed to Jordan for a priority call.

Jordan's output is usually a Linear comment, a Linear status update, or a PRD block added to the existing issue. She does not open PRs or modify code.

---

### Sam 📣 (`marketing-manager`)

**Persona**: Sam  
**Channel bindings**: Slack `marketing-channel`  
**Role**: Public announcements, social media, documentation, release communications

Sam owns outbound communication. When an incident resolves, Grace tags `@MarketingManager` with the resolution summary and the list of affected customers. Sam drafts the status page update, the blog announcement if warranted, and the changelog entry. For product releases, Sam produces the external-facing summary based on Gilfoyle's PR descriptions.

Sam does not publish without a human review step for anything that touches security disclosures or refunds.

---

### Monica Hall 📈 (`growth-manager`)

**Persona**: Monica Hall  
**Channel bindings**: Slack `growth-channel`, Telegram (growth account)  
**Role**: Growth strategy, investor relations, fundraising preparation, cross-functional alignment

Monica owns growth metrics and investor-facing communication. She tracks DAU/MAU stickiness, reviews GA4 acquisition data, and surfaces insights that feed into product and marketing decisions. For fundraising, she prepares data rooms, drafts investor updates, and validates that financial projections are consistent with Stripe and usage data.

Monica reads from Stripe (read-only), Google Analytics, and Notion. She does not modify billing records or write code.

---

### Investor 📊 (`investor`)

**Persona**: Investor (Michael Burry persona in some configurations)  
**Channel bindings**: Telegram (investor account)  
**Role**: Portfolio strategy, position sizing, thesis validation, financial modeling

The Investor agent handles personal financial analysis — not Vibe Technologies' finances, but the founder's personal investment portfolio. It analyzes tickers, reviews Morningstar fundamental data via browser CDP, models scenarios, and produces educational guidance with explicit risk framing.

All guidance is educational-only; the agent never executes trades and explicitly disclaims that nothing it says is financial advice.

---

### TaxAdvisor 🐱👔 (`taxadvisor`)

**Persona**: Louis Litt  
**Channel bindings**: Telegram (taxadvisor account)  
**Role**: US tax strategy, filing, audit readiness, QEF elections, FBAR

The TaxAdvisor agent handles US-specific tax questions — PFIC analysis, QEF elections, FBAR thresholds, estimated payments, 1040 reconciliation from source forms. It works from skill files that contain IRS publication references and reconciliation checklists rather than training-data tax knowledge.

---

### Harvey Specter ⚖️ (`immigration-lawyer`)

**Persona**: Harvey Specter  
**Channel bindings**: Telegram (immigration-lawyer account)  
**Role**: Legal research, immigration and contract strategy, document drafting, risk assessment

Harvey handles legal work across immigration filings and contract matters. The workflow is structured: research statutes and agency guidance first, then produce a legal answer in Facts → Issue → Rule → Risk → Options → Recommendation format with explicit probability estimates on each path.

Tools include browser (isolated `immigration-lawyer` Chrome profile) for official government sites and court databases, the GitHub CLI for versioning legal drafts, and a knowledge base of two files maintained in the workspace — `legal-official-rules.md` and `legal-research-log.md` — updated after every research task.

Harvey never fabricates citations, form numbers, or filing deadlines, and always flags when the situation requires a licensed attorney in the relevant jurisdiction. For matters that overlap with tax or investment structure, Harvey escalates to TaxAdvisor or Investor or surfaces to the human directly.

---

### CTO (`cto`)

**Persona**: Richard Hendricks  
**Channel bindings**: Slack `cto-channel`  
**Role**: Technical strategy, architecture decisions, vendor evaluations, engineering team alignment

The CTO agent handles high-level technical decisions that span multiple systems — infrastructure migration strategy, model provider vendor evaluation, API contract decisions. Escalations reach CTO from Gilfoyle when a decision requires more authority than a single-engineer call.

---

## Model Configuration

All ten agents share the same primary model: `litellm/gpt-5.3-codex`. Fallback sequence: `litellm/gpt-5.1` → `litellm/gpt-4.1`.

The LiteLLM proxy is the common gateway to all three model endpoints. OpenClaw's failover classifier distinguishes retryable errors (network timeout, 5xx) from non-retryable ones (4xx auth, content policy). Failover triggers on retryable errors only; a bad-request error does not advance the fallback chain.

Per-agent model overrides are possible in `openclaw.json` but are not used in the current configuration. All ten agents run identical model config.

For the history of model selection — why we switched from Claude to DeepSeek to the current GPT-5.3-codex lineup — see [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash).

## Channel Binding Summary

| Agent ID | Display Name | Primary Channel |
|---|---|---|
| `claw` | Claw 🦀 | Default fallback — all unbound traffic |
| `support-engineer` | Grace 🎧 | Slack `support-channel`, Gmail |
| `software-engineer` | Gilfoyle 💻 | Slack `software-channel`, GitHub |
| `product-manager` | Jordan 🗺️ | Slack `product-channel` |
| `marketing-manager` | Sam 📣 | Slack `marketing-channel` |
| `growth-manager` | Monica Hall 📈 | Slack `growth-channel`, Telegram |
| `investor` | Investor 📊 | Telegram |
| `taxadvisor` | TaxAdvisor 🐱👔 | Telegram |
| `immigration-lawyer` | Harvey Specter ⚖️ | Telegram |
| `cto` | CTO | Slack `cto-channel` |

Check live bindings at any time:

```bash
openclaw agents list --bindings
```

## Adding or Changing an Agent

Add a new entry to `agents.list` in `openclaw.json`, create the workspace directory, drop an `AGENTS.md` persona file in the workspace, then bind it to a channel:

```bash
openclaw agents bind --agent <id> --bind slack:<channel-name>
```

Config hot-reloads. No restart needed. The new agent starts handling traffic on that binding immediately.

For a walkthrough of the full skill/persona configuration, see [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix).

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — series root, company principles
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — how Gilfoyle ships PRs
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the predecessor stack
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — why we moved to OpenClaw
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) — one of the inbound channels Grace monitors
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) — another inbound channel
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — model routing history
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping agent costs flat
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — how Grace's handoffs land in Linear
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- **You are here** — Agent Roster: 10 Agents, One Framework
- [OpenClaw Eval Queue: YAML-Based Agent Testing](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing) — how we test all ten agents before every merge
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control)

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

*Previous in series: [Agent Communication: Slack Apps, OpenClaw Channels, AGENTS.md Handoff Matrix →](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix)*

*Next in series: [OpenClaw Eval Queue: YAML-Based Agent Testing →](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)*
