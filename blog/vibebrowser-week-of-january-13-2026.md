---
title: "Week of January 13: Voice Control, Text-to-Speech, and Google Workspace Automation"
description: "VibeBrowser adds voice input with auto-submit, text-to-speech AI responses, Gmail and Calendar automation, and cross-session memory — all in one week."
date: "2026-01-19"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - voice-control
  - text-to-speech
  - google-workspace
  - gmail
  - calendar
published: true
slug: vibebrowser-week-of-january-13-2026
---

A hands-free AI browser just got real. This week VibeBrowser shipped voice control, text-to-speech, and the first round of Google Workspace automation.

## Talk to your browser, hear it respond

VibeBrowser now listens. Click the microphone icon, speak your request, and the agent starts working immediately. After three seconds of silence it auto-submits — no need to press Enter.

And it talks back. Text-to-speech reads the agent's responses aloud, so you can start a task, look away, and hear the result. Together these features make VibeBrowser genuinely hands-free.

## Gmail and Calendar automation

The agent can now work with your Google apps:

- **Send emails from Gmail** — compose and send messages by telling the agent what to write and who to send it to
- **Manage your calendar** — create, update, and delete events with natural language instructions
- **Delete calendar events** — a new `calendar_delete` tool handles cleanup tasks

These run through Google's official APIs with proper OAuth consent, so you control exactly what VibeBrowser can access.

## Cross-session memory

A new **session history tool** gives the agent awareness of what happened in previous browsing sessions. If you researched something yesterday and come back today, the agent can recall that context instead of starting from scratch.

## Better visual feedback

The chat interface got a quality-of-life upgrade: the old stop button now shows a **spinning loader** during processing, so you always know when the agent is working versus waiting for input.

## Under the hood

- Extended timeouts for slower models like GPT-5 Mini on multi-site tasks
- Fixed duplicate session restoration entries
- Added login handling instructions to the agent's system prompt
- Improved error message extraction to prevent crashes on undefined errors
