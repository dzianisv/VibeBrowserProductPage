---
title: "Building the docs.vibebrowser.app Support Chat: Azure AI + Markdown Knowledge Base + Email Escalation to Our SupportEngineer Agent"
description: "How we built a RAG support chat for docs.vibebrowser.app on Azure AI Foundry — markdown knowledge base ingestion, Azure AI Search, GPT-4 grounded responses, and an escalation path that hands unresolved questions to our SupportEngineer agent (Jared Dunn, DeepSeek-V4-Flash) for email follow-up via Gmail."
date: "2026-04-10"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - azure-ai
  - rag
  - support-chat
  - knowledge-base
  - vibe-technologies
  - openclaw
  - customer-support
---

We built a RAG support chat on [docs.vibebrowser.app](https://docs.vibebrowser.app) backed by Azure AI Search — it reads our markdown docs, answers grounded questions, and escalates unresolved issues to [Jared Dunn, our SupportEngineer agent](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) via email. The goal: deflect the majority of inbound support questions before they reach a human.

## Why a Docs Chat At All

The hypothesis was simple: most of the customer email Jared Dunn handles is deflectable. People ask things like "how do I run VibeBrowser headless?", "where is the API key?", "can I use my own profile?" These have answers in the docs. They are not bugs, not billing, not anything that needs a human (or an agent acting as a human). They need a search engine that can read.

We had no data on question volume before building this — the motivation was qualitative: Jared was answering the same setup questions repeatedly. How many per week? We did not measure. Were they repetitive? Yes, noticeably so. Did the docs already answer them? Usually.

The internal target we set was **~70% of inbound questions deflected before they reach support@vibebrowser.app**. That is a hypothesis, not a measurement. We will have honest numbers after another month of traffic; until then I will not pretend.

The product constraint: this had to feel like a chat, not a search box. People ask questions in fragments. They follow up. They paste an error message. A list of doc links is not the right answer.

## The Architecture

The whole thing is small enough to fit on one slide. Source of truth → ingestion → index → chat layer → frontend → escalation.

**Source of truth.** The docs repo. Plain markdown under `docs/`, the same files that build the static site. No CMS, no separate knowledge base, no "let me update the FAQ" workflow. The docs are the knowledge base. If a question keeps escalating, the fix is a PR against `docs/` — which is exactly what we want.

**Ingestion.** A GitHub Action on every push to `main` of the docs repo triggers an Azure AI Search indexer. The action runs a small chunker (more on that below), uploads chunks plus metadata to Azure Blob Storage, and tells the indexer to run.

**Chunking.** This is where the first naive version went wrong. Our first cut threw whole pages at the embedder. The model could not find anything specific. The second cut split on every paragraph and broke code blocks in half. Citations pointed at fragments of curl commands. The current chunker is markdown-aware:

- Split by `##` and `###` headings as primary chunk boundaries.
- Target ~800 tokens per chunk with ~100 tokens of overlap between adjacent chunks.
- Detect fenced code blocks (\`\`\`) and treat them as atomic — never split a code block across chunks.
- Carry the page title and the heading path in chunk metadata (`page: "Headless mode"`, `section: "Linux"`).

The chunker is a ~120-line TypeScript file. Representative shape:

<!-- TODO: link to actual source file on GitHub -->
```ts
// docs-chunker/chunk.ts — representative, not the full file
export function chunkMarkdown(md: string, pagePath: string): Chunk[] {
  const sections = splitByHeading(md, ["##", "###"]);
  const chunks: Chunk[] = [];
  for (const section of sections) {
    const atomic = preserveCodeBlocks(section.body);
    for (const piece of packToBudget(atomic, { target: 800, overlap: 100 })) {
      chunks.push({
        id: hash(pagePath + section.heading + piece.offset),
        content: piece.text,
        metadata: {
          page_path: pagePath,
          heading: section.heading,
          url: `https://docs.vibebrowser.app/${pagePath}#${slug(section.heading)}`,
        },
      });
    }
  }
  return chunks;
}
```

**Embeddings.** `text-embedding-3-large` on Azure OpenAI. We chose Azure's hosted embedding endpoint rather than running our own, because we wanted the entire RAG path to live behind one Azure resource group for the procurement story (more on that below).

**Index.** Azure AI Search with **hybrid retrieval** — meaning both keyword (BM25-style) and vector search run on every query, and the results are fused. Hybrid catches the cases where a customer pastes an exact error string that the embedder fuzzes away, as well as the cases where they describe a concept in different words than the docs use. Semantic ranker enabled. Top-k = 8 going into the model.

**Chat layer.** Azure OpenAI, GPT-4o for the production deployment, with the "On Your Data" pattern — Azure's name for grounded chat, where the API takes care of the retrieval call into Azure AI Search, splices the chunks into the prompt, and forces the model to cite. We considered routing this through our usual LiteLLM gateway for model-of-the-month flexibility, but consistency on this one surface mattered more than swap-ability. We can still swap behind it.

**Frontend.** A Next.js chat widget mounted at the bottom-right of every page on docs.vibebrowser.app. Session id is a UUID in `localStorage`. The server is stateless — every turn includes the rolling conversation in the request. Streaming responses over Server-Sent Events because waiting for a full response feels broken.

**Escalation.** A POST to `/api/support/escalate` on our gateway when the bot — or the customer — decides this needs a human. Covered in detail further down.

## System Prompt And Grounding Rules

The system prompt is the contract. It does a few things explicitly:

1. Forces citations to specific doc URLs.
2. Forbids fabrication. If the answer is not in the retrieved chunks, the bot says so and offers escalation.
3. Lists escalation triggers (billing, account-specific, bug, feature request).
4. Sets tone — direct, fragments OK, match the rest of the Vibe voice.

Representative system prompt (lightly edited from production):

```text
You are the VibeBrowser docs assistant. You answer questions about VibeBrowser
using ONLY the documentation chunks provided in the retrieval context.

Rules:
- If the answer is in the provided context, answer directly and cite the URL of
  the chunk(s) you used. Citations look like: [docs.vibebrowser.app/headless].
- If the answer is NOT in the provided context, say so plainly. Do not guess.
  Offer to escalate to support@vibebrowser.app.
- Escalate (suggest the "Talk to a human" button) when the question is about:
  billing or refunds, an account-specific issue (the user references their
  account, an API key, a workspace), a suspected bug, or a feature request.
- Tone: direct. Fragments OK. No "I'd be happy to help!" filler. No emoji.
- Never invent API endpoints, flags, or configuration keys. If a flag is not
  in the context, say "I do not see that flag in the docs — want me to
  escalate?".
- Code blocks: copy verbatim from the docs. Do not paraphrase code.
```

The "do not invent API endpoints" line came from a real incident in week one — the bot hallucinated a `--profile-name` flag that did not exist. The customer filed an issue. We tightened the prompt and added an automated eval against the docs as ground truth.

## The Escalation Flow

This is the part I find most interesting. The chat is a deflection layer. Escalation is where it hands off to the rest of the company — which, again, is mostly agents.

Trigger conditions, either of which fire the escalation UI:

- The customer clicks "Talk to a human" in the chat widget.
- The bot detects an escalation trigger from the system prompt (billing, account, bug, feature request).

When triggered, the widget collects:

- Customer email.
- The original question (the first turn in the conversation).
- The bot's best attempt (the last bot turn before escalation).
- The full conversation transcript.
- Page URL the chat was opened from.
- A session id and a hash of the conversation for deduplication.

That payload is POSTed to `/api/support/escalate`. The gateway does two things:

1. Sends an email to `support@vibebrowser.app` with a structured subject: `[chat-escalation] <hash> <one-line summary>`.
2. Applies the Gmail label `chat-escalation` via the Gmail API so the message is filterable in the inbox.

Representative email body:

```text
Subject: [chat-escalation] a1b2c3 Headless mode failing on Ubuntu 24.04

Customer: alice@example.com
Page: https://docs.vibebrowser.app/headless
Session: 7f3...
Time: 2026-04-09T18:22:11Z

Original question:
> I'm trying to run vibebrowser --headless on Ubuntu 24.04 and it crashes
> immediately. Same command works on 22.04.

Bot's best attempt:
> The docs cover headless mode on Ubuntu 22.04 (link). I don't see specific
> guidance for 24.04 in the docs. This looks like a possible bug — want me
> to escalate?

Conversation transcript:
[full transcript]
```

Jared Dunn picks it up. His [AGENTS.md runbook](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) already covers customer email triage — he owns `support@vibebrowser.app`. The new `chat-escalation` label just means: this came in pre-contextualized; read the transcript before responding.

What he does next is the normal flow:

- Read the transcript. The bot already did the docs lookup, so he does not redo it.
- Look up the customer in Stripe if it is a billing question.
- Check Sentry if the transcript mentions an error. His runbook has the direct API call: `curl -sS "https://sentry.io/api/0/projects/vibebrowser/vibe-api-gateway/issues/?query=is:unresolved..."`.
- If it is a bug, hand off to `@GilfoyleBertram` (SoftwareEngineer, DeepSeek-V4-Flash) via Slack @mention, per his [handoff matrix](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team).
- If it is an infrastructure issue, hand off to `@ReleaseEngineer` (Einstein, DeepSeek-V4-Flash).
- Draft and send the reply from `support@vibebrowser.app`. The customer sees a regular human-toned email.

The customer never sees the boundary. They see: chat with a bot → bot says "let me escalate, you'll hear back by email" → email arrives an hour later from a person named Jared Dunn at support@vibebrowser.app → resolution. That continuity matters more than I expected.

## From Escalation Email to Linear Issue

The escalation email is the start of the trail, not the end. For anything bug-shaped — anything where the right resolution is "fix the product" rather than "answer the question" — Jared Dunn creates a Linear issue before he replies to the customer.

The mechanical flow:

1. Jared reads the `[chat-escalation]` email in `support@vibebrowser.app`.
2. He classifies: docs gap → answer in email, no Linear; bug → Linear issue with `bug` label; feature request → Linear issue with `feature-request` label; account-specific issue → Linear issue with `account` label.
3. For the latter three, he calls `linear_issue.create` with a structured description: customer email, exact symptom, reproduction steps if the transcript supplies them, environment (page URL, plan, version where known), severity, and a link back to the escalation email thread in Gmail.
4. He posts the Linear issue URL back into the email thread so the link survives — when the customer replies a week later, the next agent (or me) can jump straight to the issue.
5. He replies to the customer with an acknowledgment, a one-paragraph summary of what he is doing, and the Linear issue link (publicly visible projects only — internal issues stay internal).

When `@GilfoyleBertram` closes the implementing PR linked to the Linear issue, the issue moves to **Done**, Jared gets a Slack mention from the Linear webhook, and he sends the customer a status update through the same Gmail thread. One ticket, one trail, two automatic notifications — no manual stitching.

The full mechanics of the Linear pipeline (templates, MCP tooling, the reverse path from PR close to customer notification) are documented in the Linear customer support pipeline post (published May 2026). The docs chat is one of four sources that feed it.

## Why Azure, Not OpenAI Direct, Not Anthropic

We are generally model-agnostic. Our coding agents route across GPT, Claude, DeepSeek, Gemini through LiteLLM. We recently [moved operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash). Why pick one cloud for the docs chat?

Three reasons, ranked by how much they actually drove the decision:

1. **Azure AI Search + "On Your Data" is the cleanest off-the-shelf RAG path.** We did not have to build the retrieval glue. The "On Your Data" pattern wires Azure AI Search to Azure OpenAI as a first-class feature — one API call returns a grounded response with citations attached. We could have built this on top of pgvector + an OpenAI client and done a fine job. We have done that for other surfaces. This was not a place we wanted to maintain RAG plumbing.
2. **The data-path story for B2B procurement.** When a customer asks "what's the data path? Where does my support question go? Is it used to train models?" — having a single Azure resource group with a clear "no training" configuration is a much shorter answer than "well, we use these five providers depending on..."
3. **Model swap-ability is preserved.** Azure OpenAI ships the recent GPT-4o/GPT-5.x family. We can A/B route to other providers through our LiteLLM gateway for evals without rebuilding the retrieval layer.

For the operations agents — Jared Dunn (SupportEngineer, DeepSeek-V4-Flash), Gilfoyle Bertram (SoftwareEngineer, DeepSeek-V4-Flash), Einstein (ReleaseEngineer, DeepSeek-V4-Flash) — model-of-the-month matters because they reason about incidents and code. For the docs chat, what matters is that retrieval is good, grounding is enforced, and the answer is consistent. Those are different problems.

## Evidence It Works

We do not have deflection metrics yet — the chat has been live for less than a month. The 70% hypothesis comes from comparable RAG deployments on similar doc-heavy surfaces, not our own data. We will publish real numbers after 30 days of traffic; if deflection is nowhere near 70%, that will be in the post too.

What we do have: escalation volume since launch is lower than the pre-chat email rate to `support@vibebrowser.app` for setup questions. That is anecdotal, not a controlled measurement. Take it as a directional signal, not a result.

## What Does Not Work Yet

This is the part I always want from other people's blog posts, so I will pay it forward.

**Freshness on high-churn pages.** The indexer runs on every push to `main`, but pages like pricing and release notes can lag the live site by minutes to hours depending on push frequency. The canonical pricing page is now fetched live (cached for 5 minutes), but other high-churn pages are still index-only. A scheduled freshness check for flagged pages is on the roadmap.

**Multi-turn context across sessions.** Session id is stored in `localStorage`. If a customer opens a new browser tab, the conversation resets. Returning customers with unresolved issues have to re-explain. We have not wired persistent session storage yet.

**Escalation transcript linkage.** When a customer replies to the escalation email and then returns to the chat, the two threads are not linked. The agent has the email thread; the chat has the session. Bridging them requires matching the customer email to the session id on both sides — not done.

**Hybrid retrieval latency.** Running both BM25 and vector search on every query adds latency compared to vector-only. On P95 this is acceptable; on P99 it is visible. We have not tuned the query unit budget or added a cache layer for repeated questions yet.

**System prompt eval coverage.** The automated eval runs on prompt changes but not on doc changes. A doc update that contradicts a previously-safe answer will not be caught until a customer surfaces it.

## What Comes Next

Two things on the near roadmap:

1. **Feed escalations back into the docs.** Every time Jared Dunn answers an escalation, the answer is a candidate doc addition. We are wiring his response stream into a weekly "docs PR" workflow where Gilfoyle Bertram (SoftwareEngineer) drafts a PR against `docs/` from his closed tickets. The docs chat then gets smarter without anyone explicitly writing FAQ entries.
2. **Multi-turn escalation continuity.** Right now, when escalation fires, the conversation transitions to email. We are sketching a version where the chat stays open and Jared Dunn's email reply is also surfaced in the chat thread, so the customer can keep chatting in the same UI. That requires linking the chat session id to the email thread on both sides; not hard, just not done.

The bigger arc is the same one this blog has been describing for six months. The company is a small set of well-defined agents, each owning a service. The [docs chat is now one of those services](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team). It deflects the questions it can. It hands off the ones it cannot to an agent who can. The customer sees one company.

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies as an AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup) — the series root
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode) — coding stack
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents) — the first ops attempt
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team) — Jared Dunn and the OpenClaw team are defined here
- **[Docs Support Chat with Azure AI RAG →](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)**
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app) — the other support surface
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash) — model routing for ops
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman) — keeping the bill sane
- [Linear Customer Support Pipeline: From VibeBrowser Co-Pilot to Jared Dunn](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot) — where escalations become tracked work
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

Other relevant posts:

- [OpenClawBot Team Profiles and Operations Playbook](/blog/openclawbot-team-profiles-operations-playbook)
- [Reflection and the Verification Layer](/blog/reflection-verification-layer)
- [March 10–15, 2026 Release Notes](/blog/march-10-15-2026-release-notes)
- [Vibe May 2026 Progress Update](/blog/vibe-may-2026-progress-update)

External framing: the YC talk on [self-improving companies built with AI](https://www.youtube.com/watch?v=t-G67yKAHBQ) is the playbook we are running.

*Previous in series: [Six Months of Momentum →](/blog/2026-03-17-6-months-momentum)*
