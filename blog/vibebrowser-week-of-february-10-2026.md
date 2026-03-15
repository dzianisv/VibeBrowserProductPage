---
title: "Week of February 10: MCP Remote Control, OpenRouter Free Models, and Tab Groups"
description: "VibeBrowser launches MCP protocol support for remote AI control, OpenRouter integration with free models, Chrome tab groups, and wildcard TLS infrastructure."
date: "2026-02-16"
author: "Vibe Product Team"
tags:
  - product-update
  - release-notes
  - mcp
  - openrouter
  - tab-groups
  - remote-control
  - free-models
published: true
slug: vibebrowser-week-of-february-10-2026
---

The biggest architectural leap in VibeBrowser's history: your browser is now controllable from any AI tool that speaks MCP, and you can run it with free models.

## Control your browser from Claude, Cursor, or any AI tool

VibeBrowser now implements the **Model Context Protocol (MCP)** — the open standard for connecting AI agents to tools. This means you can drive your browser from Claude Desktop, Cursor, Windsurf, OpenCode, or any other MCP-compatible AI assistant.

What this unlocks:

- **Your coding agent gets a browser.** Writing a web scraper? Testing a UI? Your AI assistant can now open pages, click buttons, fill forms, and take screenshots — all through MCP.
- **Remote relay mode.** The MCP server connects over a secure relay, so your AI tools can control a browser running on a different machine.
- **Rich tool responses.** Every MCP tool call returns the page content and open tab list alongside the action result, so the AI always has full context.

This turns VibeBrowser from a standalone extension into **web infrastructure for any AI agent**.

## Free AI models with OpenRouter

**OpenRouter** is now a first-class provider in VibeBrowser. Connect your account in Settings and access hundreds of models — including several that are **completely free**.

The free tier defaults to **Kimi K2 Thinking**, a capable reasoning model that handles complex web tasks at zero cost. No credit card, no trial period — just connect and start automating.

## Chrome tab groups

The agent now creates **Chrome tab groups** for the tabs it opens. Your agent-controlled tabs are visually separated from your personal browsing, so you always know which tabs the AI is managing.

## @ tab mentions deliver content

When you @ mention a tab in the chat, VibeBrowser now passes the **actual page content** to the agent — not just the URL. This means you can say "@Documentation explain how this API works" and the agent reads the full page.

## Wildcard TLS

All VibeBrowser services now use **wildcard TLS certificates** for `*.api.vibebrowser.app`. This means every sub-service gets automatic HTTPS without manual certificate management — more secure and easier to scale.

## Under the hood

- Added Sentry error reporting across all browser tools
- Fixed Chrome Web Store redirect URI for Google OAuth
- Improved MCP server test reliability
- Stable extension ID via manifest key for consistent behavior across installs
- GPT-5.2 Codex deployments expanded to more regions
