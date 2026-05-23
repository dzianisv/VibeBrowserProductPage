---
title: "Switching Our OpenClaw Operations Team From GPT-5.4 to DeepSeek-V4-Flash"
description: "Why Vibe Technologies moved its OpenClaw operations agents off GPT-5.4 high reasoning and onto DeepSeek-V4-Flash with max reasoning — and what the speed and agent behavior delta looks like under real incident load."
date: "2026-05-01"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - deepseek
  - openclaw
  - ai-agents
  - operations
  - model-routing
  - vibe-technologies
  - agentic-coding
published: true
---

Vibe Technologies runs its customer operations through a team of named AI agents. OpenClaw is the bot platform they run on. We just retired GPT-5.4 high reasoning from our [OpenClaw operations team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) and moved every operational role to **DeepSeek-V4-Flash** in max-reasoning mode. The switch landed last week. The honest verdict: we are happier with both speed and how the agents act. Reasoning-heavy roles — code review, architecture decisions — stayed on Claude Opus. The model routing config is in the "How To Try It Yourself" section below.

## The Problem

GPT-5.4 high reasoning was capable, but it was wrong for routine operations tasks. Email triage, Sentry alert routing, and Slack status updates do not require reasoning-level quality — they require speed and low cost. High reasoning mode introduced multi-second waits on every step: the cumulative delay across read-thread → fetch-customer → draft-reply → post added up to ~30 seconds before a customer saw any response. Latency was noticeable; we didn't measure it systematically against a baseline, but operators felt it. Per-token cost for high reasoning was also meaningful at our volume — operations was a visible line item on the monthly bill for work that didn't need it.

## DeepSeek-V4: What Shipped

DeepSeek released V4 on April 24, 2026 ([release notes](https://api-docs.deepseek.com/news/news260424)). Two variants:

- **DeepSeek-V4-Pro** — 1.6T total / 49B active parameters. Positioned as rivaling top closed-source models.
- **DeepSeek-V4-Flash** — 284B total / 13B active parameters. Marketed as fast, efficient, economical — with reasoning that "closely approaches V4-Pro."

Both ship with:

- **1M context window** as default across all official services
- **Dual modes**: Thinking and Non-Thinking, switchable per request
- **Novel attention**: token-wise compression plus DSA (DeepSeek Sparse Attention)
- **Open-source SOTA in agentic coding benchmarks** (per their announcement)
- **World knowledge leading all current open models**, trailing only Gemini-3.1-Pro
- API compatibility with **both OpenAI and Anthropic** formats

The OpenAI + Anthropic dual format matters more than it sounds for an OpenClaw setup — we did not have to rewrite tool-calling glue.

## Why We Were on GPT-5.4 High Reasoning

GPT-5.4 high reasoning was our default for OpenClaw operations roles since February. It is a strong model. Jared Dunn's support drafts were good. Gilfoyle Bertram's incident triage was good. The orchestrator's role decomposition was good.

The problems were not capability problems. They were operational problems:

- **Latency**: high reasoning mode introduced multi-second waits on every step. For Jared Dunn triaging a Slack thread, the cumulative delay across read-thread → fetch-customer → draft-reply → post added up to ~30 seconds before the customer saw any response.
- **Step verbosity**: GPT-5.4 in high reasoning tended to over-plan. A simple "restart the pod that is OOM-killing" decision came with three paragraphs of reasoning the operator never reads.
- **Cost at volume**: high reasoning tokens are not free. Customer triage at our volume was burning through enough tokens that we noticed it on the monthly bill.

We tolerated all three because the quality was right. Nothing else open-source matched the agentic behavior reliably.

## Why DeepSeek-V4-Flash Changed the Math

We tested both Pro and Flash. Flash won for operations roles. Here is what the V4 release actually buys you in this setting:

**Speed.** The 13B active parameter footprint means inference is fast — including in Thinking mode. The cumulative latency across a multi-step agent action dropped noticeably. SupportEngineer's first-token-to-Slack-reply window shrank to single-digit seconds in our setup.

**Reasoning depth without over-explaining.** Flash in max-reasoning mode reasons through tool calls without burying the action in commentary. DevOpsEngineer's incident triage messages are tighter — same correctness, less noise to skim.

**Agentic coding behavior.** The release notes call out open-source SOTA in agentic coding benchmarks. We saw this in practice. When SoftwareEngineer reviews a PR or DevOpsEngineer drafts a fix, the tool-call sequences are cleaner. Fewer aborted multi-step plans. Fewer cases where the agent loops on a failing command.

**1M context as default.** SupportEngineer can hold an entire customer history + recent Slack threads + relevant runbooks in one context without us paging. This removed a class of context-assembly bugs.

**Dual mode switching per request.** We route reasoning-heavy steps (incident root-cause analysis, PR review) to Thinking mode and routine steps (Slack acknowledgment, status updates) to Non-Thinking. Latency budget spent where it earns the most.

## What Surprised Us

Two things we did not expect:

1. **The agent "personality" shifted in a way users prefer.** Customers replying to Jared Dunn's drafts comment that responses feel more direct. GPT-5.4 high reasoning had a hedging quality. Flash is more declarative. We did not tune for this — it fell out of the model.

2. **Cost dropped sharply.** Active parameter count + sparse attention means the per-token economics are very different from GPT-5.4 high reasoning. Operations is now a small line item where it used to be a noticeable one.

## Evidence It Works

Cost dropped — we estimate 70-80% reduction for operations tasks based on per-token pricing differences between GPT-5.4 high reasoning and DeepSeek-V4-Flash, but we haven't pulled actual invoice deltas yet. Speed improved noticeably for triage tasks: SupportEngineer's first-token-to-Slack-reply window shrank to single-digit seconds. We haven't run a controlled latency benchmark. The qualitative signal is that operators stopped commenting on agent slowness, which was a frequent complaint before the switch.

## What We Kept on Other Models — and How the Per-Role Split Matured

This is not a full migration, and the picture is more nuanced than "everyone moved to DeepSeek." We ran a couple of weeks with every operations role on DeepSeek-V4-Flash to learn the model, and then production settled into a per-role split that takes the best part of each model. Reading this as a contradiction with the "we moved operations to Flash" framing would miss the point — Flash earned its place in the routing matrix, and the per-role tuning is what comes after.

Where the operations team actually landed:

- **Jared Dunn (SupportEngineer)** — **GPT-5.4-mini**. Customer triage is latency-sensitive and high-volume. Mini is fast and cheap, and the support-engineer prompts/runbooks do not need deep reasoning to be correct. This is the role where shaving a second off first-response actually matters to customers.
- **Monica Hall (GrowthManager)** — **GPT-5.4** (full, not mini). Growth work is drafting, planning, channel reasoning, and SEO writing. The depth of GPT-5.4 over mini is worth the latency cost here — Monica Hall's outputs go on the website or go to other people, so quality dominates speed.
- **Gilfoyle Bertram (SoftwareEngineer)** — **Claude Opus**. Code reasoning, PR review, reflection passes. The most expensive model on the most leveraged role. Opus is also what supervises the OpenCode session on the dev workstation (see [the Jan 15 post](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) for that delegation setup) — Opus decomposes, OpenCode executes.
- **DeepSeek-V4-Flash** — kept in the routing matrix as a **fallback** and for specific **reasoning-heavy ad-hoc steps** where its Thinking mode is competitive with the GPT-class models at a fraction of the cost. When an operations agent needs an extended-reasoning pass on incident root-cause or pulling structure out of a long Sentry trace, Flash in max-reasoning mode is what gets routed in.
- **Engineering orchestrator (OpenCode)** — still Claude Opus class for spec decomposition; cross-model review unchanged.
- **Coding subagents** — mix of DeepSeek-V4-Pro (heavier tasks) and Claude Sonnet (quick edits).
- **Frontend-specific tasks** — Gemini stays in the rotation for UI work where it has a real edge.

The maturation, in one sentence: starting all of operations on Flash gave us a clean baseline, and from that baseline we routed each role to the model that fits its actual workload — speed for Jared Dunn, depth for Monica Hall, code reasoning for Gilfoyle Bertram, Flash as the cost-efficient fallback that still earns its keep on reasoning-heavy ad-hoc steps.

Model-agnostic routing was always the point. The DeepSeek-V4 release expanded the open-source side of that routing matrix meaningfully — and the per-role assignment above is what "model-agnostic" looks like in production once a new model has settled in.

> **Update — May 2026:** The per-role model split described above was a snapshot from early May. By late May, after evaluating multi-model routing complexity against the stability gains, we unified all ten agents to a single primary model: `litellm/gpt-5.3-codex` with `litellm/gpt-5.1` → `litellm/gpt-4.1` fallbacks via LiteLLM proxy. See [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) for the current config.

## What We Kept

Same operating principles:

- **Minimum proprietary technology** — DeepSeek's open weights and standard API formats fit the principle better than the closed alternative.
- **Humans architect, agents execute** — I still review escalations.
- **OpenClaw remains the platform** — this is a model swap underneath, not a platform swap. The [previous post on moving to OpenClaw](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) covers that move.

## How To Try It Yourself

If you run an agent ops setup and have been on GPT-5.4 high reasoning:

1. Wire DeepSeek-V4-Flash via either the OpenAI-compatible or Anthropic-compatible endpoint — whichever your runtime already speaks
2. Enable Thinking mode for reasoning-heavy roles, Non-Thinking for routine
3. Run a week of real load in parallel before cutting over
4. Watch first-response latency and per-action token counts — that is where the delta shows up first

The model override in OpenClaw config looks like this:

```json
// openclaw config: model routing override
{
  "operations_model": "deepseek/deepseek-chat",
  "reasoning_model": "anthropic/claude-opus-4"
}
```

Release reference: [api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424)

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

## What Does Not Work Yet

- **Long Sentry traces hit context limits in practice.** The 1M context window is the spec, but structured Sentry payloads with full stack traces, breadcrumbs, and session data across multiple events can still exceed what fits cleanly in a single routed call once the surrounding agent context is included. We route Flash for ad-hoc reasoning on these, but we occasionally have to trim or paginate the trace manually.
- **JSON formatting consistency is not Claude-level.** DeepSeek-V4-Flash occasionally produces inconsistent JSON in structured outputs — extra whitespace, trailing commas, or field order that differs from the schema. Our parsers handle it, but it adds defensive code that wasn't needed with Claude.
- **Multi-step tool-call reliability is not at parity with Claude for complex tasks.** For straightforward sequences (fetch → filter → post) Flash is solid. For longer chains with conditional branching, we see more aborted plans and retry loops than we saw with Claude Opus on the same prompts. This is why Gilfoyle Bertram stayed on Opus.

---

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup with 1.0 Human Employees](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — the series root
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — Gilfoyle Bertram, Monica Hall, Jared Dunn, Harvey Specter, and Michael Burry defined
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- **[Switching OpenClaw Operations to DeepSeek-V4-Flash →](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)**
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

*Previous in series: [Switching From OpenHands to VibeBrowser Agentic Team →](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)*
