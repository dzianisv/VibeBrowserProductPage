# Decisions

- 2026-07-21: Treat the two Notion checkboxes as one GitHub issue because they are one
  user journey: connecting an agent to a remotely reachable real browser.
- 2026-07-21: Keep local stdio as the default flow. Add, rather than replace, the
  remote direct MCP path.
- 2026-07-21: Use a fresh worktree from `origin/main`; current primary checkout is on
  an unrelated branch with untracked task artifacts.
- 2026-07-21: Document UUID-only browser relay authentication. An independent review
  traced current deployed relay changes #1610/#1616 and removed stale attach-token
  guidance before integration.
