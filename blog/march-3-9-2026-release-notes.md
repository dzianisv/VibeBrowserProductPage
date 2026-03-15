---
title: "March 3-9: Accessibility Tree Snapshots, Stable Refs, GPT-5.3 Codex, and a Fresh Chat Design"
description: "Vibe shipped accessibility-tree extraction, the composite `take_snapshot` tool, stable page refs, GPT-5.3 Codex, and stronger cache/test coverage so agents can target pages more reliably."
date: "2026-03-09"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
aliases:
  - vibebrowser-week-of-march-3-2026
tags:
  - product-update
  - release-notes
  - accessibility-tree
  - take-snapshot
  - gpt-5
  - codex
  - ui-redesign
  - reliability
published: true
---

A big leap in how the agent sees web pages, a new model, and a chat interface that feels modern — all in one week.

## Accessibility tree snapshots: the agent finally sees the page structure that matters

This is one of the most important technical changes we shipped. Vibe now extracts the **full accessibility tree** of every page and assigns stable refs to interactive elements.

Why that matters:

- The accessibility tree keeps the parts of the page that matter for interaction — roles, labels, names, hierarchy, and actionable controls.
- It strips away a lot of the layout and markup noise that makes raw HTML hard for a model to reason about.
- Stable refs make it easier for the agent to talk about the same element across multiple steps instead of constantly re-guessing selectors.

In practice, this often gives the model a more useful representation than dumping a whole page of raw HTML. It is a more compact, interaction-focused view of the page.

## `take_snapshot` shipped as a composite tool

We also introduced **`take_snapshot`**, a composite tool that lets the agent grab multiple views of the current page in one step.

That matters because page understanding is rarely one-dimensional:

- sometimes the agent needs readable text
- sometimes it needs the interactive tree
- sometimes it needs a visual cross-check

`take_snapshot` made that possible without forcing agents to stitch together multiple ad hoc tools on their own.

## Better page targeting with stable refs

This week also hardened the way Vibe tracks page elements.

With stable refs and better round-trips:

- the agent can point to the right control more consistently
- snapshot-derived refs stay aligned better across page analysis flows
- multi-step interactions become less brittle

This is the kind of infrastructure work users do not always notice immediately, but it is what makes the browser operator feel less random and more dependable.

## GPT-5.3 Codex and dynamic model lists

**GPT-5.3 Codex** is now available — OpenAI's code-optimized model, with stronger multi-step reasoning and better instruction following for complex browser tasks.

And you no longer need an extension update to see new models. Vibe now loads **dynamic model lists** from the backend, so when we deploy a new model, it appears in your dropdown immediately.

## Redesigned chat interface

The chat page was restyled with a cleaner, more modern layout inspired by Gemini's UI conventions. Key improvements:

- less visual clutter during long sessions
- better tool-call visibility during execution
- compact model selection by tier
- processing status that collapses more gracefully during longer runs

## Why this made Vibe more effective

This week improved more than observability. It improved **effectiveness**.

Once the agent has a cleaner representation of the page, it spends less effort guessing where the real control is and more effort actually completing the task.

That is a big deal on messy real-world apps where the visible UI and the raw HTML do not line up cleanly.

## Under the hood

- Added settings and settings_list tools so the agent can read and adjust its own configuration
- Microphone permission is now requested before voice recognition starts
- Fixed session replay to correctly show tool calls from previous sessions
- Stabilized E2E tests across all subscription tiers
- Improved LiteLLM retry logic for transient failures

---

This accessibility-tree work set up the next release: standalone snapshot tools like `take_md_snapshot`, `take_a11y_snapshot`, and `take_html_snapshot`, plus better handling for custom UI controls. Read the follow-on post: [March 10-15 release notes](/blog/march-10-15-2026-release-notes).
