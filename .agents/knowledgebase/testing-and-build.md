# Testing And Build Commands

Use this file for quick verification before and after code changes.

## Common Commands

- Install dependencies: `npm install`.
- Local dev server: `npm run dev`.
- Production build: `npm run build`.
- Lint: `npm run lint`.
- Start built app: `npm run start`.
- Ping IndexNow manually: `npm run indexnow:ping`.

## Layout And Browser Checks

- Local layout test: `node scripts/test-layout.js http://localhost:3000`.
- Production layout test: `node scripts/test-layout.js https://www.vibebrowser.app`.
- Mobile layout test: `node scripts/test-mobile-layout.cjs`.
- Mobile screenshot helper: `node scripts/screenshot-mobile.cjs`.
- Full manual checklist: `docs/testing.md`.

## Waitlist And Supabase Checks

- Main waitlist action: `actions/waitlist-supabase.ts`.
- Legacy Neon waitlist action: `actions/waitlist.ts`.
- Test waitlist: `node scripts/test-waitlist.js`.
- Waitlist stats: `npm run waitlist:stats`.
- Export waitlist CSV: `npm run waitlist:csv`.
- Supabase setup references: `SUPABASE_SETUP.md`, `SUPABASE_SETUP_GUIDE.md`, and SQL/scripts under `scripts/`.

## Analytics Checks

- PostHog setup and verification: `docs/posthog.md`.
- First-party PostHog proxy is configured in `next.config.mjs` through `/ingest/*` rewrites.
- Verify email inputs remain masked from capture when touching forms.
- Verify custom events after CTA, dialog, signup, or mailing-list changes.

## Deployment Notes

- Production deployment is Vercel-based.
- Build runs `prebuild` first, which attempts `git lfs pull` and then continues if unavailable.
- `postbuild` runs `node scripts/indexnow-ping.js`.
- Before committing, repository instructions require git identity `Den <2119348+dzianisv@users.noreply.github.com>` so Vercel accepts deployment checks.
