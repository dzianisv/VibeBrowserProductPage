---
title: "OpenClawBot Team Profiles: How We Run Support, Growth, Engineering, and DevOps with Cloud-Managed OpenClaw"
description: "OpenClawBot team profiles turn SupportEngineer, GrowthManager, SoftwareEngineer, DevOpsEngineer, and MarketingManager into an accountable operations system with human escalation and PR-based fixes."
date: "2026-04-09"
author: "Den"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - openclawbot
  - openclaw
  - ai-operations
  - customer-support
  - devops
published: true
---

Last week, SupportEngineer replied to a frustrated customer about a billing edge case, processed the refund, and escalated a bug to SoftwareEngineer — who opened a GitHub issue, shipped a PR with the fix, and closed the loop. DevOpsEngineer confirmed the deploy was clean via Sentry. I didn't touch any of it until the escalation summary landed in my inbox.

That's **OpenClawBot team profiles** in practice. One cloud-managed [OpenClaw](https://github.com/openclaw/openclaw) deployment at `openclawbot.vibebrowser.app`, five role-specific agents — SupportEngineer, GrowthManager, SoftwareEngineer, DevOpsEngineer, and MarketingManager — each with a clear lane, explicit escalation rules, and real integrations into [Linear](https://linear.app), GitHub Issues, Sentry, and Gmail.

No single "do everything" assistant. No prompt soup. Just accountable agents that know when to act and when to hand off to a human.

![OpenClawBot team agents coordinating a customer issue in Slack — SupportEngineer triages, SoftwareEngineer ships the fix](/vibeteam1.png)

This post is the playbook.

## Why not one big assistant?

Most teams trying agentic operations hit the same wall:

1. **Everything in one queue.** Customer-facing tasks and engineering tasks compete for the same context window.
2. **Ownership is invisible.** When one agent does everything, escalations happen late because nothing is explicitly anyone's job.
3. **Diagnosis without delivery.** The agent identifies the bug but never opens a PR. You're left doing the actual work.
4. **Infra noise drowns out customer work.** A pod restart steals attention from a refund that's been sitting for two hours.

We lived this. The hidden cost isn't the tool — it's slower response times, more context switching, and avoidable mistakes in customer conversations that erode trust.

## Five profiles, five operating lanes

Instead of one giant prompt, we map each responsibility to a dedicated agent profile with its own system instructions, tool access, and escalation policy.

| Team profile | Primary scope | Typical outputs |
|---|---|---|
| **SupportEngineer** | Customer replies, triage, refund workflows | Resolved tickets, escalation summaries, refund confirmations |
| **GrowthManager** | Outreach, follow-ups, lifecycle messaging | Campaign updates, prioritized growth tasks, A/B test proposals |
| **SoftwareEngineer** | Product bugs and feature changes | GitHub issues, implementation PRs, test coverage |
| **DevOpsEngineer** | Infra incidents, reliability, deployment blockers | Root-cause analysis, infra fix PRs, runbook updates |
| **MarketingManager** | Positioning, content ops, launch messaging | Blog drafts, publish plans, distribution tasks |

Each profile has a narrow mandate. That's the point. Narrow mandates are easier to evaluate, easier to improve, and harder to break in ways that surprise you at 2 AM.

## Setting up the team on the OpenClaw console

Go to `console.openclaw.vibebrowser.app` and create a Team tenant. Once provisioned, you get a `TEAM_TOKEN` that authenticates every API call below.

The team runtime is configured through two layers:

1. **`openclaw.json`** — the runtime config inside the tenant pod. It defines agents, channel accounts, and routing bindings.
2. **`AGENTS.md` per role** — each profile gets its own system instructions, tool access, and handoff matrix. These live in `profiles/team/agents/<RoleName>/AGENTS.md`.

A minimal `openclaw.json` agent entry looks like this:

```json
{
  "agents": {
    "list": [
      {
        "id": "support-engineer",
        "name": "SupportEngineer",
        "workspace": "/home/node/.openclaw/team-config/SupportEngineer",
        "agentDir": "/home/node/.openclaw/team-config/SupportEngineer"
      }
    ]
  }
}
```

Each agent directory contains the `AGENTS.md` with role identity, responsibilities, tool access, and the handoff routing table. A shared `AGENTS.md` in the `shared/` directory defines rules that apply to every role — the escalation protocol, evidence quality standards, and conciseness requirements.

## Skills: what each profile can actually do

This is where the real differentiation happens. Each agent doesn't just have different instructions — it has different **skills** mounted into its workspace. A skill is a structured `SKILL.md` file that defines when to activate, what preconditions are needed, and the exact workflow to follow.

### SoftwareEngineer — `sentry-response` skill

SoftwareEngineer has a `sentry-response` skill that handles Sentry issues end to end: investigate the stack trace, locate the failing code, implement the fix, create the PR, link it to the Sentry issue, and resolve the issue after merge.

```
profiles/team/agents/SoftwareEngineer/skills/sentry-response/SKILL.md
```

The skill prefers **Sentry MCP tools** when available and falls back to `sentry-cli`:

```bash
# List unresolved issues in the last 24h
sentry-cli issues list --project <PROJECT_SLUG> --query "is:unresolved age:-24h"

# Inspect a specific issue
sentry-cli issues info ISSUE_ID

# Resolve after merge
sentry-cli issues resolve ISSUE_ID
```

Preconditions: `SENTRY_AUTH_TOKEN` is set in the tenant environment, and the agent has GitHub access to create branches and PRs.

### DevOpsEngineer — `k8s-ops` skill

DevOpsEngineer (called ReleaseEngineer in the runtime) has the `k8s-ops` skill with full `kubectl` access to the cluster. The `KUBECONFIG` is stored inside the OpenClaw sandbox — the agent can check pod health, read logs, perform rollouts and restarts, and scale workloads.

```bash
# Check deployment health
kubectl get pods -n <namespace> --request-timeout=20s

# Read logs
kubectl logs deployment/openclaw-gateway -n <namespace> --tail=200

# Restart a deployment
kubectl rollout restart statefulset/openclaw-gateway -n <namespace>
```

The `KUBECONFIG` lives in the tenant's sandbox filesystem. DevOpsEngineer also has access to Sentry for correlating infrastructure signals with application errors.

### SupportEngineer — Sentry API + Gmail + refund workflow

SupportEngineer has direct `curl`-based access to the Sentry API and `sentry-cli` for reading production errors. Gmail context is pre-injected at session start — the agent sees recent unread emails with subjects, senders, dates, and previews.

For refunds, SupportEngineer uses the admin API:

```bash
curl -X POST http://127.0.0.1:3001/admin/api/refund \
  -H 'Content-Type: application/json' \
  -d '{"telegramId": 123456789, "chargeId": "charge_id_here", "token": "$ADMIN_SECRET"}'
```

The refund skill enforces safety rules: always query the database first to identify the exact charge, never refund from memory, and verify the refund landed by checking both Telegram and the internal database.

### GrowthManager — retention-first operating model

GrowthManager has no infrastructure access. Instead, the skill set is focused on growth accounting, experiment tracking, and customer outreach. The `AGENTS.md` codifies YC and a16z operating principles directly:

- Talk to users weekly, prefer direct quotes over assumptions
- Track growth as `new + resurrected - churned` — never let net growth hide churn
- Run small experiments weekly with a clear success metric and stop condition
- Block spend expansion if retention is decaying

### MarketingManager — content ops + browser automation

MarketingManager has access to the Chrome DevTools skill for web research and competitive analysis, plus the `gh` CLI for updating docs repositories and creating PRs. The agent drafts release notes, status updates, blog posts, and social media content.

### Shared skills across all profiles

Skills mounted at `k8s/base/skills/` are available to all profiles:

| Skill | Purpose |
|---|---|
| `support-triage` | Classify severity (P0–P3), collect evidence, hand off with impact summary |
| `sentry-response` | Investigate → fix → PR → resolve Sentry issue |
| `k8s-ops` | Safe kubectl operations (rollouts, restarts, health checks) |
| `openclaw-config` | Update `openclaw.json` to add agents, wire channels, rotate credentials |
| `release-comms` | Craft release notes, incident updates, maintenance announcements |
| `prd-drafting` | Draft concise PRDs with acceptance criteria |

## The handoff matrix

Every `AGENTS.md` includes an explicit handoff routing table. When an agent mentions `@RoleName` in its response, the gateway routes the message to that role's Slack app. This is not a suggestion — it's a hard routing rule.

```
Is this a customer email/complaint?
  → SupportEngineer investigates (Sentry + Gmail read-only)
  → If action needed: hand off to @DevOpsEngineer

Is this an infrastructure outage (5xx, health check failing)?
  → SupportEngineer investigates first
  → @DevOpsEngineer takes action (rollback/restart)

Is this a code bug or feature request?
  → @SoftwareEngineer implements

Does this need public communication?
  → @MarketingManager drafts
```

The shared `AGENTS.md` enforces collaboration rules:

- **A handoff is an ownership transfer**, not a request. When you receive one, you own the work.
- **Never re-mention yourself.** If you are SupportEngineer and someone says "@SupportEngineer please summarize", you respond with the summary. You don't write "@SupportEngineer can you provide…" — that creates an infinite loop.
- **Include structured context**: why, evidence, requested output, and done condition.
- **Maximum 3 Slack messages per task** — if you need more, you're being too verbose.

![Multi-agent handoff in Slack — DevOpsEngineer confirms deploy, SupportEngineer sends customer follow-up](/vibeteam2.png)

## Connecting Slack: one app per agent role

Each agent role gets its own Slack app so it posts with its own bot identity. This makes accountability visible in every channel.

### Step 1: Create apps at api.slack.com

For each role, go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From scratch** (not manifest — the React textarea has browser automation issues).

| Role | Slack App Name |
|---|---|
| SoftwareEngineer | OpenClaw SoftwareEngineer |
| DevOpsEngineer | OpenClaw DevOps |
| SupportEngineer | OpenClaw SupportEngineer |
| MarketingManager | OpenClaw MarketingManager |
| GrowthManager | OpenClaw GrowthManager |

### Step 2: Add OAuth scopes

Navigate to **OAuth & Permissions** → **Bot Token Scopes** and add:

```
app_mentions:read, channels:history, channels:read, chat:write,
chat:write.customize, groups:history, groups:read, im:history,
im:read, im:write, mpim:history, mpim:read, usergroups:read
```

### Step 3: Install and collect tokens

Click **Install to Workspace** → **Allow** → copy the **Bot User OAuth Token** (`xoxb-...`). On the **Basic Information** page, copy the **Signing Secret**.

### Step 4: Configure event subscriptions

Enable **Event Subscriptions** and set the Request URL:

```
https://<your-gateway>/team/api/slack/events?token=<TEAM_TOKEN>
```

All apps share the same webhook URL — routing is handled by `api_app_id` in the payload. Subscribe to these bot events:

- `app_mention`
- `message.channels`
- `message.groups`
- `message.im`

### Step 5: Push config to the tenant

```bash
curl -X POST "https://console.openclaw.vibebrowser.app/team/api/config?token=$TEAM_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"team": {"integrations": {"slack": {"enabled": true, ...}}}}'
```

Verify with a GET to the same endpoint. DM any bot user in Slack — you should get an AI response within 30 seconds.

> **Note:** Free Slack workspaces have a 10-app limit. Plan accordingly when all roles plus other apps are needed.

## Connecting GitHub: one GitHub App per agent role

Each role gets its own GitHub App so PRs and issue comments show the correct `[bot]` identity. SoftwareEngineer comments appear as `openclawsoftwareengineer[bot]`, DevOpsEngineer as `openclawreleaseengineer[bot]`, etc.

### Step 1: Create apps at github.com

For each role, go to `github.com/organizations/<ORG>/settings/apps/new`:

- **App name:** `OpenClawSoftwareEngineer` (no spaces — GitHub App names must be PascalCase)
- **Webhook URL:** `https://<your-gateway>/team/api/github/events?token=<TEAM_TOKEN>`
- **Webhook secret:** Generate with `openssl rand -hex 32`

### Step 2: Set permissions

| Permission | Access |
|---|---|
| Issues | Read & Write |
| Pull requests | Read & Write |
| Metadata | Read-only (auto-selected) |

Subscribe to events: `issue_comment`, `pull_request_review`, `pull_request_review_comment`.

### Step 3: Generate a private key

Scroll to **Private keys** → **Generate a private key**. Save the downloaded `.pem` file. This is used to sign JWTs for authentication.

### Step 4: Install to your repository

Go to **Install App** → select the org → choose **Only select repositories** → pick the target repo. Note the **Installation ID** from the URL.

### Step 5: Store credentials and push config

```bash
curl -X POST "https://console.openclaw.vibebrowser.app/team/api/config?token=$TEAM_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "team": {
      "integrations": {
        "github": {
          "enabled": true,
          "org": "YourOrg",
          "webhookSecret": "<hex-secret>",
          "agents": {
            "software_engineer": {
              "enabled": true,
              "appId": "123456",
              "privateKey": "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"
            }
          }
        }
      }
    }
  }'
```

Verify identity with the included proof script:

```bash
TEAM_TOKEN=... node scripts/prove_github_app_identity.mjs --post-comments
```

This generates JWT tokens from each app's private key, creates installation tokens, and posts a comment to a test issue from each bot identity.

## Connecting Sentry: auth token + sentry-cli in the sandbox

Sentry gives both SupportEngineer and SoftwareEngineer production error context. The setup is straightforward.

### Step 1: Create an auth token

Go to [sentry.io/settings/auth-tokens](https://sentry.io/settings/auth-tokens/) → **Create New Token** with these scopes:

| Scope | Purpose |
|---|---|
| `project:read` | Read project settings and issue lists |
| `project:releases` | Manage releases (required for `sentry-cli`) |
| `event:read` | Read error events and stack traces |
| `org:read` | Read organization data |

### Step 2: Set environment variables

Add `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, and `SENTRY_PROJECT` to the tenant environment. These are available to all agent profiles inside the sandbox.

### Step 3: Usage by role

**SupportEngineer** uses `curl` or `sentry-cli` to list unresolved issues and pull error context for customer escalations:

```bash
curl -sS "https://sentry.io/api/0/projects/$SENTRY_ORG/$SENTRY_PROJECT/issues/?query=is:unresolved&sort=date&limit=5" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN"
```

**SoftwareEngineer** uses the `sentry-response` skill to go further — investigate the stack trace, fix the code, create the PR, link it to the Sentry issue, and resolve the issue after merge.

**DevOpsEngineer** correlates Sentry error trails with `kubectl` logs during incident response.

## Connecting Linear: API key + GraphQL

Linear is the task tracker for SoftwareEngineer and DevOpsEngineer.

### Step 1: Create a personal API key (quick path)

Go to [linear.app/settings/api](https://linear.app/settings/api) → **Personal API keys** → **Create key**. Copy the token — it's shown only once.

For production use, create an **OAuth application** instead with `read` + `write` scopes.

### Step 2: Set webhook (optional)

Webhooks let Linear push issue updates to the team gateway. Use the GraphQL API:

```graphql
mutation {
  webhookCreate(input: {
    url: "https://<your-gateway>/team/api/linear/events?token=<TEAM_TOKEN>"
    resourceTypes: ["Issue", "Comment", "IssueLabel"]
    allPublicTeams: true
  }) {
    success
    webhook { id enabled }
  }
}
```

### Step 3: Usage

Linear's API is **GraphQL only** at `https://api.linear.app/graphql`. The agents use it to create issues, update status, and add comments — all through the `gh`-style terminal access in their sandbox.

> **Gotcha:** Personal API keys have full access to everything the user can see. For shared team environments, use OAuth apps with scoped permissions.

## Model routing: GPT-5.4 for judgment, Grok-4.1 for throughput

Not every agent task needs the same model. We route based on risk and volume:

| Profile | Default model | Why |
|---|---|---|
| **SupportEngineer** | GPT-5.4 | Customer-facing replies need high judgment — tone, accuracy, and knowing when *not* to answer |
| **GrowthManager** | Grok-4.1 | High-volume outreach and follow-up sequences benefit from speed and cost efficiency |
| **SoftwareEngineer** | GPT-5.4 | Code changes and PR quality require strong reasoning |
| **DevOpsEngineer** | GPT-5.4 | Infra diagnosis with Sentry data needs careful analysis before acting |
| **MarketingManager** | Grok-4.1 | Content drafts and distribution planning are high-throughput, lower-stakes tasks |

The rule: if a mistake costs customer trust or production stability, use the stronger model. If the task is structured and repeatable, optimize for speed.

## The values that keep this safe

Tools are easy. Values are what decide whether your agent team is trustworthy at scale.

1. **Accountability over convenience.**  
   Every task has a named profile and an expected output type. "The agent handled it" is never an acceptable status — *which* agent, *what* output, *where* is the artifact?

2. **Escalation over silent failure.**  
   If confidence is low or customer impact is high, the agent escalates to me. Pretending to be done is the worst failure mode. We'd rather get a 3 AM ping than a 3 AM customer churn.

3. **PRs over chat messages.**  
   SoftwareEngineer and DevOpsEngineer don't stop at "I think the issue is in auth.ts." They open a GitHub issue, write the fix, and submit the PR. Diagnosis without delivery is not useful.

4. **Customer trust over speed theater.**  
   A fast reply that's wrong, out of context, or irreversible is worse than a slightly slower reply that's correct. SupportEngineer is tuned for accuracy first.

## Real example: customer complaint → production fix → follow-up

Here's what a typical closed-loop resolution looks like end to end:

![End-to-end resolution loop — agent team coordinating across Slack threads from triage to deploy to customer follow-up](/vibeteam3.png)

1. **SupportEngineer** picks up an inbound customer email in Gmail. Customer reports being charged twice for a subscription upgrade.
2. SupportEngineer classifies it as a billing edge case, **processes the refund**, and replies to the customer with confirmation and an apology.
3. SupportEngineer creates a structured escalation to SoftwareEngineer with the user ID, charge IDs, and reproduction steps.
4. **DevOpsEngineer** pulls the relevant Sentry error trail — finds a race condition in the webhook handler that allowed a double-charge under high concurrency.
5. **SoftwareEngineer** opens a GitHub issue, writes the fix, submits a PR with tests, and links it to the escalation thread.
6. DevOpsEngineer confirms the deploy is clean — no new errors in Sentry after rollout.
7. **SupportEngineer** sends a final follow-up to the customer: "The bug that caused this has been fixed. It won't happen again."

Customer communication, engineering remediation, and infra validation — connected in one loop. That's the whole point.

## Should you build this?

If your current setup is one all-purpose assistant, you're paying hidden coordination costs — you just can't see them yet because the agent doesn't complain when it drops context between domains.

A role-based agent architecture is worth the setup cost when you need:

- **Reliable customer communication** that doesn't degrade when engineering work spikes
- **Faster escalation paths** with structured handoffs instead of "hey, can someone look at this"
- **Real engineering outcomes** — issues filed, PRs shipped, deploys verified — not chat summaries you have to act on yourself
- **A human override model** where high-impact moments always reach a person

Start with one profile and one high-frequency workflow. Measure reliability before expanding. Add integrations only when the profile needs them to close a loop.

If you want to try this with your own team, [OpenClaw](https://github.com/openclaw/openclaw) is open source and [Vibe Browser](https://www.vibebrowser.app/openclaw) provides the browser automation layer that makes Gmail, Linear, and web-based workflows possible without API-only constraints.

## References

- Vibe Browser for OpenClaw: https://www.vibebrowser.app/openclaw
- OpenClaw project: https://github.com/openclaw/openclaw
- GPT-5.4 support in Vibe: https://www.vibebrowser.app/blog/gpt-5-4-support-and-kimi-k2-5-free-tier
- Grok-4.1 support in Vibe: https://www.vibebrowser.app/blog/grok-4-1-fast-reasoning-best-agentic-model
- GitHub Issues documentation: https://docs.github.com/en/issues
- Linear documentation: https://linear.app/docs
- Sentry documentation: https://docs.sentry.io/
- Gmail help and documentation: https://support.google.com/mail/

---

Build one profile. Connect one integration. Measure before you scale. The playbook works when the loops are closed, not when the agent count is high.
