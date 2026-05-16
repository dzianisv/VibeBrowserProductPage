---
title: "Playwright MCP vs vibebrowser-mcp: A Real Benchmark"
description: "Builders are comparing browser MCPs on token cost, speed, and auth reliability. This post cuts through theory: accessibility trees vs markdown, fresh contexts vs real sessions, and why it matters for authenticated workflows."
date: "2026-04-12"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - MCP
  - Browser Automation
  - Playwright MCP
  - vibebrowser-mcp
  - AI Agents
  - Benchmarks
published: true
---

If you are building agents against real websites — dashboards, Gmail, SaaS tools, internal portals — you have probably run into one of two problems:

1. Your agent burns an absurd number of tokens just to read a page.
2. It works fine in isolation, then breaks the moment it hits a login wall.

Both problems trace back to the same architectural decision: how your MCP server connects to the browser, and how it represents page state to the model.

This post is a head-to-head comparison of **Playwright MCP** (Microsoft's official browser automation MCP) and **vibebrowser-mcp** (Vibe Browser's MCP that attaches to your running Chrome session). Numbers first, architecture second.

## The benchmark that started the conversation

[@vericontext](https://x.com/vericontext) published a public comparison running the same browser automation task with Playwright MCP and vibebrowser-mcp:

> **Playwright MCP:** 5 minutes 17 seconds  
> **vibebrowser-mcp:** 2 minutes 39 seconds  
> Same task. Same model.

That is a **2x speed difference** on a real-world automation. It is not a synthetic microbenchmark. The cause is not a fluke.

Understanding *why* explains when vibebrowser-mcp wins and when the tradeoff actually matters.

## What Playwright MCP does under the hood

Playwright MCP is a well-engineered tool. It has 27k+ GitHub stars and Microsoft's backing. If your workflow does not require authenticated sessions or token efficiency, it works.

But two architectural decisions hurt it for the builder use case:

### 1. Every snapshot dumps the full accessibility tree

By default, `browser_snapshot` in Playwright MCP returns the full accessibility tree for the current page. For a typical SaaS dashboard, that tree can be thousands of tokens per snapshot.

Now multiply that across a 10-step agent workflow where the model takes a snapshot before every action. You are burning 10,000–50,000 tokens just on page reads — before any reasoning or generation.

The accessibility tree format is verbose by design. It includes every ARIA role, accessible name, state, and property that Playwright can resolve. That is useful for developers writing tests. It is expensive for agents doing tasks.

### 2. The default mode launches a fresh browser context

Out of the box, Playwright MCP launches a **Playwright-managed browser instance**. This is a separate process, not your running Chrome. It starts clean: no cookies, no sessions, no extensions, no saved auth.

Playwright MCP *can* connect to an existing browser — either via its extension mode or by pointing it at an explicit `--cdp-endpoint` when Chrome is already exposing remote debugging. But both paths require additional setup, and neither is the default.

The consequence: your agent hits a login page on step 1 and either fails or has to re-authenticate from scratch. For any workflow involving Gmail, Slack, Jira, Notion, HubSpot, or basically any SaaS product you use, this is a showstopper.

## What vibebrowser-mcp does differently

vibebrowser-mcp is architecturally different in two ways that directly explain the benchmark gap.

### 1. Snapshots are markdown, not accessibility trees

The primary snapshot format in vibebrowser-mcp is **indexed markdown**. Instead of dumping the full accessibility tree, the tool extracts page content as clean markdown and labels interactive elements with `[index:score]` references:

```
# Google Analytics — Overview

**Date range:** Last 28 days

[1:0.9] Users: 12,840
[2:0.8] Sessions: 18,200
[3:0.7] Bounce rate: 43%

## Top Pages
[4:0.6] /mcp — 3,200 sessions
[5:0.5] /blog — 1,800 sessions

[6:0.9] Export report
[7:0.8] Change date range
```

This format is **3–5x smaller than raw DOM or accessibility trees** (per product page). For a typical dashboard page, that is the difference between 800 tokens and 4,000 tokens per snapshot.

Over a 10-step agent loop: **~60–80% fewer tokens consumed on page reads alone**.

That is not a marginal difference. It is the main reason for the 2x speed gap in the @vericontext benchmark — the model spends less time in long-context reasoning over bloated accessibility trees.

vibebrowser-mcp also ships dedicated tools for both formats:

- `take_md_snapshot` — indexed markdown (compact, lower token cost)
- `take_a11y_snapshot` — accessibility tree (more precise for interaction-heavy flows)
- `take_snapshot` — composite (markdown + a11y + optional screenshot)

Use markdown for reading-heavy tasks. Use a11y snapshots when precision interaction matters. Use composite when you need both.

### 2. It attaches to your running browser

vibebrowser-mcp is a Chrome extension-based MCP. When you configure it in Claude, Cursor, or OpenCode, it connects to the **Chrome session you already have open** — cookies intact, sessions alive, extensions loaded.

There is no new browser process. There is no re-authentication step. If you are logged into Gmail, your agent can access Gmail on step 1.

```
Claude Code / Cursor / OpenCode
        │
        ▼
  [vibebrowser-mcp]  ← stdio MCP bridge
        │
  ws://localhost:19888
        │
        ▼
  [Local Relay Daemon]
        │
  ws://localhost:19889
        │
        ▼
  [Vibe Extension]  ← your actual running Chrome
```

The extension connects to your live browser via Chrome's extensions API — no `--remote-debugging-port`, no CDP ceremony, no debug permissions.

## The auth problem is the real problem

Here is the thing most MCP comparisons miss: **authentication is the actual failure mode** for real-world agent workflows.

Consider a typical use case: your agent needs to pull data from three internal dashboards, cross-reference with Gmail threads, and output a summary. With Playwright MCP's default mode:

- Dashboard 1: Login page → agent fails or asks for credentials
- Gmail: OAuth flow → agent cannot complete in the sandbox browser
- Dashboard 2: Login page again

With vibebrowser-mcp, you are already logged in everywhere. The agent just navigates and reads.

The same applies for anything that requires cookies (long-lived sessions), saved passwords, or browser extensions for SSO. Fresh browser contexts break all of them.

Playwright MCP's extension mode closes this gap partially — it can reuse your existing Chrome session. But it still lacks the multi-agent relay, the markdown snapshot format, and the native workspace integrations.

## Feature comparison

| | vibebrowser-mcp | Playwright MCP |
|---|---|---|
| **Connects to your real browser** | ✅ by default | ⚠️ requires extension mode or `--cdp-endpoint` |
| **Primary snapshot format** | Indexed markdown | Accessibility tree |
| **Token cost per snapshot** | ~3–5x lower | Full a11y tree (verbose) |
| **Auth / cookie persistence** | ✅ real sessions | ❌ fresh context by default |
| **Multi-agent relay** | ✅ | ❌ |
| **Gmail/Calendar native tools** | ✅ | ❌ |
| **Credential vault** | ✅ (`typein_secret`) | ❌ |
| **Debug port required** | ❌ | ⚠️ depends on mode |
| **Total MCP tools** | 25+ | ~40 (page automation focus) |
| **Multi-agent support** | ✅ | ❌ |
| **Open source** | ✅ npm package | ✅ |

Playwright MCP wins on raw page automation breadth and has a mature locator model. vibebrowser-mcp wins on token efficiency, auth reliability, and real-world agent workflows.

## When you should use each

**Use Playwright MCP when:**
- You are running agents against public websites with no authentication requirement
- You need precise locator-based interaction on complex UI (Playwright's locator model is excellent)
- You are already running Playwright in CI and want to reuse the infrastructure

**Use vibebrowser-mcp when:**
- Your workflow involves any authenticated website (Gmail, SaaS tools, internal dashboards, portals)
- Token cost matters (long workflows, GPT-4-class models, multi-step pipelines)
- You need your agent to run multiple parallel sessions
- You want the agent to use your existing sessions and extensions, not a sandboxed copy

## Setup

Install the [Vibe Browser extension](https://docs.vibebrowser.app/getting-started/extension), enable MCP External Control in settings, then add one config block to your agent:

**Claude Code:**
```bash
claude mcp add --transport stdio --scope user vibe -- \
  npx -y -p @vibebrowser/mcp@latest vibebrowser-mcp
```

**OpenCode (`~/.config/opencode/opencode.json`):**
```json
{
  "mcp": {
    "vibe": {
      "type": "local",
      "command": ["npx", "-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"],
      "enabled": true
    }
  }
}
```

**Cursor (`~/.cursor/mcp.json`):**
```json
{
  "mcpServers": {
    "vibe": {
      "command": "npx",
      "args": ["-y", "-p", "@vibebrowser/mcp@latest", "vibebrowser-mcp"]
    }
  }
}
```

Full setup docs for all agents at [vibebrowser.app/mcp](https://vibebrowser.app/mcp).

## The bottom line

The @vericontext benchmark (5m17s vs 2m39s) is not a quirk. It reflects two compounding architectural choices: accessibility tree snapshots at every step burn tokens, and fresh browser contexts break auth.

If you are building agents against public pages where token cost is not a constraint, Playwright MCP is a solid, mature choice. If you are building against real authenticated workflows — and most production agent use cases are — vibebrowser-mcp's real-session attachment and markdown-first snapshots make a measurable difference.

The benchmark tells you: same task, same model, 2x faster. The architecture tells you why.

---

## References

- [@vericontext benchmark tweet](https://x.com/vericontext) — Playwright MCP (5m17s) vs vibebrowser-mcp (2m39s) on the same task
- [vibebrowser-mcp on npm](https://www.npmjs.com/package/@vibebrowser/mcp) — `@vibebrowser/mcp`
- [Vibe Browser MCP docs](https://vibebrowser.app/mcp) — Setup guides for Claude, Cursor, OpenCode, and more
- [Playwright MCP on GitHub](https://github.com/microsoft/playwright-mcp) — Microsoft's official browser automation MCP
- [A11y vs Markdown for Browser Agents](/blog/a11y-vs-markdown-browser-agent-system-design) — Deeper dive on snapshot format tradeoffs
- [Browser MCP Comparison](/blog/mcp-browser-automation-comparison) — Extended comparison across VibeBrowser, Playwright MCP, Chrome DevTools MCP, BrowserMCP, and Playwriter
