---
title: "Install Vibe AI Browser Agent Without the Chrome Web Store"
description: "Vibe AI Browser Agent is pending Chrome Web Store review. Here's how to install the latest version directly — and automate any site you're already logged into using Claude, GPT, or Gemini."
date: "2026-06-03"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - "Browser Automation"
  - "Chrome Extension"
  - "Claude"
  - "MCP"
  - "Install"
published: true
---

Vibe AI Browser Agent is currently pending Chrome Web Store review. That means you can't one-click install from the store right now — but you can download and load it directly in about two minutes.

This post covers the direct install, what you get, and why it's worth the extra step.

## The Problem It Solves

Most AI browser automation falls apart on the first real task. You give Claude or GPT a browser — Playwright, Browserbase, a cloud session — and the moment it hits Gmail, LinkedIn, or your company's Salesforce, it gets a login page.

The issue is that those tools start a fresh, anonymous browser session. No cookies, no auth state, no stored credentials. Every protected site requires a new login flow, and most enterprise tools have 2FA or SSO that makes that painful or impossible to script.

Vibe runs inside your real Chrome, as an extension. Your AI agent uses the same browser session you already have open — logged in, with your cookies, inside your authenticated accounts.

No re-authentication. No bot detection workarounds. No credential injection.

## What It Does

Once installed, Vibe exposes your browser as an MCP (Model Context Protocol) server that any AI agent can call:

```bash
npx -y -p @vibebrowser/mcp@latest vibebrowser-mcp
```

Add it to your Claude Code config:

```json
{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
    }
  }
}
```

Your agent can now navigate pages, click, fill forms, extract content, and take screenshots — inside your real logged-in session. Works with Claude Code, Gemini CLI, OpenCode, Codex, and any MCP-compatible client.

The extension also has a built-in AI chat panel. Open it on any page and talk to Claude, GPT, Grok, or a local Ollama model directly. The model sees the current page, can interact with it, and has access to a secrets vault that injects credentials without exposing them in the prompt.

## How to Install Directly

The Chrome Web Store listing is under review. Use the direct download in the meantime.

**Step 1: Download the extension**

[Download vibe-ai-copilot-latest.zip](https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip)

**Step 2: Unzip it**

```bash
unzip vibe-ai-copilot-latest.zip -d vibe-extension
```

Or unzip it with any GUI archive tool — the resulting folder is what Chrome needs.

**Step 3: Load in Chrome**

1. Open Chrome and go to `chrome://extensions`
2. Toggle **Developer mode** on (top right corner)
3. Click **Load unpacked**
4. Select the unzipped `vibe-extension` folder

The extension appears in your toolbar. Click the icon to open the side panel and configure your AI model.

**Step 4: Connect your AI model**

Vibe supports:
- **Claude** (API key or Claude Pro subscription via claude.ai)
- **GPT-5, GPT-4o** (OpenAI API key)
- **Grok** (xAI API key)
- **Gemini** (Google AI Studio key)
- **Ollama** (local, no key required)
- **Free community models** (Kimi K2.5, GPT-5 Nano — no key required)

Go to the extension settings, paste your key, and pick a model. The free community models work out of the box with no API key.

## What You Can Do With It

A few concrete workflows once it's running:

**Automate Gmail triage.** Ask Claude to scan your inbox, label messages from specific senders, and draft replies based on your templates. Claude sees your real inbox — no OAuth setup, no Gmail API, just your existing session.

**LinkedIn research.** Give your agent a list of companies and ask it to visit each profile, extract the employee count and recent posts, and summarize. With a fresh anonymous browser this fails on the login wall. With Vibe it just works.

**CRM updates.** Ask Vibe to pull all open deals from Salesforce with close dates this quarter and paste them into a Google Sheet. Two authenticated systems, one agent task.

**Agent testing.** If you're building AI products, give your Claude Code agent a real browser for end-to-end testing. Not a headless CI session — your actual Chrome, with the auth state your staging environment needs.

## Secrets Vault

One thing worth knowing: Vibe has a secrets vault for credentials. You store a site login once, and when your agent needs it, Vibe injects the credentials directly into the page input fields. The AI model never sees your password — it's not in the prompt, not in the context window, not in logs.

This is different from giving Claude your login in the system prompt. The vault keeps secrets in your browser's local storage and delivers them at the DOM level.

## The Chrome Web Store listing

The pending review is a normal part of the extension submission process — Google reviews all extensions for compliance before publishing. We expect it to clear within a few weeks. Once it's live, you'll be able to install from the store in one click and updates will come automatically.

Until then, the direct download gets you the latest version, which includes features ahead of whatever the store would ship anyway.

[Download the extension](https://vibeextensioncdn.blob.core.windows.net/extensions/vibe-ai-copilot-latest.zip) — unzip, load unpacked, and your AI agents have a real browser.
