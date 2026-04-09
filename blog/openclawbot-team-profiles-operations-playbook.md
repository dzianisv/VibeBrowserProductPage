---
title: "OpenClawBot Team Profiles: How We Run Support, Growth, Engineering, and DevOps with Cloud-Managed OpenClaw"
description: "A practical, engineer-written playbook for running OpenClawBot team profiles across SupportEngineer, GrowthManager, SoftwareEngineer, DevOpsEngineer, and MarketingManager."
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

Last Tuesday, a customer reported a double charge by email.  
SupportEngineer picked it up, verified the charge, sent the refund, and opened an escalation with full evidence. SoftwareEngineer shipped the fix as a PR. DevOpsEngineer checked rollout health and Sentry after deploy. I only stepped in for final approval.

That is how **OpenClawBot team profiles** work for us: one cloud-managed [OpenClaw](https://github.com/openclaw/openclaw) deployment at `openclawbot.vibebrowser.app`, five role-specific agents, clear ownership, and strict handoff rules.

I wrote this post as an implementation guide, not a concept piece.

![OpenClawBot team agents coordinating a customer issue in Slack — SupportEngineer triages, SoftwareEngineer ships the fix](/vibeteam1.png)

## Why we stopped using one general-purpose agent

We started with a single "do everything" setup. It looked efficient, but the failure modes were expensive:

1. **Customer and engineering work mixed in one queue.** Urgent support replies got delayed by technical tasks.
2. **No clear owner.** Escalations came late because responsibilities were implicit.
3. **Analysis without delivery.** The system could identify a likely bug, but nobody owned creating the issue and PR.
4. **Infra incidents interrupted support flow.** A restart task could block customer follow-up.

The fix was boring but effective: split roles, lock tool access by role, and require explicit handoffs.

## Team structure: one profile, one lane

| Team profile | Primary scope | Typical outputs |
|---|---|---|
| **SupportEngineer** | Customer replies, ticket triage, refund workflows | Customer resolution notes, refund confirmations, escalation packets |
| **GrowthManager** | Lifecycle messaging and growth experiments | Campaign plans, experiment results, prioritized growth actions |
| **SoftwareEngineer** | Product bugs and feature work | GitHub issues, implementation PRs, test updates |
| **DevOpsEngineer** | Reliability, infra incidents, rollout blockers | Incident updates, infra fix PRs, runbook improvements |
| **MarketingManager** | Positioning, launch content, distribution | Blog drafts, launch copy, channel-specific content |

The narrow scope is intentional. It keeps prompts shorter, decisions clearer, and postmortems easier.

## Team setup in `console.openclaw.vibebrowser.app`

Create a Team tenant in the console. You get a `TEAM_TOKEN` that secures the team API.

Two config layers matter:

1. **`openclaw.json`** defines agent runtime config, channel bindings, and integration settings.
2. **Role `AGENTS.md` files** define behavior, permissions, and handoff matrix per profile (`profiles/team/agents/<RoleName>/AGENTS.md`).

Minimal agent entry in `openclaw.json`:

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

Every role has its own `AGENTS.md`. We also keep a shared `AGENTS.md` for global rules: escalation, message format, and handoff behavior.

## Skills by role (this is where behavior really changes)

Different prompts are not enough. We mount different skills and tools per role.

### SupportEngineer: customer flow + Sentry context + refund safety

SupportEngineer can read Sentry context (`curl` + `sentry-cli`) and uses Gmail context at session start. Refunds go through an explicit workflow:

```bash
curl -X POST http://127.0.0.1:3001/admin/api/refund \
  -H 'Content-Type: application/json' \
  -d '{"telegramId": 123456789, "chargeId": "charge_id_here", "token": "$ADMIN_SECRET"}'
```

Guardrails are strict:

- find the charge from system data first,
- never refund from memory,
- confirm refund success in both internal records and customer channel.

### SoftwareEngineer: `sentry-response` skill

SoftwareEngineer owns the full issue loop: investigate, patch, PR, and issue closure.

```text
profiles/team/agents/SoftwareEngineer/skills/sentry-response/SKILL.md
```

Typical commands:

```bash
sentry-cli issues list --project <PROJECT_SLUG> --query "is:unresolved age:-24h"
sentry-cli issues info ISSUE_ID
sentry-cli issues resolve ISSUE_ID
```

Prereqs: `SENTRY_AUTH_TOKEN` plus GitHub permissions to branch, push, and open PRs.

### DevOpsEngineer: `k8s-ops` skill + kubeconfig in sandbox

DevOpsEngineer (runtime role `ReleaseEngineer`) has `kubectl` access.  
`KUBECONFIG` is stored in the OpenClaw sandbox, so incident response can run fully inside the same environment.

```bash
kubectl get pods -n <namespace> --request-timeout=20s
kubectl logs deployment/openclaw-gateway -n <namespace> --tail=200
kubectl rollout restart statefulset/openclaw-gateway -n <namespace>
```

DevOpsEngineer also uses Sentry to correlate app errors with cluster events.

### GrowthManager: retention-first playbook

GrowthManager does not have infra privileges. The role is focused on growth quality:

- weekly user interviews and quote-backed insights,
- growth accounting (`new + resurrected - churned`),
- small weekly experiments with stop conditions,
- no paid expansion when retention trends are weak.

### MarketingManager: content + distribution ops

MarketingManager handles blog and launch copy, research, and distribution planning. Tools are geared toward content execution, not production operations.

### Shared skills

We also mount common skills in `k8s/base/skills/`:

| Skill | Purpose |
|---|---|
| `support-triage` | Classify severity, gather evidence, produce handoff packet |
| `sentry-response` | Investigate, patch, PR, and resolve |
| `k8s-ops` | Safe cluster ops (health checks, rollouts, restarts) |
| `openclaw-config` | Update `openclaw.json` and integration bindings |
| `release-comms` | Incident updates and release communication |
| `prd-drafting` | Short PRDs with acceptance criteria |

## Handoff matrix in `AGENTS.md`

All agent profiles reference a handoff matrix. Mentions like `@SoftwareEngineer` or `@DevOpsEngineer` are treated as ownership transfer, not "FYI."

```text
Customer complaint or refund request
  -> SupportEngineer triage + customer handling
  -> escalate to @SoftwareEngineer or @DevOpsEngineer if action is needed

Infra outage or reliability event
  -> SupportEngineer confirms customer impact
  -> @DevOpsEngineer executes rollback/restart/mitigation

Code bug or feature request
  -> @SoftwareEngineer owns implementation and PR

External/public communication needed
  -> @MarketingManager drafts and routes for approval
```

Shared rules we enforce:

- handoff means **you own it**,
- no self-mentions (prevents loops),
- include evidence, requested output, and done condition,
- keep task discussions concise.

![Multi-agent handoff in Slack — DevOpsEngineer confirms deploy, SupportEngineer sends customer follow-up](/vibeteam2.png)

## Slack integration: one Slack app per role

We use separate Slack apps so each role is visible in channels with its own bot identity.

### 1. Create apps

For each role: [api.slack.com/apps](https://api.slack.com/apps) -> **Create New App** -> **From scratch**.

| Role | Slack app name |
|---|---|
| SoftwareEngineer | OpenClaw SoftwareEngineer |
| DevOpsEngineer | OpenClaw DevOps |
| SupportEngineer | OpenClaw SupportEngineer |
| MarketingManager | OpenClaw MarketingManager |
| GrowthManager | OpenClaw GrowthManager |

### 2. Add scopes

In **OAuth & Permissions** -> **Bot Token Scopes**:

```text
app_mentions:read, channels:history, channels:read, chat:write,
chat:write.customize, groups:history, groups:read, im:history,
im:read, im:write, mpim:history, mpim:read, usergroups:read
```

### 3. Install and store credentials

- install each app to workspace,
- save bot token (`xoxb-...`),
- save Signing Secret.

### 4. Configure events

Set Request URL:

```text
https://<your-gateway>/team/api/slack/events?token=<TEAM_TOKEN>
```

Subscribe to:

- `app_mention`
- `message.channels`
- `message.groups`
- `message.im`

### 5. Push config to tenant

```bash
curl -X POST "https://console.openclaw.vibebrowser.app/team/api/config?token=$TEAM_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"team":{"integrations":{"slack":{"enabled":true,"...":"..."}}}}'
```

Then send a DM to each bot and confirm replies.

> Slack free plans allow up to 10 installed apps. With role-per-app design, this limit matters quickly.

## GitHub integration: one GitHub App per role

We keep GitHub identities separate so audit logs and PR comments are role-accurate.

### 1. Create app

For each role at `github.com/organizations/<ORG>/settings/apps/new`:

- **App name:** e.g. `OpenClawSoftwareEngineer`
- **Webhook URL:** `https://<your-gateway>/team/api/github/events?token=<TEAM_TOKEN>`
- **Webhook secret:** `openssl rand -hex 32`

### 2. Set app permissions

| Permission | Access |
|---|---|
| Issues | Read & Write |
| Pull requests | Read & Write |
| Metadata | Read-only |

Webhook events:

- `issue_comment`
- `pull_request_review`
- `pull_request_review_comment`

### 3. Generate private key

In app settings -> **Private keys** -> **Generate a private key** (`.pem` download).

### 4. Install app

Install to selected repos and note the installation ID.

### 5. Push GitHub integration config

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

Identity check script:

```bash
TEAM_TOKEN=... node scripts/prove_github_app_identity.mjs --post-comments
```

## Sentry integration: shared visibility, role-specific action

Sentry is used by SupportEngineer, SoftwareEngineer, and DevOpsEngineer for different parts of the loop.

### 1. Create token

[sentry.io/settings/auth-tokens](https://sentry.io/settings/auth-tokens/) with:

| Scope | Purpose |
|---|---|
| `project:read` | Project and issue reads |
| `project:releases` | Release operations via CLI |
| `event:read` | Event and stack data |
| `org:read` | Org metadata |

### 2. Add env vars in tenant

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

### 3. Role usage

SupportEngineer example:

```bash
curl -sS "https://sentry.io/api/0/projects/$SENTRY_ORG/$SENTRY_PROJECT/issues/?query=is:unresolved&sort=date&limit=5" \
  -H "Authorization: Bearer $SENTRY_AUTH_TOKEN"
```

SoftwareEngineer uses the `sentry-response` skill for fix + PR + resolve.  
DevOpsEngineer uses Sentry plus `kubectl` for incident correlation.

## Linear integration: GraphQL only

Linear is the work queue for implementation and infra follow-through.

### 1. Create key

[linear.app/settings/api](https://linear.app/settings/api) -> create a personal API key.  
For multi-user production environments, use OAuth app credentials instead.

### 2. Optional webhook setup

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

### 3. Use API

Linear API endpoint is `https://api.linear.app/graphql`.  
Agents create and update issues through GraphQL mutations/queries.

## Model routing: GPT-5.4 and Grok-4.1 by risk profile

| Profile | Default model | Why |
|---|---|---|
| **SupportEngineer** | GPT-5.4 | Customer-facing replies need judgment and careful escalation |
| **GrowthManager** | Grok-4.1 | High-volume, lower-risk workflow throughput |
| **SoftwareEngineer** | GPT-5.4 | Better reasoning for code and PR quality |
| **DevOpsEngineer** | GPT-5.4 | Infra mistakes are expensive; requires careful analysis |
| **MarketingManager** | Grok-4.1 | Drafting/distribution speed matters most |

Simple rule: use the stronger model where mistakes create customer or production risk.

## Operating rules we care about

1. **Named ownership.** Every task has one role owner.
2. **Escalate early.** Low confidence or high risk always goes to a human.
3. **Ship artifacts, not opinions.** For engineering work that means issue, PR, and deploy evidence.
4. **Protect customer trust.** Correct response beats fast-but-wrong response.

## Example workflow: complaint -> fix -> customer confirmation

![End-to-end resolution loop — agent team coordinating across Slack threads from triage to deploy to customer follow-up](/vibeteam3.png)

1. SupportEngineer receives billing complaint via Gmail.
2. SupportEngineer verifies the charge and processes refund.
3. SupportEngineer escalates with user ID, charge IDs, and repro details.
4. DevOpsEngineer checks Sentry + logs and confirms where failure happened.
5. SoftwareEngineer implements patch and opens PR with tests.
6. DevOpsEngineer validates rollout and post-deploy Sentry status.
7. SupportEngineer sends final customer confirmation.

That full loop is the core metric for this setup.

## Should you adopt this architecture?

Use role-based agents if you need predictable cross-functional execution, not just "good answers" in chat.

It is worth the setup when you need:

- reliable customer communication during engineering spikes,
- faster handoffs between support, engineering, and ops,
- concrete engineering outputs (issues, PRs, deploy checks),
- clear human override at high-risk points.

Start with one role and one recurring workflow. Measure loop completion quality before adding more integrations.

If you want to try the same pattern, [OpenClaw](https://github.com/openclaw/openclaw) is open source, and [Vibe Browser for OpenClaw](https://www.vibebrowser.app/openclaw) gives the browser execution layer for Gmail/Linear/web workflows that are hard to handle with API-only agents.

## References

- Vibe Browser for OpenClaw: https://www.vibebrowser.app/openclaw
- OpenClaw project: https://github.com/openclaw/openclaw
- GPT-5.4 support in Vibe: https://www.vibebrowser.app/blog/gpt-5-4-support-and-kimi-k2-5-free-tier
- Grok-4.1 support in Vibe: https://www.vibebrowser.app/blog/grok-4-1-fast-reasoning-best-agentic-model
- GitHub Issues docs: https://docs.github.com/en/issues
- Linear docs: https://linear.app/docs
- Sentry docs: https://docs.sentry.io/
- Gmail docs: https://support.google.com/mail/

---

If you're implementing this, optimize for closed loops and clean ownership before you optimize for agent count.
