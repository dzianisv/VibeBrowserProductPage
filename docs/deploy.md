# Deployment

`.github/workflows/deploy.yml` deploys **one site** — https://www.vibebrowser.app —
on every push to `main` (plus manual `workflow_dispatch`). There is **no Vercel
native Git integration**. Secrets are the source of truth for that deploy.

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
not from `deploy.yml`.

| Site | Vercel project | Vercel account/team | Root dir | CI job | Secrets |
|------|----------------|---------------------|----------|--------|---------|
| https://www.vibebrowser.app | `vibebrowser.app` | `dzianisvs-projects` | repo root | `deploy-production` | `VERCEL_*` |
| https://opencode.agentlabs.cc | OpenCode mobile site (`vars.OPENCODE_VERCEL_PROJECT_ID`) | `bison-s-projects` (`team_b6V25Bg4KWMiEIfaa5s3nmFX`) | `OpenCodeMobileSite` | `deploy` in `deploy-opencode-mobile-site.yml` | `AGENTLABS_VERCEL_TOKEN`, `AGENTLABS_VERCEL_ORG_ID` |

## Accounts & where credentials live (read this first)

Things that are non-obvious and have caused repeated confusion:

- **Two Vercel accounts are involved.**
  - `vibebrowser.app` → Vercel team **`dzianisvs-projects`** (login `dzianisv`). The
    local `vercel` CLI on the dev machine is logged into this account.
  - `opencode.agentlabs.cc` (and the apex project this repo must not deploy) →
    Vercel team **`bison-s-projects`** / `team_b6V25Bg4KWMiEIfaa5s3nmFX`. This is
    the **bison** account (`vibeteaichnologies@gmail.com`), a Hobby plan.
    **`dzianisv` is NOT a member**, so `vercel --prod` from the local CLI fails
    with "scope does not exist" / "Could not retrieve Project Settings".
    opencode.agentlabs.cc ships **only via its CI workflow**. agentlabs.cc ships
    **only from AgentPod-Web**, not from this CLI and not from this repo's CI.
  - The browser (Chrome on the dev machine) IS logged into the bison Vercel
    account — that's how the `AGENTLABS_VERCEL_TOKEN` was minted (Account →
    Settings → Tokens).
- **Secrets of record:** GitHub Actions repo secrets (`gh secret list`). Backup
  copy in Bitwarden (account `vibeteaichnologies@gmail.com`, item
  `agentlabs-vercel-token`).

## GitHub secrets

Set on the repo (`gh secret list`):

- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` — vibebrowser.app project.
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

vibebrowser.app (`deploy-production`) runs the Vercel prebuilt flow:

```bash
npx vercel pull  --yes --environment=production --token=$TOKEN   # fetch project settings (incl. rootDirectory)
npx vercel build --prod --token=$TOKEN                           # build the project's rootDirectory
npx vercel deploy --prebuilt --prod --archive=tgz --token=$TOKEN # upload prebuilt output
```

opencode.agentlabs.cc uses the same prebuilt flow with `AGENTLABS_VERCEL_TOKEN`,
`AGENTLABS_VERCEL_ORG_ID`, and `vars.OPENCODE_VERCEL_PROJECT_ID`. It does not use
`AGENTLABS_VERCEL_PROJECT_ID`.

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

vibebrowser.app ships by pushing to `main`. opencode.agentlabs.cc ships when
`OpenCodeMobileSite/**` changes, or via `workflow_dispatch` on
`deploy-opencode-mobile-site.yml`.

Do not deploy agentlabs.cc from this repo. That apex is owned by
VibeTechnologies/AgentPod-Web.
