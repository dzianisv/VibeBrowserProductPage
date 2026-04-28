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

**Competitor pain points (from research, 2026-04-28):**
1. **Billing traps** — 1-min minimum billing, health checks burn credits; surprise proxy overages
2. **Auth re-auth hell** — Long-running sessions randomly drop CDP connections
3. **Infrastructure babysitting** — Silent session deaths, part-time DevOps work
4. **Bot detection arms race** — Rotating proxies, CAPTCHAs, fingerprint mgmt steal time from building
5. **Useless free tiers** — Browserbase: 1 browser hour *total*; Browserless: ~8 hours then pay
6. **Wrong tool entirely** — Built for anonymous scraping; users paying for stealth they don't need

> **Killer quote** (r/automation): "I became a part-time DevOps engineer babysitting containers that would silently die mid-session."
> **Killer insight:** Both competitors assume you're a bot pretending to be human. VibeBrowser's premise: you're already human — use your real session. Makes 80% of their feature stack irrelevant.

---

## Growth Hacking Strategy

### The Rule: Earn Before You Ask

Communities can detect promotional intent instantly. The only sustainable approach is to **become a valued community member first**, then mention your product naturally when it's genuinely relevant.

**The sequence for every new community:**
```
Phase 1 (Weeks 1–2): Listen & learn
  → Read top posts, understand what questions come up repeatedly
  → Identify the 3–5 threads per week where VibeBrowser is relevant

Phase 2 (Weeks 2–4): Participate genuinely
  → Answer questions thoroughly — no product mention yet
  → Build karma/reputation with the real account
  → Goal: 5+ well-received contributions before any promotion

Phase 3 (Week 4+): Selective, honest promotion
  → Only mention VibeBrowser when it's the honest best answer
  → One direct product post max (framed as "I built this")
  → Share blog posts, not product pages
```

### Tactics That Work for Dev Tools

#### 1. Answer competitor complaints (highest ROI)
Search for people frustrated with Browserbase/Browserless/Playwright auth issues. Reply helpfully — solve their problem, then mention VibeBrowser as one option.

**Search queries to monitor:**
- Reddit: `browserbase expensive`, `browserless alternative`, `playwright auth cookies`, `give AI agent browser access`
- HN: `browser automation agent`, `MCP browser`, `authenticated browser agent`
- X: `browserbase`, `@browserbase`, `browser agent auth`

#### 2. Answer "how do I" questions (trust-building)
Monitor for recurring questions in target communities:
- "How do I give my AI agent browser access?"
- "How do I keep my agent logged in between sessions?"
- "Playwright keeps losing my session cookies, help?"

Answer thoroughly and completely. Mention VibeBrowser only at the end as one option, never as the whole answer.

#### 3. Build in public (compounding)
Share genuine milestones on X (`@whoisdzianis`):
- Usage metrics ("50 waitlist signups this week")
- Technical insights ("Why we chose CDP over Playwright for session relay")
- User stories ("A user automated their whole Salesforce workflow with 3 prompts")
- Failures and learnings

This builds an audience that amplifies future posts.

#### 4. GitHub presence
- Participate in issues on MCP-ecosystem repos (modelcontextprotocol/servers, etc.)
- When someone opens an issue about browser tools, mention VibeBrowser
- Star and watch relevant repos — be visible in the ecosystem

#### 5. Discord communities (fastest warm-up)
Smaller communities where individual contributors are more visible:
- Anthropic Discord (Claude users)
- Ollama Discord (local LLM users)
- LangChain Discord
- OpenAI Cookbook Discord

Post in #tools or #show-your-work channels. Discord bans are rare compared to Reddit.

#### 6. Content SEO (long-term, compounding)
Every blog post is a permanent funnel entry. Priority topics:
- "Browserbase alternative" (commercial intent, high value)
- "Browser automation for AI agents" (informational, high volume)
- "Give Claude browser access" (tool-specific, converts well)
- "MCP browser tool" (emerging keyword, own it early)

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
| Google Analytics (GA4) | ✅ Fixed | Was broken for SPA routes — only landing page tracked. Fixed 2026-04-28 (PR #89) |
| PostHog | ✅ Working | `capture_pageview: 'history_change'` — tracks all routes |
| Event tracking | ✅ Active | `trackWaitlistSignup`, `trackCTAClick`, `trackDialogOpen` on all major CTAs |

**GA Property:** `G-EYZHHTHR57`

**Remaining analytics work:**
- [ ] Set up GA4 conversion goal for `generate_lead` event
- [ ] Cloudflare: "AI Scrapers and Crawlers" → Allow (so LLMs index the site)

---

## Content / SEO

| Content | Status | URL | Notes |
|---|---|---|---|
| Blog: Browserbase vs VibeBrowser | ✅ Live | `/blog/browserbase-vs-vibebrowser-local-and-cloud` | Competitor pain points, billing trap section, comparison table |
| Blog: MCP + Chrome DevTools fallback | ✅ Live | `/blog/implementing-vibebrowser-mcp-cli-chrome-devtools-fallback` | Technical SEO for "browser MCP" |
| `public/llms.txt` | ✅ Updated | — | `/cloud` and both blog posts |

**Blog pipeline (write these next):**
- [ ] "How to give Claude Code your real browser" — tactical how-to, high conversion
- [ ] "Why your AI agent keeps getting logged out" — problem-aware, high search volume
- [ ] "MCP browser tools compared" — roundup, captures broad traffic

---

## Community Channels

### Hacker News

**Post:** [Show HN: VibeBrowser – Give your AI agent your real logged-in browser via MCP](https://news.ycombinator.com/item?id=47931565)
**Status:** ✅ Live — posted 2026-04-28
**Angle:** Auth-loop problem + CDP relay. Technical, open-source invite.
**Next:** Reply to any comments within 1 hour. Can re-submit in 6+ months with a new angle (e.g. VibeBrowser Cloud launch).

---

### Reddit

**Accounts:**
- `Icy_Host_1975` — ❌ banned from r/LocalLLaMA, low karma (16), do not use for promotion
- Builder's real account — ✅ use for all future posts

| Subreddit | Status | URL | Notes |
|---|---|---|---|
| r/LocalLLaMA | ❌ Banned (Icy_Host_1975) | — | Best fit. Use real account when karma ≥100 |
| r/SideProject | 📋 Ready | — | Self-promo welcome; post with real account |
| r/ClaudeAI | 📋 Planned | — | High-value: Claude Code + MCP users |
| r/LangChain | 📋 Planned | — | Agent framework builders |
| r/ChatGPTCoding | 📋 Planned | — | Codex CLI users |
| r/webdev | 📋 Planned | — | Broad dev audience; free + open source angle |

#### ⚠️ Post-mortem: Icy_Host_1975 ban (2026-04-28)

**What went wrong:**
1. **16 karma** — r/LocalLLaMA requires ~100+ karma; comments auto-removed
2. **Product name in every comment** — "vibe browser", "openclaw.vibebrowser.app" in 7/7 replies → mod removals in r/MachineLearning + r/LocalLLaMA
3. **r/womenintech post** — completely off-topic, got **−5 downvotes** from 366 viewers → account flagged as spammer
4. **8 subreddits in 48 hours** — classic coordinated-spam signal
5. **Comment drops not engagement** — technically plausible replies that always steered to the product

**Rules:**
- ✅ Use builder's real account only
- ✅ 100+ karma minimum before any promo in high-signal subs
- ✅ 2-week genuine-comment warm-up first
- ✅ Max 1 product mention per 24h per account
- ✅ Link only in top-level "I built this" posts, never in comment replies
- ❌ Never post in off-topic subs to build karma
- ❌ Never auto-post — always human-review draft first

---

### X / Twitter

**Account:** `@whoisdzianis` (real identity — never use throwaway accounts)

**Status:** ⚠️ A throwaway X account used for promotion was banned immediately.
**Why it got banned:** New account + no followers + immediate product URL = instant spam flag.

**Strategy:**
- Reply to MCP/browser-automation threads for 1–2 weeks first (no product mention)
- Quote-tweet relevant threads with added insight
- Then post a thread: hook (the insight) → problem → solution → product link
- Hashtags: `#MCP` `#AIagents` `#browserautomation` `#buildinpublic`

---

### Discord (not started)
- Anthropic Discord — #claude-tools channel
- Ollama Discord — #show-and-tell channel
- LangChain Discord — #tools channel
- Join first, contribute for 1 week, then share

---

### Dev.to / Hashnode (not started)
Cross-post blog articles with canonical URL → free SEO backlinks + separate audience.

---

## Funnel

```
Answer a question / competitor complaint
        ↓
Link to blog post (educational, no hard sell)
        ↓
Blog post links to /cloud, /mcp product pages
        ↓
Product page → Waitlist signup (generate_lead event)
```

**UTM convention:**
- Reddit: `?utm_source=reddit&utm_medium=community&utm_campaign=<subreddit>`
- HN: `?utm_source=hackernews&utm_medium=community&utm_campaign=show-hn`
- X: `?utm_source=twitter&utm_medium=social&utm_campaign=<thread-topic>`
- Blog internal links: `?utm_source=blog&utm_medium=internal`

---

## TODO

- [x] ~~Merge blog PR #88~~ — done 2026-04-28
- [x] ~~Fix GA SPA tracking (PR #89)~~ — done 2026-04-28
- [x] ~~Post Show HN~~ — live https://news.ycombinator.com/item?id=47931565
- [ ] Monitor HN thread — reply to comments within 1 hour
- [ ] Start Reddit warm-up with real account (2 weeks of genuine comments, no promo)
- [ ] Post r/SideProject with real account
- [ ] Post r/ClaudeAI after warm-up
- [ ] Start X/Twitter engagement (reply to MCP threads, no product mention yet)
- [ ] Join Anthropic + Ollama Discord, contribute for 1 week
- [ ] Set up GA4 conversion goal for `generate_lead` event
- [ ] Cloudflare: set "AI Scrapers and Crawlers" → Allow
- [ ] Blog: "How to give Claude Code your real browser"
- [ ] Blog: "Why your AI agent keeps getting logged out"
- [ ] Dev.to cross-post of Browserbase comparison article
- [ ] Product Hunt launch planning

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

#### ⚠️ Post-mortem: what went wrong with Icy_Host_1975 (2026-04-28)

Account audit revealed a classic astroturfing pattern that got the account flagged and banned from r/LocalLLaMA:

**Root causes:**

1. **Too low karma (16)** — r/LocalLLaMA and r/MachineLearning require ~50–100+ karma. Comments auto-removed by filter.
2. **Product name in every comment** — every reply mentioned "vibe browser" or "openclaw.vibebrowser.app". Two comments removed by mods (r/MachineLearning, r/LocalLLaMA).
3. **Wrong subreddit entirely** — agent posted browser automation promo in **r/womenintech**. Got **−5 downvotes**, 366 views. Completely off-topic. This alone flags the account as a spammer to Reddit's algorithm.
4. **Too many subreddits too fast** — 7 comments across 8 different subs in 48 hours from a 16-karma account. Classic coordinated promotion signal.
5. **Comment drops, not genuine engagement** — technically plausible replies that always steered toward the product. Mods recognise this pattern immediately.

**Rules for future agent-assisted posting:**

- ✅ **Minimum 100 karma** before any promotional activity in high-signal subs (r/LocalLLaMA, r/MachineLearning, r/ClaudeAI)
- ✅ **2-week warm-up** — genuine comments only (no product mention) before first promo post
- ✅ **One product mention per 24h max** per account
- ✅ **Use the builder's real account** (`u/dzianisv` or equivalent) — credibility beats anonymity
- ✅ **Only link the product in top-level posts** where self-promotion is explicitly allowed ("I built this", "Show r/...")
- ❌ **Never post in off-topic subs** just to build karma — it backfires badly
- ❌ **Never let an agent auto-post without human review** of the draft first

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

### X / Twitter

**Account:** `@whoisdzianis` (builder's real account — use this, not throwaway accounts)

#### ⚠️ Account status note
A separate X account used for automated promotion was banned. Likely triggers:
- **New account posting promotional links immediately** — X's spam detection is aggressive for accounts with no follower history posting product URLs
- **Automated posting patterns** — identical phrasing, no engagement history, no followers = instant flag
- **No prior community presence** — X requires social proof (followers, replies, likes received) before promotional posts get reach

**Rules for X:**
- ✅ Use `@whoisdzianis` (real identity, existing followers)
- ✅ Thread format — lead with the insight/rant, product comes at the end
- ✅ Engage first — reply to MCP / browser automation threads for 1 week before any product thread
- ✅ Quote-tweet relevant threads rather than posting cold
- ❌ Never create a new account just for promotion — gets banned within hours
- ❌ Never auto-post without reviewing draft first

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
