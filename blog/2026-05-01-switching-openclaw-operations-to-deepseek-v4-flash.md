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
---

We just retired GPT-5.4 high reasoning from our [OpenClaw operations team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) and moved every operational role to **DeepSeek-V4-Flash** in max-reasoning mode. The switch landed last week. The honest verdict: we are happier with both speed and how the agents act.

This post explains what changed, what the DeepSeek-V4 release brought to the table, and what running operations on it actually feels like.

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

GPT-5.4 high reasoning was our default for OpenClaw operations roles since February. It is a strong model. SupportEngineer drafts were good. DevOpsEngineer incident triage was good. The orchestrator's role decomposition was good.

The problems were not capability problems. They were operational problems:

- **Latency**: high reasoning mode introduced multi-second waits on every step. For a SupportEngineer agent triaging a Slack thread, the cumulative delay across read-thread → fetch-customer → draft-reply → post added up to ~30 seconds before the customer saw any response.
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

1. **The agent "personality" shifted in a way users prefer.** Customers replying to SupportEngineer drafts comment that responses feel more direct. GPT-5.4 high reasoning had a hedging quality. Flash is more declarative. We did not tune for this — it fell out of the model.

2. **Cost dropped sharply.** Active parameter count + sparse attention means the per-token economics are very different from GPT-5.4 high reasoning. Operations is now a small line item where it used to be a noticeable one.

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

## What Did Not Change

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

Release reference: [api-docs.deepseek.com/news/news260424](https://api-docs.deepseek.com/news/news260424)

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

---

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup with 1.0 Human Employees](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — the series root
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — Gilfoyle Bertram, Monica Hall, Jared Dunn, Einstein, Harvey Specter, and Michael Burry defined
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- **You are here** — Switching OpenClaw Operations to DeepSeek-V4-Flash
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)

*Previous in series: [Switching From OpenHands to VibeBrowser Agentic Team →](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)*
