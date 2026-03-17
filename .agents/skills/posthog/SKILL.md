---
name: posthog
description: Explain, verify, and extend PostHog analytics for vibebrowser.app using the current product-page integration and first-party proxy setup.
---

# PostHog Skill

## Purpose
Use this skill when you need to understand how PostHog works in this repo, verify that analytics are firing, add new tracked events, or explain the existing setup to another agent or engineer.

## Canonical References (read first)
- Primary implementation and runbook:
  - `docs/posthog.md`
- Client bootstrap:
  - `instrumentation-client.ts`
- Shared tracking helpers:
  - `components/google-analytics.tsx`
- First-party proxy config:
  - `next.config.mjs`
- Server telemetry allowlist:
  - `app/api/telemetry/events/route.ts`

## Current Architecture
- PostHog is added alongside existing analytics. It does not replace GA4 or server telemetry.
- Client init happens in `instrumentation-client.ts`.
- Shared custom event dispatch happens in `components/google-analytics.tsx`.
- The preferred ingest path is the first-party proxy at `/ingest`.
- Production uses the US PostHog UI host: `https://us.posthog.com`.

## Route Coverage
- All live Next.js routes under `app/` inherit `app/layout.tsx`, which mounts shared analytics components globally.
- `instrumentation-client.ts` is bundled on all routed pages and initializes `posthog-js` client-side.
- Nested layouts such as `/mcp`, `/teams`, `/enterprise`, `/aboutus`, `/blog/*`, and `/admin/*` do not replace the root layout with their own `<html>` or `<body>`.
- Verified locally on representative route types:
  - marketing/profession page: `/lawyers`
  - developer landing page: `/mcp`
  - blog article: `/blog/mcp-browser-automation-comparison`
  - admin page: `/admin/waitlist`
- Legacy `products/agenticteam/page.tsx` is not part of the active App Router route tree and is not a live routed page.

## Environment Variables
These are the expected public env vars:

```bash
NEXT_PUBLIC_POSTHOG_TOKEN="<project_token>"
NEXT_PUBLIC_POSTHOG_HOST="/ingest"
NEXT_PUBLIC_POSTHOG_UI_HOST="https://us.posthog.com"
```

If you change env handling, update:
- `.env.example`
- `VERCEL_ENV_SETUP.md`
- `docs/posthog.md`

## Event Model In This Repo
### Shared helper behavior
`trackEvent()` in `components/google-analytics.tsx` sends events to:
- PostHog
- GA4
- `/api/telemetry/events`

### Common custom events
- `dialog_open`
- `generate_lead`
- `cta_click`
- `mailing_list_signup`

### CTA conventions
- Use `trackCTAClick(ctaName, location)` for explicit CTA coverage.
- Keep `cta_name` stable and descriptive.
- Keep `location` specific to UI placement, for example:
  - `hero_primary`
  - `mcp_hero`
  - `lawyers_install`
  - `enterprise_hero`

## When Adding New PostHog Coverage
1. Prefer existing helpers in `components/google-analytics.tsx`.
2. Add explicit tracking for high-value conversion steps instead of relying only on autocapture.
3. If a new event or property must also hit `/api/telemetry/events`, update the allowlist in `app/api/telemetry/events/route.ts`.
4. Protect sensitive fields:
   - avoid capturing raw email or secret values
   - preserve `ph-no-capture` usage on sensitive inputs
   - keep session replay masking enabled
5. Update `docs/posthog.md` with any new tracked flows or verification steps.

## Verification Workflow
### Local
Run:

```bash
npm run lint
npm run build
```

Then verify in browser:
1. Open a local page.
2. Check Network for `/ingest/e/` and `/ingest/static/...`.
3. Trigger the target CTA or dialog.
4. Confirm:
   - PostHog ingest request fires
   - GA request fires when applicable
   - `/api/telemetry/events` returns `204` when applicable

### Production
1. Deploy with:

```bash
vercel --prod --yes
```

2. Confirm live endpoints:

```bash
curl -I https://www.vibebrowser.app
curl -I https://www.vibebrowser.app/ingest/static/array.js
```

3. If needed, validate live click paths in browser using the manual checks from `docs/posthog.md`.

## Common Pitfalls
- Do not assume a CTA branch is rendered without verifying the actual page config.
- If a visible CTA is `mailto:`, analytics may fire just before navigation; use preserved network logs when verifying.
- If you add a PostHog event but not the telemetry allowlist, PostHog may work while `/api/telemetry/events` silently drops the payload.
- If event volume looks low in production, confirm traffic is using `/ingest` and not a direct PostHog host.

## Output Contract
When using this skill, return:
1. What the current PostHog setup does.
2. Which files need changes, if any.
3. How the target event/flow should be tracked.
4. What verification was run locally and/or in production.
5. Any docs or env updates required.
