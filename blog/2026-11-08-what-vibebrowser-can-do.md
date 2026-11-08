---
title: "What VibeBrowser Can Do: A Local Model, Your Logged-In Browser, and MCP"
description: "VibeBrowser is a Chrome co-pilot that works in the browser you are already logged into: an on-device Gemma 4 model, an MCP server other agents can drive, and integrations with Gmail, Calendar, Notion, Slack, and GitHub."
date: "2026-11-08"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product
  - MCP
  - on-device
  - integrations
published: true
---

VibeBrowser is an AI co-pilot that works inside the Chrome you are already logged into: you describe a task in plain words, and it opens pages, clicks, types, and reads content in your real browser session to get it done.

![The Vibe AI home screen: "What do you want to automate?"](/images/vibe-home.png)

Most browser automation starts from a separate, empty browser. Tools like Playwright MCP and Chrome DevTools MCP launch their own browser instance by default, with none of your logins in it. VibeBrowser starts from the opposite end. It is a Chrome extension, so the agent works in the browser where your accounts are already signed in, with your tabs, cookies, and extensions intact. There is no second profile to maintain and nothing to log into again.

## The local model: Gemma 4 on your machine

On a WebGPU-capable computer, the agent can run on Google's Gemma 4 E2B, a model downloaded once (3.13 GB) that runs locally in the browser. It is the default for signed-out Auto mode, and signed-in accounts can turn on private mode so their chats and page content stay on the device — anonymous usage stats are still sent. The full story, including the larger E4B model and exactly where the limits are, is in [Vibe now runs offline with Gemma 4](https://www.vibebrowser.app/blog/2026-10-08-vibe-runs-offline-with-gemma-4-private-and-free).

![VibeBrowser settings: AI & Models, with Gemma 4 E2B and E4B as on-device models](/images/vibe-on-device-models.png)

## MCP: your browser as a tool for other agents

VibeBrowser is also an MCP server. Turn on external agent control in the extension, and assistants such as Claude, Cursor, and Codex can drive your browser through 25+ tools: navigating, clicking, filling forms, taking snapshots and screenshots, spawning sub-agents with isolated context, and running tool calls in parallel. The connection runs two ways — locally on your machine, or through a hosted relay when the agent runs somewhere else. Every tool is classified as a read, a write, or a sensitive write, and sensitive writes need your approval, one use at a time.

The setup for each client is documented:

- [VibeBrowser MCP](https://www.vibebrowser.app/mcp) — the hosted endpoint, the full tool list, and per-client configuration.
- [Connect OpenClaw to your browser](https://www.vibebrowser.app/openclaw) — one `mcpServers` entry in OpenClaw's config.
- [Connect Muse (Meta AI) to your browser](https://www.vibebrowser.app/muse) — one prompt in the Muse app, with the session ID pasted only on Muse's secure card.

The OpenClaw and Muse pages are setup guides; as those pages say themselves, their end-to-end verification is still in progress.

The connection also runs in the other direction: inside VibeBrowser's settings you can add remote MCP servers (SSE transport), and the co-pilot gains access to their tools.

![VibeBrowser settings: Browser MCP Server, connected through the relay](/images/vibe-browser-mcp-server.png)

## Integrations: Gmail, Calendar, Notion, Slack, GitHub

There are two connection paths, for two different jobs. The Google Workspace connection is a direct grant from your Google account: it lets the built-in co-pilot search Gmail, draft messages, and create Google Calendar events. For agents connected over MCP, the Workspace tool set is wider — Gmail search, reading, drafting, and sending, plus Calendar viewing, creating, and deleting.

A separate Integrations switch lets the co-pilot use Gmail, Google Calendar, Notion, Slack, and GitHub on your behalf. Those connections are held server-side; the only credential the extension sends is your Vibe sign-in.

![VibeBrowser settings: Connected MCP Servers, Google Workspace, and Integrations](/images/vibe-integrations.png)

## A credential vault whose secrets never reach the model

Login tasks need passwords, and pasting them into a chat is a bad way to handle them. VibeBrowser keeps an encrypted credential vault on your device — AES-256-GCM, unlocked by a master password you choose. An agent can see the names of saved entries, but never the secret values: when a task reaches a login form, a type-in tool fills the credential from the vault without exposing it to the model.

Settings also include a skills library, so a workflow that works once can be saved and reused, and debugging views that show the agent's reasoning steps and tool calls when you want to see what it is doing.

![VibeBrowser settings: the encrypted Credentials vault and Debugging options](/images/vibe-credentials-vault.png)

## The short version

One extension gives you an agent in your own logged-in browser, a local Gemma 4 model when you want the work to stay on your machine, an MCP endpoint other agents can drive, and integrations that let it act in Gmail, Google Calendar, Notion, Slack, and GitHub on your behalf. It is free to install; paid plans are optional. Start with the [MCP page](https://www.vibebrowser.app/mcp) if you want to connect an agent you already have, or just install it and ask it to do something in the browser you have open.
