---
title: "VibeBrowser Progress Update: Late April 2026"
description: "Major improvements across comparison tables, Google Workspace, extraction, and partnerships."
date: "2026-04-27"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - "Product Updates"
  - "Google Workspace"
  - "Extraction"
  - "Partnership"
published: true
---

It's been a packed few weeks at VibeBrowser. Here's what's new.

## Product Page Updates

### Comparison Table Overhaul

We've completely refreshed our comparison table:

- **Added Claude for Chrome** — Anthropic's new browser extension is now in the comparison, sourced directly from official docs.
- **Replaced Operator with Atlas** — OpenAI's AI-native browser (macOS app with Agent Mode) replaces the deprecated Operator research preview.
- **Updated model references** — Changed outdated "Grok-4.1 Fast Reasoning" to "Grok 4" and "GPT-5.4" to "GPT-5" across the entire site.

### LaMooM Partnership

Added LaMooM to our About Us page. LaMooM is a B2B AI assistant widget built on OpenClaw, demonstrating how our technology enables partners to build embeddable AI products.

## Core Engine Improvements

### Google Workspace Expansion

We've significantly expanded Google Workspace integration:

- **Google Drive tools** — Read, list, upload, and manage files in Drive
- **Google Docs tools** — Create and update documents  
- **Google Sheets tools** — Read and write spreadsheet data
- **Scope alignment** — Properly configured OAuth scopes for all new capabilities

This means Vibe can now automate end-to-end workflows across Gmail, Calendar, Drive, Docs, and Sheets.

### Extraction Improvements

Major refinements to page content extraction:

- **Unified CDP a11y-to-markdown** — Single extraction pipeline for all content types
- **Form field capture** — Now extracts form fields that markdown extractor was missing
- **PDF size limit** — Added 50MB limit to prevent service worker crashes
- **Empty contenteditable nodes** — Now enriched with DOM text for better extraction

### Bug Fixes

- **X.com bot detection** — Bypassed with `--enable-automation` flag
- **Domain-scoped cookie deletion** — Replaced global cookie wipe with precise domain deletion
- **Sidepanel always opens** — Extension icon click now consistently opens sidepanel
- **Model switch state** — ReactGraph properly updates modelName on model changes

## What's Coming

We're working on:

- **Cloud agent relay** — Secure relay so cloud agents can orchestrate your local browser with explicit approvals
- **Managed OpenClaw assistant** — Cloud-hosted personal assistant connected to your local Vibe browser
- **Expanded MCP integrations** — More agent platforms integrated

Stay tuned for more updates.

---

Questions? Reach out at [info@vibebrowser.app](mailto:info@vibebrowser.app) or join our [Telegram community](https://t.me/VibeBrowser).