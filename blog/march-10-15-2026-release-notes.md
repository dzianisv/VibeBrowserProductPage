---
title: "March 10-15: Ollama, Standalone Snapshot Tools, Smarter Tab Control, and a Cleaner Agent"
description: "This week Vibe added Ollama self-hosted LLM support, standalone markdown/a11y/HTML snapshot tools, stronger multi-tab reliability, and better handling for tricky UI controls."
date: "2026-03-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
aliases:
  - week-of-march-10-2026-release-notes
tags:
  - product-update
  - release-notes
  - ollama
  - self-hosted
  - snapshot-tools
  - multi-tab
  - mcp
  - reliability
published: true
---

This week was about turning last week's page-introspection foundation into faster, more practical browser operator tools.

## Run your own models with Ollama

The headline feature: **Vibe now works with Ollama**, so you can run browser automation entirely on your own hardware with open-weight models — no API keys, no cloud dependency, no data leaving your machine.

Why this matters:

- **Privacy by architecture.** Your prompts, page content, and browsing context stay on your device. There is nothing to trust because nothing is sent anywhere.
- **No usage costs.** Once the model is downloaded, every task is free. Run as many workflows as your hardware allows.
- **Works offline.** No internet connection needed after the initial model download.

The setup is simple: install Ollama, pick a model, and Vibe connects automatically. The settings page detects Ollama on your machine, shows which models you have installed, and lets you browse and pull new ones directly from the UI. We default to **Qwen 3.5** — a strong small model that balances quality and speed on consumer hardware.

We also added hardware compatibility hints: if a model is too large for your available RAM, you will see a warning before pulling it. No more guessing whether your laptop can handle a 70B model.

## Standalone snapshot tools and better page extraction

Last week we introduced the accessibility-tree foundation and the composite [`take_snapshot`](/blog/march-3-9-2026-release-notes) flow. This week we made that foundation more usable in day-to-day agent runs with **standalone extraction tools**:

- `take_md_snapshot`
- `take_a11y_snapshot`
- `take_html_snapshot`

Those names matter because they let an agent ask for exactly the representation it needs:

- **Markdown** when it wants the readable text of the page
- **A11y tree** when it wants the interactive structure with roles, labels, and stable refs
- **HTML** when it needs the raw document shape

We also added `get_page_markdown`, which is a lightweight way to pull clean page content into an LLM workflow.

In practice, this means the agent has better options than "just dump the whole page and hope." It can reach for the right page view for the task.

## Multi-tab workflows that actually work

If you have ever asked Vibe to work across multiple tabs — research in one, fill a form in another, compare prices across three — you may have run into situations where the agent lost track of which tab it was working in, or opened duplicate tabs when connections hiccuped.

We fixed that this week with several changes that work together:

- **Working tab tracking.** The agent now maintains an explicit set of tabs it is actively using. When it switches context, it knows where it has been and what is still open.
- **No more duplicate pages.** If a network reconnect replays a `new_page` command, the system catches the duplicate and skips it. Previously this could cascade into a loop of empty tabs.
- **Clear error messages when pages fail to load.** If a URL is unreachable, the agent now gets a specific error instead of a silent "success" with blank content. This stops the frustrating retry loops where the agent kept trying to read a page that never loaded.
- **Background tab awareness.** New tabs opened by MCP clients now default to background mode, so they do not steal focus from what you are doing.

The net effect: multi-tab workflows are more reliable, and when something goes wrong, the agent knows about it instead of spinning.

## Tricky UI controls are more effective now

Modern web apps love custom UI components. Slack-style toggles, Material Design switches, custom dropdowns that look like buttons but are not — these are everywhere, and they break most browser automation tools because they do not use standard HTML semantics.

Vibe now handles these better:

- The agent detects interactive elements by their visual behavior (like `cursor: pointer` CSS), not just by their HTML role.
- When standard click strategies fail, the agent automatically falls back to `evaluate_script` to toggle the control directly.
- Web app-specific patterns (like `[data-qa]` attributes used by Slack, Salesforce, and others) are now recognized as interactive elements.
- Prompt guidance now explicitly nudges the agent toward `take_a11y_snapshot` or `take_html_snapshot` when the page uses weird non-semantic controls.

This makes the system **more effective on real app surfaces**, because the model is no longer forced to reason from the wrong representation. When the DOM is messy, the a11y tree or HTML snapshot gives it a cleaner shot at finding the right control.

## MCP integrations are faster and more resilient

For users connecting Vibe to AI coding tools like Claude Desktop, Cursor, or VS Code Copilot via MCP:

- **Click, fill, and type actions now have proper timeouts.** Previously, if a page was slow to respond, these actions could hang indefinitely and make your MCP client think the connection died. Now they complete with a clear status.
- **Partial success reporting.** If an action succeeds but extracting the resulting page content is slow, you get the action result immediately with a note that content is still loading. No more waiting 30 seconds for a click confirmation.
- **`evaluate_script` support.** Agents can now run focused page-side scripts when that is the cleanest way to inspect or manipulate the browser state.

## A simpler, more consistent tool surface

We cleaned house on the agent's tool inventory:

- **Disabled `switch_to_page`.** Every tab-aware tool already accepts a `tabId` parameter, making a dedicated switching tool redundant and confusing for agents.
- **Standardized tool names** around a page-centric vocabulary (`list_pages`, `new_page`, `navigate_page`) instead of the old tab-centric names.
- **Removed legacy standalone CLI overlap** so the product surface is more coherent for agents.

For users, this means the agent makes fewer mistakes choosing between similar tools, and error messages actually reference tools that exist.

## GPT-5.4 support

GPT-5.4 is now available as a model option in Vibe, deployed on our infrastructure for MAX tier users. If your browser tasks need the strongest available reasoning — complex multi-step workflows, ambiguous UI states, tasks where a wrong click is expensive — this is the model to pick.

## What is next

We are continuing to improve:

- Model routing intelligence — automatically picking the right model for the task complexity
- Ollama performance tuning for browser-specific workloads
- More eval coverage on real-world business tool workflows

---

Update your extension from the Chrome Web Store or install it at [vibebrowser.app](https://vibebrowser.app). If you are using Ollama, check our [self-hosted LLM setup guide](https://docs.vibebrowser.app/self-hosted-llm/ollama) to get started. If you missed the a11y-tree work that made this week's snapshot tools possible, read the [March 3-9 release notes](/blog/march-3-9-2026-release-notes).
