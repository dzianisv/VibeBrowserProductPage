# Task 160 - Agent Remote-MCP Config Evidence

Published documentation is the authority for these cards. All examples use
placeholders because the remote-session value controls a real browser.

| Client | Verified configuration | Official source |
|---|---|---|
| Claude Code | `mcpServers`, `type: "http"`, `${VIBE_REMOTE_UUID}` can expand in `headers` | https://code.claude.com/docs/en/mcp |
| Codex CLI | `~/.codex/config.toml`; `env_http_headers` maps header name to environment-variable name | https://learn.chatgpt.com/docs/extend/mcp?surface=cli |
| GitHub Copilot in VS Code | `.vscode/mcp.json` uses `servers`; secret should use a password `${input:...}` | https://code.visualstudio.com/docs/agent-customization/mcp-servers |
| GitHub Copilot CLI | `~/.copilot/mcp-config.json` uses `mcpServers`; remote headers are literal config values. No documented local header-env interpolation. | https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers |
| Cursor | `mcpServers`; `${env:VIBE_REMOTE_UUID}` is supported in `headers` | https://cursor.com/docs/mcp |
| OpenCode | `mcp`, `type: "remote"`, `{env:VIBE_REMOTE_UUID}` expansion | https://opencode.ai/docs/mcp-servers/ |
| Pi coding agent | No native MCP client by design. It needs a custom or third-party extension; no first-party MCP adapter is published. | https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md |

## Required distinctions

- Codex remote HTTP is configured in `config.toml`; the CLI `mcp add` example is
  for stdio, not this transport.
- VS Code's config key is `servers`, not `mcpServers`.
- Copilot CLI and GitHub's cloud coding-agent MCP configuration are different
  products. Never apply cloud `${VAR}`/secret-variable guidance to the local CLI.
- Each client has a distinct interpolation syntax. Do not publish a generic
  environment-variable snippet.
- Pi's capability statement applies to the Pi coding agent (`earendil-works/pi`),
  not Inflection's unrelated consumer Pi.
