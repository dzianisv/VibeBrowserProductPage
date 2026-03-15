---
title: "Week of March 3: Accessibility Tree, GPT-5.3 Codex, and a Fresh Chat Design"
description: "VibeBrowser adds accessibility-tree element targeting for reliable automation, GPT-5.3 Codex support, dynamic model lists, a redesigned chat interface, and Stripe health monitoring."
date: "2026-03-09"
author: "Vibe Product Team"
tags:
  - product-update
  - release-notes
  - accessibility
  - gpt-5
  - codex
  - ui-redesign
  - dynamic-models
  - stripe
published: true
slug: vibebrowser-week-of-march-3-2026
---

A big leap in how the agent sees web pages, a new model, and a chat interface that feels modern — all in one week.

## Accessibility tree targeting: the agent finally sees pages like a human

This is one of the most important technical changes we have shipped. VibeBrowser now extracts the **full accessibility tree** of every page and assigns unique IDs to each interactive element.

Why this matters for you: the agent no longer relies on fragile CSS selectors to find buttons, links, and form fields. Instead, it uses the same semantic structure that screen readers use — which is far more stable across page updates, A/B tests, and different site versions.

The result: **clicking the right button, filling the right field, and navigating menus works more reliably** on real-world websites. If you have ever seen the agent click the wrong element, this fix addresses the root cause.

## GPT-5.3 Codex and dynamic model lists

**GPT-5.3 Codex** is now available — OpenAI's newest code-optimized model, with stronger multi-step reasoning and better instruction following for complex browser tasks.

And you no longer need an extension update to see new models. VibeBrowser now loads **dynamic model lists** from the backend, so when we deploy a new model, it appears in your dropdown immediately. No more stale model selectors.

## Redesigned chat interface

The chat page was **restyled from the ground up** with a cleaner, more modern layout inspired by Gemini's UI conventions. Key improvements:

- Less visual clutter during long sessions
- Better tool-call visibility — you can see what the agent is doing without expanding every action
- Compact model selector that shows available models by tier
- Processing status that collapses gracefully so it doesn't dominate the screen

## Free tier gets Kimi K2.5 Thinking

The default model for free-tier users is now **Kimi K2.5 Thinking** — a significant upgrade in reasoning capability at zero cost. If you are using VibeBrowser without a paid plan, your agent just got noticeably smarter.

## Proactive Stripe monitoring

A new **webhook health monitor** continuously checks that subscription events flow correctly. If payment processing has an issue, our team is alerted before any user is affected.

## Under the hood

- Added settings and settings_list tools so the agent can read and adjust its own configuration
- Microphone permission is now requested before voice recognition starts (fixes a browser prompt issue)
- Fixed session replay to correctly show tool calls from previous sessions
- Stabilized E2E tests across all subscription tiers
- Improved LiteLLM retry logic for transient failures
