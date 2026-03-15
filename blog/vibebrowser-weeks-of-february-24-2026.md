---
title: "Weeks of February 24 – March 2: Reliability Sprint and Webhook Monitoring"
description: "VibeBrowser ships a focused reliability sprint: quota retry logic, MCP relay stability, webhook health alerts, and Azure Key Vault secret syncing."
date: "2026-03-02"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - reliability
  - webhooks
  - monitoring
  - azure
  - mcp
published: true
slug: vibebrowser-weeks-of-february-24-2026
---

Sometimes the most important work is making everything you already built more reliable. This two-week stretch was a focused sprint on resilience, monitoring, and operational confidence.

## Smarter error recovery

AI API calls sometimes hit quota limits or transient failures. VibeBrowser now **automatically retries quota-exceeded errors** with exponential backoff, so temporary rate limits don't interrupt your workflow. You won't even notice — the agent pauses briefly and continues.

The MCP relay also got stability improvements: pending requests are now properly **cleaned up on disconnect**, preventing ghost connections from consuming resources.

## Proactive webhook monitoring

For users on paid tiers, subscription events flow through Stripe webhooks. We added **proactive health monitoring** that alerts our team when webhook delivery degrades, before it affects any user. If a webhook endpoint goes down, we know in minutes — not hours.

## Azure Key Vault integration

Environment secrets now **sync with Azure Key Vault**, providing a single source of truth for credentials across development and production. This eliminates configuration drift and makes deployments more predictable.

## Better tool call handling

A subtle but important fix: **tool call metadata is now preserved through message serialization**. This means when you restore a previous chat session, the agent's tool calls display correctly with full context — not as broken fragments.

## Under the hood

- Strengthened page extraction test coverage
- Fixed auth portal routing for production
- Added Supabase environment variables to the Stripe service
- Stabilized E2E authentication timing
- Consolidated Azure OpenAI configuration for documentation
