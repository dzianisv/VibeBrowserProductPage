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

```bash
npx vercel link --project opencode-mobile-site
npx vercel deploy --prod
```
