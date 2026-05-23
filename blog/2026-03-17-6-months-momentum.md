---
title: "6 Months of Momentum: Advancing Agentic Browsing and AI Infrastructure at Vibe Technologies"
date: "2026-03-17"
author: "Den"
tags: ["ainativecompany", "vibe-technologies", "browser-agent", "opencode", "kubernetes"]
---

Over six months we shipped a working browser co-pilot, a support pipeline run by AI, and a team of AI agents writing code. Each piece is running in production. This post documents what shipped, with evidence where we have it.

## The Problem

Before this period, customer issues arrived as raw emails — no ticketing, no routing, no record of resolution. When agents ran overnight, we had no way to see what they did or whether anything broke; Sentry wasn't wired up, so pod restarts and gateway errors surfaced only when a user complained. Bug reports lived in inboxes, not in Linear, so there was no link between a support complaint and an engineering fix. We didn't track any of this systematically, which is why Chatwoot, the Linear pipeline, and Sentry telemetry were the first things we wired up.

### Making the AI Co-Pilot Smarter and Safer
A browser agent is only as good as its understanding of the DOM and its context of the user. In the `vibe` repository, we overhauled how our agent perceives web pages. We transitioned our accessibility tree snapshots to utilize the Chrome DevTools Protocol (CDP) debugger, improving the accuracy of element targeting.

To ensure the agent learns user preferences over time, we shipped a semantic memory manager. This system uses BM25 indexing with stemming and temporal decay, allowing the co-pilot to recall relevant past interactions while naturally forgetting outdated context. Security remains a priority; we implemented strict redaction pipelines that automatically strip passwords and sensitive inputs before any DOM data reaches the LLM layer.

We also expanded our model routing capabilities. Users can now toggle between local inference using Ollama and the latest cloud models, including GPT-5.4-pro, ensuring the right level of reasoning effort is applied to every task.

### Scaling OpenClaw: Multi-Tenant Infrastructure
Moving from a prototype to a production cloud service required significant infrastructure upgrades in our `OpenClawBot` architecture. We built a multi-tenant Kubernetes provisioning system.

A major milestone was the introduction of Chromium init containers, allowing headless browser automation directly inside isolated tenant pods. We paired this with a Stripe billing integration—handling everything from tier-based resource quotas and checkout sessions to automated webhook renewals and graceful auto-refunds on provisioning failures. We integrated Sentry telemetry to catch pod restarts and gateway errors before users notice them.

### Pushing the OpenCode Ecosystem Forward
Our internal development velocity relies heavily on the OpenCode ecosystem, and we dedicated substantial time to improving these open-source tools.

AI agents are prone to getting stuck in planning loops. To solve this, we introduced reflection mechanisms in `opencode-plugins`. The plugin escalates feedback when an agent stalls; cross-model review (planned) — e.g., using Claude Sonnet 3.7 to review GPT-Codex outputs — is not yet automated.

We also shipped a GitHub integration plugin that monitors issue threads and injects actionable directives directly into the agent's context. The `opencode-manager` received a stability upgrade with self-healing Cloudflare tunnel watchdogs and integrated voice control using Coqui TTS and Faster-Whisper.

### Agent Architecture

```
[Customer email] → Chatwoot → Jared Dunn (SupportEngineer / model TBD)
                                      ↓
                              Linear issue created
                                      ↓
                    Gilfoyle Bertram (SoftwareEngineer / model TBD) → PR
```

## Evidence It Works

We haven't measured most of this systematically yet. DOM accuracy improvement is estimated from manual spot-checks, not instrumented tests. Cost delta not tracked in this period.

## What Does Not Work Yet

- No systematic benchmarking of DOM accuracy changes — estimates are from manual spot-checks only.
- Cross-agent coordination is still manual; no automated handoff between SupportEngineer and SoftwareEngineer agents.
- No cost tracking dashboard — spend is estimated, not measured per-tenant.
- Model version pinning is manual; no automated pinning policy across agents.

### Looking Ahead
The foundation is solid. We have a secure, context-aware browser agent, a scalable multi-tenant cloud backend, and a highly automated development workflow. The next six months will be about scaling our user base, expanding our agent's autonomous web skills, and continuing to close the gap between human intent and automated execution.

---

## #ainativecompany Series

- [Building Vibe Technologies: An AI-Native Startup](/blog/2025-11-01-building-vibe-technologies-ai-native-startup)
- [Vibe Engineering Stack: Claude Code to OpenCode](/blog/2025-11-10-vibe-engineering-stack-claude-code-to-opencode)
- [VibeTeam: AI Operations Agents on OpenHands](/blog/2025-11-20-vibeteam-openhand-ai-operations-agents)
- [Switching From OpenHands to VibeBrowser Agentic Team](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)
- **[Six Months of Momentum](/blog/2026-03-17-6-months-momentum)**
- [Docs Support Chat with Azure AI RAG](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)
- [Chatwoot AI Chatbot for openclaw.vibebrowser.app](/blog/2026-04-25-chatwoot-ai-chatbot-openclaw-vibebrowser-app)
- [Switching OpenClaw Operations to DeepSeek-V4-Flash](/blog/2026-05-01-switching-openclaw-operations-to-deepseek-v4-flash)
- [Token Optimization with OpenCode, LST, RTK, Caveman](/blog/2026-05-15-token-optimization-opencode-lst-rtk-caveman)
- [Linear Customer Support Pipeline](/blog/2026-05-22-linear-customer-support-pipeline-supportengineer-vibebrowser-copilot)
- [Agent Communication: Slack Apps, OpenClaw Bindings, AGENTS.md Handoff Matrix](/blog/2026-05-23-agent-communication-slack-openclaw-handoff-matrix) — how agents route work to each other
- [Meet the Vibe Technologies Team: 10 AI Agents, One Human, One Framework](/blog/2026-05-24-vibe-technologies-agent-roster-nine-agents-one-framework) — full agent roster with roles, models, and channel bindings
- [Two Layers of Agent Evaluation: Deployment Checks and Team Trace Review](/blog/2026-05-25-openclaw-eval-queue-yaml-based-agent-testing)
- [OpenCode in Server Mode: Tailscale Access and AI Session Supervision](/blog/2026-05-26-opencode-server-tailscale-agent-supervision)
- [Claude Code Remote Control: Managing Coding Sessions from Mobile](/blog/2026-05-27-claude-code-mobile-remote-control) — per-PR YAML eval queue plus Claw's Langfuse-backed team evaluation

*Previous in series: [Switching From OpenHands to VibeBrowser Agentic Team →](/blog/2026-01-15-switching-from-openhands-to-vibebrowser-agentic-team)*

*Next in series: [Docs Support Chat with Azure AI RAG →](/blog/2026-04-10-docs-support-chat-azure-ai-rag-supportengineer-escalation)*
