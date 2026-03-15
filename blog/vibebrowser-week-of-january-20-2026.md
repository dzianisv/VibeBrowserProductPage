---
title: "Week of January 20: Skills System, @ Tab References, Vision Tool, and Auto-Scaling Infrastructure"
description: "VibeBrowser launches an agent skills system, @ tab references for cross-tab context, AI vision for images and videos, and Kubernetes auto-scaling for reliable performance."
date: "2026-01-26"
author: "Vibe Product Team"
tags:
  - product-update
  - release-notes
  - skills
  - vision
  - tab-references
  - auto-scaling
  - langfuse
published: true
slug: vibebrowser-week-of-january-20-2026
---

This was our biggest week yet — 101 commits that shipped a skills engine, cross-tab context, AI vision, and production infrastructure that scales automatically.

## Agent skills: teach your browser new tricks

VibeBrowser now has a **skills system**. Skills are reusable instruction sets that guide the agent for specific tasks — think of them as expert playbooks the AI loads when it recognizes a relevant situation.

Instead of giving the agent long, detailed prompts every time, you write a skill once and the agent loads it automatically when needed. This makes complex multi-step workflows repeatable and shareable.

## Reference other tabs with @

Type **@** in the chat and an autocomplete popup shows your open tabs. Select one and its content gets injected into the conversation. This is a fast way to say "look at this page" without switching tabs or copy-pasting URLs.

Use it to compare products across tabs, reference documentation while filling out forms, or give the agent context from a page you're reading.

## AI vision for images and videos

A new vision tool lets the agent **describe images and videos** using AI. Upload a screenshot and get a detailed description, or point it at a video for frame-by-frame analysis. This is useful for accessibility, content verification, and debugging visual layouts.

## Selected text awareness

Highlight text on any page and the agent now knows what you selected. Ask "summarize this" or "translate this" and it works on exactly the text you highlighted — no need to copy-paste into the chat.

## Version indicator in settings

A small but useful addition: the settings page now shows your **exact extension version**. No more guessing whether you're running the latest release.

## LLM observability with Langfuse

Every AI interaction is now tracked with **Langfuse** — an open-source observability platform for LLMs. This helps us measure latency, token usage, and success rates to continuously improve the agent's reliability.

## Infrastructure: auto-scaling Kubernetes

The backend now runs on **auto-scaling Kubernetes** with Azure VMSS. When demand spikes, new worker nodes spin up automatically. When it drops, they scale back down. This means consistent performance without over-provisioning.
