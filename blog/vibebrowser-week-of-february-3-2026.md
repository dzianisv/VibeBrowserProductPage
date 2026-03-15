---
title: "Week of February 3: GPT-5.2 Codex, TEE Attestation UI, and Subscription Reliability"
description: "VibeBrowser deploys GPT-5.2 Codex, adds TEE attestation verification in the model selector, and hardens the subscription system for seamless tier upgrades."
date: "2026-02-09"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - gpt-5
  - codex
  - tee
  - subscription
  - reliability
published: true
slug: vibebrowser-week-of-february-3-2026
---

This week focused on giving you access to stronger models and making sure the subscription system works flawlessly.

## GPT-5.2 Codex is live

**GPT-5.2 Codex** is now deployed and available in VibeBrowser. This is OpenAI's latest code-focused model, and it excels at complex browser automation tasks — especially those involving forms, multi-step workflows, and data extraction.

We consolidated our Azure OpenAI resources to a single region for lower latency, so you should notice faster response times across all Azure-hosted models.

## TEE attestation in the model selector

When you pick a TEE-enabled model, VibeBrowser now shows **attestation verification** directly in the model selector. A green badge confirms the model is running inside a verified secure enclave, so you know your data is protected before you start.

## Credential store improvements

The credential manager got better testing and documentation. If you store login credentials for sites the agent visits frequently, it now handles them more reliably — especially for sites with complex authentication flows.

## API health monitoring

A new **/api/health** endpoint lets you check the status of VibeBrowser's backend services at a glance. This is useful for teams running their own deployments and for our own monitoring infrastructure.

## Subscription system hardening

Several fixes made the subscription flow more robust:

- **Tier unlock on login** — Max tier models now unlock immediately after authentication, not on the next page load
- **Trialing subscription support** — the Stripe integration now correctly handles trial periods
- **Graceful fallback** — if the usage API is temporarily unavailable, the extension continues working instead of blocking

## Under the hood

- Unified test authentication API across all E2E test suites
- Added GitHub Copilot subscription testing
- Fixed CI artifact paths and mock server limits
- Improved LiteLLM rollout timeout for large deployments
