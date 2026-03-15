---
title: "Week of March 10: Run Your Own Models, Smarter Tab Control, and a Cleaner Agent"
description: "This week Vibe added Ollama self-hosted LLM support, fixed multi-tab reliability, improved handling of tricky UI controls, and streamlined the browser tool surface."
date: "2026-03-15"
author: "Vibe Product Team"
tags:
  - product-update
  - release-notes
  - ollama
  - self-hosted
  - multi-tab
  - mcp
  - reliability
published: true
---

This was a big week. Here is what shipped and why it matters.

## Run your own models with Ollama

The headline feature: **Vibe now works with Ollama**, so you can run browser automation entirely on your own hardware with open-weight models — no API keys, no cloud dependency, no data leaving your machine.

Why this matters:

- **Privacy by architecture.** Your prompts, page content, and browsing context stay on your device. There is nothing to trust because nothing is sent anywhere.
- **No usage costs.** Once the model is downloaded, every task is free. Run as many workflows as your hardware allows.
- **Works offline.** No internet connection needed after the initial model download.

The setup is simple: install Ollama, pick a model, and Vibe connects automatically. The settings page detects Ollama on your machine, shows which models you have installed, and lets you browse and pull new ones directly from the UI. We default to **Qwen 3.5** — a strong small model that balances quality and speed on consumer hardware.

We also added hardware compatibility hints: if a model is too large for your available RAM, you will see a warning before pulling it. No more guessing whether your laptop can handle a 70B model.

## Multi-tab workflows that actually work

If you have ever asked Vibe to work across multiple tabs — research in one, fill a form in another, compare prices across three — you may have run into situations where the agent lost track of which tab it was working in, or opened duplicate tabs when connections hiccuped.

We fixed that this week with several changes that work together:

- **Working tab tracking.** The agent now maintains an explicit set of tabs it is actively using. When it switches context, it knows where it has been and what is still open.
- **No more duplicate pages.** If a network reconnect replays a "create new tab" command, the system catches the duplicate and skips it. Previously this could cascade into a loop of empty tabs.
- **Clear error messages when pages fail to load.** If a URL is unreachable, the agent now gets a specific error instead of a silent "success" with blank content. This stops the frustrating retry loops where the agent kept trying to read a page that never loaded.
- **Background tab awareness.** New tabs opened by MCP clients (like Claude Desktop or Cursor) now default to background mode, so they do not steal focus from what you are doing.

The net effect: multi-tab workflows are more reliable, and when something goes wrong, the agent knows about it instead of spinning.

## Tricky UI controls handled better

Modern web apps love custom UI components. Slack-style toggles, Material Design switches, custom dropdowns that look like buttons but are not — these are everywhere, and they break most browser automation tools because they do not use standard HTML semantics.

Vibe now handles these better:

- The agent detects interactive elements by their visual behavior (like `cursor: pointer` CSS), not just by their HTML role.
- When standard click strategies fail, the agent automatically falls back to direct JavaScript execution to toggle the control.
- Web app-specific patterns (like `[data-qa]` attributes used by Slack, Salesforce, and others) are now recognized as interactive elements.

This means fewer "I can't find that button" moments when working with real business tools.

## MCP integrations are faster and more resilient

For users connecting Vibe to AI coding tools like Claude Desktop, Cursor, or VS Code Copilot via MCP:

- **Click, fill, and type actions now have proper timeouts.** Previously, if a page was slow to respond, these actions could hang indefinitely and make your MCP client think the connection died. Now they complete with a clear status.
- **Partial success reporting.** If an action succeeds but extracting the resulting page content is slow, you get the action result immediately with a note that content is still loading. No more waiting 30 seconds for a click confirmation.
- **`get_page_markdown` tool.** A new tool that extracts clean markdown content from the current page — useful for feeding page content into your LLM workflow.

## A simpler, more consistent tool surface

We cleaned house on the agent's tool inventory:

- **Removed `switch_to_page`** — every tab-aware tool already accepts a `tabId` parameter, making a dedicated switching tool redundant and confusing for agents.
- **Standardized tool names** around a page-centric vocabulary (`list_pages`, `new_page`, `navigate_page`) instead of the old tab-centric names.
- **Removed 7,200 lines** of legacy standalone CLI tooling that duplicated the extension's capabilities. Vibe is a browser extension — the code now reflects that single focus.

For users, this means the agent makes fewer mistakes choosing between similar tools, and error messages actually reference tools that exist.

## GPT-5.4 support

GPT-5.4 is now available as a model option in Vibe, deployed on our infrastructure for MAX tier users. If your browser tasks need the strongest available reasoning — complex multi-step workflows, ambiguous UI states, tasks where a wrong click is expensive — this is the model to pick.

## What is next

We are continuing to improve:

- Model routing intelligence — automatically picking the right model for the task complexity
- Ollama performance tuning for browser-specific workloads
- More eval coverage on real-world business tool workflows

---

Update your extension from the Chrome Web Store or install it at [vibebrowser.app](https://vibebrowser.app). If you are using Ollama, check our [self-hosted LLM setup guide](https://docs.vibebrowser.app/self-hosted-llm/ollama) to get started.
