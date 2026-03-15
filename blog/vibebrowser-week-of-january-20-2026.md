---
title: "Week of January 20: Skills System, @ Tab References, Vision Tool, and a Cost-Efficient Auto-Scalable k3s Cluster"
description: "VibeBrowser launches an agent skills system, @ tab references for cross-tab context, AI vision for images and videos, and an auto-scalable k3s cluster designed to cut infrastructure cost without sacrificing reliability."
date: "2026-01-26"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - product-update
  - release-notes
  - skills
  - vision
  - tab-references
  - auto-scaling
  - k3s
  - kubernetes
  - langfuse
published: true
slug: vibebrowser-week-of-january-20-2026
---

This was our biggest week yet — 101 commits that shipped a skills engine, cross-tab context, AI vision, and a production infrastructure shift toward an auto-scalable **k3s** cluster built to keep costs under control.

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

## Infrastructure: an auto-scalable k3s cluster to cut costs

The biggest backend change this week was not a visible product feature. It was infrastructure discipline.

We moved toward an auto-scalable **k3s** cluster so we can keep Vibe responsive without paying for an oversized backend 24/7. The goal was simple: keep the steady-state footprint lean, then add compute only when real demand shows up.

k3s is a good fit for that operating model because it gives us the Kubernetes primitives we actually want in production — scheduling, health checks, service discovery, restarts, and rolling deploys — without dragging in more platform overhead than we need.

We pair that cluster model with **Azure VMSS-backed node elasticity**. When traffic spikes, worker capacity can grow. When load falls back down, we can scale in again instead of leaving extra machines running just in case.

### How we deploy it

The practical deployment shift is that backend updates stop looking like handcrafted VM work and start looking like software delivery:

- keep a small baseline cluster running
- ship new backend builds into the cluster
- let readiness and health checks gate traffic during rollouts
- allow Kubernetes to replace unhealthy pods automatically
- add worker capacity only when traffic or background workload actually requires it

That makes releases safer and cheaper at the same time. We do not need to provision for the highest possible traffic level every hour of the day just to stay comfortable during a rollout.

### How we manage it day to day

The management benefit is just as important as the raw infrastructure savings.

Once services live inside the k3s control plane, we can reason about rollouts, restarts, resources, and scaling from one operating model instead of hand-managing individual servers. That gives us a cleaner day-2 posture:

- easier rollouts and rollbacks
- tighter resource tuning per service
- cleaner node replacement when a machine needs to disappear
- better isolation between workloads
- a natural place to layer in observability, including Langfuse plus cluster-level metrics

### Why this matters for Vibe

Browser automation traffic is bursty. Launches, demos, onboarding spikes, and background jobs do not arrive in a neat steady stream.

An auto-scalable k3s setup fits that pattern much better than a fixed fleet. Quiet periods stay cheaper. Busy windows still get room to breathe. That is the kind of infrastructure foundation we need if Vibe is going to keep expanding model support and browser workload volume without letting the baseline bill creep up every month.
