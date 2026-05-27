## Problem
`app/aboutus/page.tsx` and `apps/agentlabs/app/page.tsx` are currently duplicated full-page TSX (same large client component), so every content update requires editing two files and can drift. Blog routes currently exist only in main app (`app/blog/page.tsx`, `app/blog/[slug]/page.tsx`) even though blog data loader is already shared in `lib/blog.ts`. `agentlabs.cc` therefore cannot serve blog pages from same implementation. Operational docs also need explicit domain runbook for Spaceship + `agentlabs.cc` zone.

## Goal
Create one shared implementation for company-profile page and blog page rendering, with thin per-app route wrappers and config for domain-specific metadata/URLs. Keep design parity and avoid copy-paste TSX.

## Success Metric
- `app/aboutus/page.tsx` and `apps/agentlabs/app/page.tsx` are thin wrappers over one shared template/config.
- `apps/agentlabs/app/blog/page.tsx` and `apps/agentlabs/app/blog/[slug]/page.tsx` exist and render using shared blog UI + `lib/blog.ts` data loader.
- Landing page includes curated `#ainativecompany` links to existing blog posts.
- `docs/domain-management.md` added with Spaceship + `agentlabs.cc` DNS guidance, and `AGENTS.md` points to it.
- Real verification: both apps pass route/build checks and blog links resolve locally.

## Out of Scope
- Changes to blog markdown schema/frontmatter parser in `lib/blog.ts`.
- Domain cutover or DNS writes in production.
- Broad visual redesign beyond requested content additions.

## Current State
- About pages duplicated:
  - `app/aboutus/page.tsx:1`
  - `apps/agentlabs/app/page.tsx:1`
- Blog implementation only in main app:
  - `app/blog/page.tsx:61`
  - `app/blog/[slug]/page.tsx:94`
  - shared data already in `lib/blog.ts:177` and `lib/blog.ts:212`
- AgentLabs app has no blog routes (only `apps/agentlabs/app/page.tsx`, `apps/agentlabs/app/layout.tsx`).
- Root docs currently include `docs/testing.md` and `docs/posthog.md`; no `docs/domain-management.md` in current branch.
- Landing page currently has no hardcoded `#ainativecompany` link block (`landing-page.tsx:199` is currently demo control logic only).

## Proposed Design
1. Add shared company-profile template module:
   - New shared component containing full About/AgentLabs page structure.
   - New typed config object for product/team/contact data and per-app overrides (emails, title text, nav links).
   - Keep one rendering implementation; wrappers only pass config.

2. Replace duplicated route files with thin wrappers:
   - `app/aboutus/page.tsx` imports shared template + vibebrowser config.
   - `apps/agentlabs/app/page.tsx` imports same shared template + agentlabs config.

3. Share blog page rendering across both apps:
   - Extract blog index/page UI and metadata builders into shared modules.
   - Keep `lib/blog.ts` as single data source.
   - Main app wrappers call shared blog functions with `siteUrl=https://www.vibebrowser.app`.
   - AgentLabs wrappers call same shared functions with `siteUrl=https://agentlabs.cc`.

4. Enable cross-root imports for AgentLabs app:
   - Add `@shared/*` path mapping in `apps/agentlabs/tsconfig.json`.
   - Enable external directory import in `apps/agentlabs/next.config.ts`.

5. Add requested content updates:
   - Add Opencode Mobile product card to shared company-profile config (single source).
   - Add `#ainativecompany` post links block to `landing-page.tsx`.
   - Add `docs/domain-management.md` and AGENTS reference.

## Alternatives Considered
1. **Symlink page files**
   - Rejected: brittle on Vercel/app roots, poor support for per-site metadata/email overrides.

2. **Redirect `agentlabs.cc/blog` to `www.vibebrowser.app/blog`**
   - Rejected: does not satisfy "available on agentlabs.cc" with same in-app route implementation; also weak for domain-specific canonical/OG metadata.

3. **Keep duplicate TSX and use sync script**
   - Rejected: operationally fragile, easy to drift, fails no-copy-paste requirement.

## Risks & Open Questions
- **Risk:** Next app in `apps/agentlabs` may block imports from repo root.
  - **Mitigation:** enable externalDir and validate with `npm run build` in `apps/agentlabs`.
- **Risk:** Domain-specific metadata/canonical URLs wrong if hardcoded.
  - **Mitigation:** pass `siteUrl`, `siteName`, and image domain through shared metadata builders.
- **Risk:** UI regressions when extracting 500+ line page.
  - **Mitigation:** extract with data/config split only; keep class names/markup stable; run visual/local route checks.

## Touched Surface
- `shared/company-profile/*` (new)
- `shared/blog/*` (new)
- `app/aboutus/page.tsx`
- `apps/agentlabs/app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `apps/agentlabs/app/blog/page.tsx` (new)
- `apps/agentlabs/app/blog/[slug]/page.tsx` (new)
- `apps/agentlabs/next.config.ts`
- `apps/agentlabs/tsconfig.json`
- `landing-page.tsx`
- `docs/domain-management.md` (new)
- `AGENTS.md`
