---
name: ga4-analytics
description: Extract and analyze Google Analytics 4 (GA4) data for vibebrowser.app via the GA4 web UI using chrome-use. Pull users/sessions/pages/acquisition/events, build a conversion funnel, compare against baseline, and turn it into product-interest and page-improvement decisions. Use alongside the google-analytics (Search Console) skill, which covers SEO; this skill covers on-site behavior and conversion.
---

# GA4 Analytics Skill

## Purpose
Read GA4 (on-site behavior + conversion) as the source of truth for **product interest and funnel health**, then turn it into prioritized page/instrumentation actions. Pair with the `google-analytics` skill (Search Console = demand/SEO); this skill = what users do once they arrive.

The GA Data API is **not** reliably available here: `gws`/`gcloud` OAuth lacks `analytics.readonly` scope, so token mint FAILS. The working path is **browser automation via chrome-use** against the logged-in GA session. Always delegate the browser driving to a **claude-sonnet-4.6** subagent (never gpt for web ops).

## Known properties (vibebrowser account)
| Property | ID | What it tracks |
|---|---|---|
| **VibeBrowser Website** | **519647136** | vibebrowser.app **+ agentlabs.cc co-tracked** (no hostname split) |
| Chrome Web Store developer | 520278142 | the published extension (installs/usage) — SEPARATE property |
| Account | 380388148 / "VibeBrowser" | — |

> The property picker is slow and easy to land on the wrong property. **Jump via deep link** to property 519647136 instead of fighting the picker.

## Deep links (skip the picker)
- Reports home: `https://analytics.google.com/analytics/web/#/p519647136/reports/intelligenthome`
- Pages and screens: `https://analytics.google.com/analytics/web/#/p519647136/reports/explorer?params=_u..nav%3Dmaui&r=lifecycle-pages-and-screens`
- Traffic acquisition: `https://analytics.google.com/analytics/web/#/p519647136/reports/explorer?params=_u..nav%3Dmaui&r=all-traffic-acquisition`
- If a deep link doesn't load the exact report, open Reports home and navigate the left menu:
  - **Reports → Life cycle → Engagement → Pages and screens** (top pages)
  - **Reports → Life cycle → Engagement → Events** (event counts — cta_click, dialog_open, generate_lead, etc.)
  - **Reports → Life cycle → Acquisition → Traffic acquisition** (channels)
- **Date picker is top-right.** Set to **"Last 28 days"** (and use the compare toggle for period-over-period when needed).

## Inputs to capture each run
1. **Overview:** Total/Active users, New users, Sessions, Engaged sessions %, Avg engagement time, Event count, **Key events** (often 0 — see gotcha).
2. **Top pages** (views, active users, avg eng. time).
3. **Traffic acquisition** by channel (sessions + engagement rate). Note Direct vs Organic Search vs Referral vs **AI Assistant** (chatgpt.com etc. roll up here).
4. **All events** with counts — especially the intent/conversion events:
   - `cta_click`, `dialog_open`, `form_start`, `generate_lead`, `mailing_list_signup`.
   - Confirm whether `waitlist_signup` / `sign_up` / `download` fire (commonly 0 / not implemented).
5. **(Bonus)** Extension property 520278142: `install`, `chat_connected`, `message_sent`, `response_received`.

## Procedure
### 1) Drive the browser (subagent)
- Confirm Chrome is running and GA is logged in. `CHROME=/Users/engineer/.agents/skills/chrome-use/scripts/chrome-use`.
- Spawn a sonnet-4.6 background subagent. Give it: the property ID **519647136**, the deep links above, the exact metrics list, and the baseline to compare against. Tell it to return a **structured table**, not prose.
- One report at a time; verify the page loaded the right property before reading (the picker bug).

### 2) Build the delta vs baseline
Keep a rolling baseline in the project daily log / issue #8. Known baseline (Apr 22–May 22 2026, property 519647136): Active 364, New 402, Sessions 509; acquisition Direct 72% / Google organic 21% / chatgpt.com 8.
Compute absolute + % delta for users, sessions, and each acquisition channel.

### 3) Build the conversion funnel
`Users → cta_click → dialog_open → form_start → generate_lead/mailing_list_signup`.
Compute drop-off at each step. **A large click→dialog_open gap is a tracking or UI bug, not low intent** — flag it.

### 4) Cross-reference Search Console + waitlist
- GSC (other skill) tells you WHICH pages/queries drove arrivals; GA4 tells you what they DID.
- Supabase `vibebrowser_waitlist` (project slqxwymujuoipyiqscrl, creds in `.env`) is the conversion ground truth for signups. Reconcile GA `generate_lead` count vs new waitlist rows.

### 5) Interpretation rules
- Users up + organic up + a single blog post dominating top pages → **content/SEO is the growth engine**; double down on that intent cluster.
- High top-of-funnel + near-zero conversions → either (a) instrumentation broken, or (b) page offers no conversion path for the arriving intent. Check funnel gap first.
- Extension property `install`/`message_sent` healthy while website waitlist flat → **product already launched**; the website's job shifted from waitlist capture to install/activation. Re-point CTAs accordingly.

## Common gotchas (verified in this codebase)
- **Key Events = 0:** `generate_lead` and `mailing_list_signup` fire but are NOT marked as Key Events in GA4 Admin, so they never appear in conversion reports or Smart Bidding. Fix in **Admin → Events → mark as key event** (this is a GA console action, not code).
- **Funnel leak click→dialog:** e.g. 44 `cta_click` but only 2 `dialog_open` ⇒ the waitlist dialog isn't opening reliably from CTA, OR multiple CTAs fire `cta_click` without a dialog (download/install buttons). Audit `components/google-analytics.tsx` (trackEvent defs, lines ~88-144) + each CTA's handler before concluding intent is low.
- **agentlabs.cc has no isolated GA4** — it's co-tracked in 519647136 with no hostname segment. For agentlabs-only numbers you'd need a hostname-filtered exploration or a separate data stream.
- **No agentlabs.cc Search Console access** under the current Google account (property not verified/shared).
- **Missing events:** `waitlist_signup`/`sign_up`/`download` report 0 — confirm naming in code before claiming "no downloads"; the event may simply not be wired.

## Tracked events in code
`components/google-analytics.tsx` (~lines 88-144) defines `trackEvent` and sends to PostHog + gtag + server telemetry. Conversion events: `generate_lead` (waitlist submit), `dialog_open`, `cta_click`, `mailing_list_signup`. If you need a new conversion (e.g. `download`/`install_click`), add it here AND mark it Key Event in GA4 Admin.

## Output format
Return:
1. **Overview table** with delta vs baseline (users, new users, sessions).
2. **Top 10 pages** (views / users / eng. time).
3. **Acquisition by channel** with delta vs baseline.
4. **Event counts** with the conversion events highlighted, and the **funnel** with drop-off %.
5. **3–5 takeaways**: is there product interest? where's the funnel leaking? what page/instrumentation change is highest ROI?
6. **Action plan P0/P1/P2** (P0 usually = fix broken conversion tracking / Key Events; P1 = page changes for the dominant intent cluster; P2 = expand winning content).

## References
- Companion SEO skill: `.agents/skills/google-analytics/SKILL.md` (Search Console).
- chrome-use: `.agents/skills/chrome-use/SKILL.md`.
- Growth/experiment log: GitHub issue #8 (dzianisv/vibebrowser-pitch).
