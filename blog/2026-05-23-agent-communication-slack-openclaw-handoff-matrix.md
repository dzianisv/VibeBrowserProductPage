---
title: "How AI Agents Talk to Each Other at Vibe Technologies — Slack Apps, OpenClaw Channels, and the AGENTS.md Handoff Matrix"
description: "Every agent at Vibe Technologies has its own Slack app and channel. When one agent @mentions another, the OpenClaw gateway routes the message to the target agent's inbox. AGENTS.md is the handoff contract that tells each agent when to pass work and to whom."
date: "2026-05-23"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - openclaw
  - ai-agents
  - support-engineer
  - software-engineer
  - vibe-technologies
  - operations
---

Vibe Technologies has one human and six AI agents. The human (me) rarely coordinates handoffs directly. Agents coordinate each other — Jared Dunn (SupportEngineer) escalates to Gilfoyle Bertram (SoftwareEngineer), Gilfoyle escalates to Einstein (ReleaseEngineer), and so on. This post explains the exact mechanism: one Slack app per agent, one OpenClaw channel per agent, and a shared handoff contract in `AGENTS.md` that every agent reads at session start.

## The Problem

Early versions of the agent team had a single shared Slack bot. All agents responded in the same channel under the same identity. There was no way to address one agent without the others seeing the message. There was no way to know which agent had produced which response. Handoffs meant me copy-pasting output from one session into another.

The system could not be used autonomously — every task required me to manually route context.

## What We Built

### One Slack App Per Agent

Each agent in `agents/agents.yaml` has its own Slack credentials:

```yaml
agents:
  support_engineer:
    framework: openhands
    slack_handle: SupportEngineer
    credentials:
      slack:
        bot_token: "${SLACK_BOT_TOKEN_SUPPORT_ENGINEER}"
        assistant_token: "${SLACK_ASSISTANT_TOKEN_SUPPORT_ENGINEER}"
        signing_secret: "${SLACK_SIGNING_SECRET_SUPPORT_ENGINEER}"
  software_engineer:
    framework: openhands
    slack_handle: SoftwareEngineer
    credentials:
      slack:
        bot_token: "${SLACK_BOT_TOKEN_SOFTWARE_ENGINEER}"
        assistant_token: "${SLACK_ASSISTANT_TOKEN_SOFTWARE_ENGINEER}"
        signing_secret: "${SLACK_SIGNING_SECRET_SOFTWARE_ENGINEER}"
  release_engineer:
    framework: openhands
    slack_handle: ReleaseEngineer
    credentials:
      slack:
        bot_token: "${SLACK_BOT_TOKEN_RELEASE_ENGINEER}"
        ...
  product_manager:
    framework: openclaw
    openclaw_agent_id: product-manager
    slack_handle: ProductManager
    credentials:
      slack:
        bot_token: "${SLACK_BOT_TOKEN_PRODUCT_MANAGER}"
        ...
  marketing_manager:
    framework: openhands
    slack_handle: MarketingManager
    credentials:
      slack:
        bot_token: "${SLACK_BOT_TOKEN_MARKETING_MANAGER}"
        ...
```

Six agents. Six Slack apps. Each app has its own bot token, signing secret, and webhook endpoint. In Slack, each agent appears as a distinct bot user with its own display name and avatar.

Each agent also has a dedicated Slack channel (`#support-engineer`, `#software-engineer`, etc.). Messages addressed to an agent land in that agent's channel and trigger only that agent's webhook.

### The OpenClaw Gateway Routes @mentions

When Jared Dunn writes a response that includes `@SoftwareEngineer`, the `vibeteam-gateway` (FastAPI) intercepts the outgoing message before it posts to Slack, parses the @mention, and delivers the message to Gilfoyle Bertram's inbox:

```python
# vibeteam/gateway/routes/slack.py

def _parse_handoff_roles(response: str, source_role: str) -> list[str]:
    """Parse handoff roles from @mentions or bare role names in handoff phrasing."""
    explicit = message_router.parse_role_mentions(response)
    if explicit:
        return explicit

    # Fallback: detect "SoftwareEngineer please ..." without an explicit @
    keyword_re = re.compile(
        r"(?i)\b(handoff|hand\s+off|assign|route|ping|please|need|can\s+you)\b"
    )
    for line in response.splitlines():
        if keyword_re.search(line):
            for match in re.finditer(rf"(?i)\b({alias_pattern})\b", line):
                role = aliases.get(match.group(1).lower())
                if role and role != source_role:
                    roles.append(role)
    return roles
```

The gateway does not require a formal `@mention` with a Slack user ID. Bare role names in handoff phrasing (`"SoftwareEngineer, please investigate"`) are detected by the keyword fallback. The target agent receives the full context of the originating thread.

```
Jared Dunn (SupportEngineer)
  writes: "@SoftwareEngineer — login flow returns 500 for subdomain X.
           Sentry issue VIBE-4821. Please investigate."
         ↓
vibeteam-gateway parses @SoftwareEngineer
         ↓
Delivers to Gilfoyle Bertram's channel with thread context
         ↓
Gilfoyle Bertram opens a PR, links "Fixes VIBE-4821"
         ↓
Gateway detects PR event, notifies Jared
         ↓
Jared closes the loop with the customer
```

### AGENTS.md Is the Handoff Contract

Every agent reads `AGENTS.md` at session start. The file contains a handoff matrix — a table of situations and who owns them:

```markdown
| Situation | Handoff To | Example |
|-----------|------------|---------|
| Infrastructure outage (5xx errors) | @ReleaseEngineer | "API returning 503. @ReleaseEngineer check service health." |
| Code bug or feature request | @SoftwareEngineer | "Found login bug. @SoftwareEngineer investigate issue #345." |
| Product prioritization | @ProductManager | "Customer asking about roadmap. @ProductManager advise on timeline." |
| Public announcement needed | @MarketingManager | "Outage resolved. @MarketingManager post status update." |
```

The matrix is plain text. It is not code. No config file to parse, no API to call — the agent reads the rules, applies them, and names the target in its response. The gateway does the actual routing.

This is intentional. The handoff contract lives where the agent can read and update it. If a new agent role is added or responsibilities shift, the matrix changes in one place and every agent picks up the new rules on next session start.

### GitHub Identity Per Agent

Each agent also has its own GitHub App credentials in `agents.yaml`. PRs opened by Gilfoyle Bertram appear under his bot identity. Issues created by Jared Dunn show his bot as the author. This matters for audit trails and for the Linear integration — the issue creator is traceable back to the agent that triaged the customer complaint.

## Evidence It Works

We haven't measured handoff latency systematically. What we can confirm:

- Jared Dunn escalates to Gilfoyle Bertram via @mention multiple times per week without human involvement.
- The gateway's handoff detection fires on both explicit `@SoftwareEngineer` and bare role names in handoff phrasing.
- Each agent's GitHub PRs appear under the correct bot identity — no mixed authorship.

Eval scripts in `scripts/eval_slack_e2e.py` test the handoff path end-to-end:

```bash
uv run python scripts/eval_slack_e2e.py \
  --scenario support_400_errors \
  --channel C0ALG01DLJV \
  --timeout 600
```

Key indicator in eval output: `Handoff detected in response!` — the gateway confirmed a @mention was parsed and routed.

## What Does Not Work Yet

- **No handoff acknowledgment.** When Jared hands off to Gilfoyle, there is no explicit "received" signal back to Jared. Jared does not know if Gilfoyle acted on the task until a PR appears. A lightweight "picked up" reply from the target agent would close this gap.
- **Circular handoff protection is heuristic, not guaranteed.** The gateway blocks self-handoffs (an agent cannot @mention itself) but does not detect multi-agent loops (A → B → A). We haven't seen this in practice, but the guardrail is not in place.
- **No priority in handoffs.** Every @mention is treated equally. A P0 incident escalation and a low-priority feature request hit Gilfoyle's inbox in the same queue. Jared labels Linear issues by severity, but that label does not influence how fast the gateway delivers the message or how Gilfoyle prioritizes the queue.
- **Cost not yet reported.** We are still fine-tuning agent behavior and running frequent debug sessions. Publishing cost numbers during active tuning would not reflect steady-state usage. We will report actual monthly spend once the system stabilizes.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — series root, company principles
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — how Gilfoyle Bertram ships PRs
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — predecessor ops architecture
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — where the agent roster was defined
- [6 Months of Momentum](/blog/2026-03-17-6-months-momentum) — what the agent team looks like at scale
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) — one of the inbound channels Jared monitors
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) — another inbound channel
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — model routing that powers the agents
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping agent costs flat
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — how Jared's handoffs land in Linear
- **You are here** — Agent Communication: Slack Apps, OpenClaw Channels, AGENTS.md Handoff Matrix

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)

*Previous in series: [Linear Customer Support Pipeline →](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)*
