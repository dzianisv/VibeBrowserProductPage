# Deployment

This repo deploys **two separate sites** to **two separate Vercel projects**, both
driven by `.github/workflows/deploy.yml` on every push to `main`
(plus manual `workflow_dispatch`). There is **no Vercel native Git integration** —
all deploys go through GitHub Actions, so secrets are the only source of truth.

| Site | Vercel project | Vercel account/team | Root dir | CI job | Secrets prefix |
|------|----------------|---------------------|----------|--------|----------------|
| https://www.vibebrowser.app | `vibebrowser.app` | `dzianisvs-projects` | repo root | `deploy-production` | `VERCEL_*` |
| https://agentlabs.cc | `agentlabs` | `bison-s-projects` (`team_b6V25Bg4KWMiEIfaa5s3nmFX`) | `apps/agentlabs` | `deploy-agentlabs` | `AGENTLABS_VERCEL_*` |

> ⚠️ The two projects live under **different Vercel accounts**. A token for one
> cannot deploy the other. `agentlabs` is under the `bison` account; the local
> `vercel` CLI (logged in as `dzianisv`) **cannot** reach it — deploy only via CI.

## GitHub secrets

Set on the repo (`gh secret list`):

- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — vibebrowser.app project.
- `AGENTLABS_VERCEL_TOKEN` — no-expiration token from the **bison** Vercel account
  (Account → Settings → Tokens).
- `AGENTLABS_VERCEL_ORG_ID` = `team_b6V25Bg4KWMiEIfaa5s3nmFX`
- `AGENTLABS_VERCEL_PROJECT_ID` = `prj_aupLFb5NjTy7tomL9DYmHjlTt84T`

To rotate the agentlabs token:

```bash
# create a new token in the bison Vercel account, then:
printf '%s' '<new-token>' | gh secret set AGENTLABS_VERCEL_TOKEN --repo dzianisv/VibeBrowserProductPage
```

## How a deploy works

Each CI job runs the Vercel prebuilt flow with its own project's env:

```bash
npx vercel pull  --yes --environment=production --token=$TOKEN   # fetch project settings (incl. rootDirectory)
npx vercel build --prod --token=$TOKEN                           # build the project's rootDirectory
npx vercel deploy --prebuilt --prod --archive=tgz --token=$TOKEN # upload prebuilt output
```

`agentlabs` builds `apps/agentlabs`, which imports shared page components from
`shared/` (enabled by `externalDir: true` + `outputFileTracingRoot: ../..` in
`apps/agentlabs/next.config.ts`).

**The agentlabs job runs `npm ci` at the repo root before `vercel build`.** The
`shared/` code imports npm packages (`marked`, `lucide-react`, …) but `shared`
has no `node_modules` of its own — Node resolves them from the **repo-root**
`node_modules`. `vercel build` only installs `apps/agentlabs`'s own deps (into
`apps/agentlabs/node_modules`, which is NOT on `shared/`'s resolution path), so
without the root install the build fails with `Module not found: 'marked'` in
`shared/blog/repository.ts`. Any new npm dep used by `shared/` must be added to
the **root** `package.json`.

## Tailwind + shared components (gotcha)

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

agentlabs.cc can only be deployed by someone logged into the **bison** Vercel
account, or via the CI flow above with `AGENTLABS_VERCEL_TOKEN`. The normal way
to ship is: **push to `main`**.
