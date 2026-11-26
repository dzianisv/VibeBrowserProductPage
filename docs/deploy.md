# Deployment

`.github/workflows/deploy.yml` ("Deploy to Cloudflare") deploys **one site** —
https://www.vibebrowser.app — on every push to `main` (plus manual
`workflow_dispatch`). The site runs as a **Cloudflare Worker** named
`vibebrowser-web`, built from this repo's Next.js app with the OpenNext
adapter (`@opennextjs/cloudflare`). The apex `vibebrowser.app` plus the
`enterprise`, `teams`, `status` and `incognito` subdomains are attached to
the same Worker as custom domains (the app routes by hostname in
`proxy.ts`, exactly as it did when one Vercel project served them all).

**Vercel is retired for vibebrowser.app** (2026-11-26): Vercel's Hobby tier
paused the commercial deployment with `HTTP 402 DEPLOYMENT_DISABLED`, and
the site moved to Cloudflare (free for commercial use; DNS was already on
Cloudflare). The old Vercel project still exists but serves nothing — no
DNS record points at it. Do not re-add a Vercel deploy for this site.

**https://agentlabs.cc is not deployed from this repo.** It is deployed
exclusively from [VibeTechnologies/AgentPod-Web](https://github.com/VibeTechnologies/AgentPod-Web)
(signed `v*` tags). `apps/agentlabs` source remains in this repo (the `agentlabs`
CI job still lints and builds it) but a push here does **not** ship the apex.
Do not add a deploy job for it. `scripts/check-agentlabs-deploy-guard.sh`
(CI job `agentlabs-deploy-guard`) fails if a workflow references the apex
project-id secret, the apex project id, a `deploy-agentlabs` job, or the apex
hostname in a `vercel ... --prod` deploy / alias command.

This repo **does** still deploy https://opencode.agentlabs.cc. That is a
different Vercel project, from `.github/workflows/deploy-opencode-mobile-site.yml`,
not from `deploy.yml`. It was not part of the vibebrowser.app migration.

| Site | Host | Root dir | CI job | Secrets |
|------|------|----------|--------|---------|
| https://www.vibebrowser.app (+ apex, enterprise, teams, status, incognito) | Cloudflare Worker `vibebrowser-web` (account `c52033a95d560a9a183b016ceb1c107a`) | repo root | `deploy-production` in `deploy.yml` | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` |
| https://opencode.agentlabs.cc | Vercel project (`vars.OPENCODE_VERCEL_PROJECT_ID`), team `bison-s-projects` (`team_b6V25Bg4KWMiEIfaa5s3nmFX`) | `OpenCodeMobileSite` | `deploy` in `deploy-opencode-mobile-site.yml` | `AGENTLABS_VERCEL_TOKEN`, `AGENTLABS_VERCEL_ORG_ID` |

## Accounts & where credentials live (read this first)

- **Cloudflare** (vibebrowser.app): one account, `c52033a95d560a9a183b016ceb1c107a`;
  zone `vibebrowser.app` = `9f10b94c3422f57d10cc11c8539c0e6b`. The API token of
  record is the GitHub Actions secret `CLOUDFLARE_API_TOKEN`; its backup copy
  lives in Bitwarden Secrets Manager, project `shared_infra`, key
  `CLOUDFLARE_API_TOKEN`. Note: that token can deploy Workers and edit DNS,
  but the account-level Workers Domains API rejects it — attach custom
  domains via the **zone-level** endpoint
  (`PUT /zones/{zone_id}/workers/domains`) or the dashboard.
- **Worker runtime secrets** are set on the Worker itself, not in GitHub:
  `BREVO_API_KEY` and `WAITLIST_SNAPSHOT_TOKEN` (`wrangler secret put`).
  `BREVO_LIST_ID=3` is a plain var in `wrangler.jsonc`. The snapshot token's
  backup is in Bitwarden Secrets Manager (`shared_infra`,
  `VIBEBROWSER_WAITLIST_SNAPSHOT_TOKEN`) and the same value is the GitHub
  secret `WAITLIST_SNAPSHOT_TOKEN` used by the daily snapshot workflow —
  rotate all three together.
- **Vercel** (opencode.agentlabs.cc only): team **`bison-s-projects`** /
  `team_b6V25Bg4KWMiEIfaa5s3nmFX`, the **bison** account
  (`vibeteaichnologies@gmail.com`), a Hobby plan. `dzianisv` is NOT a member,
  so that site ships **only via its CI workflow**. The retired vibebrowser.app
  Vercel project lived in team `dzianisvs-projects`; its `VERCEL_*` GitHub
  secrets are unused by any workflow now and can be deleted.

## GitHub secrets

Set on the repo (`gh secret list`):

- `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` — vibebrowser.app Worker deploy.
- `INDEXNOW_KEY` — post-deploy IndexNow ping (also used by the snapshot workflow).
- `WAITLIST_SNAPSHOT_TOKEN` — auth for `/api/waitlist/count` (snapshot workflow).
- `BREVO_API_KEY` — used by the waitlist snapshot/stats scripts.
- `AGENTLABS_VERCEL_TOKEN` — no-expiration token from the **bison** Vercel account
  (Account → Settings → Tokens). Still required: opencode.agentlabs.cc deploys
  with this token.
- `AGENTLABS_VERCEL_ORG_ID` = `team_b6V25Bg4KWMiEIfaa5s3nmFX` — still required by
  the opencode.agentlabs.cc deploy (same team, different project).
- `AGENTLABS_VERCEL_PROJECT_ID` (`prj_aupLFb5NjTy7tomL9DYmHjlTt84T`) is the apex
  `agentlabs` project. **CI no longer uses it.** Do not reference it from a
  workflow. The guard script fails the build if you do. opencode uses
  `vars.OPENCODE_VERCEL_PROJECT_ID` instead.

To rotate the bison team token (opencode.agentlabs.cc):

```bash
# create a new token in the bison Vercel account, then:
printf '%s' '<new-token>' | gh secret set AGENTLABS_VERCEL_TOKEN --repo dzianisv/VibeBrowserProductPage
```

## How a deploy works

vibebrowser.app (`deploy-production`) runs:

```bash
npm ci
rm -rf node_modules/sharp node_modules/@img   # native binaries break the OpenNext/esbuild bundle; the IMAGES binding replaces sharp
node scripts/media-assets.cjs fetch root      # demo videos/posters from the public CDN repo into public/
node scripts/generate-blog-content.mjs        # regenerate shared/blog/posts.generated.ts (Workers has no fs)
npx opennextjs-cloudflare build               # Next build + OpenNext bundle -> .open-next/
npx wrangler deploy                           # upload Worker + assets, using wrangler.jsonc
# then: production smoke test (homepage) + IndexNow ping
```

opencode.agentlabs.cc uses the Vercel prebuilt flow with `AGENTLABS_VERCEL_TOKEN`,
`AGENTLABS_VERCEL_ORG_ID`, and `vars.OPENCODE_VERCEL_PROJECT_ID`. It does not use
`AGENTLABS_VERCEL_PROJECT_ID`.

### Cloudflare build gotchas (each one cost a failed deploy — keep them)

- **`NEXT_PRIVATE_MINIMAL_MODE=1` must stay set** (var in `wrangler.jsonc`).
  OpenNext serves `proxy.ts` as an external middleware bundle; without
  minimal mode the Next server tries to load the middleware manifest from
  the bundle and every route 500s ("Dynamic require of
  /.next/server/middleware-manifest.json is not supported" —
  opennextjs-cloudflare issue #1232).
- **No runtime filesystem.** Anything that read files at request time was
  changed to bundle at build time: `lib/status-cache.ts` imports
  `data/status-endpoints.json` statically, and the blog repository
  (`shared/blog/repository.ts`) falls back to `shared/blog/posts.generated.ts`
  when the `blog/` directory is not readable. If you add a new runtime file
  read, bundle it the same way or it will silently return empty on Workers.
- **`instrumentation.ts` lazy-loads `@vercel/otel`** (despite the name it is
  just the OTEL SDK exporter): its static import chain requires
  `node:perf_hooks`, which does not exist in Workers and crashed every
  route. Keep the lazy import; telemetry stays off unless OTEL env is set.
- **Image optimization** uses the `IMAGES` binding in `wrangler.jsonc`
  (the one `next/image` page is `/opencode`). In `wrangler dev` the local
  images simulation can 500 — production works; verify images on the real
  deployment, not locally.

## apps/agentlabs source (not deployed from here)

`apps/agentlabs` still lives in this repo and is still built by the CI `agentlabs`
job. It is **not** uploaded to the apex Vercel project from here.

It imports shared page components from `shared/` (`externalDir: true` +
`outputFileTracingRoot: ../..` in `apps/agentlabs/next.config.ts`). `shared/`
imports npm packages (`marked`, `lucide-react`, …) that resolve from the
**repo-root** `node_modules`, not from `apps/agentlabs/node_modules`. Any new npm
dep used by `shared/` must be added to the **root** `package.json`.

### Tailwind + shared components (gotcha)

`apps/agentlabs` renders the same company-profile / blog pages as the main site
via `shared/`. Tailwind only generates classes it finds in files matched by its
`content` globs, so **`apps/agentlabs/tailwind.config.ts` must include the shared
source dirs**:

```ts
content: [
  // ...local app globs...
  "../../shared/company-profile/**/*.{js,ts,jsx,tsx,mdx}",
  "../../shared/blog/**/*.{js,ts,jsx,tsx,mdx}",
]
```

Do **not** use `../../shared/**` — that crawls `shared/node_modules` and stalls
the build. Without these globs the shared components' classes get purged and the
layout breaks (tiny hero, crammed nav, squished spacing) while the build still
"succeeds".

## Manual deploy (rarely needed)

vibebrowser.app ships by pushing to `main`. For a manual deploy, from the
repo root (run wrangler from the directory holding `wrangler.jsonc`):

```bash
export CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=c52033a95d560a9a183b016ceb1c107a
npm ci && rm -rf node_modules/sharp node_modules/@img
node scripts/media-assets.cjs fetch root
node scripts/generate-blog-content.mjs
npx opennextjs-cloudflare build && npx wrangler deploy
```

opencode.agentlabs.cc ships when `OpenCodeMobileSite/**` changes, or via
`workflow_dispatch` on `deploy-opencode-mobile-site.yml`.

Do not deploy agentlabs.cc from this repo. That apex is owned by
VibeTechnologies/AgentPod-Web.
