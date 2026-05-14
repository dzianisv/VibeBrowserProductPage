# VibeBrowser Product Page Notes

## Architecture
- Next.js App Router project using React 19, Next 16, TypeScript, Tailwind CSS, Radix UI components, and Vercel deployment.
- Routes live under `app/`; shared UI lives under `components/`; server actions live under `actions/`; reusable helpers live under `lib/`; operational scripts live under `scripts/`.
- Homepage route is `app/page.tsx`, which renders the top-level `landing-page.tsx` component.
- Global metadata, fonts, JSON-LD, Google Analytics, referral tracking, and web-vitals wiring are in `app/layout.tsx`.
- Blog posts are Markdown files in `blog/`; parsing and publishing logic is in `lib/blog.ts`; blog routes are `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, and social image routes under `app/blog/`.
- `next.config.mjs` keeps trailing slash behavior, redirects `/BrowserUseModelsBenchmark` to `/blog/BrowserUseModelsBenchmark`, and proxies PostHog through `/ingest/*`.

## Route Locations
- `/openclaw`: `app/openclaw/page.tsx`; route metadata and structured data live in `app/openclaw/layout.tsx`; social images live in `app/openclaw/opengraph-image.tsx` and `app/openclaw/twitter-image.tsx`; this route remains OpenClaw positioning.
- `/mcp`: `app/mcp/page.tsx`; route metadata and structured data live in `app/mcp/layout.tsx`; social images live in `app/mcp/opengraph-image.tsx` and `app/mcp/twitter-image.tsx`.
- `/cli`: canonical CLI route now exists at `app/cli/page.tsx`; route metadata and structured data live in `app/cli/layout.tsx`; social images live in `app/cli/opengraph-image.tsx` and `app/cli/twitter-image.tsx`.

## Operations
- Install/build/dev commands are standard npm: `npm run dev`, `npm run build`, `npm run lint`, `npm run start`.
- `npm run build` runs `prebuild` (`git lfs pull 2>/dev/null || true`) and `postbuild` (`node scripts/indexnow-ping.js`).
- Production deploy target is Vercel at `https://www.vibebrowser.app`; deployment notes are in `DEPLOYMENT.md`.
- Required production env vars include `SUPABASE_PROJECT_URL`, `SUPABASE_API_KEY`, and `GIT_LFS_ENABLED=1`; optional telemetry env vars are documented in `DEPLOYMENT.md`.
- Waitlist data uses Supabase table `vibebrowser_waitlist`; scripts for verification/export are exposed as `npm run waitlist`, `npm run waitlist:stats`, and `npm run waitlist:csv`.
- Testing guidance lives in `docs/testing.md`; key checks include `npm run build`, `node scripts/test-layout.js <url>`, and waitlist scripts.

## Agent Guardrails
- Do not touch application route/content files or media unless the task explicitly asks for product changes.
- Treat `.env`, `.vercel/.env.production.local`, and other env files as secret-bearing; do not commit or expose them.
- Media-heavy product pitch assets live under `product/vibebrowser-pitch/`; videos are Git LFS-managed.
