# opencode.agentlabs.cc beta signup

Runbook for the `/beta` signup form on `opencode.agentlabs.cc` (Google Play
closed-testing beta for `cc.agentlabs.opencode`, github.com/dzianisv/opencode-mobile).

## Architecture

```
Browser (app/beta/page.tsx)
  │  POST { email }
  ▼
app/api/beta-signup/route.ts   (runtime = nodejs)
  │
  ├─► Supabase: INSERT INTO opencode_beta_signups   (durable persistence, always)
  │       ├─ duplicate email (23505)  → idempotent success, no further side effects
  │       └─ new row created           → continue
  │
  ├─► lib/google-groups.ts: enrollBetaTester(email)   (GATED — see one-time setup)
  │       ├─ env vars unset            → no-op, status stays 'pending'
  │       ├─ success / already member  → UPDATE row: status='enrolled', enrolled_at=now()
  │       └─ failure                   → logged only, never fails the response
  │
  └─► lib/opencode-beta-signup.ts: notifyFounder(...)   (Resend, best-effort)
          → emails BETA_NOTIFY_EMAIL with the tester's address, timestamp,
            enrollment outcome, and a Play Console deep link
```

Before this rework, `app/api/beta-signup/route.ts` only did `console.log(...)` —
no persistence, no notification, no enrollment. Every signup was lost once the
Vercel function log rotated. This closes that gap: every signup is durably
stored in Supabase; the founder is notified per signup; and testers can be
auto-added to the Google Play closed-testing track once the one-time Google
Workspace setup below is done. Until that setup is done, the auto-enroll step
is a silent no-op and everything else still works.

## Files

| File | Purpose |
|---|---|
| `app/beta/page.tsx`, `app/beta/layout.tsx` | The signup form + metadata. Recovered from the live deployment (was previously uncommitted). |
| `app/api/beta-signup/route.ts` | API route. `runtime = 'nodejs'` (was `edge`) — required because `googleapis` isn't Edge-compatible. |
| `lib/opencode-beta-signup.ts` | Supabase persistence + Resend founder notification. Mirrors `actions/waitlist-supabase.ts`'s conventions (same env vars, same lazy-client pattern). |
| `lib/google-groups.ts` | Gated Google Group auto-enroll via the Admin SDK Directory API (`members.insert`). |
| `supabase/migrations/20260711000000_create_opencode_beta_signups.sql` | Creates the `opencode_beta_signups` table. |
| `scripts/set-play-tester-group.mjs` | One-time script: points a Play closed-testing track's tester list at the Google Group. |

## Env vars

Set these on the Vercel project that serves `opencode.agentlabs.cc`
(**Vercel dashboard → that project → Settings → Environment Variables**).

> ⚠️ **Verify the project before setting anything.** The projectId
> `prj_aupLFb5NjTy7tomL9DYmHjlTt84T` recorded during a previous investigation
> for "opencode-mobile-site" is *identical* to the `agentlabs` project's ID
> documented in `docs/deploy.md` (root dir `apps/agentlabs`, deployed via CI on
> push to `main`, domain `agentlabs.cc`). Those cannot both be the real ID for
> two different projects — one of the two records is wrong, most likely a
> copy/paste conflation from the same `bison-s-projects` team. Run
> `npx vercel project ls` / `npx vercel inspect` (logged into the **bison**
> account, `vibeteaichnologies@gmail.com`) and confirm the actual project name,
> ID, and root directory that serve `opencode.agentlabs.cc` before deploying or
> setting env vars, so you don't set env vars on (or deploy) the wrong project.

| Var | Required | Purpose | Notes |
|---|---|---|---|
| `SUPABASE_PROJECT_URL` | Yes | Persistence | Same Supabase project as `vibebrowser_waitlist` (see `actions/waitlist-supabase.ts`), or a dedicated one — either works, the table is namespaced by name. |
| `SUPABASE_API_KEY` | Yes | Persistence | Same key convention as the rest of this repo. |
| `RESEND_API_KEY` | Yes (for notifications) | Founder email | If unset, notifications are silently skipped (signup still persists). |
| `BETA_NOTIFY_EMAIL` | No | Founder email recipient | Defaults to `vibeteaichnologies@gmail.com`. |
| `PLAY_CONSOLE_TESTERS_URL` | No | One-click link in the notification email | See "Getting the exact Testers URL" below. Falls back to a generic Play Console app-list search link if unset. |
| `GOOGLE_GROUPS_SA_JSON` | No (gates auto-enroll) | Google Group auto-enroll | Service account JSON key, raw or base64. Unset = auto-enroll silently skipped. |
| `PLAY_BETA_GROUP_EMAIL` | No (gates auto-enroll) | Google Group auto-enroll | e.g. `beta-testers@agentlabs.cc`. Unset = auto-enroll silently skipped. |
| `GOOGLE_GROUPS_IMPERSONATE_EMAIL` | No | Domain-wide delegation subject | A real Workspace admin's email. Needed unless the service account was granted the Groups Admin role directly (see step (c) below). |

Local dev: copy the block from `.env.example` into `.env.local` and fill in
values (never commit real secrets — Bitwarden `dev` collection is the source
of truth per this workspace's conventions).

## Database

Apply the migration once against the Supabase project referenced by
`SUPABASE_PROJECT_URL`:

```bash
psql "$SUPABASE_DB_URL" -f supabase/migrations/20260711000000_create_opencode_beta_signups.sql
# or paste the file into the Supabase SQL editor
```

Creates `opencode_beta_signups (id, email UNIQUE, created_at, ip, user_agent,
status DEFAULT 'pending', enrolled_at)` with RLS enabled: public INSERT and
UPDATE are allowed (the API route uses the same `SUPABASE_API_KEY` as the rest
of the app to write its own rows), no public SELECT — read access should go
through the Supabase **service_role** key (bypasses RLS), not the app's key.

## One-time setup: gated Google Play auto-enroll

Until this is done, the app works fine — every signup is persisted and the
founder is notified per signup with a link to add the tester manually. This
setup makes that step automatic.

**(a) Enable Cloud Identity Free on `agentlabs.cc`**
If the domain doesn't already have Google Workspace, enable
[Cloud Identity Free](https://cloud.google.com/identity/docs/set-up-cloud-identity-admin)
for `agentlabs.cc` — this gives you a Google Admin console and the ability to
create groups without paying for full Workspace.

**(b) Create the Google Group**
In the [Admin console](https://admin.google.com) → Groups, create
`beta-testers@agentlabs.cc`. Set `PLAY_BETA_GROUP_EMAIL` to this address.

**(c) Grant the service account access**
Create (or reuse) a Google Cloud service account and grant it permission to
manage group membership. Two options:
  - **Groups Admin role** (simpler): in the Admin console, assign the service
    account's email a Groups Admin (or custom role scoped to
    `Groups > Read/Write`) admin role directly. No impersonation needed —
    leave `GOOGLE_GROUPS_IMPERSONATE_EMAIL` unset.
  - **Domain-wide delegation** (classic Admin SDK pattern): in the Admin
    console → Security → API controls → Domain-wide delegation, authorize the
    service account's client ID for scope
    `https://www.googleapis.com/auth/admin.directory.group.member`. Then set
    `GOOGLE_GROUPS_IMPERSONATE_EMAIL` to a real Workspace admin's email — the
    API call impersonates that user.

  Reference: [`members.insert` API docs](https://developers.google.com/workspace/admin/directory/reference/rest/v1/members/insert).

  Base64-encode the service account's JSON key and set it as
  `GOOGLE_GROUPS_SA_JSON` (raw JSON also works — the code detects either):

  ```bash
  base64 -i service-account.json | tr -d '\n'
  ```

**(d) Point the Play closed-testing track at the group**
Android Publisher's `edits.testers.update` API manages tester lists via
Google Groups only (no more direct email lists). Run once (and again any time
the group changes):

```bash
GOOGLE_PLAY_SA_JSON="$(cat playstore-deploy-key.json)" \
node scripts/set-play-tester-group.mjs \
  --package cc.agentlabs.opencode \
  --track internal \
  --group beta-testers@agentlabs.cc
```

Uses the same `playstore-deploy@opencode-mobile-deploy.iam.gserviceaccount.com`
service account already used to publish `cc.agentlabs.opencode` — point
`GOOGLE_PLAY_SA_JSON` at that same key material. If your closed track is
`alpha` rather than `internal`, pass `--track alpha`.

**(e) Getting the exact Play Console Testers URL**
There's no stable deep link into a track's Testers tab from just the package
name — Play Console URLs are keyed by numeric developer/app IDs. Once, open
[Play Console](https://play.google.com/console) → your app → Testing → Closed
testing → select the track → Testers tab, copy the URL from the address bar,
and set it as `PLAY_CONSOLE_TESTERS_URL` so the founder notification email
links straight there.

## Shipping

This project has no Vercel Git integration — nothing auto-deploys on push.
Ship with the Vercel CLI from the repo root (after confirming the correct
project per the warning above):

```bash
npx vercel link --project <confirmed-project-name>   # first time only
npx vercel deploy --prod
```

Set env vars either via the dashboard or:

```bash
npx vercel env add SUPABASE_PROJECT_URL production
npx vercel env add SUPABASE_API_KEY production
npx vercel env add RESEND_API_KEY production
npx vercel env add BETA_NOTIFY_EMAIL production
npx vercel env add PLAY_CONSOLE_TESTERS_URL production
npx vercel env add GOOGLE_GROUPS_SA_JSON production
npx vercel env add PLAY_BETA_GROUP_EMAIL production
npx vercel env add GOOGLE_GROUPS_IMPERSONATE_EMAIL production
```

Redeploy after adding/changing env vars — Vercel doesn't hot-reload them into
an existing build.
