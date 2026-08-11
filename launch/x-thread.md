# X / Twitter thread (5 posts)

**1/ — must stand alone**
```
Claude on the web can now drive your real Chrome.

Not a headless browser. The one you have open, with your cookies and your
logged-in sessions. Add it as a custom connector — OAuth 2.1, one URL that
holds no secret, two scopes you approve.

27 tools. Did a live task first try.
```

**2/**
```
Setup:

Claude → Settings → Connectors → Add custom connector

Paste https://relay.api.vibebrowser.app/mcp — same URL for everyone, no
credential in it. Approve browser:read + browser:control. Done.

ChatGPT works too, via the older per-user URL, on a paid plan.

https://www.vibebrowser.app/mcp
```

**3/**
```
Two-minute repro so you don't have to trust me:

Ask it "go to duckduckgo.com and find out when the first GPT model was
released."

Answer: 2018. And you watch the navigation happen in your own browser window.
```

**4/**
```
That same task is our merge gate.

CI boots a real Chrome with the extension, then runs the actual opencode CLI
as the client with ALL of its own tools disabled — bash, read, write,
webfetch, websearch: false.

Our browser is its only route to an answer. No "2018", build goes red.
```

**5/**
```
The honest part:

OAuth gets you a revocable token and a URL with no secret in it. It does NOT
get you per-site scoping — browser:control means any tab you're signed into.

The legacy per-user URL is still an unscoped password. Guard it.

Needs a Chrome extension.

Server is open source (Apache-2.0). The extension isn't.

github.com/VibeTechnologies/vibe-mcp
```

**6/ (optional, drop if the thread feels long enough)**
```
Also works in Claude Code, Claude Desktop, Codex CLI, Cursor, VS Code Copilot,
Windsurf, Gemini CLI, OpenCode.

npm: @vibebrowser/mcp
MCP registry: io.github.VibeTechnologies/vibe-mcp

https://www.vibebrowser.app/integrations
```
