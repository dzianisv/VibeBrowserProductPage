---
title: "Deploying Chatwoot With an AI Chatbot for openclaw.vibebrowser.app: Self-Hosted, Open Source, AI-Native"
description: "How Vibe Technologies deploys self-hosted Chatwoot integrated with an AI chatbot for openclaw.vibebrowser.app — the deploy script, the architecture, how the AI bot handles tier-1 chat, and how unresolved conversations escalate to our SupportEngineer agent (Jared Dunn)."
date: "2026-04-25"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - chatwoot
  - openclaw
  - ai-chatbot
  - customer-support
  - self-hosted
  - vibe-technologies
published: true
---

When [openclaw.vibebrowser.app](https://openclaw.vibebrowser.app) started seeing real users last quarter, it needed a real chat surface. Not a "send us an email and we will get back to you in 24 hours" link. An actual chat widget, with conversation history, agent handoff, attachments, the works. And — because Vibe Technologies is a one-person company with a team of AI agents — most of the replies needed to come from a bot, not a human.

We picked [Chatwoot](https://www.chatwoot.com/). Open source, self-hostable, REST + webhooks, no per-seat pricing. That matches a principle I wrote about when we started: [minimum proprietary technology](/blog/2025-11-01-building-vibe-technologies-ai-native-startup). Every piece of the stack we depend on should either be ours or be something we can run ourselves the day a vendor changes their mind. Intercom and Zendesk are great products. They are also expensive, closed, and fundamentally not built for a company where most of the support headcount is an LLM.

This post is the boring infrastructure story: how Chatwoot is deployed, the actual script, what the AI bot does inside it, the data flow with diagrams, and how unanswered conversations escalate to Jared Dunn, our [SupportEngineer agent](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team). It also includes the parts that did not work the first time, because those are the parts you actually want to know about.

If you are not a developer, the one-paragraph version: a customer opens a chat bubble on our product page; an AI bot answers from our docs; if the bot is not sure, the conversation moves to an AI support engineer who can read Sentry, Kubernetes, and the Stripe dashboard, and either resolves the issue or hands it to the right specialist agent. The customer never has to know which part was bot, which part was agent, and which part was me. The [YC framing](https://www.youtube.com/watch?v=t-G67yKAHBQ) for this kind of company is "self-improving company built with AI." Chatwoot is one of the load-bearing pieces.

## The Problem

When openclaw.vibebrowser.app started getting real users, customer questions arrived via email with no structured routing, no response SLA, and no way for Jared Dunn to handle volume during overnight runs. We had no SLA data for response times before Chatwoot — the pain was qualitative: questions arriving overnight sat until Dzianis checked email. Every question required a human context switch. That does not scale even when the human is available, and it definitely does not scale when the human is asleep.

## Why Chatwoot (vs. Intercom, Zendesk, Crisp)

The shortlist:

- **Intercom** — great product, expensive, locked in. Their AI bot is good. We are an AI company; we want to own the bot.
- **Zendesk** — built for human-staffed call centers. Pricing assumes you have ten human agents.
- **Crisp** — closer in spirit, still SaaS, still per-seat.
- **Chatwoot** — open source (MIT), self-hostable, REST + webhooks, first-class "API Channel" inbox type built for programmatic integrations, official Helm chart, runs on the cluster we already pay for.

For a one-person company that runs everything on its own [AKS cluster](/blog/2025-11-01-building-vibe-technologies-ai-native-startup), Chatwoot wins on every axis that matters: zero marginal cost per seat, full data control, scriptable end to end. The trade-off is that you operate it — patch it, back up Postgres, size the Sidekiq workers. Fine for me; I run the rest of the cluster anyway.

## Deployment — the actual script

The deploy is a single bash script: [`scripts/deploy-chatwoot.sh`](https://github.com/openclaw/openclaw/blob/main/scripts/deploy-chatwoot.sh) in the OpenClawBot repo. It is 110 lines. The interesting parts:

It is a **Helm install onto AKS**, not Docker Compose, not bare metal. The official chart bundles Rails + Sidekiq + Postgres + Redis, which is exactly what Chatwoot needs:

```bash
helm upgrade --install chatwoot chatwoot/chatwoot \
    --namespace "$NAMESPACE" \
    --values "$CHATWOOT_DIR/values.yaml" \
    --set env.SECRET_KEY_BASE="$SECRET_KEY" \
    --set env.AZURE_STORAGE_ACCESS_KEY="$AZURE_KEY" \
    --set postgresql.auth.postgresPassword="$PG_PASS" \
    --set redis.auth.password="$REDIS_PASS" \
    --timeout 10m \
    --wait \
    --history-max 5 \
    --cleanup-on-fail
```

Secrets are generated on the fly if not provided:

```bash
if [[ -z "$SECRET_KEY" ]]; then
    echo "Generating SECRET_KEY_BASE..."
    SECRET_KEY="$(openssl rand -hex 64)"
fi
```

`AZURE_STORAGE_KEY`, however, is required — refusing to deploy without it is deliberate, because Chatwoot's Active Storage needs durable, cross-pod file storage for attachments. We use Azure Blob, not the in-pod ephemeral disk:

```bash
if [[ -z "$AZURE_KEY" ]]; then
    echo "Error: AZURE_STORAGE_KEY is required for file uploads (Active Storage)."
    exit 1
fi
```

The Helm `values.yaml` ([`k8s/chatwoot/values.yaml`](https://github.com/openclaw/openclaw/blob/main/k8s/chatwoot/values.yaml)) pins specific versions and resources rather than letting the chart pick defaults:

```yaml
image:
  repository: chatwoot/chatwoot
  tag: v4.10.1

web:
  replicaCount: 1
  resources:
    requests: { cpu: 250m, memory: 512Mi }
    limits:   { cpu: "1",  memory: 1Gi }

worker:
  replicaCount: 1
  # … Sidekiq worker config …

postgresql:
  enabled: true
  image:
    registry: ghcr.io
    repository: chatwoot/pgvector
  primary:
    persistence:
      enabled: true
      size: 10Gi
      storageClass: managed-csi
```

A few things worth calling out:

- **Postgres uses `chatwoot/pgvector`**, not vanilla Postgres. Chatwoot's newer features (semantic search over conversations, Captain AI grounding) want pgvector; the bundled image already has it.
- **Persistent volumes are explicit.** 10Gi for Postgres, 2Gi for Redis, both on `managed-csi`. Skip this and you lose every conversation the first pod restart.
- **Replica count is 1** for web and worker. Traffic is small and Sidekiq is fine on one node. Knob moves when traffic grows.
- **`ENABLE_ACCOUNT_SIGNUP: false`** — after the first admin account, signup is off. Only invited agents (human or bot) log in.

Environment variables that matter, all from the same `values.yaml`:

```yaml
env:
  RAILS_ENV: production
  FRONTEND_URL: "https://support.openclaw.vibebrowser.app"
  ACTIVE_STORAGE_SERVICE: microsoft
  AZURE_STORAGE_ACCOUNT_NAME: openclawterraform
  AZURE_STORAGE_CONTAINER: chatwoot
  MAILER_SENDER_EMAIL: "support@openclaw.vibebrowser.app"
  SMTP_ADDRESS: "smtp-relay.default.svc.cluster.local"
```

`FRONTEND_URL` is the one to get right on day one — it is the public origin Chatwoot uses when constructing webhook callbacks, attachment URLs, and the JavaScript widget snippet. Set it wrong and the widget will load from the wrong host, attachments will 404, and the Telegram inbox will reject the webhook callback URL. I know this because I set it wrong the first time.

Traefik handles ingress, not the chart's built-in nginx:

```yaml
ingress:
  enabled: false
```

…and then a separate `IngressRoute` CRD ([`k8s/chatwoot/ingress.yaml`](https://github.com/openclaw/openclaw/blob/main/k8s/chatwoot/ingress.yaml)) routes `support.openclaw.vibebrowser.app` to the in-cluster service. TLS comes from a wildcard cert for `*.openclaw.vibebrowser.app` already attached to the Traefik entrypoint, so the IngressRoute does not need to provision its own.

Net result: one command, ten minutes, full Chatwoot stack up at `https://support.openclaw.vibebrowser.app`. The dashboard for agents is at the same URL; the customer-facing widget is embedded into [openclaw.vibebrowser.app](https://openclaw.vibebrowser.app) via the standard Chatwoot website SDK snippet.

## The AI chatbot inside Chatwoot

Chatwoot's job is to be the conversation surface, not the brain. The brain lives in our service.

The integration uses Chatwoot's **API Channel** inbox type — the inbox that exists specifically so a programmatic client can create conversations and post messages on behalf of contacts. Configuration is three environment variables, defined in [`.env.example`](https://github.com/openclaw/openclaw/blob/main/.env.example):

```bash
CHATWOOT_BASE_URL=         # e.g. https://support.openclaw.vibebrowser.app
CHATWOOT_API_TOKEN=        # Chatwoot user API token
CHATWOOT_ACCOUNT_ID=1      # Chatwoot account ID (default: 1)
CHATWOOT_INBOX_ID=         # API Channel inbox ID
```

The client lives in [`src/chatwoot/client.ts`](https://github.com/openclaw/openclaw/blob/main/src/chatwoot/client.ts). It is intentionally small — a couple hundred lines of `fetch` calls and an `enabled` flag so the bot is a no-op if any of the four config values is missing:

```ts
get enabled(): boolean {
  return (
    this.config.baseUrl.length > 0 &&
    this.config.apiToken.length > 0 &&
    this.config.inboxId > 0
  );
}
```

That `enabled` guard matters more than it looks. It means the bot is feature-flagged off by default in local dev and CI — no accidental contact-spam against the real Chatwoot instance because someone forgot to set `CHATWOOT_API_TOKEN=""` in a test.

The Chatwoot URL convention the client follows is also exactly what their API docs say:

```ts
const url = `${this.config.baseUrl}/api/v1/accounts/${this.config.accountId}/${path}`;
const res = await fetch(url, {
  method,
  headers: {
    api_access_token: this.config.apiToken,
    "Content-Type": "application/json",
  },
  body: body ? JSON.stringify(body) : undefined,
});
```

Note the header name: `api_access_token`, not `Authorization: Bearer …`. That is a Chatwoot quirk. If you copy a generic REST snippet you will spend 20 minutes wondering why every request returns 401.

For each customer the client does an upsert keyed on `identifier = "telegram:<id>"`:

```ts
const identifier = `telegram:${user.telegramId}`;
const existing = await this.findContact(identifier);
if (existing) {
  await this.api(`contacts/${existing}`, "PATCH", { … });
  return;
}
await this.api("contacts", "POST", { inbox_id: this.config.inboxId, name, identifier, … });
```

The contact carries `additional_attributes` (plan id, subdomain, tenant status). Those are what the support agent — bot or human — sees in the right-hand sidebar of the Chatwoot UI when a conversation opens. So before an agent says a word, they already know "this is a `pro` plan customer, their subdomain is `alice-oc`, tenant status is `running`." That is the same context our AI bot uses as part of its system prompt.

## Three Inboxes, One Conversation Model

The web widget on openclaw.vibebrowser.app is the obvious surface. It is not the only one. Chatwoot runs three inboxes against the same conversation model, and the AI bot answers in all three:

- **Website inbox** — the JavaScript widget embedded in `openclaw.vibebrowser.app`. The default and most active.
- **Telegram inbox** — set up as a Chatwoot Telegram Channel. We register a bot with `@BotFather`, paste the bot token into Chatwoot's "Add Inbox → Telegram" form, and Chatwoot subscribes to Telegram's update webhook. From that point on, every DM to the support Telegram bot creates a Chatwoot conversation tied to the contact `telegram:<chat_id>`. The `additional_attributes` hydration we already do via `chatwoot-sync` lights up the same plan / subdomain / tenant-status fields in the sidebar. The bot answers the same way it does in the web widget.
- **Email inbox** — Chatwoot's "Email" channel type, configured against `support@openclaw.vibebrowser.app`. IMAP for inbound, SMTP for outbound — both pointed at the same Microsoft 365 mailbox the rest of our support email lives in. Inbound emails become conversations; agent replies go out as email. The bot can answer simple cases; everything else gets the same `needs-human` tag the web widget uses.

The shape of `values.yaml` reflects this: a single `MAILER_SENDER_EMAIL` and `SMTP_ADDRESS` covers email, the Telegram bot token lives in a separate Kubernetes secret mounted as `TELEGRAM_BOT_TOKEN`, and Chatwoot's per-inbox channel configuration handles the rest at the database level. We do not run three different services. We run one Chatwoot, three inboxes, one conversation table.

The one subtlety: inbound identification differs by channel. The website widget identifies a contact by Chatwoot's signed identifier cookie. Telegram identifies by `telegram:<chat_id>`. Email identifies by sender address. `chatwoot-sync` writes the **same canonical attributes** against every contact row no matter which inbox produced it, so the bot's grounding prompt looks identical regardless of channel.

## System diagram

```
                          ┌────────────────────────────┐
                          │  Customer (browser)        │
                          │  openclaw.vibebrowser.app  │
                          └─────────────┬──────────────┘
                                        │  Chatwoot widget JS
                                        ▼
                          ┌────────────────────────────┐
                          │  Chatwoot (Rails + Puma)   │
                          │  support.openclaw.…app     │
                          │                            │
                          │  ┌──────────┐ ┌─────────┐  │
                          │  │ Sidekiq  │ │ Postgres│  │
                          │  │ workers  │ │ pgvector│  │
                          │  └──────────┘ └─────────┘  │
                          │              ┌─────────┐   │
                          │              │  Redis  │   │
                          │              └─────────┘   │
                          └─────┬──────────────────▲───┘
                                │ webhook          │
                                │ message_created  │ POST /messages
                                ▼                  │ (bot reply)
                          ┌────────────────────────┴───┐
                          │  Chatwoot handler service  │
                          │  (OpenClawBot, Node/TS)    │
                          └─────────┬──────────────┬───┘
                                    │              │
                       grounding    │              │  contact upsert
                                    ▼              ▼
                          ┌──────────────┐  ┌─────────────────┐
                          │ Azure AI     │  │ daily sync job  │
                          │ Search (RAG) │  │ (users → CW)    │
                          └─────┬────────┘  └─────────────────┘
                                │
                                ▼
                          ┌──────────────┐
                          │ LiteLLM      │
                          │ gateway      │ ─ DeepSeek V4 Flash
                          └──────┬───────┘
                                 │
                  not confident? │ confident
                                 ▼
                          ┌──────────────┐
                          │ Slack        │   #support-escalations
                          │ webhook      │ ─────────────────────┐
                          └──────────────┘                      │
                                                                ▼
                                                       ┌────────────────┐
                                                       │ Jared Dunn     │
                                                       │ SupportEngineer│
                                                       │ (OpenClaw)     │
                                                       └───────┬────────┘
                                                               │ reply via
                                                               │ Chatwoot API
                                                               ▼
                                                       (back to customer
                                                        in same thread)
```

The shape to notice: the customer only ever talks to one URL — the widget on openclaw.vibebrowser.app. Everything downstream of the webhook is a private implementation detail. Bot replies and human-agent replies both land in the same conversation through `POST /api/v1/accounts/{account_id}/conversations/{conversation_id}/messages`. From the customer's side it is one continuous chat.

## Sync — what `chatwoot-sync` actually does

`chatwoot-sync` is the half of the integration that pushes the other direction: from our database into Chatwoot. The scheduler ([`src/scheduler/chatwoot-sync.ts`](https://github.com/openclaw/openclaw/blob/main/src/scheduler/chatwoot-sync.ts)) runs once on startup and then every 24 hours by default:

```ts
const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000;
…
void run();
const timer = setInterval(run, intervalMs);
```

Each pass walks our user table, joins it against the current subscription and tenant rows, and upserts a Chatwoot contact:

```ts
const sub = await getActiveSubscription(db, u.id);
const tenant = await getTenantByUserId(db, u.id);
return {
  telegramId: u.telegramId,
  username: u.telegramUsername,
  firstName: u.firstName,
  planId: sub?.planId ?? null,
  subdomain: tenant?.subdomain ?? null,
  tenantStatus: tenant?.status ?? null,
};
```

The tests at [`tests/unit/chatwoot-sync.test.ts`](https://github.com/openclaw/openclaw/blob/main/tests/unit/chatwoot-sync.test.ts) pin the expected behavior, and they tell you what the integration cares about:

- "calls sync immediately on start" — fresh customers visible to support without waiting a day.
- "calls sync again after the interval elapses" — drift between our DB and Chatwoot is bounded.
- "returns a stop function that cancels the interval" — graceful shutdown matters.
- "does not throw when sync throws an error" — one bad DB row must not kill the scheduler.

And the matching client tests at [`tests/unit/chatwoot-client.test.ts`](https://github.com/openclaw/openclaw/blob/main/tests/unit/chatwoot-client.test.ts) lock the upsert semantics: empty search → POST `/contacts`, non-empty search → PATCH `/contacts/{id}`, and the PATCH body carries `additional_attributes.plan`, `additional_attributes.subdomain`, `additional_attributes.tenant_status`. That last bit is the load-bearing part — those attributes are what surface to the agent in the Chatwoot UI when a customer opens a chat. Without them, the bot and Jared Dunn would both be guessing.

The sync is currently **one-way: our DB → Chatwoot**. There is no return path that updates our DB based on Chatwoot conversation state. We considered bidirectional — closing a Chatwoot conversation could mark an incident resolved — but every time we sketched it, the bidirectional version added more failure modes than it removed. One-way is enough.

## The AI bot itself

The bot is grounded against the same RAG layer the docs chat uses: docs chunked and embedded into Azure AI Search; on each incoming message the handler retrieves the top-k matching chunks, builds a system prompt, and calls an LLM through our LiteLLM gateway.

The decision loop:

1. Webhook fires on `message_created`, filtered to `message_type == "incoming"`.
2. Pull the contact's `additional_attributes` into the prompt (plan, subdomain, tenant status).
3. RAG query against docs and recent runbook snippets.
4. Ask the LLM to either (a) answer directly, or (b) emit a structured `escalate` token with a one-sentence reason.
5. Post the answer back to Chatwoot. If `escalate`, also tag the conversation `needs-human` and ping Slack.

The two-bucket output — `answer` vs `escalate` — is the part I would not skip. Letting the LLM decide "should I keep talking or hand off?" in the same response as the answer keeps the loop honest. "I don't know, escalating" is a successful turn, not a failure.

## Escalation to Jared Dunn

When the bot tags `needs-human`, a second Chatwoot webhook (subscribed to `conversation_updated`) fires our gateway, which posts a structured message into Slack `#support-escalations` with the conversation transcript URL and the contact's plan/subdomain/status.

[Jared Dunn](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — our SupportEngineer agent — picks it up the same way he picks up everything else: a Slack listener, the [agent prompt in `openclaw-rc.d/workspace/support-engineer/AGENTS.md`](https://github.com/openclaw/openclaw/blob/main/openclaw-rc.d/workspace/support-engineer/AGENTS.md), and the same toolchain (`kubectl`, `sentry-cli`, Gmail, `gh`) he uses for ticket triage. His instructions explicitly route follow-up code work to `@GilfoyleBertram` (SoftwareEngineer) and infrastructure work to `@ReleaseEngineer` (Einstein):

| Situation | Handoff To |
|---|---|
| Infra outage (5xx, pods down) | @ReleaseEngineer |
| Code bug | @SoftwareEngineer |
| Roadmap / prioritization | @ProductManager |
| Public status update needed | @MarketingManager |

When Jared Dunn has the answer, he replies through the Chatwoot API as the `Support` agent identity — same endpoint the bot uses, different account token. The customer sees one continuous chat. The bot-to-human boundary is invisible.

### From Chatwoot conversation to Linear issue

For escalations that are bug-shaped, account-specific, or feature-requesty, Jared does not just reply — he opens a Linear issue first. The flow mirrors what he does from Gmail in [the docs support chat post](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation):

1. He reads the Chatwoot conversation transcript and classifies it (bug, feature, account, billing).
2. He calls `linear_issue.create` with a structured description: customer identifier (`telegram:<id>` / email / contact name), the symptom, repro if extractable, originating inbox (`web` / `telegram` / `email`), severity, and a direct link to the Chatwoot conversation (`https://support.openclaw.vibebrowser.app/app/accounts/1/conversations/<id>`).
3. He pastes the Linear issue URL into the conversation as a Chatwoot **private note** (not a customer-visible message) so any agent jumping into the conversation later sees the existing ticket immediately.
4. He sends the customer-facing reply with an acknowledgment plus a public-safe summary — the Linear issue URL only goes back to the customer when it lives in a public project.

When `@GilfoyleBertram` closes the implementing PR linked to the Linear issue, the Linear webhook fires into Slack, Jared gets the mention, and he posts the status update back through the **same Chatwoot conversation** — the channel-appropriate way (DM in Telegram, message in web, email in the email inbox). The customer sees the same thread close. Same pattern as the docs chat path, different transport.

The full Linear pipeline — issue templates, MCP tooling, the reverse path mechanics — is in [the Linear customer support pipeline post](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot).

The Chatwoot "private message" feature also turned out to be load-bearing here. Jared Dunn uses it to leave a one-line context note on the conversation ("checked vibe-api-gateway logs, OOM on stripe-service, handed to Einstein, ETA 1h"), so when he comes back two hours later he does not have to re-derive what he already figured out. It is the agent equivalent of a code comment — written by an LLM, for an LLM, but the format makes it readable for me too when I drop in.

## Evidence It Works

We haven't measured bot answer rate, escalation rate, or resolution time. The system has been live for less than a month. Cost: $30–$40/month for Chatwoot hosting. We will publish deflection metrics after 60 days of traffic.

## What Does Not Work Yet

In rough order of how stupid I felt:

- **Forgot `conversation_status_changed`.** First version only listened for `message_created`. When a human marked a conversation `resolved`, the bot never knew. Customer replied two days later, bot happily said "anything else?" on a closed conversation. Fix: one extra webhook subscription and an `if conversation.status != "open": return` early-exit.
- **`FRONTEND_URL` wrong.** Pointed at a legacy host first time around. Widget loaded from the wrong origin, attachments 404'd, Telegram callback URL was wrong. Looked like a TLS issue. It was a one-line env var.
- **Chatwoot API rate limits are real.** First contact-sync tried to push ~5k users in a tight loop and got `429`s with no `Retry-After`. The scheduler now batches. Long-term plan is delta-only sync; the daily all-users pass is the safety net for drift.
- **`Authorization: Bearer` does not work.** Chatwoot uses `api_access_token` as the header name. Tests now assert this explicitly: `expect(headers["api_access_token"]).toBe("test-token-abc")`.
- **`existingEnvSecret` is a trap.** The chart auto-creates `chatwoot-env` from the `env:` block. Pointing `existingEnvSecret` at the same name gives you duplicate `envFrom` entries and the pod fails to start. The comment in `values.yaml` is there because past-me forgot.

None of these are Chatwoot's fault. They are the normal cost of integrating any two systems. Writing them down is the cheap part of not repeating them.

## Cost

Helm release + 1 web pod + 1 worker pod + bundled Postgres + bundled Redis + 12Gi PV. Roughly $30–$40/month of AKS capacity, which is a rounding error against what Intercom or Zendesk would charge for one human-grade seat. The marginal cost of one more support "agent" — a new bot identity in a different inbox — is zero.

That cost shape is the actual point. An [AI-native company](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) wants its support headcount to grow with conversation volume, not with seat count. Chatwoot is the only one of the four candidates whose pricing model agreed with that.

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies as an AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — the series root
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — coding stack
- [VibeTeam: OpenHands AI operations agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the predecessor architecture
- [Switching from OpenHands to VibeBrowser agentic team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — Jared Dunn and the OpenClaw team are defined here
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) — the docs-side support surface
- **[Chatwoot AI Chatbot for openclaw.vibebrowser.app →](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)**
- [Switching OpenClaw operations to DeepSeek V4 Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — what model actually answers the chats
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping the bill sane
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — where Chatwoot escalations become tracked issues
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

Background:

- [OpenClawBot team profiles and operations playbook](/blog/openclawbot-team-profiles-operations-playbook) — full agent roster and handoff matrix
- [Six months of momentum](/blog/2026-03-17-6-months-momentum) — the company context this all fits into
- YC's [How to Build a Self-Improving Company with AI](https://www.youtube.com/watch?v=t-G67yKAHBQ) — the playbook this whole #ainativecompany series is running

If you want to see the chat for yourself, open [openclaw.vibebrowser.app](https://openclaw.vibebrowser.app) and click the bubble. The first reply is from the bot. If you ask something it cannot confidently answer, Jared Dunn will pick it up. If he needs to ship code, he will tag Gilfoyle Bertram. Eventually it gets to me — but most days, it does not have to.

*Previous in series: [Docs Support Chat with Azure AI RAG →](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)*
