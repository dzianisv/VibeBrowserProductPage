# Deployment Configuration

**Canonical deploy doc: [docs/deploy.md](docs/deploy.md).** This file is the
short version.

## Automatic Deployment with GitHub Actions

This project deploys to a **Cloudflare Worker** (`vibebrowser-web`) on every
push to the `main` branch, via `.github/workflows/deploy.yml`
("Deploy to Cloudflare"). Vercel was retired for this site on 2026-11-26
(Hobby tier paused the commercial deployment, HTTP 402
`DEPLOYMENT_DISABLED`).

### Required GitHub Secrets

1. **CLOUDFLARE_API_TOKEN** — Cloudflare API token with Workers/DNS access.
   Backup copy: Bitwarden Secrets Manager, project `shared_infra`.
2. **CLOUDFLARE_ACCOUNT_ID** — `c52033a95d560a9a183b016ceb1c107a`.

### How It Works

1. Push code to `main`
2. GitHub Actions: `npm ci`, drop `sharp` (unbundleable native module),
   fetch media assets from the CDN repo, regenerate the bundled blog
   content, `opennextjs-cloudflare build`, `wrangler deploy`
3. Smoke test against https://www.vibebrowser.app + IndexNow ping

### Runtime Environment (on the Worker, not GitHub)

Set with `wrangler secret put` / `wrangler.jsonc` vars:

- `BREVO_API_KEY` (secret) — Brevo v3 API key. Required: the waitlist and
  mailing-list server actions in `actions/waitlist.ts` read it at request
  time. Without it signups return "Brevo is not configured".
- `BREVO_LIST_ID` (var, `3`) — numeric id of the Brevo waitlist contact list.
- `WAITLIST_SNAPSHOT_TOKEN` (secret) — auth for `/api/waitlist/count`.
  Same value as the GitHub secret of the same name; backup in Bitwarden
  Secrets Manager (`shared_infra`, `VIBEBROWSER_WAITLIST_SNAPSHOT_TOKEN`).
- `RESEND_API_KEY` (optional, currently unset) — internal "new signup"
  notification email.
- `NEXT_PRIVATE_MINIMAL_MODE=1` (var) — required by the OpenNext adapter;
  see the gotchas in docs/deploy.md before touching it.
- Optional Honeycomb/OpenTelemetry: `OTEL_SERVICE_NAME`,
  `OTEL_EXPORTER_OTLP_PROTOCOL` (`http/protobuf`),
  `OTEL_EXPORTER_OTLP_ENDPOINT` (e.g. `https://api.honeycomb.io`),
  `OTEL_EXPORTER_OTLP_HEADERS`. Telemetry routes return `202` when enabled;
  instrumentation loads the exporter lazily (see docs/deploy.md).

### Manual Deployment

```bash
export CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=c52033a95d560a9a183b016ceb1c107a
npm ci && rm -rf node_modules/sharp node_modules/@img
node scripts/media-assets.cjs fetch root
node scripts/generate-blog-content.mjs
npx opennextjs-cloudflare build && npx wrangler deploy
```

Run wrangler from the repo root — it reads `wrangler.jsonc` from the
current directory.

### Monitoring Deployments

- GitHub Actions tab ("Deploy to Cloudflare" runs)
- Cloudflare dashboard → Workers → `vibebrowser-web`
- Production URL: https://www.vibebrowser.app
