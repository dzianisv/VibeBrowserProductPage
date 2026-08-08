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
silent skip is exactly the false green this test exists to prevent.

Why no OAuth yet. An OAuth grant implies scopes, and the honest scope here is
"everything the user's browser can reach". Building a consent screen that says
"allow this app to: do literally anything as you" is theater. The right fix is
real per-origin scoping — the agent gets github.com and nothing else — and
that's a meaningful amount of work in the extension, not a token exchange. So
today it's a bearer URL and a clear warning, and I'd rather ship it described
accurately than dressed up. If you want it locked down now, don't leave the
connector attached when you're not using it, and rotate the URL.

On the extension being closed source. The MCP server is Apache-2.0 and public;
it's the piece you'd want to audit for what leaves your machine. The extension
isn't open yet. I don't have a principled reason, just an unprincipled one:
it's tangled with a larger private codebase and I haven't done the work to
split it. Not claiming otherwise.

What it's bad at. Sites that aggressively fight automation will still fight it,
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
