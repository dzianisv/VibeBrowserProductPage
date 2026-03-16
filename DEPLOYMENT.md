# Deployment Configuration

## Automatic Deployment with GitHub Actions

This project automatically deploys to Vercel production on every push to the `main` branch.

### Required GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **VERCEL_TOKEN**
   - Get from: https://vercel.com/account/tokens
   - Create a new token with full access

2. **VERCEL_ORG_ID**
   - Value: `team_vF4d4Phgfv1IqW1MEZw7mBre`
   - Found in `.vercel/project.json`

3. **VERCEL_PROJECT_ID**
   - Value: `prj_bzU6UmuJD6pyGq0stlYgtcU2zn91`
   - Found in `.vercel/project.json`

### How It Works

1. Push code to `main` branch
2. GitHub Actions workflow triggers automatically
3. Builds the project with Vercel CLI
4. Deploys to production environment
5. Creates deployment status in GitHub

### Manual Deployment

If needed, you can still deploy manually:

```bash
vercel --prod
```

### Environment Variables

Ensure these are configured in Vercel dashboard:
- `SUPABASE_PROJECT_URL`
- `SUPABASE_API_KEY`
- `GIT_LFS_ENABLED` (set to `1` so Vercel pulls LFS video assets)
- Optional Honeycomb/OpenTelemetry:
  - `OTEL_SERVICE_NAME` (example: `vibebrowser-product-page`)
  - `OTEL_EXPORTER_OTLP_PROTOCOL` (recommended: `http/protobuf`)
  - `OTEL_EXPORTER_OTLP_ENDPOINT` (example: `https://api.honeycomb.io`)
  - `OTEL_EXPORTER_OTLP_HEADERS` (Honeycomb Environments example: `x-honeycomb-team=YOUR_API_KEY`)

For Honeycomb in the US region, these Vercel CLI commands are enough:

```bash
printf 'vibebrowser-product-page' | vercel env add OTEL_SERVICE_NAME production
printf 'http/protobuf' | vercel env add OTEL_EXPORTER_OTLP_PROTOCOL production
printf 'https://api.honeycomb.io' | vercel env add OTEL_EXPORTER_OTLP_ENDPOINT production
printf 'x-honeycomb-team=YOUR_API_KEY' | vercel env add OTEL_EXPORTER_OTLP_HEADERS production
```

If you use Honeycomb EU, replace the endpoint with `https://api.eu1.honeycomb.io`.
If you still use Honeycomb Classic, append `,x-honeycomb-dataset=YOUR_DATASET` to `OTEL_EXPORTER_OTLP_HEADERS`.

Telemetry emitted by this app is intentionally narrow:
- Web vitals (`CLS`, `FCP`, `FID`, `INP`, `LCP`, `TTFB`)
- Product page events (`dialog_open`, `cta_click`, `generate_lead`)
- Path-only URLs; query strings, form contents, and raw user-agent are not sent to Honeycomb

Store production secrets in the Vercel dashboard or ignored local files such as `.env.local`. Do not commit `.env.prod` or other secret-bearing env files to Git.

### Verifying Honeycomb Telemetry

After adding the env vars, redeploy so the server picks them up:

```bash
vercel --prod
```

Then confirm the telemetry routes are active:

```bash
curl -i -X POST https://www.vibebrowser.app/api/telemetry/web-vitals \
  -H 'Content-Type: application/json' \
  --data '{"id":"verify","name":"LCP","delta":123,"value":123,"rating":"good","navigationType":"navigate","pathname":"/","href":"https://www.vibebrowser.app/"}'

curl -i -X POST https://www.vibebrowser.app/api/telemetry/events \
  -H 'Content-Type: application/json' \
  --data '{"eventName":"dialog_open","pathname":"/","properties":{"dialog_name":"waitlist_dialog"}}'
```

Both routes should return `202` when Honeycomb is enabled.

### Git LFS Video Assets

If video demos are not loading in production, Vercel may be serving Git LFS pointer files instead of real binaries.

**Fix:**
- Ensure `GIT_LFS_ENABLED=1` is set for Production/Preview/Development and redeploy (clear build cache).
- For GitHub Actions deployments, make sure the checkout step pulls LFS objects (`lfs: true`).
- For CLI/manual deployments, run `git lfs pull` before `vercel build`.

**Verify (body check):**
```bash
curl -s https://vibebrowser.app/linkedin-demo.mp4 | head -n 2
# Should NOT show: version https://git-lfs.github.com/spec/v1
```

### Monitoring Deployments

- Check Actions tab in GitHub for deployment status
- View deployment history in Vercel dashboard
- Production URL: https://www.vibebrowser.app
