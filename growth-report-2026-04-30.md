# VibeBrowser Growth Report — 2026-04-30

> **Period:** 2026-04-28 to 2026-04-30 (Days 1–3 post-launch)
> **Report type:** Weekly / Post-launch summary
> **Author:** CMO (autonomous agent)

---

## Executive Summary

First 3 days post-launch. HN Show HN submitted; Reddit blocked by banned account; CWS rename not yet applied; one blog post live; CWS Phase 2 listing copy ready to paste. Zero paid actions taken (budget $0 spent). Critical unblock needed: builder login with real Reddit account and CWS developer console.

---

## Channel Activity

### Hacker News

| Date | URL | Action | Score | Comments |
|---|---|---|---|---|
| 2026-04-28 | https://news.ycombinator.com/item?id=47931565 | Show HN submitted | 1 pt | 0 external |
| 2026-04-30 | https://news.ycombinator.com/item?id=47967299 | Follow-up comment (security model + agent scope) | +0 | 2 total (author only) |

**Analysis:** Very low traction (1pt after 48h). Likely posted at non-peak time. The follow-up comment adds technical depth and asks an open question — may attract a late reply. HN momentum is essentially zero. Do not invest more effort here until organic traction appears or we get a re-post opportunity.

---

### Reddit

| Thread | Subreddit | Age | Status | Notes |
|---|---|---|---|---|
| Customaise showcase | r/mcp | 6d | ❌ needs_human_action | BEST FIT — draft ready, post ASAP (getting stale) |
| Browser MCP vs Playwright | r/mcp | 3d | ❌ needs_human_action | Draft ready, active thread, post today |
| ScrapingAnt / MS CLI | r/mcp | 11d | ❌ SKIP | Too stale — skip entirely |
| "What breaks when agent calls external tools" | r/mcp | Found 15min old Day 3 | ❌ needs_human_action | PRIME thread, draft ready in growth-daily.md Day 4 |

**Root cause:** Reddit account `Icy_Host_1975` (22 karma) is banned in r/LocalLLaMA. Cannot post r/mcp replies with this account.
**Unblock:** Builder must log in to Reddit with verified account that has posting history in tech/MCP subs. Drafts are written and ready in `growth-daily.md`.
**Impact of delay:** Thread 2 (Customaise, best fit) is 6d old — will become stale if not posted within 24h. Thread 4 is already aging.

---

### Twitter / X

| Draft | Account | Status |
|---|---|---|
| Build-in-public: agent scope sandboxing design question | @whoisdzianis | ✅ Ready to post — see growth-daily.md Day 3 |

**Unblock:** Builder must post from @whoisdzianis account.

---

### Chrome Web Store

| Action | Status | Impact |
|---|---|---|
| Phase 1: Rename main listing to include model names | ❌ NOT DONE — needs builder CWS login | HIGH (immediate 2-5× impression boost) |
| Phase 2: "Vibe for Claude" listing copy | ✅ Ready in `cws-listing-copy.md` | HIGH (200-500 installs/mo from Claude searches) |

**Phase 1 copy is ready to paste** (`cws-listing-copy.md`):
- New name: `Vibe AI Browser Agent — Claude, Gemini, GPT` (44 chars)
- Short desc (127 chars) and full desc: ready
- **Estimated time to apply: 15 min**
- **Unblock:** Login to https://chrome.google.com/webstore/devconsole with `dzianisvv@gmail.com`

---

### Content / SEO

| Asset | Status | Target queries |
|---|---|---|
| Blog: "Claude browser extension complete guide 2026" | ✅ Written — `blog/claude-browser-extension-complete-guide-2026.md` | "Claude browser extension", "give Claude browser access", "Claude Code MCP browser" |
| Blog: "Best Cloud Browser MCP for AI Agents" | ✅ Published | "cloud browser MCP", "browserbase alternative" |
| Landing: `/claude` | ✅ Live | "Claude browser agent" |
| Landing: `/gemini` | ✅ Live | "Gemini browser automation" |
| Landing: `/codex` | ✅ Live | "Codex CLI browser" |
| Landing: `/cloud` | ✅ Live | "cloud browser MCP" |
| CWS listing copy (Phase 1 + Phase 2) | ✅ Written — `cws-listing-copy.md` | Builder to apply |

---

## Metrics Snapshot (Day 3)

| Metric | Value | Notes |
|---|---|---|
| HN score | 1 pt | Low traction — not compounding |
| HN comments | 2 | Both from author |
| Reddit posts | 0 | Blocked by banned account |
| Tweets | 0 | Draft ready, needs builder |
| CWS installs | Unknown | Dashboard needs builder login |
| CWS impressions | Unknown | Baseline pre-rename |
| Waitlist signups | Unknown | Supabase — builder to check |
| Cloud conversions | Unknown | Stripe — builder to check |

---

## Week 1 Priorities (Builder Actions, Ordered by ROI)

| Priority | Action | Time | Impact |
|---|---|---|---|
| 🔴 1 | CWS Phase 1 rename (log into devconsole, paste copy) | 15 min | HIGH — 2-5× impressions immediately |
| 🔴 2 | Post r/mcp replies with real Reddit account (Threads 2 + 4 first) | 30 min | HIGH — first Reddit awareness |
| 🔴 3 | Post tweet on @whoisdzianis | 5 min | Medium — build-in-public credibility |
| 🟡 4 | Publish "Claude browser extension" blog post on site | 10 min | High SEO value (frontmatter: published: true already set) |
| 🟡 5 | Review PR #1160 (CWS variant system) CI fix | 1 hr dev | Unblocks Phase 2 CWS submission |

---

## Week 2 Plan (CMO — Agent Executable)

1. **Monitor CWS impressions** after Phase 1 rename — document baseline vs. post-rename delta
2. **Find 3 fresh r/mcp or r/ClaudeAI threads** for value-first replies
3. **Draft "Vibe for Claude" CWS screenshots brief** — 5 screenshots showing Claude Code + Vibe workflow
4. **Draft follow-up HN comment** if any engagement appears
5. **Prepare r/SideProject post** — self-promo welcome, builder can post with real account

---

## Key Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Reddit threads expire before posting | HIGH | Post within 24h with real account |
| CWS Phase 1 review delayed | Medium | Apply today — review takes 1-3 business days |
| HN never compounds | High | Not investing more here; pivot to Reddit + CWS |
| PR #1160 blocks Phase 2 | Medium | CTO to fix SubAgentTool schema validation |

---

## Appendix: Files Created This Sprint

- `VibeBrowserProductPage/cws-listing-copy.md` — Phase 1 + Phase 2 CWS copy (ready to paste)
- `VibeBrowserProductPage/blog/claude-browser-extension-complete-guide-2026.md` — SEO post
- `growth-daily.md` — Day 3 + Day 4 entries with Reddit reply drafts
- `growth.csv` — Updated with all activity; Reddit threads flagged as `needs_human_action`

