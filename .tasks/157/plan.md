# Implementation Plan

## Approach Summary

Ship two focused content changes, one per public route. Both use verified relay
contracts and preserve the site's existing visual components and copyable-code pattern.

## Tradeoff: Speed vs Quality

- chosen: thorough
- rationale: These instructions configure live browser access; inaccurate copy could
  either block users or encourage unsafe credential handling.

## Tasks

| # | Title | Files | Depends on | Parallel group | Done criterion |
|---|---|---|---|---|---|
| 1 | Explain remote CLI relay flow | `app/cli/page.tsx` | endpoint research | A | Page explains browser-to-agent flow, remote formats, setup location, and safe commands. |
| 2 | Explain direct remote MCP endpoint | `app/mcp/page.tsx` | endpoint research | A | Page contrasts stdio and direct Streamable HTTP setup with valid copyable client config. |
| 3 | Review, build, and production-check | `.tasks/157/*` | 1, 2 | B | Review has no blocking finding; production routes meet success metric. |

## Parallel Groups

- **A**: tasks 1 and 2; independent source files.
- **B**: review, deploy, and live-browser validation after both content changes.

## Rollback Plan

Revert the single documentation PR. No stateful data, migrations, or API contracts change.
