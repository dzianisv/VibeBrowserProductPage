---
title: "What's New in VibeBrowser: January–March 2026 Product Update"
description: "Two months of shipping: MCP remote control, OpenRouter free models, Ollama self-hosted AI, Google Workspace automation, voice control, GPT-5.4 support, and much more. See everything new in VibeBrowser."
date: "2026-03-16"
author: "Vibe Product Team"
tags:
  - product-update
  - release-notes
  - mcp
  - ollama
  - openrouter
  - voice-control
  - google-workspace
  - ai-browser
  - browser-automation
  - gpt-5
published: true
slug: vibebrowser-january-march-2026-product-update
---

The last two months have been the most productive stretch in VibeBrowser's history. Over **380 updates** shipped since mid-January, touching every part of the product — from how you talk to the agent, to which AI models it runs on, to how reliably it handles real websites. Here is everything that changed and why it matters.

## Control your browser from any AI tool with MCP

The biggest architectural change: **VibeBrowser now speaks the Model Context Protocol (MCP)**, the open standard for connecting AI agents to tools. This means you can control your browser from Claude, Cursor, Windsurf, OpenCode, or any MCP-compatible AI assistant — not just from the VibeBrowser sidebar.

What you can do:

- **Connect your coding agent to a real browser.** Your AI assistant can open pages, click buttons, fill forms, read content, and take screenshots — all through a standard protocol.
- **Run automations from your terminal.** Use the `@vibebrowser/mcp` npm package to script browser tasks from Node.js or any MCP client.
- **Remote relay mode.** The MCP server works over a secure relay, so your AI tools can connect to a browser running on a different machine.

This turns VibeBrowser from a standalone tool into **infrastructure that any AI can use**. If your workflow already involves an AI coding assistant, it can now see and interact with the web through your browser.

## Use any AI model you want — including free ones

We believe you should pick the AI model that works best for your task and budget. Three new model providers shipped this quarter:

### OpenRouter: access hundreds of models, some free

VibeBrowser now integrates with **OpenRouter** as a first-class provider. Connect your OpenRouter account in Settings and you get access to hundreds of models — including several powerful ones that are **completely free** to use.

The free tier defaults to **Kimi K2.5 Thinking**, a strong reasoning model that handles complex web tasks well at zero cost. If you need more power, switch to any premium model on OpenRouter with a single click.

### Ollama: run models on your own hardware

For users who want **complete privacy** and **zero ongoing cost**, VibeBrowser now connects to Ollama. Run open-weight models like Qwen 3.5 entirely on your local machine — your data never leaves your device.

The setup experience is polished: VibeBrowser detects your local Ollama installation, shows installed models, and lets you browse and pull new models directly from the settings page.

### GPT-5.4 and the latest Azure OpenAI models

We stay current with the frontier. **GPT-5.4**, **GPT-5.3 Codex**, and **GPT-5.2 Codex** are all available, deployed on Azure OpenAI. As new models launch, we add them within days.

Dynamic model lists mean the extension always shows you what is actually available — no stale dropdowns, no guessing which models are deployed.

## Google Workspace automation that actually works

VibeBrowser can now read and write across your Google apps — Gmail, Google Calendar, Google Docs, Sheets, and Drive. This is not a demo feature; it is tested in CI against real Google accounts on every commit.

What the agent can do:

- **Read and send Gmail** — search your inbox, read messages, compose and send emails
- **Manage your calendar** — create, update, and delete events
- **Work with Drive files** — list, read, and organize documents
- **Edit Docs and Sheets** — read content, make changes

The integration uses Google's OAuth consent flow, so you authorize exactly what VibeBrowser can access. We went through Google's verification process to make this safe and official.

## Talk to your browser

Voice input is now built in. Click the microphone, speak your request, and VibeBrowser transcribes it and starts working immediately.

Key details:
- **Auto-submit after 3 seconds of silence** — no need to press Enter
- **Works alongside text input** — switch between typing and speaking naturally
- **Text-to-speech responses** — the agent can read its answers back to you

This makes VibeBrowser hands-free friendly. Start a voice command, watch the agent work, and get spoken confirmation when the task is done.

## A smarter, more reliable agent

Under the hood, the agent that drives your browser got significantly better at handling real-world websites:

### Accessibility tree targeting

VibeBrowser now extracts the **full accessibility tree** of every page, assigning unique IDs to each interactive element. Instead of guessing CSS selectors (which break constantly), the agent uses the same semantic structure that screen readers use. This makes clicking, filling forms, and navigating menus far more reliable.

### Better page understanding

The agent has multiple ways to understand what's on a page:
- **Markdown extraction** for reading text-heavy content
- **HTML snapshots** for structural analysis
- **Accessibility snapshots** for interaction planning
- **Screenshots** for visual verification

It picks the right approach for the task — reading an article uses markdown, filling a complex form uses the accessibility tree, and verifying a visual layout uses screenshots.

### Tab management that doesn't break

Multi-tab workflows used to be fragile. Now the agent tracks which tab it's working in, prevents accidental duplicates, and cleanly switches between tabs. If a task involves opening a new tab, researching something, and bringing results back — that just works now.

### Sub-agents and parallel execution

For complex tasks, the agent can spawn **sub-agents** that work in isolated contexts, and **parallel tools** that do multiple things at once. This means a task like "check prices on three different sites and compare them" can run all three lookups simultaneously.

## Agent memory (new this week)

The agent can now **remember things between tasks**. The new memory system stores facts in two categories:

- **Durable memories** — long-term facts like your preferences, account details, or recurring instructions
- **Daily memories** — session notes that capture what happened during a browsing session

You can tell the agent "remember that I prefer dark mode on all sites" or "remember my shipping address is..." and it will recall that information in future sessions. Search works by keyword matching with relevance scoring, so the agent finds the right context quickly.

This follows the same architecture as OpenClaw's memory system, so the tooling is familiar if you use other AI coding agents.

## Polished settings and UI

The settings page was redesigned to be clearer and more capable:

- **Section navigation** — jump directly to the setting you need
- **Import/export** — back up your configuration and move it between machines
- **Version indicator** — see exactly which version you're running
- **Model selector** — compact dropdown that shows available models by tier
- **@ tab references** — type `@` in the chat to reference content from another open tab

The chat interface was restyled to match modern AI chat conventions — cleaner layout, better tool-call visibility, and collapsed processing status that shows what the agent is doing without cluttering the conversation.

## Rock-solid infrastructure

A lot of the 380+ commits were about reliability — making sure VibeBrowser works consistently for every user:

- **Automated Chrome Web Store publishing** — new versions deploy automatically from our CI pipeline
- **End-to-end tests on every commit** — real browser tests verify auth, settings, tools, and multi-tier behavior
- **Proactive monitoring** — webhook health checks, API health endpoints, and alerting catch issues before users do
- **Kubernetes autoscaling** — the backend scales automatically based on demand
- **Wildcard TLS** — all services use proper HTTPS with automated certificate management

## What's next

The foundation is strong. With MCP support, multiple model providers, Google Workspace integration, voice control, and agent memory all shipping this quarter, VibeBrowser is becoming a genuine AI-powered operating layer for the web.

Coming up: deeper memory with semantic search, more third-party integrations, and continued improvements to how reliably the agent handles the endless variety of real websites.

**[Install VibeBrowser](https://vibebrowser.app)** and try it today. It's free to start with OpenRouter's free models, and you can upgrade to more powerful models whenever you're ready.
