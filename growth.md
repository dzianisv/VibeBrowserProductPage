# VibeBrowser Growth & Promotion Tracker

## Positioning

**Core message:** 90% cheaper than Browserbase — because you don't need stealth mode to access your own accounts.

**Key insight:** Browserbase/Browserless solve the *scraping strangers' sites* problem (bot detection, stealth, CAPTCHAs, proxies). VibeBrowser solves a different problem: automating *your own* workflows where you're already a legitimate user. No stealth = dramatically cheaper.

**Differentiators:**
- Local-first (Chrome extension, free, no account)
- Cloud when you need it (VibeBrowser Cloud — your real session, globally deployed)
- Open source MCP: `npx @vibebrowser/mcp`
- Works with Claude, Copilot, Codex, Gemini CLI
- No per-hour billing traps, no proxy costs, no CAPTCHA fees

---

## Pages

| Page | Status | Notes |
|---|---|---|
| `/cloud` | ✅ Live | "90% cheaper than Browserbase" hero, pricing comparison section, comparison table |
| `/mcp` | ✅ Live | "No Browserbase account needed" trust indicator, updated subhead |
| `/openclaw` | ✅ Live | Cost-positioning subhead |
| `/compare` | ✅ Live | "Where AI Browsers Get Stuck" section |

---

## Analytics

| Tool | Status | Notes |
|---|---|---|
| Google Analytics (GA4) | ✅ Fixed | Was broken for SPA routes — only landing page tracked. Fixed 2026-04-28 (PR #89): `GAPageTracker` now fires `page_view` on every route change |
| PostHog | ✅ Working | `capture_pageview: 'history_change'` — was already tracking all routes |
| Event tracking | ✅ Active | `trackWaitlistSignup`, `trackCTAClick`, `trackDialogOpen` on all major CTAs |

**GA Property:** `G-EYZHHTHR57`

---

## Content / SEO

| Content | Status | PR | Notes |
|---|---|---|---|
| Blog: Browserbase vs VibeBrowser (local+cloud) | ✅ Live | #88 merged | Includes competitor pain points, billing trap section, dev quote, updated comparison table |
| VibeBrowser MCP + Chrome DevTools fallback | ✅ Live | #85 merged | Technical SEO for "browser MCP" and "CDP fallback" queries |
| `public/llms.txt` | ✅ Updated | — | `/cloud` and both blog posts added |

### Competitor pain points to use in copy (from research, 2026-04-28)
1. **Billing traps** — 1-min minimum billing, 5-sec health checks burn credits; surprise proxy overages
2. **Auth re-auth hell** — Long-running authenticated sessions randomly drop CDP connections
3. **Infrastructure babysitting** — Silent session deaths, container management, debugging mid-session drops; users become part-time DevOps
4. **Bot detection arms race** — Rotating proxies, CAPTCHA solving, fingerprint mgmt steal time from building
5. **Useless free tiers** — Browserbase: 1 browser hour *total*. Browserless: ~8 hours then pay
6. **Wrong tool entirely** — Built for anonymous scraping; users paying for stealth they don't need

> **Killer quote** (paraphrased from r/automation): "I became a part-time DevOps engineer babysitting containers that would silently die mid-session."

> **Killer insight:** Both competitors assume you're a *bot pretending to be human*. VibeBrowser's premise is that you're already human — use your real session. That makes 80% of their feature stack irrelevant.

---

## Community / Traffic Channels

### Hacker News

**Post:** [Show HN: VibeBrowser – Give your AI agent your real logged-in browser via MCP](https://news.ycombinator.com/item?id=47931565)
**Status:** ✅ Live — posted 2026-04-28
**Why HN:** HN's "Show HN" format is the most legitimate way for a builder to share a new open-source tool. The audience is technical, skeptical of marketing, and actively interested in AI agent tooling. Leading with `npx @vibebrowser/mcp` and the CDP/auth-loop technical story is exactly what HN responds to. A single genuine Show HN can drive 500–5000 qualified visitors in 24 hours if it gains traction.
**Angle used:** "I built this after getting frustrated with the fresh-anonymous-browser problem — agents lose all your sessions on every run. VibeBrowser connects to your *existing* Chrome." Technical, honest, open-source invite.

---

### Reddit

**Account in use:** `Icy_Host_1975`
**Known bans:** r/LocalLLaMA (banned — cannot post)

| Subreddit | Post title | Status | URL | Why this subreddit |
|---|---|---|---|---|
| r/LocalLLaMA | "I built a browser MCP that gives your local LLM your real logged-in Chrome — free, no Browserbase account" | ❌ Banned | — | Best audience fit but account is banned. Try with different account or appeal ban. |
| r/SideProject | Same angle | 📋 Ready to post | — | Self-promotion welcome, no restrictions. Good fallback for r/LocalLLaMA. |
| r/ClaudeAI | "Give Claude Code your real browser via MCP (free extension)" | 📋 Planned | — | Claude Code has native MCP support — users already looking for MCP tools |
| r/ChatGPTCoding | TBD | 📋 Planned | — | Codex CLI users; same MCP angle |
| r/LangChain | TBD | 📋 Planned | — | Agent framework users who wire browser tools; direct fit |
| r/webdev | TBD | 📋 Planned | — | Broader dev audience; lead with open-source + free angle, not AI |

**Reddit strategy:** Never post the product page directly. Share the blog post or frame it as "I built this". One post per subreddit, days apart. Respond to every comment within the first hour — HN and Reddit rank by engagement velocity.

---

### Blog posts (SEO + shareable content)

| Post | Status | URL | Why |
|---|---|---|---|
| Browserbase vs VibeBrowser: local-first vs cloud-only | ⏳ PR #88 pending | `/blog/browserbase-vs-vibebrowser-local-and-cloud` | Captures "Browserbase alternative" search traffic. Educational tone means it gets shared, not flagged as spam. Comparison tables rank well in Google. |
| VibeBrowser MCP + Chrome DevTools fallback | ✅ Live | `/blog/implementing-vibebrowser-mcp-cli-chrome-devtools-fallback` | Technical SEO for "browser MCP" and "CDP fallback" queries |

---

### Planned channels (not started)
- [ ] Twitter/X thread — local vs cloud angle + competitor pricing breakdown (thread format performs well)
- [ ] Dev.to / Hashnode — cross-post the Browserbase comparison article (separate SEO juice)
- [ ] Product Hunt launch (coordinate hero image, tagline, hunter outreach — separate planning needed)

---

## Funnel

```
Community post → Blog post (educational, SEO) → Product page (/cloud, /mcp) → Waitlist signup
```

**UTM convention for tracking:**
- Reddit: `?utm_source=reddit&utm_medium=community&utm_campaign=launch`
- HN: `?utm_source=hackernews&utm_medium=community&utm_campaign=show-hn`
- Blog internal links: `?utm_source=blog&utm_medium=internal`

---

## TODO

- [x] ~~Merge blog PR #88 (Browserbase vs VibeBrowser)~~ — done 2026-04-28
- [x] ~~Fix GA SPA tracking (PR #89)~~ — done 2026-04-28
- [x] ~~Post Show HN~~ — live https://news.ycombinator.com/item?id=47931565
- [ ] **Reddit r/SideProject** — post when ready (account not banned there)
- [ ] **Reddit r/ClaudeAI** — "Give Claude Code your real browser via MCP"
- [ ] Resolve r/LocalLLaMA ban — appeal or use different account
- [ ] Monitor HN thread — respond to comments within 1 hour
- [ ] Add UTM params to HN/Reddit post links
- [ ] Set up GA4 conversion goal for `generate_lead` event
- [ ] Cloudflare: set "AI Scrapers and Crawlers" → Allow (so LLMs index the site)
- [ ] Twitter/X thread — local vs cloud angle + competitor pricing breakdown
- [ ] Dev.to cross-post of Browserbase comparison blog post
- [ ] Add geo-region section to `/cloud` (local vs cloud positioning on proxies)
- [ ] Product Hunt launch planning
