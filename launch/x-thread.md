# X / Twitter thread (5 posts)

**1/ — must stand alone**
```
Claude and ChatGPT on the web can now drive your real Chrome.

Not a headless browser. The one you have open, with your cookies and your
logged-in sessions. Add it as a custom connector — no domain verification,
no allowlist, no OAuth.

Claude found 27 tools and did a live task first try.
```

**2/**
```
Setup, both sides:

Claude → Settings → Connectors → Add custom connector
ChatGPT → Settings → Security and login → Developer mode → Plugins → Create app

Paste the URL. That's it.

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

The connector URL is a bearer capability. Whoever holds it drives your browser
as you. Not per-site scoped. Treat it like a password.

It needs a Chrome extension.

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
