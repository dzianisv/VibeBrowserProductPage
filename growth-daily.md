# VibeBrowser Daily Growth Actions

## Routine Template

### Every Day (~20 min)

| # | Task | Tool / Where |
|---|---|---|
| 1 | **Check analytics** — GA4 sessions, top pages, conversion events | GA4 dashboard |
| 2 | **Monitor HN thread** — reply to any new comments immediately | [HN thread](https://news.ycombinator.com/item?id=47931565) |
| 3 | **Search competitor complaints** — see queries below, pick 1-2 to reply to | Reddit / HN / X |
| 4 | **Answer 1 "how do I" question** in a target community (no product mention) | Reddit / Discord |
| 5 | **1 build-in-public tweet** — metric, insight, user story, or learning | @whoisdzianis |

### Every Week (~1 hr)

| # | Task |
|---|---|
| W1 | **Update growth.csv** with scores/comments on all live posts |
| W2 | **Write or update 1 blog post** (see pipeline in growth.md) |
| W3 | **Review warm-up progress** — is real Reddit account ready to post yet? |
| W4 | **Post in one new community** (only if warm-up phase is complete) |
| W5 | **Check backlinks + SEO** — any new organic traffic to blog posts? |

### Competitor Complaint Search Queries (run 3-5 per day)

**Reddit** (use `site:reddit.com` in Google or search.reddit.com):
- `"browserbase" expensive OR billing OR credits site:reddit.com`
- `"browserless" alternative OR cost OR auth site:reddit.com`
- `give AI agent browser access site:reddit.com`
- `playwright session auth cookies lost site:reddit.com`
- `MCP browser tool site:reddit.com`

**Hacker News** (https://hn.algolia.com):
- `browserbase`
- `browser automation agent`
- `MCP browser`

**X / Twitter:**
- `@browserbase` (complaints in replies)
- `browserbase expensive`
- `playwright auth`
- `AI agent browser`

### Warm-Up Status Tracker

Before posting any promotion in a community, the account must meet **all** criteria:

| Community | Account | Karma / Followers | Genuine posts | Status |
|---|---|---|---|---|
| r/LocalLLaMA | real account | need ≥100 | need ≥5 | 🔴 Not started |
| r/ClaudeAI | real account | need ≥50 | need ≥3 | 🔴 Not started |
| r/LangChain | real account | need ≥50 | need ≥3 | 🔴 Not started |
| r/SideProject | real account | any | 0 (self-promo OK) | 🟡 Ready to post |
| r/ChatGPTCoding | real account | need ≥50 | need ≥3 | 🔴 Not started |
| X @whoisdzianis | @whoisdzianis | existing | need ≥5 replies first | 🟡 2 weeks warm-up |
| Anthropic Discord | — | — | need ≥3 messages | 🔴 Not joined |
| Ollama Discord | — | — | need ≥3 messages | 🔴 Not joined |

---

## Daily Log

### 2026-04-28 (Day 1)

#### ✅ Completed
- [x] HN Show HN post live: https://news.ycombinator.com/item?id=47931565
- [x] GA SPA tracking fixed (PR #89 merged)
- [x] /cloud, /mcp, /openclaw Browserbase-positioning deployed
- [x] Blog post: Browserbase vs VibeBrowser live
- [x] growth.md + growth.csv created
- [x] growth-hacking skill created

#### 📋 Actions Taken Today
- [x] HN thread monitored — 1 pt, 0 external comments, 26 min old. No replies needed yet.
- [x] Competitor search — 3 threads found in r/mcp (see drafts below)
- [ ] Post replies to r/mcp threads (use real account — drafts ready)
- [ ] Build-in-public tweet

#### ⚠️ HN Traction Window
Post is ~26 min old. **Act now**: share from real accounts/Discord/Slack in next 30–60 min to ride velocity. Prepare for likely first questions:
- "Doesn't this expose your entire browser to the agent?" → explain permissions/security model
- "How is this different from running CDP directly?" → MCP bridge + zero-config auth value-add
- "Multi-user/team?" → point to /cloud tier

#### 🎯 r/mcp Reply Opportunities (post today with real account)

**r/mcp has 62K weekly visitors — core MCP developer audience. Replies to others' threads are low-risk.**

---

**🥇 Best: Thread 2 — Customaise Chrome ext + MCP showcase** (3d old, 21 votes, 14 comments)
https://www.reddit.com/r/mcp/comments/1surv15/showcase_customaise_webmcp_tools_in_your_own/

> Solid approach and the framing is exactly right — "session ownership: no credential forwarding to a vendor" is the property cloud browsers fundamentally can't offer for personal-session workflows.
>
> For anyone who wants the same local-session advantage but prefers generic browser control rather than writing per-site AgentScripts, there's another Chrome-extension-based MCP approach worth knowing: **VibeBrowser** (vibebrowser.app). It exposes your real, already-logged-in Chrome to any MCP client (Claude Code, Cursor, etc.) with native CDP-level tools — navigate, click, screenshot, DOM — without needing custom scripts per site.
>
> The tradeoff:
> - **Customaise** = typed, ergonomic contracts for sites you automate repeatedly (great for running the same workflow 50x/day — structured, reliable tool calls)
> - **VibeBrowser** = ad-hoc agent control across any site you're already signed into, with zero per-site setup
>
> Both solve the same root problem: cloud browsers start fresh sessions, so they can't touch anything behind a real login.
>
> *(Disclosure: I built VibeBrowser — take the comparison with appropriate skepticism, but the architectural argument holds regardless.)*

---

**Thread 3 — ScrapingAnt cloud browser token efficiency** (9d old, 42 votes, 13 comments)
https://www.reddit.com/r/mcp/comments/1spvkrz/microsoft_recommends_cli_over_mcp_for_playwright/

> Great positioning — the "open web data pipeline at scale" vs "interactive UI testing" split is exactly right.
>
> Worth naming a third category both tools leave uncovered: tasks on sites you're **personally logged into** — inbox, LinkedIn, internal dashboards, anything behind SSO or 2FA. Cloud browsers start fresh sessions so they can't help here.
>
> The natural fit is a Chrome extension that bridges your *real* browser session to MCP — agent works inside the browser you're already signed into, so no credential extraction, no bot-detection risk from a mismatched fingerprint, no per-minute idle billing. **VibeBrowser** (vibebrowser.app) is one option in this space.
>
> Not the right tool for bulk open-web scraping at scale — that's exactly your use case. But there's a meaningful "access my own accounts" segment where cloud browsers leave a gap.

---

**Thread 1 — Browser MCP vs Playwright MCP?** (18h old, 7 votes, 13 comments)
https://www.reddit.com/r/mcp/comments/1sx45zv/browser_mcp_or_playwright_mcp/

> Playwright CLI is the right call for CI/regression — the token savings alone justify it.
>
> One angle nobody's mentioned: if you ever need to test against a site where you're **already authenticated** — staging behind SSO, internal tools, production features gated to your account — a headless Playwright process starts with empty cookies and you have to manage `storageState` files.
>
> Cleaner option for authenticated flows: a Chrome extension that bridges your real browser to MCP. The agent runs in the same Chrome you're already logged into, so auth is never a concern. **VibeBrowser** (vibebrowser.app) does this. Trade-off: less control over the exact browser environment, but zero credential-management overhead.

---

#### 📊 Metrics Snapshot
- GA sessions today: _
- HN score: 1 | comments: 0 (checked ~26 min after post)
- Waitlist signups: _

---

### Template for future days

```
### YYYY-MM-DD

#### 📋 Actions (fill in as you go)
- [ ] Analytics checked — sessions: _, top page: _, signups: _
- [ ] HN thread checked — new comments: _ / replied: _
- [ ] Competitor search: [query] → found: [yes/no] → replied: [link or skip]
- [ ] Community question answered: [sub/community], [topic], [link]
- [ ] Build-in-public tweet: [link or skip]

#### 📊 Metrics Snapshot
- GA sessions: _
- Waitlist signups (cumulative): _
- HN score: _
- New organic search visitors: _

#### 📝 Notes
[anything notable — good reply, competitor thread worth watching, post idea]
```
