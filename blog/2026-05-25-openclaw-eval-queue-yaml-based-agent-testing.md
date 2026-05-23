---
title: "Two Layers of Agent Evaluation at Vibe Technologies: Deployment Checks and Team Trace Review"
description: "How Vibe Technologies evaluates its ten AI agents at two levels: a YAML-based deployment verification suite that runs per-PR, and a Langfuse-backed team evaluation loop where Claw reviews cross-agent traces, checks for stuck sessions, and pushes agents to complete their tasks."
date: "2026-05-25"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - openclaw
  - ai-agents
  - testing
  - eval
  - langfuse
  - vibe-technologies
published: true
---

Evaluating a ten-agent AI team requires two distinct approaches. The first is deployment verification — did OpenClaw start correctly, can agents use their tools, does the model routing work? The second is team evaluation — did the multi-agent task actually complete, or is a session stuck somewhere in the handoff chain?

This post covers both layers and how they differ.

## Layer 1: Deployment Verification (YAML Eval Queue)

The YAML-based eval suite answers one question: **is this OpenClaw deployment working?** It runs on every PR, exercises single-session agent behavior, and catches regressions in model routing, tool use, and runtime provisioning. It does not evaluate cross-agent collaboration — that's Layer 2.

### Suite Structure

Test cases live under `scripts/eval-cases/` in three groups:

```
scripts/eval-cases/
├── suites/
│   ├── eval.yaml          # Per-PR Telegram/Webapp conversation evals
│   └── infra.yaml         # Provisioner/runtime infrastructure checks
├── shared/
│   └── eval.yaml          # Channel-agnostic cases reusable by any runner
└── extended/
    └── eval.yaml          # Nightly/manual extended suite (E2E_EXTENDED=1)
```

### Two Scoring Mechanisms

Most cases use both:

1. **Hard checks** — programmatic assertions (regex, substring match). Binary pass/fail, zero token cost.
2. **G-Eval** — LLM-as-judge evaluation with configurable `criteria` and `expectedOutput`. Produces a 0–1 score; each case sets its own `threshold`.

The hard check runs first. A hard check failure short-circuits G-Eval — no point spending judge tokens when the output is obviously wrong.

### Per-PR Telegram Suite

The conversation suite (`telegram-conversation-evals`) runs sequentially — cases share one Telegram chat, so ordering matters. Quick cases first, slow ones last:

| Case | What it checks | Timeout |
|---|---|---|
| `telegram-basic-answer` | GPT-1 release year from memory | 12 min |
| `telegram-browser-wikipedia-answer` | Browser → Wikipedia → cite source | 15 min |
| `telegram-browser-gpt-screenshot` | Browser → screenshot photo artifact | 18 min |
| `telegram-voice-roundtrip` | Voice message → STT → correct answer | 5 min |
| `gmail-inbox-summary` | gws CLI → Gmail inbox → actionable summary | 15 min |

All skip if no Telegram session is available (`skipIfNoTelegramSession: true`). Gmail inbox summary also requires gws CLI to be OAuth-authenticated (`tags: requires-gws-auth`).

### Reliability Regression Guards

Two production failures in May 2026 added explicit regression guards to the shared suite.

**2026-05-19: Empty-envelope failure.** The agent started surfacing "Unknown error (no error details in response)" when the upstream model stream closed without a proper closing envelope. OpenClaw's failover classifier only retries retryable errors (5xx, network timeout); this failure mode escaped it.

Guard — runs the trivial prompt 5 times and forbids the pattern:

```yaml
- id: reliability-no-unknown-error
  prompt: |
    Reply with exactly: TASK_OK
  repeat: 5
  expectedSubstrings:
    - "TASK_OK"
  forbiddenTextPatterns:
    - "Unknown error"
    - "no error details in response"
```

**2026-05-19: Model allowlist regression.** Agents started rejecting valid model switch requests with `Model "litellm/X" is not allowed`. Root cause: the `agents.defaults.models` allowlist lost its wildcard after a config update.

Three guards, one per model in the fallback chain (`gpt-5.1`, `gpt-4.1`, `gpt-5.4`):

```yaml
- id: reliability-model-switch-gpt-5.1
  prompt: |
    Switch your primary model to litellm/gpt-5.1, then reply with exactly: SWITCH_OK
  expectedSubstrings:
    - "SWITCH_OK"
  forbiddenTextPatterns:
    - "is not allowed"
```

### Extended Suite (Nightly, `E2E_EXTENDED=1`)

The extended suite runs against a real tenant with live credentials. These cases exercise the actual production failure surfaces:

| Case | Exercises | Timeout |
|---|---|---|
| `extended-recruiter-reply-draft` | Skill loading, tone instructions | 4 min |
| `extended-gmail-unread-count` | gws-gmail skill + live OAuth Gmail | 5 min |
| `extended-browser-wikipedia-gpt3` | Browser CDP, DOM extraction | 6 min |
| `extended-hn-research-draft-email` | Multi-tool chain: browser → gws-gmail draft | 7 min |
| `extended-subagent-status-check` | `subagents` tool (action: list), tool→text turn | 4 min |
| `extended-tweet-morningstar-analysis` | Browser CDP on auth-walled site, cross-source synthesis | 7 min |
| `extended-skill-litellm-model-list` | Skill path resolution, live LiteLLM `/v1/models` | 4 min |

`extended-subagent-status-check` was added after a 2026-05-20 production failure where asking Gilfoyle about a stuck subagent caused a hang. `extended-tweet-morningstar-analysis` uses a G-Eval rubric that explicitly fails responses with speculative hedge language ("would likely", "I think Morningstar would") — indicating the agent guessed from training data rather than actually browsing the live page.

---

## Layer 2: Team Evaluation (Claw + Langfuse Trace Review)

Layer 1 verifies individual agent deployments. Layer 2 evaluates whether the **team** is actually completing work — across multiple sessions, multiple agents, real handoff chains.

### All Agent Sessions Feed Langfuse

Every agent in the OpenClaw team emits traces to a shared Langfuse instance via the [openclaw-langfuse plugin](https://langfuse.com/integrations/other/openclaw). Every turn — prompt, tool calls, response, token counts, latency — is recorded as an observation on a trace.

When Jared (SupportEngineer) escalates to Gilfoyle (SoftwareEngineer) via `@SoftwareEngineer`, the handoff carries a trace ID. Gilfoyle's session opens with that trace ID set as a parent, so Langfuse links both sessions under the same trace tree. The full task lifecycle — customer email → Jared triage → Gilfoyle PR → Jared customer reply — becomes one navigable trace in Langfuse, even though it spans four separate OpenClaw agent sessions.

Langfuse's [session grouping](https://langfuse.com/docs/observability/features/sessions) and [distributed trace IDs](https://langfuse.com/docs/observability/features/trace-ids-and-distributed-tracing) make this possible without any custom linking logic in agent code.

### Claw: The Hourly Team Reviewer

Claw is the default agent — the fallback handler for all unbound traffic. It also runs on an hourly schedule as the team's health monitor.

On each cycle, Claw queries the Langfuse API for recent agent sessions. It looks for:

- **Stuck sessions**: traces with recent tool calls but no concluding response; sessions where the last turn was an @mention handoff but the target agent has no subsequent trace
- **Incomplete tasks**: Linear issues that are In Progress but have no associated PR merge event in the trace
- **Escalation loops**: a handoff chain that has bounced between agents more than twice without resolution

When Claw finds a stuck session, it sends an @mention to the blocked agent's Slack channel — the same routing mechanism every other agent uses — with the Langfuse trace URL and a prompt to continue or escalate.

### LLM-as-Judge on Production Traces

Beyond stuck-session detection, Claw uses Langfuse's eval API to run LLM-as-judge scoring on completed task traces. The judge evaluates:

- Did the agent follow its AGENTS.md handoff rules?
- Was the customer communication tone appropriate?
- Did Gilfoyle's PR description include a `Fixes <LINEAR-ID>` magic word?
- Did the response contain fabricated information (hallucination detection)?

Scores are written back to Langfuse as evaluation objects attached to the relevant trace span. Low-scoring traces surface in Langfuse's eval dashboard for human review.

### Prompt and Persona Fine-Tuning

When a class of failures clusters — for example, Jared repeatedly failing to include the Chatwoot conversation sync step — Claw can request that the affected agent update its own `AGENTS.md`. The request arrives as a Slack message: a description of the pattern, the Langfuse trace URLs that illustrate it, and a proposed diff to the persona file.

The agent (or the human, for changes above a risk threshold) applies the update. The next eval cycle validates that the pattern no longer appears in new traces.

This closes a feedback loop that the YAML deployment suite cannot close: the deployment suite checks whether agents can use their tools, but it cannot judge whether Grace actually followed through on a customer handoff or whether Gilfoyle's PR descriptions are consistently useful.

### What Each Layer Catches

| | Layer 1: Deployment Verification | Layer 2: Team Trace Review |
|---|---|---|
| **Trigger** | Every PR, nightly | Hourly schedule |
| **Scope** | Single agent, single session | Cross-agent, multi-session |
| **Data source** | Synthetic test prompts | Real production traces |
| **Catches** | Model routing, tool use, runtime config | Stuck handoffs, task incompletions, persona drift |
| **Output** | Pass/fail CI gate | Slack push, Langfuse eval scores, AGENTS.md proposals |

The two layers are complementary. A deployment that passes Layer 1 is ready to handle traffic. Layer 2 is what tells you whether it's actually handling traffic well.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — series root
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — how Gilfoyle ships PRs
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — how Grace's handoffs land in Linear
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster
- **You are here** — Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control)

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

*Previous in series: [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework →](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework)*

*Next in series: [OpenCode in Server Mode: Tailscale Access and AI Session Supervision →](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)*
