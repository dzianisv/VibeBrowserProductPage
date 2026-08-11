# First comment — post this under your own submission

Use on HN immediately after submitting. A trimmed version works on r/mcp too.

```
Some detail that didn't fit up top.

Why the CI test is shaped the way it is. The easy version of this test is to
let an agent loose and check it says 2018 — which passes even when the browser
integration is completely broken, because the model just knows GPT-1 shipped in
2018. So the harness disables every tool the client has of its own: bash,
read, write, webfetch and websearch are all set to false and additionally
denied at the permission layer. The only capability left is our MCP server. It
runs headed under Xvfb, because DuckDuckGo serves a bot CAPTCHA to headless
Chrome and starves the agent of results. It uses the real relay binary, not a
mock. If the connection can't be established, it fails rather than skips — a
silent skip is exactly the false green this test exists to prevent. The file is
tests/relay-external-control-e2e.test.js, and it sits in the extension repo,
which is private, so you can't go read it. Say the word and I'll paste the
harness section here.

On OAuth, since an earlier version of this pitch said we hadn't done it. We
have now. The canonical URL https://relay.api.vibebrowser.app/mcp does OAuth
2.1 with Dynamic Client Registration — the client registers itself, you approve
browser:read and browser:control, and the token is revocable. The URL itself
holds no secret, which is the main thing: you can paste it in a screenshot.
Tokens and registered clients persist across pod restarts, and we proved that
by rolling a real deploy mid-session with zero re-consent.

What OAuth here does NOT give you, so nobody is surprised. The scopes are
read-vs-control, not per-origin. Approving browser:control means the agent can
act in any tab you're signed into. The honest version of a per-site consent
screen — "this app may use github.com and nothing else" — needs enforcement
inside the extension, not a different token exchange, and that's the work
that's still outstanding. So: better than a naked URL, not yet the thing I want
to ship.

The legacy per-user URL, .../mcp/<uuid>, still exists and is the right choice
for headless and automation clients that can't render a consent screen. That
one is an unscoped bearer capability for your whole browser. Password rules
apply: don't share it, regenerate it in the extension if it leaks, and don't
leave a connector attached when you're not using it.

On the extension being closed source. The MCP server is Apache-2.0 and public;
it's the piece you'd want to audit for what leaves your machine. The extension
isn't open yet. I don't have a principled reason, just an unprincipled one:
it's tangled with a larger private codebase and I haven't done the work to
split it. Not claiming otherwise.

ChatGPT specifically. The per-user connector URL works. I could not get the
OAuth URL added, because "Create app" under Developer mode silently no-ops on a
free ChatGPT account, so I have no verified OAuth path there — only a verified
per-user-URL path on a paid plan. Claude on the web is the one I've confirmed
end to end with OAuth.

What it's bad at. Sites that aggressively fight automation will still fight it;
being logged in helps but doesn't make you invisible. Long multi-step flows
drift like any agent loop. And because it's your real browser, a confused agent
does damage in your real accounts — this is the whole trade and it cuts both
ways.

Numbers, since someone will ask: no user count I'd defend, no uptime figure,
$0 MRR. It's new.

Repo: https://github.com/VibeTechnologies/vibe-mcp
npm: @vibebrowser/mcp
Registry: io.github.VibeTechnologies/vibe-mcp
```
