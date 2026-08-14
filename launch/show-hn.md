# Show HN draft

> **SUPERSEDED — historical draft, do not post as written.**
>
> This draft was written in August 2026, when the plan was to launch relay
> OAuth 2.1 + Dynamic Client Registration on the credential-free endpoint
> `https://relay.api.vibebrowser.app/mcp`. That is **not** the supported
> onboarding path and must not be taught to anyone.
>
> The supported hosted-connector contract is the direct Streamable HTTP URL
> **`https://relay.api.vibebrowser.app/mcp/<your-routing-uuid>`**, copied from
> the Vibe extension (Settings -> Enable external AI agent control -> Remote
> (internet) -> Agent connection URL). There is no consent screen, no client
> registration, and no `browser:read` / `browser:control` scopes to approve.
> That URL is a bearer credential — never publish a real one.
>
> Everything below the line is kept verbatim as a record of what we drafted at
> the time. Rewrite it against the current docs before posting anything:
> https://www.vibebrowser.app/integrations/claude-connector
>
> ---

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

New this week: OAuth. The connector URL is now
https://relay.api.vibebrowser.app/mcp — the same string for every user, with no
credential in it. It speaks OAuth 2.1 with Dynamic Client Registration, so the
client registers itself, you approve a consent screen for two scopes
(browser:read, browser:control), and you get a token you can revoke. Tokens and
registered clients survive our deploys — we rolled the pods during a live
session and nothing had to re-consent.

You can check the handshake yourself without installing anything. An
unauthenticated POST to that URL returns 401 with

  WWW-Authenticate: Bearer resource_metadata="https://relay.api.vibebrowser.app/
  .well-known/oauth-protected-resource", scope="browser:read browser:control"

and both .well-known documents are public.

Verified in Claude on the web: Settings -> Connectors -> Add custom connector,
paste that URL, approve the consent screen, 27 tools appear. It then answered a
live browsing task correctly — "June 2018" — with the tool calls labelled
"Used vibebrowser oauth integration".

ChatGPT, stated accurately: the older per-user connector URL works there. The
OAuth URL we could not confirm, because ChatGPT's Settings -> Security and
login -> Developer mode -> Plugins -> Create app silently does nothing on a
free account. So read that as "ChatGPT works on a paid plan via the per-user
URL", not as a solved OAuth path.

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
write, webfetch and websearch all set to false and additionally denied at the
permission layer. Its only route to an answer is our browser. It runs headed
under Xvfb, because DuckDuckGo serves a CAPTCHA to headless Chrome. If the
returned text doesn't contain "2018", the build goes red and the PR doesn't
merge. The file is tests/relay-external-control-e2e.test.js — fair warning, it
lives in the extension repo, which is private, so you can't click through and
read it today.

Two things you should know before you try it.

First, the security model. OAuth improves it. It does not make it safe by
default. browser:control means the agent acts inside your live sessions — your
email tab, your bank tab, anything you're signed into. The scopes split read
from control, not site from site. What you gain over the old design is real: a
URL that carries no secret, a consent screen you actually approve, and a token
you can revoke. What you don't get yet is "allow github.com and nothing else".
Per-origin scoping is the work we still owe you, and it's extension work, not
a token exchange.

The per-user URL, https://relay.api.vibebrowser.app/mcp/<uuid>, still works and
is the right answer for headless and automation clients that can't show a
consent screen. That one is a bearer capability with no scoping at all —
whoever holds it drives your browser as you. Treat it exactly like a password,
and regenerate it in the extension if you paste it somewhere you shouldn't
have.

Second, it needs a Chrome extension installed. There is no way to reach your
existing profile without one. It's on the Chrome Web Store as "Vibe AI Browser
Co-Pilot".

What's open and what isn't: the MCP server is open source, Apache-2.0, at
https://github.com/VibeTechnologies/vibe-mcp. It's on npm as
@vibebrowser/mcp and in the official MCP registry as
io.github.VibeTechnologies/vibe-mcp. The browser extension is closed source
today, and so is the repo holding the CI test above. I'd rather say that
plainly than let you find out.

No numbers to brag about — no user count, no uptime figure, $0 MRR. It's new.

Docs: https://www.vibebrowser.app/integrations/claude-connector and
https://www.vibebrowser.app/integrations/chatgpt-connector

Happy to answer anything about the relay, the tool surface, or why the scopes
are still coarse.
```
