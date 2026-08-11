# Reddit drafts

## Subreddit selection and self-promo rules (checked live against each sub's rules.json)

| Sub | Founder launch post allowed? | The rule, verbatim-ish | What we must do |
|---|---|---|---|
| **r/mcp** | **Yes** | "Self-promotion is allowed with proper disclosure. Anyone caught promoting their product while pretending to be an unaffiliated user will be permanently banned." Also: "If you've built something in the MCP ecosystem, use showcase tag." Also: "No waitlists — share it after it's fully launched." | Use the **showcase** flair. Say "I built this" in the first line. We are fully launched (CWS + npm + registry), so the no-waitlist rule is satisfied. |
| **r/ClaudeAI** | **Yes, conditionally** | "Promoting your project or paid service is encouraged if it fits: be clear the project was built with Claude/Claude Code or specifically for Claude BY YOU, include a clear description of what it does." Also "Use relevant post flair." | Post must be framed around the **Claude connector** specifically, not a generic product pitch. Pick a flair. Keep it educational. |
| **r/SideProject** | **Yes** | No formal rule list. Sub description: "for sharing and receiving constructive feedback on side projects." Submission format asked for: `[Project name] - [Short description]`. | Follow their title format exactly. Ask for feedback, genuinely. |
| ~~r/ChatGPTCoding~~ | **No — do not post** | "Self-promotion belongs in the weekly thread. Do not post primarily to advertise a product, service, or project. Standalone project posts are not allowed." | Excluded. A launch post here would be removed. If we want this audience, comment in their weekly self-promotion thread instead. |

---

## 1. r/mcp — flair: `showcase`

**Title:**
```
I built an MCP server that drives your real, logged-in Chrome — now with OAuth 2.1 + DCR, works as a custom connector in Claude on the web
```

**Body:**
```
Disclosure up front: I'm the author.

Most browser MCP servers hand the agent a fresh headless Chrome. That's fine
for scraping and useless the moment the task needs you to be logged in. Vibe-MCP
attaches to the Chrome you already have open — your profile, your cookies, your
sessions. The agent clicks in the same window you're looking at.

What's new: OAuth. The canonical endpoint is

  https://relay.api.vibebrowser.app/mcp

It's the same URL for every user and contains no credential. It implements
OAuth 2.1 with Dynamic Client Registration — your client registers itself, you
approve a consent screen for browser:read and browser:control, and you get a
revocable token. Tokens and registered clients survive our deploys; we rolled
the pods mid-session and nothing had to re-consent.

You can verify the handshake without installing anything. Unauthenticated POST
returns 401 with a WWW-Authenticate: Bearer header carrying resource_metadata
and the two scopes, and both .well-known documents are public.

- Claude on the web: Settings -> Connectors -> Add custom connector. Paste the
  URL, approve, 27 tools appear. Verified end to end.
- ChatGPT on the web: Settings -> Security and login -> Developer mode ->
  Plugins -> Create app. The older per-user URL works there on a paid plan. I
  could NOT verify the OAuth URL, because Create app silently no-ops on a free
  account. Not going to claim it works when I haven't seen it work.

Also works with Claude Code, Claude Desktop, Codex CLI, Cursor, VS Code Copilot,
Windsurf, Gemini CLI, OpenCode: https://www.vibebrowser.app/integrations

Two-minute repro: install the extension, add the connector, ask
"go to duckduckgo.com and find out when the first GPT model was released".
Answer should be 2018 and you should see it navigate in your own browser.

That exact task gates our merges. CI boots a real Chrome with the extension,
starts the relay, and runs the real `opencode` CLI as the client with all of
its own tools disabled — bash, read, write, webfetch, websearch, all false and
denied. Our browser is its only path to an answer. Runs headed under Xvfb
because DuckDuckGo CAPTCHAs headless Chrome. No "2018" in the output, build
goes red. (tests/relay-external-control-e2e.test.js — in the extension repo,
which is private, so you can't read it. Ask and I'll paste it.)

Honest caveats, because this sub will find them anyway:

1. OAuth here is scoped read-vs-control, NOT per-origin. browser:control means
   the agent can act in any tab you're signed into. Real per-site scoping needs
   enforcement in the extension and isn't done yet.
2. The legacy per-user URL (.../mcp/<uuid>) still works and is the right choice
   for headless clients that can't show a consent screen. That one is an
   unscoped bearer capability — treat it like a password.
3. It needs a Chrome extension. There's no way to reach your real profile
   without one.
4. The MCP server is open source (Apache-2.0):
   https://github.com/VibeTechnologies/vibe-mcp — npm `@vibebrowser/mcp`,
   registry `io.github.VibeTechnologies/vibe-mcp`. The extension is closed
   source today.
5. No user numbers, no uptime claims, $0 MRR. It's new.

Interested in what breaks for you, especially with sites that fight automation.
```

---

## 2. r/ClaudeAI — pick a flair (e.g. `Built with Claude` / `Productivity` / whichever exists at post time)

**Title:**
```
Claude on the web can now drive my real Chrome via a custom connector — OAuth, 27 tools, here's how and what it actually costs you
```

**Body:**
```
I built this, so treat it as a project post — but the setup below is the useful
part whether or not you use my thing.

Claude's custom connectors (Settings -> Connectors -> Add custom connector)
accept a remote MCP endpoint and will run the OAuth flow for you. No domain
verification, no allowlist. That means Claude in the browser can call tools that
drive your own machine.

I pointed it at Vibe-MCP, an MCP server that controls the Chrome you already
have open — real profile, real cookies, real logged-in sessions, not a headless
throwaway. Paste https://relay.api.vibebrowser.app/mcp, approve the consent
screen for browser:read and browser:control, and 27 tools show up. It completed
a live task on the first attempt, with the calls labelled "Used vibebrowser
oauth integration".

Try it in two minutes: add the connector, then ask Claude
"go to duckduckgo.com and find out when the first GPT model was released".
It should say 2018, and you should watch the navigation happen in your window.

Why real-session control matters with Claude specifically: it removes the
"paste your cookies into a tool" step and the "I can't log in for you" dead end.
Anything you can see logged in, Claude can act on.

The part I'd want to know before enabling it:

- The URL you paste holds no secret and the token is revocable — that's the
  good news. The bad news is the scopes are read-vs-control, not per-site.
  Approving browser:control lets the agent act in any tab you're signed into,
  email and bank included. Per-origin scoping isn't built yet.
- There's also a legacy per-user URL for headless clients. That one IS an
  unscoped bearer credential for your whole browser. Treat it like a password.
- It needs a Chrome extension installed. Unavoidable to reach your real profile.
- MCP server is open source, Apache-2.0:
  https://github.com/VibeTechnologies/vibe-mcp. The extension is not.
- It's brand new. No user numbers or uptime to quote, $0 revenue.

It also works in Claude Code and Claude Desktop, plus non-Anthropic clients:
https://www.vibebrowser.app/integrations
Claude-specific setup doc: https://www.vibebrowser.app/integrations/claude-connector
```

---

## 3. r/SideProject — title uses the sub's requested `[Project] - [description]` format

**Title:**
```
Vibe-MCP - lets an AI agent control the Chrome you already have open, logged in and all
```

**Body:**
```
Built this and would like feedback on where it falls over.

The problem: every AI browser tool I tried opened a clean headless Chrome. The
second a task needed me to be logged in — my dashboard, my inbox, my bank — it
was stuck. Vibe-MCP goes the other way. It attaches to the Chrome that's already
running with your profile and sessions. The agent clicks in your window.

It plugs into Claude on the web as a custom connector over OAuth 2.1 — you paste
one URL that contains no secret, approve two scopes, and get a token you can
revoke. ChatGPT on the web works too, via an older per-user URL, on a paid plan.
Plus Claude Code, Cursor, Codex CLI, VS Code Copilot, Windsurf, Gemini CLI and
OpenCode. https://www.vibebrowser.app/integrations

Fastest way to see if it's real: install the extension, add the connector, ask
"go to duckduckgo.com and find out when the first GPT model was released".
You want 2018, and you want to see the browsing happen in front of you.

Same task is our CI merge gate — a real agent with all its own tools switched
off has to get "2018" through our browser or the build fails.

Trade-offs I'm not hiding:
- OAuth scopes are read-vs-control, not per-site. Granting control means the
  agent can act as you in any logged-in tab. That's the whole point of the
  product and also its scariest property.
- The legacy per-user URL is a bearer token for your whole browser. Someone who
  gets it can act as you. Guard it like a password.
- Requires a Chrome extension (on the Web Store as "Vibe AI Browser Co-Pilot").
- MCP server is open source Apache-2.0; the extension isn't.
- $0 revenue, no user count worth quoting. Very early.

What I actually want feedback on: is "browser:control means everything I'm
logged into" a dealbreaker for you, or is "it's my browser, that's the point"
fine? And which site broke it first?
```
