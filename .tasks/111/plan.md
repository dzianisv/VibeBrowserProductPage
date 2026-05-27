## Approach Summary
Extract duplicated page/blog rendering into shared modules under repository root, then keep app routes as thin wrappers passing site-specific config. Ship requested content/docs changes in parallel where file scopes do not overlap.

## Tradeoff: Speed vs Quality
- chosen: balanced
- rationale: medium refactor with cross-app route wiring; prioritize maintainability and correctness without over-expanding into full design rewrite.

## Tasks
| # | Title | Files | Depends on | Parallel group | Suggested model |
|---|-------|-------|------------|----------------|-----------------|
| 1 | Shared company profile template + wrappers | `shared/company-profile/*`, `app/aboutus/page.tsx`, `apps/agentlabs/app/page.tsx` | — | A | gpt-5.1-codex |
| 2 | Shared blog rendering + AgentLabs blog routes | `shared/blog/*`, `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `apps/agentlabs/app/blog/page.tsx`, `apps/agentlabs/app/blog/[slug]/page.tsx`, `apps/agentlabs/tsconfig.json`, `apps/agentlabs/next.config.ts` | — | B | sonnet |
| 3 | Domain runbook docs + AGENTS reference | `docs/domain-management.md`, `AGENTS.md` | — | A | haiku |
| 4 | Main page `#ainativecompany` link block | `landing-page.tsx` | — | A | sonnet |
| 5 | Integration pass + copy parity checks | touched files from 1-4 + `.tasks/111/*` | 1,2,3,4 | C | gpt-5.1-codex |

## Parallel Groups
- **A** (independent): tasks 1, 3, 4 in one fan-out.
- **B**: task 2 (shared blog + agentlabs routing/config).
- **C**: task 5 final integration and consistency validation.

## Done Criteria
- **Task 1:** both about routes are wrappers (<= ~20 LOC each), and shared company template contains page markup used by both apps.
- **Task 2:** `/blog` and `/blog/[slug]` wrappers exist in agentlabs; both apps use shared blog renderer modules; no duplicated blog page TSX remains.
- **Task 3:** `docs/domain-management.md` exists and explicitly references Spaceship + `agentlabs.cc` zone; `AGENTS.md` includes pointer.
- **Task 4:** landing page shows 3+ `#ainativecompany` links to valid existing slugs and link to tag page.
- **Task 5:** local build/lint checks for both apps pass and report recorded in `.tasks/111/test-report.md`.

## Rollback Plan
1. Revert refactor commit(s) affecting shared modules and wrappers.
2. Restore previous direct page implementations from `origin/main` for `app/aboutus/page.tsx`, `apps/agentlabs/app/page.tsx`, and blog route files.
3. Keep docs-only changes if desired; otherwise revert docs commit.
