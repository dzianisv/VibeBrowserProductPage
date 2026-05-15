# VibeBrowser Product Page Overview

This repository is the public Next.js marketing site for Vibe Co-Pilot at `https://www.vibebrowser.app`.

## Stack

- Framework: Next.js App Router, React 19, TypeScript, Tailwind CSS.
- Package manager: npm with `package-lock.json`.
- Path alias: `@/*` maps to the repository root via `tsconfig.json`.
- Important config: `next.config.mjs` adds a legacy redirect from `/BrowserUseModelsBenchmark` to `/blog/BrowserUseModelsBenchmark` and proxies PostHog traffic through `/ingest/*`.

## Product Positioning

- Vibe Co-Pilot is an AI browser automation extension that operates real logged-in browser sessions.
- Core message: "The AI browser that acts, not just answers."
- Differentiators: works in existing Chrome sessions, model flexibility, BYOK/local/self-hosted options, MCP access for agents, Google Workspace automation, reusable skills, secrets vault, and human-in-the-loop approvals.
- Main use cases: repetitive web automation, outreach and lead generation, deep research, data entry, booking, Google Workspace workflows, and agent-controlled browser sessions.
- Public product references: `product/docs/product.md`, `app/page.tsx`, `landing-page.tsx`, `app/llms.txt/route.ts`, `app/compare/page.tsx`, and `app/cloud/page.tsx`.

## Editing Rules For Future Agents

- Do not change product code when only updating knowledgebase docs.
- Preserve the existing visual language when editing routed pages.
- For new routed marketing pages, update navigation, footer links, sitemap, and optionally OG/Twitter image routes.
- For analytics changes, consult `docs/posthog.md` and `.agents/skills/posthog/SKILL.md`.
- For blog work, consult `.agents/skills/blog-hub/SKILL.md` and `.agents/knowledgebase/blog-authoring.md`.

## Key Runtime Behavior

- `app/layout.tsx` mounts shared metadata, JSON-LD, RSS discovery, Google Analytics, PostHog bootstrap, web vitals, and referral tracking.
- `instrumentation-client.ts` initializes PostHog on the client when env vars are present.
- `components/google-analytics.tsx` is the shared event helper for GA4, PostHog, and server telemetry.
- `components/referral-tracker.tsx` captures UTM/referral data early across routed pages.
- `app/api/telemetry/events/route.ts` and `app/api/telemetry/web-vitals/route.ts` receive telemetry.
