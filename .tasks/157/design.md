# Design

## Problem

The public CLI and MCP pages expose commands but omit the connection model users need
to connect an AI agent safely to their real browser. The MCP page also fails to show
the direct remote MCP endpoint configuration that avoids both Studio and a locally
installed bridge.

## Goal

Make both pages self-contained setup guides while preserving existing local stdio
setup. Use only documented public endpoint and credential forms, plus explicit
security boundaries for browser-control credentials.

## Current State

- `app/cli/page.tsx` offers remote command examples without explaining how a remote
  value routes from the extension to an agent.
- `app/mcp/page.tsx` focuses on local stdio configuration and does not present direct
  remote Streamable HTTP setup.

## Proposed Design

- Add a concise relay-flow section to `/cli` with an extension-to-relay-to-agent
  diagram, settings path, accepted remote input forms, and copyable safe commands.
- Add a separate direct remote MCP section to `/mcp`, clearly contrasted with local
  stdio. It uses `https://relay.api.vibebrowser.app/mcp` with the extension UUID in
  the `X-Remote-Session` header; no Studio or local bridge process is needed.
- Never put a real UUID, WebSocket URL, or remote secret in page source.

## Alternatives Considered

- Link to repository README only: rejected because the product routes are intended
  as the public setup surface and the backlog identifies these pages as incomplete.
- Replace local stdio with remote setup: rejected because local stdio remains the
  safer default for same-machine clients.

## Risks and Mitigations

- Incorrect endpoint or auth documentation: validate against the deployed relay
  implementation and live unauthenticated endpoint before editing or deploying.
- Credential disclosure: use non-routable placeholders and state that relay values
  grant browser control.
- Obsolete second-factor documentation: the deployed relay is UUID-only; do not
  document attach-token headers or a Settings toggle that no longer exists.
- Configuration drift: retain local setup and label its transport distinctly.

## Touched Surface

- `app/cli/page.tsx`
- `app/mcp/page.tsx`
- `.tasks/157/*`
