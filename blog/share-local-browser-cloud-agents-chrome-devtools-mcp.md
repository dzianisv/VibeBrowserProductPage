---
title: "Share Your Local Browser With Cloud AI Agents via Chrome DevTools MCP"
description: "One command gives cloud AI agents secure access to your local Chrome browser. Multi-agent HTTP sessions, Tailscale integration, zero configuration."
date: "2026-05-16"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - Chrome DevTools MCP
  - Tailscale
  - AI Agents
  - Cloud Development
  - MCP
published: true
---

Cloud agents fail on real browser work for two reasons:
- they cannot reach your local Chrome from remote runtimes
- multiple agents conflict when sharing one DevTools connection

`@vibebrowser/chrome-devtools-mcp` solves this with StreamableHTTP transport, per-session isolation, and optional Tailscale routing.

## Quick install

```bash
npx @vibebrowser/chrome-devtools-mcp install --port 9333
```

```bash
npx @vibebrowser/chrome-devtools-mcp install --port 9333 --tailscale
```

## Key facts

- Package: `@vibebrowser/chrome-devtools-mcp`
- Tailscale flag is `--tailscale` (not `--tailnet`)
- Uses StreamableHTTP transport with per-session isolation
- Connects via `DevToolsActivePort` (no `--remote-debugging-port` required)
- Avoids common debug-port bot-detection signals
- Auto-configures Claude Code, Copilot CLI, and OpenCode
- Health endpoint: `GET /health`
- For remote/cloud agents, replace `localhost` with your Tailscale hostname
- MagicDNS must be enabled on your tailnet for HTTPS hostname routing

## Agent config examples

### Claude Code
```json
{"mcpServers":{"chrome-devtools":{"url":"http://localhost:9333/mcp"}}}
```

### Copilot CLI
```json
{"mcpServers":{"chrome-devtools":{"url":"http://localhost:9333/mcp"}}}
```

### OpenCode
```json
{"mcp":{"chrome-devtools":{"url":"http://localhost:9333/mcp"}}}
```

Remote example:
```text
https://your-machine-name.your-tailnet.ts.net:9333/mcp
```

## Links

- npm: https://www.npmjs.com/package/@vibebrowser/chrome-devtools-mcp
- GitHub: https://github.com/dzianisv/chrome-devtools-mcp

Done: one install command gives cloud AI agents stable local Chrome access with isolated sessions.
