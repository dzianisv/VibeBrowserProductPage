# Decisions (--autopilot)

## 2026-05-26 - Issue quoting recovery
- question: Issue body lost inline path text due shell interpolation; recreate issue or recover in-place?
- decision: Recover in-place via issue comment clarifying exact scope and files.
- reasoning: Keeps issue continuity and references while restoring actionable acceptance criteria.
- alternatives:
  - Close #111 and open #112 with corrected markdown.
  - PATCH issue body through API call.
- evidence:
  - https://github.com/dzianisv/VibeBrowserProductPage/issues/111
  - https://github.com/dzianisv/VibeBrowserProductPage/issues/111#issuecomment-4549859236

## 2026-05-26 - Plan approval in autopilot mode
- question: Skill normally asks user "go" after Phase 4. Should flow pause?
- decision: Continue without pause and mark plan approved-autopilot.
- reasoning: Invocation includes `--autopilot`; explicit rule says no user questions and decide all forks.
- alternatives:
  - Ask user for explicit go (violates autopilot).
  - Stop workflow pending manual confirmation.
- evidence:
  - User context includes `<context> --autopilot </context>`.

## 2026-05-27 - Keep single source while allowing site-specific contact
- question: Shared template should stay single-source, but AgentLabs may need different contact emails.
- decision: Add per-site config fields (`heroContactHref`, `footerContactHref`) and clone base config into vibebrowser/agentlabs variants.
- reasoning: Meets no-copy-paste requirement and enables domain-specific contact without forking markup.
- alternatives:
  - Keep one config and same emails for both sites.
  - Duplicate template for agentlabs-specific footer/hero actions.
- evidence:
  - `shared/company-profile/types.ts`
  - `shared/company-profile/config.ts`
  - `shared/company-profile/company-profile-page.tsx`

## 2026-05-27 - AgentLabs shared imports strategy
- question: Alias (`@shared/*`) or relative imports for `apps/agentlabs` wrappers?
- decision: Use relative imports + `experimental.externalDir`; remove alias.
- reasoning: Turbopack in this setup failed to resolve alias mapped outside app root. Relative imports compile reliably.
- alternatives:
  - Keep alias and add extra resolver config.
  - Copy shared modules into app (rejected by no-copy-paste requirement).
- evidence:
  - Build failure log: module not found for `@shared/*` in `apps/agentlabs`.
  - Build pass after reverting to relative imports.
