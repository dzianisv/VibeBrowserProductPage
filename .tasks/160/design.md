# Design

## Problem

The existing `/mcp` route mixes local stdio MCP, a local bridge that happens to use a
WebSocket relay, and direct hosted Streamable HTTP MCP. These have different
installation, privacy, and credential models.

## Goal

- `/mcp`: hosted remote Streamable HTTP MCP only.
- `/mcp-stdio`: local-process stdio MCP only.
- Give remote users a configuration selector for Claude Code, Codex, GitHub Copilot
  (VS Code and CLI distinctions), Cursor, OpenCode, and generic JSON clients.
- State Pi's lack of native MCP support without inventing a configuration.
- Link `/mcp` prominently to `/mcp-stdio`: this local-only route avoids the internet
  relay and is appropriate for privacy-sensitive users.

## Remote Contract

- URL: `https://relay.api.vibebrowser.app/mcp`
- Header: `X-Remote-Session`
- Accepted value: a bare UUID or canonical
  `wss://relay.api.vibebrowser.app/YOUR-SESSION-UUID`
- Credential values are browser-control bearer credentials. Examples must use only
  placeholders or the agent's documented environment variable mechanism.

## Route and SEO Design

- Move the existing route files to `/mcp-stdio`, preserving their local setup content
  and relabeling it as local stdio.
- Replace `/mcp` with remote-specific content and metadata/structured data.
- Update nav, footer, sitemap, llms.txt, IndexNow, internal stdio-specific links,
  social images, testing docs, and analytics documentation.
- Do not redirect `/mcp`; its URL remains the primary hosted remote MCP landing page.

## Security and Compatibility

- No real UUID or secret in code, metadata, test artifacts, analytics, or docs.
- Distinguish locally hosted MCP process from direct remote HTTP transport.
- Do not claim that Pi supports native MCP; offer its documented alternatives only.
- Use only published syntax for each agent. If a client has no confirmed environment
  interpolation, use its documented prompt/secure-store flow rather than guessing.
