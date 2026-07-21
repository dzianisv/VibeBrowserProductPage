# Validation Plan

## Tier

Build plus CUA-driven production test.

## Test Cases

| # | Input | Expected Behavior | Channel |
|---|---|---|---|
| 1 | Build source branch | Next.js compiles the two routes without errors. | CI/local build |
| 2 | Open production `/cli` | Relay diagram, settings path, remote format guidance, and copyable command are visible. | Fresh browser at `https://www.vibebrowser.app/cli` |
| 3 | Open production `/mcp` | Local stdio and direct remote Streamable HTTP setup are visibly distinct; direct endpoint config is copyable. | Fresh browser at `https://www.vibebrowser.app/mcp` |

## Pass Criterion

Both production routes meet the exact success metric in `success.md` with no real
credential exposed in rendered source or copyable examples.
