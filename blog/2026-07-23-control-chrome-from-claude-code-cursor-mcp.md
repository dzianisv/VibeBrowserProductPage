---
title: "Control Your Real Chrome from Claude Code and Cursor with MCP"
description: "Give Claude Code, Cursor, or any MCP client a browser tool that drives your actual logged-in Chrome — no headless instance, no re-login. One config block and your agent can navigate, click, and read pages as you."
date: "2026-07-23"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - "MCP"
  - "Claude Code"
  - "Cursor"
  - "Browser Automation"
  - "Chrome Extension"
  - "AI Agents"
published: true
---

Your coding agent can read files, run commands, and call APIs. It usually can't open a web page you're logged into. When Claude Code or Cursor needs to check a dashboard, pull a value from an internal tool, or read a ticket behind SSO, it either asks you to paste the content or spins up a fresh headless browser that knows none of your sessions.

There's a cleaner path: expose your **real** Chrome to the agent as a Model Context Protocol (MCP) tool. The agent drives the browser you already have open — same cookies, same logins, same extensions.

## What MCP gives a coding agent

MCP is the standard way to hand an AI client a set of tools it can call. Claude Code, Cursor, VS Code Copilot, and Codex all speak it. You register a server once, and the agent gets new verbs: `navigate`, `click`, `type`, `get_page_content`, `take_screenshot`, tab management, `web_search`.

Vibe runs as an MCP server on top of the Vibe Chrome extension. So the tools don't act on a throwaway browser — they act inside your authenticated session. If you're logged into GitHub, Linear, and Gmail in Chrome, so is your agent.

## Why "your real browser" is the whole point

Most browser MCP servers launch a separate browser instance through Playwright or CDP. That instance starts clean: no logins, no session cookies, no 2FA state. For anything behind auth, that's a wall.

Vibe uses Chrome's content scripts and Extensions API instead. Concretely:

- No `--remote-debugging-port` and no CDP debug flags to launch Chrome with.
- No separate browser window that loses your sessions.
- The agent sees the page you see, because it *is* your page.

That means "read the value from my Stripe dashboard" or "summarize this Notion doc" just works, without you re-authenticating a robot browser.

## Set it up in Claude Code

Vibe's MCP transport is Streamable HTTP. You need one thing from the Vibe extension: a session UUID that ties the MCP server to your browser. Then add one config block.

`.mcp.json` (or `~/.claude.json`):

```json
{
  "mcpServers": {
    "vibebrowser": {
      "type": "http",
      "url": "https://relay.api.vibebrowser.app/mcp",
      "headers": {
        "X-Remote-Session": "${VIBE_REMOTE_UUID}"
      }
    }
  }
}
```

Set `VIBE_REMOTE_UUID` in your shell — don't hardcode the UUID in a committed file. Or add it with the CLI:

```bash
claude mcp add --transport http --scope user vibebrowser \
  https://relay.api.vibebrowser.app/mcp \
  --header "X-Remote-Session: <uuid>"
```

Cursor, VS Code, Windsurf, Gemini CLI, and Codex use the same Streamable HTTP shape — the top-level key (`mcpServers` vs `servers`) and env-var syntax differ per client, so check the client's own docs. The full per-client configs live on the [MCP setup page](/mcp).

## What you can hand off

Once wired up, these become one-line asks to your agent:

- "Open the failing PR's CI logs and tell me which step broke."
- "Pull the current MRR from the billing dashboard."
- "Read the top three Linear tickets in the triage view and draft replies."
- "Check whether this feature flag is on in the admin panel."

The agent navigates, extracts, and reports back inside your terminal. Irreversible actions — submitting a form, sending a message — are left for your approval, not fired blindly.

## Local-only if you prefer

The `https://relay.api.vibebrowser.app/mcp` endpoint routes through a relay so an agent on another machine (or a hosted runner) can reach your browser. If you'd rather keep everything on your laptop, Vibe also runs a fully local stdio bridge — no relay in the path. Same tools, no network hop. Details on the [MCP page](/mcp).

## FAQ

**Does this need Chrome remote debugging enabled?**
No. Vibe uses the Chrome Extensions API and content scripts, so there's no `--remote-debugging-port` and no CDP setup. Chrome launches normally with your usual profile.

**Will the agent see my logged-in sessions?**
Yes. It acts inside your real browser, so any site you're authenticated in is reachable without a second login.

**Which clients work?**
Any MCP client that speaks Streamable HTTP: Claude Code, Cursor, VS Code Copilot, Windsurf, Gemini CLI, and Codex.

**Is it safe?**
Read and navigation actions run directly. Irreversible actions are gated for your approval. The session header is a UUID-only bearer credential — keep it in an env var, not in a committed file.

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type": "Question", "name": "Does controlling Chrome from Claude Code need remote debugging enabled?", "acceptedAnswer": {"@type": "Answer", "text": "No. Vibe uses the Chrome Extensions API and content scripts, so there is no --remote-debugging-port and no CDP setup. Chrome launches normally with your usual profile."}},
    {"@type": "Question", "name": "Will the MCP agent see my logged-in browser sessions?", "acceptedAnswer": {"@type": "Answer", "text": "Yes. It acts inside your real Chrome, so any site you are authenticated in is reachable without a second login."}},
    {"@type": "Question", "name": "Which MCP clients can drive my browser?", "acceptedAnswer": {"@type": "Answer", "text": "Any MCP client that speaks Streamable HTTP: Claude Code, Cursor, VS Code Copilot, Windsurf, Gemini CLI, and Codex."}},
    {"@type": "Question", "name": "Is MCP browser control safe?", "acceptedAnswer": {"@type": "Answer", "text": "Read and navigation actions run directly. Irreversible actions are gated for user approval. The session header is a UUID-only bearer credential that should be stored in an environment variable, not a committed file."}}
  ]
}
</script>

## Try it

Add the config, grab your session UUID from the extension, and give your agent a browser. Install Vibe here: [vibebrowser.app/install](https://www.vibebrowser.app/install?utm_source=blog-control-chrome-from-claude-code-cursor-mcp).
