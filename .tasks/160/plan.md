# Implementation Plan

## Approach

Move existing local setup into `/mcp-stdio`, then build a focused remote page around
the hosted endpoint and agent-specific configuration cards. Wire both routes through
site navigation and discovery surfaces, then validate in production.

## Tradeoff

- chosen: thorough
- rationale: browser-control credentials and multiple agent config dialects make
  incorrect copy materially harmful.

## Tasks

| # | Task | Files | Depends on | Group | Done criterion |
|---|---|---|---|---|---|
| 1 | Move/relabel local MCP route | `app/mcp-stdio/**` | UI spec | A | `/mcp-stdio` keeps a coherent local stdio guide and links to remote setup. |
| 2 | Build remote MCP page | `app/mcp/**` | UI spec | A | Remote page has verified agent configs and local-only privacy CTA. |
| 3 | Wire global route surfaces | nav/footer/sitemap/links/metadata/docs | 1,2 | B | No stale route purpose or broken internal link remains. |
| 4 | Review and validate production | task records | 1-3 | C | Build, browser proof, deploy, and live route checks satisfy success metric. |

## Rollback

Revert the feature PR. The prior `/mcp` page is recoverable from git history; no data
migration or credential storage changes occur.
