# opencode.agentlabs.cc signup (beta + news)

Runbook for `POST /api/beta-signup` on `opencode.agentlabs.cc` — backs both
the `/beta` Google Play closed-testing signup form (`cc.agentlabs.opencode`,
github.com/dzianisv/opencode-mobile) and a general "opencode news" mailing
list, disambiguated by an optional `list` field in the request body.

## Two-list model

Brevo holds two separate lists, each a distinct env-configured list id:

| `list` value | Brevo list | Purpose | Google Group auto-enroll |
|---|---|---|---|
| `"beta"` (default) | `BREVO_OPENCODE_BETA_LIST_ID` | Google Play closed-testing beta | Yes (gated) |
| `"news"` | `BREVO_OPENCODE_NEWS_LIST_ID` | General opencode news / newsletter | No — skipped entirely |

List ids are **never hardcoded** — create both lists in the Brevo dashboard
(Contacts → Lists → Create a list) and set their numeric ids as the env vars
above.

## Endpoint contract

```
POST /api/beta-signup
Content-Type: application/json

{ "email": "user@example.com", "list": "beta" | "news" }   // list optional, defaults to "beta"
```

`list: "news"` is what a newsletter/footer signup form should send — it
persists the row, syncs to the news Brevo list, and notifies the founder,
but skips the Google Group / Play beta auto-enroll step entirely. There is
currently no newsletter UI wired to this on `app/opencode/` — any future
newsletter form just needs to `fetch('/api/beta-signup', { method: 'POST',
body: JSON.stringify({ email, list: 'news' }) })`.

## Architecture

```
Browser (app/beta/page.tsx, or a future newsletter form)
  │  POST { email, list? }   ("beta" default | "news")
  ▼
app/api/beta-signup/route.ts   (runtime = nodejs)
  │
  ├─► 1. Supabase: INSERT INTO opencode_beta_signups (..., list)   (durable persistence, always)
  │       ├─ duplicate email (23505)  → idempotent success; still upserts Brevo, no notify/enroll
  │       └─ new row created           → continue
  │
  ├─► 2. lib/brevo.ts: addContactToBrevo(email, listId)   (best-effort, never throws)
  │       ├─ list="beta" → BREVO_OPENCODE_BETA_LIST_ID
  │       └─ list="news" → BREVO_OPENCODE_NEWS_LIST_ID
  │
  ├─► 3. list==="beta" only — lib/google-groups.ts: enrollBetaTester(email)   (GATED — see one-time setup)
  │       ├─ env vars unset            → no-op, status stays 'pending'
  │       ├─ success / already member  → UPDATE row: status='enrolled', enrolled_at=now()
  │       │                              + Brevo attribute PLAY_ENROLLED=true on the beta list
  │       └─ failure                   → logged only, never fails the response
  │
  └─► 4. lib/opencode-beta-signup.ts: notifyFounder(...)   (Resend, best-effort)
          → emails BETA_NOTIFY_EMAIL with the contact's address, which list,
            timestamp, enrollment outcome (beta only), and a Play Console
            deep link (beta only)
```

Every step after the Supabase insert is wrapped independently — a Brevo,
Google Group, or Resend failure never breaks the HTTP response or drops the
signup, because the row is already durably persisted by step 1.

Before the original rework, `app/api/beta-signup/route.ts` only did
`console.log(...)` — no persistence, no notification, no enrollment, no
mailing list sync. This closes that gap.

## Files

| File | Purpose |
|---|---|
| `app/beta/page.tsx`, `app/beta/layout.tsx` | The signup form + metadata. Recovered from the live deployment (was previously uncommitted). Posts `{ email }` (implicit `list: "beta"`). |
| `app/api/beta-signup/route.ts` | API route. `runtime = 'nodejs'` (was `edge`) — required because `googleapis` isn't Edge-compatible. Resolves `list` → the right Brevo list id, runs Google Group enroll only for `list==="beta"`. |
| `lib/brevo.ts` | Shared Brevo helper — `addContactToBrevo(email, listId, attributes?)`. Upserts into whichever list id is passed in; never throws. Mirrors `actions/waitlist-supabase.ts`'s `addToBrevo` (same endpoint, same "400 already exists = success" idempotency), generalized to take a list id per call. |
| `lib/opencode-beta-signup.ts` | Supabase persistence + Resend founder notification. Mirrors `actions/waitlist-supabase.ts`'s conventions (same env vars, same lazy-client pattern). |
| `lib/google-groups.ts` | Gated Google Group auto-enroll via the Admin SDK Directory API (`members.insert`). Only invoked for `list==="beta"`. |
| `supabase/migrations/20260711000000_create_opencode_beta_signups.sql` | Creates the `opencode_beta_signups` table. |
| `supabase/migrations/20260712000000_add_list_to_opencode_beta_signups.sql` | Adds the `list` column (`'beta' \| 'news'`, default `'beta'`) so one table backs both signup flows. Idempotent (`ADD COLUMN IF NOT EXISTS`). |
| `scripts/set-play-tester-group.mjs` | One-time script: points a Play closed-testing track's tester list at the Google Group. |

## Env vars

Set these on the Vercel project that serves `opencode.agentlabs.cc`
(**Vercel dashboard → that project → Settings → Environment Variables**).

> **Target project (verified via Vercel API, 2026-07-12):**
> `opencode.agentlabs.cc` is served by project **`opencode-mobile-site`**,
> id **`prj_g2YpvqZ946ZwW524USdq9k88nrQv`**, team `bison-s-projects`
> (`team_b6V25Bg4KWMiEIfaa5s3nmFX`, `vibeteaichnologies@gmail.com`), **root
> directory = repo root**, deployed via `vercel` CLI (NOT git-connected — nothing
> auto-deploys). Do **not** confuse it with the separate `agentlabs` project
> (id `prj_aupLFb5NjTy7tomL9DYmHjlTt84T`, root dir `apps/agentlabs`, domain
> `agentlabs.cc`, CI-deployed) — the Bitwarden `vercel-agentlabs` note records
> the `agentlabs` id, which is why an earlier record conflated the two. Set the
> env vars below on **`opencode-mobile-site`**.

| Var | Required | Purpose | Notes |
|---|---|---|---|
| `SUPABASE_PROJECT_URL` | Yes | Persistence | Same Supabase project as `vibebrowser_waitlist` (see `actions/waitlist-supabase.ts`), or a dedicated one — either works, the table is namespaced by name. |
| `SUPABASE_API_KEY` | Yes | Persistence | Same key convention as the rest of this repo. |
| `BREVO_API_KEY` | Yes (for mailing list sync) | Brevo auth | Same key as `actions/waitlist-supabase.ts` uses for `vibebrowser.app`. If unset, Brevo sync is silently skipped (signup still persists). |
| `BREVO_OPENCODE_BETA_LIST_ID` | Yes (for beta list sync) | Brevo list id for `list==="beta"` | Numeric id of the "opencode beta" Brevo list. Create the list in Brevo first — never hardcode the id. |
| `BREVO_OPENCODE_NEWS_LIST_ID` | Yes (for news list sync) | Brevo list id for `list==="news"` | Numeric id of the "opencode news" Brevo list. Create the list in Brevo first — never hardcode the id. |
| `RESEND_API_KEY` | Yes (for notifications) | Founder email | If unset, notifications are silently skipped (signup still persists). |
| `BETA_NOTIFY_EMAIL` | No | Founder email recipient | Defaults to `vibeteaichnologies@gmail.com`. |
| `PLAY_CONSOLE_TESTERS_URL` | No | One-click link in the notification email (beta only) | See "Getting the exact Testers URL" below. Falls back to a generic Play Console app-list search link if unset. |
| `GOOGLE_GROUPS_SA_JSON` | No (gates auto-enroll) | Google Group auto-enroll (beta only) | Service account JSON key, raw or base64. Unset = auto-enroll silently skipped. |
| `PLAY_BETA_GROUP_EMAIL` | No (gates auto-enroll) | Google Group auto-enroll (beta only) | e.g. `beta-testers@agentlabs.cc`. Unset = auto-enroll silently skipped. |
| `GOOGLE_GROUPS_IMPERSONATE_EMAIL` | No | Domain-wide delegation subject | A real Workspace admin's email. Needed unless the service account was granted the Groups Admin role directly (see step (c) below). |

Local dev: copy the block from `.env.example` into `.env.local` and fill in
values (never commit real secrets — Bitwarden `dev` collection is the source
of truth per this workspace's conventions).

### Known gotcha: Brevo IP allowlisting

Brevo accounts can have **IP allowlisting** enabled on the API key (Brevo
dashboard → SMTP & API → API Keys → the key's IP restriction setting). If
it's on, every API call from Vercel's dynamic egress IPs gets rejected —
this fails **silently from the signup's perspective** (the route still
returns 200, since Brevo failures are caught and logged, not surfaced) but
contacts never show up in Brevo. Before relying on this in production,
either:
  - **Disable IP allowlisting** on the Brevo API key (simplest — Vercel's
    serverless egress IPs aren't stable/enumerable), or
  - Allowlist Vercel's outbound IP ranges if using an allowlist is a hard
    requirement (requires a static outbound IP setup, e.g. Vercel's
    [IP allowlist add-on](https://vercel.com/docs/security/ip-allowlist) —
    not configured for this project as of this writing).

Check the Vercel function logs for `[brevo] API error: 401 ...` if contacts
aren't syncing — that's the signature of this gotcha.

## Database

Apply both migrations, in order, against the Supabase project referenced by
`SUPABASE_PROJECT_URL`:

```bash
psql "$SUPABASE_DB_URL" -f supabase/migrations/20260711000000_create_opencode_beta_signups.sql
psql "$SUPABASE_DB_URL" -f supabase/migrations/20260712000000_add_list_to_opencode_beta_signups.sql
# or paste each file into the Supabase SQL editor, in order
```

Creates `opencode_beta_signups (id, email UNIQUE, created_at, ip, user_agent,
status DEFAULT 'pending', enrolled_at, list DEFAULT 'beta')` with RLS
enabled: public INSERT and UPDATE are allowed (the API route uses the same
`SUPABASE_API_KEY` as the rest of the app to write its own rows), no public
SELECT — read access should go through the Supabase **service_role** key
(bypasses RLS), not the app's key. The second migration is additive and
idempotent (`ADD COLUMN IF NOT EXISTS`) — safe to run even if the first
migration already applied in production.

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
Ship with the Vercel CLI from the repo root:

```bash
npx vercel link --project opencode-mobile-site   # first time only
npx vercel deploy --prod
```

Set env vars either via the dashboard or:

```bash
npx vercel env add SUPABASE_PROJECT_URL production
npx vercel env add SUPABASE_API_KEY production
npx vercel env add BREVO_API_KEY production
npx vercel env add BREVO_OPENCODE_BETA_LIST_ID production
npx vercel env add BREVO_OPENCODE_NEWS_LIST_ID production
npx vercel env add RESEND_API_KEY production
npx vercel env add BETA_NOTIFY_EMAIL production
npx vercel env add PLAY_CONSOLE_TESTERS_URL production
npx vercel env add GOOGLE_GROUPS_SA_JSON production
npx vercel env add PLAY_BETA_GROUP_EMAIL production
npx vercel env add GOOGLE_GROUPS_IMPERSONATE_EMAIL production
```

Remember to also apply `supabase/migrations/20260712000000_add_list_to_opencode_beta_signups.sql`
and, if IP allowlisting is enabled on the Brevo API key, disable it (see
"Known gotcha: Brevo IP allowlisting" above) — otherwise contacts will never
reach Brevo from production.

Redeploy after adding/changing env vars — Vercel doesn't hot-reload them into
an existing build.
