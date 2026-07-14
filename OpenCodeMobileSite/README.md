# OpenCode Mobile website

The standalone Next.js site for [opencode.agentlabs.cc](https://opencode.agentlabs.cc).

## Local development

```bash
npm ci
npm run dev
```

## iOS waitlist

`POST /api/ios-waitlist` adds contacts to a dedicated Brevo list. Configure:

```bash
BREVO_API_KEY=
BREVO_OPENCODE_IOS_LIST_ID=
```

The endpoint returns an error when Brevo is unavailable or misconfigured so the UI never shows a false success.

## Deploy

The production Vercel project is `opencode-mobile-site`.
Pushes to `main` that change `OpenCodeMobileSite/**` deploy automatically through
`.github/workflows/deploy-opencode-mobile-site.yml`. The workflow builds the
standalone project, promotes the deployment to `opencode.agentlabs.cc`, and
checks the iOS page and signup validation route.

The workflow uses `AGENTLABS_VERCEL_TOKEN` and `AGENTLABS_VERCEL_ORG_ID` because
both sites share the same Vercel team. Set the repository variable
`OPENCODE_VERCEL_PROJECT_ID` to the `opencode-mobile-site` project ID.

For a manual fallback:

```bash
npx vercel link --project opencode-mobile-site
npx vercel deploy --prod
npx vercel promote <deployment-url> --yes
```
