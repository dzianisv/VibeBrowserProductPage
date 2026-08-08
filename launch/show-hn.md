# Show HN draft

**Title (73 chars):**

```
Show HN: Vibe-MCP – let Claude or ChatGPT drive your real logged-in Chrome
```

**URL field:** https://www.vibebrowser.app/mcp

**Body:**

```
Vibe-MCP is an MCP server that gives an AI agent control of the Chrome you
already have open — your real profile, your real cookies, your real logged-in
sessions. Not a headless browser, not a fresh throwaway profile. The agent
clicks and types in the same window you do.

New this week: it works as a custom connector inside Claude on the web and
ChatGPT on the web, not just in local dev tools. Claude: Settings ->
Connectors -> Add custom connector. ChatGPT: Settings -> Security and login ->
Developer mode -> Plugins -> Create app. No domain verification, no allowlist,
no OAuth dance. Claude discovered 27 tools and both answered a real live task
correctly.

It also works with Claude Code, Claude Desktop, Codex CLI, Cursor, VS Code
Copilot, Windsurf, Gemini CLI and OpenCode:
https://www.vibebrowser.app/integrations

Repro you can run in about two minutes: install the extension, add the
connector, then ask "go to duckduckgo.com and find out when the first GPT
model was released". You should get 2018, and you should watch it happen in
your own browser window.

That same task is our merge gate. There's a CI job that boots a real Chrome
with the extension loaded, starts the relay, and runs the actual `opencode`
CLI as the client with every one of its own tools turned off — bash, read,
write, webfetch and websearch all set to false and denied. Its only way to
answer is our browser. If the returned text doesn't contain "2018", the build
goes red and the PR doesn't merge. Code:
tests/relay-external-control-e2e.test.js.

Two things you should know before you try it.

First, the security model. The connector URL is a bearer capability. Anyone
holding that URL can drive your browser as you — read your email, act on your
bank tab, whatever the session allows. It is not scoped per site and it is not
an OAuth grant you can partially approve. Treat it exactly like a password.
Rotate it if you paste it somewhere you shouldn't have. We think this is the
honest shape of the problem rather than a bug: "let an agent use my real
session" and "sandbox the agent from my real session" are the same knob.

Second, it needs a Chrome extension installed. There is no way to reach your
existing profile without one. The extension is on the Chrome Web Store.

What's open and what isn't: the MCP server is open source, Apache-2.0, at
https://github.com/VibeTechnologies/vibe-mcp. It's on npm as
@vibebrowser/mcp and in the official MCP registry as
io.github.VibeTechnologies/vibe-mcp. The browser extension is closed source
today. I'd rather say that plainly than let you find out.

No numbers to brag about — no user count, no uptime figure, $0 MRR. It's new.

Docs: https://www.vibebrowser.app/integrations/claude-connector and
/chatgpt-connector

Happy to answer anything about the relay, the tool surface, or why we didn't
do OAuth yet.
```
