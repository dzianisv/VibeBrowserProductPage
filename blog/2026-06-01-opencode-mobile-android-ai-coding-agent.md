---
title: "OpenCode Mobile for Android: Control Your AI Coding Agent from Your Phone"
description: "OpenCode Mobile is a free, open-source Android app that lets you control your self-hosted opencode AI coding agent from anywhere. Real-time streaming, diff viewer, tool approval — all from your phone."
date: "2026-06-01"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - opencode
  - android
  - mobile
  - ai-coding
  - self-hosted
  - open-source
  - vibe-technologies
published: true
---

I spend a lot of time away from my desk. The AI coding agents keep running. I needed a way to supervise them — review what they're doing, approve tool calls, redirect a stuck session — without being glued to a laptop.

[OpenCode Mobile](https://agentlabs.cc/opencode) is what we built for that.

## What it does

OpenCode Mobile is an Android app that connects to a self-hosted [opencode](https://github.com/sst/opencode) server. You run `opencode serve` on your laptop (or any machine), then connect the app over your local network, a Cloudflare Tunnel, ngrok, or Tailscale. The server does the heavy lifting; the app is a thin client that gives you full control.

**Real-time streaming chat.** Token-by-token output as the agent thinks and responds. You see exactly what Claude, GPT-4, or Gemini is doing as it happens — not a progress spinner, not a "generating..." message.

**File diff viewer.** Before the agent writes anything, you see a side-by-side diff. Every proposed change is reviewable before it lands.

**Tool call approval.** Shell commands, file writes, API calls — the app shows you each tool call and asks you to approve or reject it. The agent waits.

**Multi-session management.** Switch between active coding sessions. Pick up where you left off. Start something new on the commute home.

**Biometric unlock.** Face recognition or fingerprint protects the app and gates individual sends. Nothing leaves your phone without confirmation.

## Why self-hosted matters

The cloud AI coding tools all have the same shape: your code leaves your machine, hits their servers, comes back as a suggestion. Your repo is in their logs. Your API keys are in their billing pipeline.

OpenCode Mobile connects directly to your machine. Your code and your API keys go from your phone to your server — a path you control. Agent Labs never sees your prompts or your code.

This matters even if you trust the vendors today. Architecture choices lock you in. A self-hosted stack keeps you free to swap models, change providers, or run locally when you need to.

## Getting started

1. Install opencode on your laptop: `npm install -g opencode-ai && opencode serve`
2. [Install OpenCode Mobile from Google Play](https://play.google.com/store/apps/details?id=cc.agentlabs.opencode) (currently in internal testing — join the tester program or build from source)
3. Add a connection in the app (LAN: `http://192.168.x.x:4096`, or a tunnel URL)

For remote access from outside your home network, Cloudflare Tunnel is the zero-config option: `cloudflared tunnel --url http://localhost:4096`. Free, works through NAT and firewalls, no account required.

## The architecture

```
OpenCode Mobile (Android)
    │
    │  HTTP + Server-Sent Events
    │  LAN / Cloudflare Tunnel / ngrok / Tailscale
    ▼
opencode server (your laptop / VPS)
    │
    │  API calls with your keys
    ▼
Claude / GPT-4 / Gemini / Local LLMs
```

The app speaks the opencode wire protocol directly. No relay, no proxy, no Agent Labs infra in the middle.

## Open source, MIT license

[The code is on GitHub](https://github.com/dzianisv/opencode-mobile). MIT licensed. No telemetry you didn't opt into, no ad network, no feature gates. If you want something changed, open a PR.

The project is early — in active development with iOS support on the roadmap. Contributions are welcome.

---

*OpenCode Mobile is built by [Agent Labs](https://agentlabs.cc) as part of the Vibe Technologies AI-native stack.*
