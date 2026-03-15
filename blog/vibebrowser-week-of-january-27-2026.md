---
title: "Week of January 27: Confidential AI with TEE, Settings Redesign, and First-Install Experience"
description: "VibeBrowser adds Trusted Execution Environment support for private AI inference, redesigned settings with import/export, and a guided first-install setup flow."
date: "2026-02-02"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - tee
  - confidential-ai
  - settings
  - privacy
  - deepseek
published: true
slug: vibebrowser-week-of-january-27-2026
---

Privacy-first AI inference, a better settings experience, and a smoother start for new users — here is what shipped this week.

## Confidential AI with Trusted Execution Environments

VibeBrowser now supports **TEE (Trusted Execution Environment) inference** — a hardware-level privacy guarantee that even the model provider cannot see your data.

The new **DeepSeek-R1-TEE** model runs inside a secure enclave, and the extension verifies the TEE attestation before sending any data. This is the strongest privacy option available: your prompts and the model's responses are encrypted end-to-end, with cryptographic proof that the code running inside the enclave hasn't been tampered with.

If you handle sensitive data — financial documents, medical records, legal contracts — TEE inference means you can use a powerful AI model without trusting anyone with your content.

## Redesigned settings page

The settings page got a major overhaul:

- **Section navigation** — jump directly to the category you need instead of scrolling
- **Import/export** — back up your entire configuration to a file and restore it on another machine or after a reinstall
- **Guided first install** — if you open VibeBrowser for the first time without an LLM configured, it now opens settings automatically and walks you through setup

These changes make it much easier to get started and to maintain your configuration across devices.

## Self-hosted DeepSeek-V3 deployment

For teams that want to run their own frontier model, we added **Terraform configurations for deploying DeepSeek-V3 on GPU instances**. This gives you full control over the model, the hardware, and the data — nothing leaves your infrastructure.

## Smarter Google Workspace tools

The Google Workspace integration got better tool descriptions that tell the agent to prefer API calls over navigating the browser UI. This makes Gmail and Calendar operations faster and more reliable.

## Under the hood

- GitHub integration for automated issue and PR workflows
- Consolidated Google Workspace tests from 8 CI jobs down to 2
- Improved session cleanup between test scenarios
- Better Chrome cleanup in CI to prevent resource leaks
