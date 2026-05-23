---
title: "How Vibe Technologies Tracks Customer Support in Linear — From VibeBrowser Co-Pilot to Jared Dunn to Linear Issues"
description: "The customer-support pipeline at Vibe Technologies: every escalation from Gmail, Chatwoot, the docs chat, and the VibeBrowser co-pilot becomes a tracked Linear issue owned by Jared Dunn (SupportEngineer), with status flowing back to the customer when Gilfoyle Bertram closes the PR."
date: "2026-05-22"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - linear
  - customer-support
  - ai-agents
  - openclaw
  - vibebrowser
  - support-pipeline
  - vibe-technologies
---

Vibe Technologies has one human (me) and a team of named AI agents. Anything that touches a customer eventually crosses [Jared Dunn](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team), our SupportEngineer agent. Anything that needs to be fixed — a bug, a missing feature, an account-specific snarl — has to live somewhere a future agent or human can find it.

That somewhere is **Linear**.

This post is the boring-but-load-bearing infrastructure story of how every customer support thread becomes a tracked Linear issue, who creates it, what the templates look like, and how the loop closes when [Gilfoyle Bertram](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) (SoftwareEngineer) ships the fix. It also covers the in-product VibeBrowser co-pilot chat as a fourth source — including the honest accounting that the end-to-end submit path is not built yet.

If you have not read the rest of the series, the elevator version: every other "employee" at Vibe Technologies is an agent with a Slack handle and a job description. Jared Dunn reads support email. Gilfoyle Bertram fixes bugs. Linear is the substrate that joins their work. That is the whole post in one sentence. The rest is mechanism.

## Why Linear

The shortlist when we picked a tracker:

- **GitHub Issues** — already in use for engineering. Good. But mixing customer-facing tickets with code issues makes the engineering board noisy and exposes too much by accident. Customer reports often contain emails, sub-domains, and account IDs. We did not want those one bad permissions change away from indexed.
- **Jira** — built for ten-person teams that need workflow ceremony. We have one person.
- **Notion / Linear / Height / Shortcut** — comparable. We picked Linear.

Linear earned the pick on three properties:

1. **Open API and webhooks.** Issues, comments, labels, projects — all reachable from a single REST + GraphQL surface. Webhooks fire on status change. That is everything we need.
2. **openclaw-linearj integration.** We wire Linear into OpenClaw via [openclaw-linearj](https://github.com/stepandel/openclaw-linearj) — a purpose-built OpenClaw integration that gives agents typed Linear actions (create issue, comment, update status, list) without us shipping a bespoke client or running a separate MCP sidecar.
3. **No per-seat tax at our scale.** Linear's free tier covers a one-human company with a fleet of bot identities; we are not adding a $20/month/agent line item for Michael Burry to lecture me about.

The principle from [the founding post](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) holds: minimum proprietary technology, no per-seat lock-in, API-first.

## How Jared Dunn Is Wired Into Linear

The path from "Jared Dunn drafted a Slack reply" to "Linear issue exists" is three hops: API token, integration config, role permissions.

### API token

A single Linear API token, scoped to the `support` team, lives in our secret store and is mounted into Jared's OpenClaw sandbox at session start. The token has write access to issues and comments on the support team and read-only on other teams (so he can link to engineering issues without modifying them).

### Integration: openclaw-linearj

Linear is not wired in as a generic MCP sidecar — it uses [openclaw-linearj](https://github.com/stepandel/openclaw-linearj), a purpose-built OpenClaw integration. It registers as an integration entry (not an `mcp.servers` stdio process) in the per-role `openclaw.json`:

```json
{
  "integrations": {
    "linear": {
      "type": "openclaw-linearj",
      "env": {
        "LINEAR_API_KEY": "${LINEAR_SUPPORT_TOKEN}"
      }
    }
  }
}
```

That gives Jared typed Linear actions surfaced as agent tools:

- `linear.createIssue` — open a new issue with description, labels, team, priority.
- `linear.updateIssue` — change status (`In Progress`, `Done`), reassign, retag.
- `linear.addComment` — add a comment, used for cross-channel links and customer-thread metadata.
- `linear.listIssues` — query by label, status, recent activity.
- `linear.listProjects` — scope queries to the right project.

The same integration is mounted read-only on Gilfoyle Bertram's role so when he opens a PR he can pull the linked issue and write status comments back.

### Other integrations on the support role

Jared also gets three other integrations to assemble context before creating a ticket:

- **GitHub** via [clawhub.ai/steipete/github](https://clawhub.ai/steipete/github) — read-only access to issues and PRs so he can check whether a reported bug already has an open issue or a recent fix.
- **Notion** via [clawhub.ai/steipete/notion](https://clawhub.ai/steipete/notion) — read-only access to the internal knowledge base (runbooks, FAQ, known issues).
- **Gmail** via the [OpenClaw Gmail PubSub integration](https://docs.openclaw.ai/automation/cron-jobs#gmail-pubsub-integration) — push delivery of new `support@vibebrowser.app` messages into Jared's event queue rather than polling. No new email lands in the inbox without him seeing it within seconds.

> **Heads-up to anyone retracing this:** the support-engineer role file in the OpenClawBot repo today still names the persona `Grace`. The catalog and the rest of the operations literature have moved to `Jared Dunn`. The text in this post matches the catalog. If you grep the `AGENTS.md`, expect to find `Grace` until that file is renamed. The role behavior is the same — only the persona label is in flight.

### Permissions, the OpenClaw way

Jared's sandbox is the same one defined in [the OpenClaw switch post](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — no `kubectl`, no `gh` write scope, read-only on Stripe and Langfuse. Linear write access is the one substantive write he gets. The reasoning is the same as everywhere else: a support agent reads customer input that is inherently untrusted, so his writes should land somewhere recoverable. A bad Linear issue is one revert. A bad `kubectl apply` is an incident.

## The Templates Jared Dunn Uses

Jared does not free-form Linear issues. Every issue he creates uses one of four templates, declared in `openclaw-rc.d/workspace/support-engineer/skills/linear-templates/SKILL.md` and enforced by his runbook.

### Bug

```markdown
**Customer**: <email / Telegram handle / Chatwoot contact ID>
**Severity**: P0 / P1 / P2 / P3
**Originating channel**: <Gmail thread URL | Chatwoot conversation URL | docs chat session ID | co-pilot session ID>
**Plan / tenant**: <free / pro / enterprise · subdomain · tenant status>
**Environment**: <product version, page URL, OS, browser if applicable>

### Symptom
<one paragraph, plain language>

### Reproduction
1. ...
2. ...
3. ...

### Expected vs actual
- Expected: ...
- Actual: ...

### Evidence
<logs, screenshots, Sentry issue links, transcript excerpts>

### Suggested owner
@GilfoyleBertram / @ReleaseEngineer
```

Labels: `customer-bug`, `severity:<level>`, `channel:<source>`.

### Feature request

```markdown
**Customer**: <identifier>
**Originating channel**: <link>
**Plan / tenant**: <details>

### What the customer is asking for
<their words, quoted>

### Use case (why)
<our interpretation, with the customer quote backing it>

### Existing workaround (if any)
<docs link / current product behavior>

### Vote count
<1 — incremented on duplicate requests>
```

Labels: `feature-request`, `channel:<source>`, plan label if relevant. New requests get vote count 1. Jared's runbook explicitly searches Linear for existing matches before creating — if a match exists, he increments `Vote count` in a comment instead of opening a duplicate.

### Account issue

```markdown
**Customer**: <identifier>
**Originating channel**: <link>
**Issue type**: subdomain conflict / SSO / quota / plan upgrade / data export / deletion request
**Plan / tenant**: <details>

### Symptom
<one paragraph>

### Account context
<what we can see: Stripe customer ID, tenant status, last activity>

### Action requested
<the specific thing the customer wants to happen>

### Approval required
<yes/no — if yes, @Dzianis>
```

Labels: `account-issue`, `channel:<source>`.

### Billing

```markdown
**Customer**: <identifier>
**Stripe customer**: <stripe_id>
**Originating channel**: <link>

### Issue
refund / dispute / failed payment / plan downgrade / invoice question

### Stripe context
<last invoice, last successful charge, current subscription status>

### Action requested
<refund amount, dispute response, etc.>

### Approval required
yes — refunds above $100 require @Dzianis
```

Labels: `billing`, `channel:<source>`, and `needs-approval` if above threshold.

The templates exist because the same five facts (customer identifier, originating channel, plan, severity, action requested) are what the next agent or human reading the issue needs to act on it. Free-form descriptions are how tickets become unsearchable.

## The Four Sources That Feed the Pipeline

### 1. Gmail (support@vibebrowser.app)

Jared owns the inbox. Email arrives via the [OpenClaw Gmail PubSub integration](https://docs.openclaw.ai/automation/cron-jobs#gmail-pubsub-integration) — Google pushes new messages to a Cloud Pub/Sub topic which delivers them into Jared's event queue. No polling, no missed emails on a slow cron cycle. His existing runbook in [`openclaw-rc.d/workspace/support-engineer/AGENTS.md`](https://github.com/openclaw/openclaw/blob/main/openclaw-rc.d/workspace/support-engineer/AGENTS.md) already covers email triage. The Linear step is the addition:

1. He reads the email and classifies it (bug / feature / account / billing / "answer in line, no ticket").
2. For any class except the last, he calls `linear.createIssue` with the matching template.
3. He posts the Linear issue URL back into the Gmail thread as the last line of his reply — `Tracking this as <project>-<number>` — so the link survives even if Linear changes URLs.
4. He sends the customer-facing reply with an acknowledgment plus, where the issue is public, the issue URL.

The end state: the email thread and the Linear issue both contain the link to the other. Either entry point finds the full trail.

### 2. Chatwoot (web widget / Telegram / email inbox)

The mechanics are documented in detail in [the Chatwoot post](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app). The Linear-specific step:

When Jared takes over a `needs-human`-tagged conversation:

1. He reads the transcript and the contact's `additional_attributes` (plan, subdomain, tenant status) from the Chatwoot sidebar.
2. He classifies and calls `linear.createIssue` with the template.
3. He pastes the Linear issue URL into the conversation as a **Chatwoot private note**, not a customer-visible message. Any agent jumping in later sees the existing ticket immediately.
4. He sends the customer reply through the same Chatwoot conversation — the channel-appropriate way (DM in Telegram, web message, or email).

The `Originating channel` field on the Linear issue points back at `https://support.openclaw.vibebrowser.app/app/accounts/1/conversations/<id>` so the round trip works in either direction.

### 3. docs.vibebrowser.app chat → escalation email

Covered in [the docs support chat post](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation). The chat bot escalates by emailing `support@vibebrowser.app` with a `[chat-escalation]` subject prefix. From there the flow is identical to the Gmail path — Jared reads, classifies, creates the Linear issue, links both ways.

The one extra hop: when the docs bot's escalation includes the conversation transcript, Jared copies the relevant excerpts into the `Evidence` block of the Linear template. The full transcript stays in the Gmail thread (it is long) but the smoking gun lands on the issue.

### 4. VibeBrowser co-pilot chat — what exists today, what is planned

This is the source I want to be honest about. The VibeBrowser product itself has a co-pilot chat — the chat UI inside the browser that drives agentic tasks. The hypothesis on the roadmap is: a user inside that chat should be able to type "report this bug" or "send feedback" and have it land as a Linear issue in our support pipeline without leaving the product.

**What exists today.** I went looking in the [vibe](https://github.com/VibeTechnologies/vibe) repository for a feedback / report-issue / support endpoint. Concrete findings:

- The current co-pilot chat lives in `apps/chat4/src/` (a Next.js app — `app/`, `components/`, `services/`). There is no `feedback`, `report-issue`, `support`, or `ticket` component, route, or service in that tree.
- The Chromium-fork side (`AiAgent.ts`, `background.ts`) has agent-orchestration code but no path that emits a ticket-shaped payload to an HTTP endpoint. The only "report" reference is an internal error-reporting pipe between content scripts and the background worker (`background.ts` around the error-reporting branch), which is for our own telemetry, not customer-facing feedback.
- There is no `/feedback`, `/support`, `/ticket`, or `/report` API route in the product's Next.js server, no Slack webhook hooked into a co-pilot UI button, and no Linear MCP call from inside the product app.

The short version: **the in-product report-issue path does not exist yet.** When a user wants to file a bug from the co-pilot today, they either click through to `support@vibebrowser.app` (manual email) or open the Chatwoot widget on `openclaw.vibebrowser.app`. Either way the ticket enters the pipeline through one of the three sources above.

**What is planned (Q3 2026).** The intended shape, when we build it, is small:

1. A `Report issue` action in the co-pilot chat command palette and in the chat's overflow menu.
2. A modal that collects: one-paragraph description, optional screenshot from the current tab (Chrome DevTools Protocol screenshot, which the product already takes for agent context), severity, and consent to include the last N agent steps as repro context.
3. A POST to `https://app.vibebrowser.app/api/support/report-issue` with the payload, authenticated by the user's existing session.
4. Server-side handler that constructs the Linear `Bug` template (filling `Originating channel: copilot-session:<id>`), calls `linear.createIssue` via the same openclaw-linearj integration Jared uses, and posts the new issue URL into Slack `#support-escalations` so Jared sees it land.
5. The user gets a confirmation in the co-pilot chat with the issue URL.

Same templates, same Jared, same Slack channel, same Linear team — just a new source feeding it. The reason this is not built yet is product priority, not design uncertainty. When it ships, this section gets rewritten with file paths and code, not roadmap.

## The Reverse Path — From PR Close to Customer Update

The pipeline is only useful if status flows back to the customer. The loop:

1. Gilfoyle Bertram (or a coding subagent under his supervision via the OpenCode session on the dev workstation — see [the engineering stack post](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)) opens a PR.
2. The PR description includes the Linear magic-words link: `Fixes <project>-<number>`. Linear's GitHub integration picks this up automatically — when the PR merges, the linked issue moves to **Done**.
3. The Linear webhook (configured in the support team's settings) fires on the status change to `Done`. The target is our gateway, which posts a Slack message into `#support-escalations`:
   > Issue <project>-<number> moved to Done. Original channel: <link>. @JaredDunn please follow up.
4. Jared reads the Slack ping, opens the Linear issue, reads the `Originating channel` field, and goes back to whichever surface the customer first appeared on:
   - Gmail thread — he sends a reply with the resolution summary.
   - Chatwoot conversation — he posts a message through the Chatwoot API (channel-appropriate; for Telegram it goes out as a DM, for the email inbox it goes out as email, for the web widget it appears in the open conversation).
   - docs chat escalation — same as Gmail (the docs chat path is email-based).
   - Co-pilot report (once shipped) — the confirmation channel will be the same in-product chat the issue was filed from.
5. He closes his own task by adding a comment to the Linear issue: `customer notified via <channel> on <date>`.

The two automatic notifications — Linear webhook → Slack, Slack mention → Jared — are what make this not require my attention. The customer gets a status update because the system fires it, not because anyone remembered.

The same reverse path runs for non-engineering closures. An account issue resolved by me directly (refund processed, plan adjusted) gets the same `Done` transition by hand, the same webhook, the same Slack ping, the same customer follow-up.

## What the Pipeline Looks Like at a Distance

```
┌─────────────────────────────────────────────────────────────────┐
│                       Sources of tickets                        │
│                                                                 │
│  Gmail            Chatwoot         docs.vibebrowser    Co-pilot │
│  support@…       web / Telegram   .app chat            chat     │
│                  / email                               (planned)│
│      │               │                   │                │     │
│      └───────────────┴─────────┬─────────┴────────────────┘     │
│                                ▼                                │
│                       ┌────────────────┐                        │
│                       │  Jared Dunn    │ ◀── reads & classifies │
│                       │ SupportEngineer│                        │
│                       │   (OpenClaw)   │                        │
│                       └───────┬────────┘                        │
│                               │                                 │
│                  linear.createIssue (openclaw-linearj)                      │
│                               ▼                                 │
│              ┌─────────────────────────────────┐                │
│              │   Linear — support team         │                │
│              │   Bug / Feature / Account / Bill│                │
│              └────────┬──────────────┬─────────┘                │
│                       │              │                          │
│           assigned to │              │ status change            │
│       @GilfoyleBertram│              │ (Done)                   │
│                       ▼              ▼                          │
│              ┌──────────────┐  ┌──────────────┐                 │
│              │   PR opened  │  │ Linear → Slack│                │
│              │ "Fixes <id>" │  │ #support-     │                │
│              │ via OpenCode │  │  escalations  │                │
│              └──────┬───────┘  └──────┬───────┘                 │
│                     │                 │                         │
│                     ▼                 ▼                         │
│                 PR merge     Jared replies through              │
│                 → Linear     originating channel                │
│                   Done         (Gmail / Chatwoot / chat)        │
└─────────────────────────────────────────────────────────────────┘
```

One ticket. One trail. Two automatic notifications. Every customer-facing message references the same Linear ID. When I want to know "what is broken for paying customers this week?", the answer is one Linear filter (`customer-bug`, `severity:P0/P1`, status open, last 7 days).

## What Does Not Work Yet

Honest accounting, same shape as every other post in this series:

- **The co-pilot in-product report-issue path is not built.** Q3 2026 target. Today the user emails or opens Chatwoot.
- **No automatic dedup across sources.** If the same user files via Chatwoot Monday and emails Tuesday, Jared notices the duplicate because he reads both — but the system does not link them automatically. The contact identity model differs by source (`telegram:<id>` vs email vs Chatwoot contact ID), and we have not wired the join. Workaround: Jared adds a `duplicate-of` comment when he spots it.
- **No SLA tracking on Linear status.** The webhook fires on `Done`. It does not fire when a `P0` issue has been open for more than the SLA. We use a daily cron that posts an "aging tickets" report into Slack instead. Crude but works.
- **Cross-team Linear access is wider than I love.** Jared's Linear token has read on all teams so he can link to engineering issues without me copy-pasting URLs. The blast radius if his sandbox is compromised includes "can read engineering roadmap." Acceptable trade-off today, will narrow when Linear ships per-team token scopes.
- **The persona rename from `Grace` to `Jared Dunn` is still in flight in one role file.** Listed above. Cosmetic — same behavior.

## Why Bother With This Much Plumbing

Because the alternative is what every solo founder discovers six months in: customer messages in three inboxes, no shared state, the same bug filed four times by four different users with no way to know they are the same bug, and a fix shipping with nobody telling the customer who reported it.

A one-person company cannot afford that overhead. An AI-native company cannot either — agents need a shared substrate to coordinate around, and natural-language threads are not a substrate. Linear issues are.

The principle from [the founding post](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) shows up again: **humans architect, agents execute.** Jared Dunn does not invent the support process. The process is `AGENTS.md`, templates, openclaw-linearj integration config, webhooks. He runs it. When the process needs to change — a new source comes online, a new template type is needed, the reverse path needs a new hop — that is my call. The execution is his.

The customer sees one company. Inside the company, every message has a number, every number has an owner, and every owner has a tool that fires the next step automatically.

That is the whole pipeline.

## Related reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — series root, principle of minimum proprietary technology
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — how Gilfoyle Bertram ships the PRs that close these issues
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the predecessor ops architecture
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — where Jared Dunn, Gilfoyle Bertram, and the rest of the OpenClaw roster are defined
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation) — source #3 in the pipeline
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) — source #2 (web / Telegram / email inboxes)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — what model answers the tickets
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping the agent cost flat as ticket volume grows
- **You are here** — Linear Customer Support Pipeline

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)
