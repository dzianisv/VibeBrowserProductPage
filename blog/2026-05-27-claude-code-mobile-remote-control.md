---
title: "Claude Code Remote Control: Managing Coding Sessions from Mobile"
description: "OpenCode's web UI isn't mobile-friendly. Here's how Claude Code remote control over Tailscale became the interim solution for managing AI coding sessions from a phone."
date: "2026-05-27"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - ainativecompany
  - claude-code
  - mobile
  - remote-control
  - tailscale
  - opencode
  - vibe-technologies
---

Running 10 AI agents from one laptop works fine at a desk. It falls apart the moment you step away. A session stalls, an agent hits a blocking question, a build breaks — and the only way to react is to be in front of a screen.

I needed a way to manage coding sessions from a phone. Not a full IDE. Just enough to start a session, check what's happening, unblock something, and move on.

Here's what I tried and what actually works right now.

## The Problem with OpenCode on Mobile

[OpenCode](https://opencode.ai) runs as a server and exposes a web UI. On desktop it's good — you get multi-session views, agent state, conversation history. On mobile it's awkward. The layout isn't responsive in a way that fits a phone screen comfortably. Scrolling through long agent outputs, navigating between sessions, typing instructions — all of it requires more precision than a phone touchscreen gives you.

This isn't a criticism of OpenCode. It's a desktop-first tool. The web UI is there for convenience, not for a thumb-driven workflow.

## What I Started Building

I started a project called `opencode-mobile` — a lightweight web app wrapper around the OpenCode API, designed specifically for small screens. The goal: a minimal interface that shows active sessions, lets you send a message to an agent, and gives you a clear status view without the full desktop UI.

It's not done. It's still useful to build because it'll be the right long-term answer — a purpose-built mobile interface rather than a workaround.

But while building it, I found something that already works.

## Claude Code Remote Control

Claude Code has a remote mode. You run `claude` on the VM, and it becomes accessible over the network. Combine that with [Tailscale](https://tailscale.com), and you have a coding session reachable from your phone anywhere — no port forwarding, no VPN setup beyond the Tailscale mesh.

The workflow:

1. VM is always on, connected to Tailscale
2. `claude` starts in server/remote mode on the VM
3. Phone connects over Tailscale to the VM's Tailscale IP
4. Claude Code's interface loads in the phone browser

What makes this more usable on mobile than OpenCode's web UI: the interface is simpler. There's less on screen. You can read agent output, type a short instruction, and move on. It's not polished for mobile, but it doesn't fight you the way a complex multi-panel UI does.

The other advantage: Claude Code handles its own session state. If you disconnect and reconnect, the session is still there. That matters on a phone where connections drop.

## The Stack

Current setup for remote mobile control:

- **OpenClaw** — orchestration layer, manages which agents run what
- **Claude Code** in remote mode — the interface I actually use from a phone
- **Tailscale** — network layer that makes the VM reachable without exposing anything public

OpenCode is still running on the same VM for longer, more structured sessions. Claude Code RC is what I reach for when I need to react quickly from outside the office.

## Trade-offs to Know About

**Claude Code RC vs OpenCode web:**

Claude Code RC is simpler and more mobile-usable, but it doesn't give you OpenCode's multi-session overview. If you have five agents running in parallel, Claude Code shows you one session at a time. OpenCode's web UI shows you everything at once — it's just harder to use on a phone.

**Tailscale dependency:**

Claude Code RC only works if your VM is on the Tailscale network and your phone has Tailscale installed. That's one more thing to keep running. If Tailscale disconnects, you lose access until it reconnects.

**No native mobile app:**

This is all browser-based. Claude Code's remote interface wasn't designed for phones. It works, but you'll hit moments where something is fiddly — a text input that doesn't scroll right, a panel that overflows. It's workable, not comfortable.

**Session context:**

OpenCode maintains richer session context across agents. Claude Code sessions are more isolated. If you're managing a multi-agent flow, you lose some visibility compared to OpenCode's view.

## Recommended Path

If you're running AI coding agents on a remote VM and need mobile access today:

1. Set up Tailscale on the VM and your phone
2. Run Claude Code in remote/server mode on the VM
3. Connect from the phone browser via the Tailscale IP

That gets you working mobile control without writing any custom UI.

If you need multi-session visibility or plan to manage more than two or three agents simultaneously, OpenCode's web UI is still the right interface — just plan to use it from a tablet or laptop rather than a phone.

`opencode-mobile` is the longer-term answer for a proper phone-first experience. Until that's done, Claude Code RC over Tailscale is what works.

## Where This Fits in the Vibe Technologies Setup

The broader pattern: one human, 10 AI agents, no office required. The mobility problem isn't about comfort — it's about not being a bottleneck. If I can't react to a blocked session until I'm at a desk, agents sit idle. Claude Code RC closes that gap for now.

OpenClaw + Claude Code + Tailscale is the current stack. It's not the final answer, but it's the working one.

---

## Related Reading

The full `#ainativecompany` series:

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering: From Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: OpenHands AI Operations Agents](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- [6 Months of Momentum](/blog/2026-03-17-6-months-momentum)
- [Docs Support Chat: Azure AI RAG + SupportEngineer Escalation](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix)
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework)
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- **You are here** — Claude Code Remote Control: Managing Coding Sessions from Mobile

*Previous in series: [OpenCode in Server Mode: Tailscale Access and AI Session Supervision →](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)*

---

Questions or running a similar setup: [dzianisvv@gmail.com](mailto:dzianisvv@gmail.com)
