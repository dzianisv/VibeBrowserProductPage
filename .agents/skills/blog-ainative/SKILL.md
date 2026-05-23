---
name: blog-ainative
version: 0.1.0
description: >
  Use this skill when writing or editing blog posts for the #ainativecompany series
  on vibebrowser.app. Governs voice, structure, tags, evidence requirements, and
  anti-patterns. All posts must be short, technical, honest, and useful to a
  reader who wants to run a similar setup.
category: content
tags: [blog, ainativecompany, content-strategy, technical-writing]
recommended_skills: [google-analytics, absolute-seo, growth-hacking]
platforms:
  - claude-code
  - gemini-cli
  - openai-codex
license: MIT
maintainers:
  - github: dzianisv
---

# Blog: AI-Native Company Series

Posts about running Vibe Technologies — a one-human, multi-agent company. The
audience is technical founders and developers who want to do the same thing or
learn from someone who already did.

---

## Core values

**Short.** No post needs to be long. If it takes more than 5 minutes to read,
cut it. Readers skip walls of text.

**Technical.** Real code, real config, real commands. If you can't show the
implementation, the post is an opinion piece — label it accordingly.

**Honest.** Every post ends with "What Does Not Work Yet." A blog that only
reports wins is marketing, not documentation. Readers trust the honest version.

**Useful.** A reader should walk away with something they can copy, adapt, or
link back to. Opinion with no actionable conclusion wastes everyone's time.

**No AI slop.** Write like a smart human who types fast. No hedging, no filler,
no em-dashes as a crutch, no "In conclusion." Get to the point in sentence one.

---

## Voice rules

**DO:**
- Lead with the thing you built or changed. Not background. Not motivation.
- Name specific tools, models, versions. "We switched to DeepSeek-V4-Flash" beats
  "We switched to a faster model."
- Show the actual failure before the fix. Readers learn from failures.
- Use first person, past tense for what happened. Present tense for what is true now.
- One clear CTA at the end (email, GitHub, follow-up post).

**DO NOT:**
- "In this post, I will..." — start with the content, not the table of contents.
- "As an AI-native company, we believe..." — state what you did, not what you believe.
- "It's important to note that..." — if it's important, just say it.
- Vague agent descriptions ("our AI handled it") — name the agent, name the model.
- Future promises ("we plan to...") — mention in "What Does Not Work Yet" only,
  and only if there is a concrete next step.
- Explaining what a tool is if a link suffices. Link, don't explain.

---

## Required sections (in order)

Every #ainativecompany post needs:

1. **One-paragraph plain-English summary** — the "my mom could understand it" version.
   Explain what was built and why in 2-4 sentences. No jargon. Goes right after the
   frontmatter, before any headers.

2. **The problem** — what was broken or missing. Be specific. Include the pain: latency
   numbers, error messages, ticket counts, cost figures.

3. **What we built / what changed** — implementation. Code blocks, ASCII diagrams,
   config snippets. Not pseudocode — real, runnable artifacts.

4. **Evidence it works** — latency numbers, before/after, screenshots, GA metrics.
   If you have none, say so explicitly.

5. **What Does Not Work Yet** — honest list. Every post has this section. Use bullet
   points. Be specific about the gap, not vague about future work.

6. **Related reading** — link to the full `#ainativecompany` series index at the
   bottom. Use the standard series list (see below).

---

## Evidence requirements

Every factual claim needs backing. Acceptable evidence:

| Claim type | Required backing |
|---|---|
| Latency / speed | Measured numbers or "we estimated" |
| Cost savings | Invoice delta, API cost delta, or "rough estimate" |
| Reliability | Incident count, error rate, uptime figure |
| Model behavior | Code transcript, agent output example |
| Architecture | ASCII diagram or real diagram image |
| Code behavior | Code block — real file, real function |

If you have no evidence, write "We haven't measured this yet." Do not imply certainty
you don't have.

---

## Visual / media requirements

**Screenshots:** attach for anything UI-related. Slack message from an agent, Chatwoot
conversation, Linear issue, co-pilot feedback modal. Screenshots make abstract systems
concrete. Name files `YYYY-MM-DD-description.png` and place in `public/blog/images/`.

**Diagrams:** ASCII diagrams in code blocks for pipelines and data flows. Tools like
Mermaid work too but ASCII is always renderable. Example from the series:

```
[Customer] → Chatwoot → Jared Dunn (SupportEngineer)
                              ↓
                        Linear issue created
                              ↓
                        Gilfoyle Bertram notified
```

**GitHub links:** link to the actual source file on GitHub when describing code.
Format: `[filename.ts](https://github.com/org/repo/blob/main/path/to/file.ts)`.
Do not describe code that you can link to.

**External references:** link to model release notes, official docs, GitHub repos,
Linear/Chatwoot/OpenClaw docs when first mentioned. Do not summarize what the link
already says.

---

## Frontmatter spec

```yaml
---
title: "<verb phrase describing what changed or was built>"
description: "<one sentence: who/what, what changed, why it matters>"
date: "YYYY-MM-DD"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany          # always include
  - <tool-or-platform>       # openclaw, vibebrowser, linear, chatwoot, deepseek, etc.
  - <domain>                 # customer-support, operations, model-routing, agentic-coding, etc.
  - vibe-technologies        # always include
---
```

**Tag rules:**
- Always include `ainativecompany` and `vibe-technologies`.
- Add the tool/platform tag for every named system the post is about.
- Add one domain tag. Do not keyword-stuff.
- Tags are lowercase, hyphenated.

**Standard tags used in the series:**

| Category | Tags |
|---|---|
| Always | `ainativecompany`, `vibe-technologies` |
| Platforms | `openclaw`, `vibebrowser`, `chatwoot`, `linear` |
| Models | `deepseek`, `claude`, `gpt` |
| Domains | `customer-support`, `operations`, `model-routing`, `agentic-coding`, `rag`, `support-pipeline`, `knowledge-base` |
| Agent roles | `ai-agents`, `support-engineer`, `software-engineer` |
| Other | `startup`, `founder`, `opencode`, `token-optimization` |

---

## File naming

```
YYYY-MM-DD-<slug>.md
```

Slug: lowercase, hyphens, describes the main topic. Examples:
- `2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot.md`
- `2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash.md`

Place in `blog/` directory of VibeBrowserProductPage repo.

---

## Series continuity

Every post in the `#ainativecompany` series must end with the standard series index.
Copy from the most recent post. Add the new post to the list. Maintain chronological order.

The "you are here" marker: **bold** the current post's entry.

Link the previous post at the very bottom:
```
*Previous in series: [Post Title →](/blog/slug)*
```

---

## Anti-patterns

These patterns trigger rejection:

**AI slop markers** — phrases that indicate generated filler:
- "In this post we will explore..."
- "It's worth noting that..."
- "At the end of the day..."
- "This is a game-changer..."
- "As we navigate the ever-evolving landscape..."
- Any sentence that could appear in any blog post by any company

**Vagueness** — any sentence where the reader cannot tell what was actually built:
- "We improved the latency" → "Latency dropped from 30s to 8s"
- "We use AI agents" → "Jared Dunn (GPT-5.4-mini) reads the inbox"
- "We integrated Linear" → link to the actual integration code

**Future-tense claims as present fact:**
- "Our system will handle..." — either it does or it doesn't

**Missing "What Does Not Work Yet":**
- Every post has gaps. If you can't find any, look harder.

---

## Checklist before publishing

- [ ] Plain-English summary paragraph present (2-4 sentences, no jargon)
- [ ] At least one code block, config snippet, or ASCII diagram
- [ ] At least one concrete metric (latency, cost, count) or explicit "not measured yet"
- [ ] "What Does Not Work Yet" section with ≥2 honest bullets
- [ ] No AI slop markers
- [ ] GitHub link for any code described
- [ ] Screenshot for any UI described
- [ ] Frontmatter: `ainativecompany` and `vibe-technologies` tags present
- [ ] Series index at bottom, current post bolded, previous post linked
- [ ] File named `YYYY-MM-DD-slug.md`

---

## Example: opening paragraph (good vs bad)

**Bad:**
> In this post, I want to share our journey of building an AI-native company. As
> we navigate the ever-evolving landscape of artificial intelligence, we've learned
> a lot about how to leverage these powerful tools effectively.

**Good:**
> Vibe Technologies is one human and a team of named AI agents. Anything a customer
> touches eventually crosses Jared Dunn, our SupportEngineer. Every bug and feature
> request lands in Linear. This post explains the exact pipeline between the two —
> the code, the webhooks, and the two things that still do not work.

---

## References

- Series root: [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- Agent roster: [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- OpenClaw: https://github.com/openclaw/openclaw
- Contact: dzianisvv@gmail.com
