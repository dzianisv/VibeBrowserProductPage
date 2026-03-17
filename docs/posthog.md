# PostHog Integration

This document explains how PostHog is integrated into the Vibe Browser product page, what was changed, how it is configured, and how to verify it.

Agent workflow note:

- Use `.agents/skills/posthog/SKILL.md` when another agent needs to explain, verify, or extend this analytics setup.

## What was implemented

- Added PostHog client initialization through Next.js `instrumentation-client.ts`.
- Kept the existing GA4 + Honeycomb telemetry flow and mirrored important product events into PostHog.
- Added a first-party proxy path at `/ingest` using Next.js rewrites to reduce ad-block loss.
- Added explicit tracking for install CTAs and mailing-list signups.
- Kept email fields out of autocapture/session replay by marking them with `ph-no-capture` and enabling input masking.
- Configured Vercel env vars for development, preview, and production.
- Deployed the changes to production.

## Files changed

- `instrumentation-client.ts`
- `next.config.mjs`
- `components/google-analytics.tsx`
- `components/ui/input.tsx`
- `components/mailing-list-subscribe.tsx`
- `app/api/telemetry/events/route.ts`
- `landing-page.tsx`
- `app/mcp/page.tsx`
- `.env.example`
- `VERCEL_ENV_SETUP.md`
- `docs/testing.md`
- `package.json`
- `package-lock.json`

## Environment variables

These client-side variables are used:

```bash
NEXT_PUBLIC_POSTHOG_TOKEN="<your_project_token>"
NEXT_PUBLIC_POSTHOG_HOST="/ingest"
NEXT_PUBLIC_POSTHOG_UI_HOST="https://us.posthog.com"
```

### Current PostHog project

- Project ID: `345853`
- Region: `US Cloud`
- UI host: `https://us.posthog.com`
- Ingest host is proxied through the site as `/ingest`

## How it works

### 1. Client bootstrapping

`instrumentation-client.ts` initializes `posthog-js` when `NEXT_PUBLIC_POSTHOG_TOKEN` is present.

Configuration includes:

- `api_host: '/ingest'`
- `ui_host: 'https://us.posthog.com'`
- `capture_pageview: 'history_change'`
- `capture_pageleave: true`
- `autocapture: true`
- `session_recording.maskAllInputs: true`

### 1a. Route coverage

PostHog is installed globally for the live product site:

- `app/layout.tsx` mounts the shared analytics layer for the whole App Router tree
- `instrumentation-client.ts` initializes `posthog-js` client-side on routed pages
- nested layouts such as `/mcp`, `/blog/*`, `/admin/*`, `/teams`, and `/enterprise` inherit the root layout rather than replacing it

Representative local verification was completed on:

- `/lawyers`
- `/mcp`
- `/blog/mcp-browser-automation-comparison`
- `/admin/waitlist`

Observed on those routes:

- `instrumentation-client` bundle loaded
- `/ingest/array/.../config.js` loaded
- `/ingest/e/` requests fired

Legacy note:

- `products/agenticteam/page.tsx` is listed in the repo as legacy/standalone and is not part of the active Next.js App Router route tree

### 2. First-party proxy

`next.config.mjs` rewrites:

- `/ingest/static/:path*` -> `https://us-assets.i.posthog.com/static/:path*`
- `/ingest/:path*` -> `https://us.i.posthog.com/:path*`

This means deployed traffic can use your own domain for PostHog requests instead of hitting PostHog directly.

### 3. Shared event tracking

`components/google-analytics.tsx` remains the shared analytics helper.

`trackEvent()` now sends events to:

- PostHog
- GA4
- existing `/api/telemetry/events` server route

### 4. Events currently tracked

Custom events currently sent to PostHog include:

- `dialog_open`
- `generate_lead`
- `cta_click`
- `mailing_list_signup`

### 5. CTA coverage

Explicit `cta_click` coverage was added for:

- Homepage hero install button
- Homepage hero dropdown -> Chrome Web Store
- Homepage hero dropdown -> Developer Version
- MCP page header install button
- MCP page hero install button
- Profession landing page Chrome install buttons via `ProfessionTemplate`
- Enterprise/teams contact-sales CTAs via `EnterpriseTemplate`

### 6. Privacy protection

Email inputs are protected in two ways:

- PostHog session replay input masking is enabled
- `components/ui/input.tsx` adds `ph-no-capture` to all `type="email"` inputs

This protects the waitlist and footer mailing-list fields from being autocaptured.

## Vercel configuration applied

These Vercel env vars were added or updated for `Development`, `Preview`, and `Production`:

- `NEXT_PUBLIC_POSTHOG_TOKEN`
- `NEXT_PUBLIC_POSTHOG_HOST=/ingest`
- `NEXT_PUBLIC_POSTHOG_UI_HOST=https://us.posthog.com`

## Verification performed

### Local verification

Completed locally:

- `npm run lint`
- `npm run build`
- confirmed PostHog bootstrap requests from local pages
- confirmed PostHog events were visible in the PostHog activity feed
- confirmed `dialog_open` appeared in PostHog
- confirmed email inputs carried `ph-no-capture`

### Production verification

Completed in production:

- deployed with `vercel --prod --yes`
- verified proxy endpoints return `200`

```bash
curl -I https://www.vibebrowser.app/ingest/static/array.js
curl -I 'https://www.vibebrowser.app/ingest/static/surveys.js?v=1.360.2'
```

## Recommended manual checks

### Check PostHog is live

1. Open `https://www.vibebrowser.app`
2. Open browser devtools -> Network
3. Filter for `ingest`
4. Confirm requests to `/ingest/static/...` and `/ingest/e/` appear

### Check custom events

1. Visit `https://www.vibebrowser.app/mobile`
2. Open the waitlist dialog
3. Confirm:
   - `dialog_open` reaches PostHog
   - `dialog_open` reaches GA4
   - `/api/telemetry/events` returns `204` or `202` depending on telemetry env state

### Check install CTA events

1. Visit `https://www.vibebrowser.app/`
2. Click:
   - main `Install Extension`
   - dropdown `Chrome Web Store`
   - dropdown `Developer Version`
3. In PostHog, confirm `cta_click` events with location values such as:
    - `hero_primary`
    - `hero_dropdown`
    - `<profession-slug>_install`

### Check MCP page install events

1. Visit `https://www.vibebrowser.app/mcp`
2. Click the header and hero install buttons
3. Confirm `cta_click` events with:
    - `mcp_header`
    - `mcp_hero`

### Check shared template install events

1. Visit a profession page such as `https://www.vibebrowser.app/lawyers`
2. Click the Chrome install CTA
3. Confirm `cta_click` appears with `location=lawyers_install`

### Check enterprise contact-sales events

1. Visit `https://www.vibebrowser.app/teams` or `https://www.vibebrowser.app/enterprise`
2. Click the hero `Contact Sales` CTA
3. Confirm `cta_click` appears with `cta_name=contact_sales`
4. Confirm `location` matches values such as:
   - `teams_hero`
   - `teams_pricing_primary`
   - `teams_pricing_custom`
   - `enterprise_hero`
   - `enterprise_pricing_primary`
   - `enterprise_pricing_custom`

### Check mailing-list event

1. Use the footer subscribe form on a non-dark page
2. Submit a test email
3. Confirm `mailing_list_signup` appears in PostHog with `location=footer`

## Notes

- The site still uses GA4 and server-side telemetry; PostHog was added alongside them rather than replacing them.
- The `/ingest` proxy is the preferred production setup.
- If PostHog event volume looks lower than expected, check browser extensions and confirm first-party `/ingest` requests are being used.

## Commands used during implementation

```bash
npm install posthog-js@^1.360.2
npm run lint
npm run build
vercel env add NEXT_PUBLIC_POSTHOG_TOKEN ...
vercel env add NEXT_PUBLIC_POSTHOG_HOST ...
vercel env add NEXT_PUBLIC_POSTHOG_UI_HOST ...
vercel --prod --yes
```
