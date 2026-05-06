# Anti-Ban & Warm-Up Rules

## The Core Principle: Earn Before You Ask

Communities detect promotional intent immediately. The only sustainable path is becoming a valued contributor *before* mentioning your product. Every shortcut here has already failed (see post-mortems below).

---

## Warm-Up Phases

Run these phases for every new community before any promotional post:

### Phase 1 — Listen (Week 1)
- Read the top 20 posts of all time in the community
- Identify the 3–5 recurring questions VibeBrowser can genuinely answer
- Do NOT post anything yet

### Phase 2 — Contribute (Weeks 2–3)
- Answer questions thoroughly — no product mention at all
- Upvote good content, engage with others' posts
- Goal: **5+ well-received contributions** before any promotion
- Watch: are your comments being upvoted? Downvoted? Removed?

### Phase 3 — Selective promotion (Week 4+)
- Only mention VibeBrowser when it's the honest best answer
- One direct product post maximum (framed as "I built this")
- Share blog posts, not product pages
- Never post the same angle twice in the same community

---

## Per-Platform Warm-Up Checklist

Before posting in any community, verify all boxes:

### Reddit
- [ ] Account karma ≥ threshold (see table below)
- [ ] 5+ genuine comments in the target subreddit (not karma-farming subs)
- [ ] No product mentions in warm-up comments
- [ ] Last promotional post was 7+ days ago (across all subs)
- [ ] Post reviewed by human before submitting

| Subreddit | Min karma | Min sub comments | Current status |
|---|---|---|---|
| r/LocalLLaMA | ~100 | 5 | 🔴 Need warm-up |
| r/ClaudeAI | ~50 | 3 | 🔴 Need warm-up |
| r/LangChain | ~50 | 3 | 🔴 Need warm-up |
| r/ChatGPTCoding | ~50 | 3 | 🔴 Need warm-up |
| r/webdev | ~50 | 3 | 🔴 Need warm-up |
| r/mcp | ~20 | 1 | 🟡 Reply OK, top post after 1 reply |
| r/SideProject | any | 0 | 🟢 OK to post now |
| r/IMadeThis | any | 0 | 🟢 OK to post now |

### X / Twitter
- [ ] Account is the builder's real identity (`@whoisdzianis`) — never throwaway
- [ ] 5+ replies to relevant threads first (MCP, browser automation)
- [ ] No product link in the first 2 weeks of fresh engagement

### Discord
- [ ] Member for 3+ days
- [ ] 3+ genuine messages in non-promo channels
- [ ] Post in #tools or #show-your-work, not #general

---

## Hard Rules (never violate)

```
❌ Never post with < threshold karma on high-signal subs
❌ Never mention product in more than 1 comment per 24h per account
❌ Never post in off-topic subs to build karma (backfires badly)
❌ Never let an agent auto-post without human review of the draft
❌ Never use throwaway accounts for any promotion
❌ Never cross-post identical text verbatim across platforms
❌ Never post in more than 3 communities in 24h with the same account
✅ Only use the builder's real account for all promotion
✅ Disclose when you built the product ("I built this" / "Disclaimer: I made this")
✅ Genuinely answer the question first; product mention is the last sentence
✅ Check community-specific rules before every post
```

---

## Post-Mortems

### Reddit: Icy_Host_1975 ban (2026-04-28)

**What happened:** Agent created a throwaway account and posted to 8 subreddits in 48 hours. Account banned from r/LocalLLaMA, comments removed from r/MachineLearning, −5 downvotes in r/womenintech.

**Root causes:**
1. **16 karma** — r/LocalLLaMA requires ~100+; posts auto-removed by automoderator
2. **Product name in every comment** — "vibe browser" and product URLs in 7/7 replies triggered mod removal
3. **Off-topic sub** — posted in r/womenintech (266 viewers, completely irrelevant, −5 downvotes) flagged account as spammer
4. **8 subs in 48h** — coordinated spam pattern; Reddit's spam classifier triggers at ~3-4 subs/48h
5. **Coordinated comment drops** — technically plausible replies that all steered to the product, no genuine value variation

**What to do instead:** Use real account, 2-week warm-up, max 1 promo post per week, human reviews every draft.

### X: Throwaway account ban (2026-04-28)

**What happened:** New account created, posted promotional URL immediately, account suspended within hours.

**Root cause:** New account + no followers + promotional URL = Twitter's spam classifier triggers instantly. Pattern is indistinguishable from bot networks.

**What to do instead:** Real account (`@whoisdzianis`) only. Engage in replies for 2 weeks before any promo thread.

---

## Identifying Safe Threads to Reply To

A thread is safe to reply to when:
- It's asking a genuine question you can answer thoroughly
- VibeBrowser is the *honest* best answer (not forced)
- The thread is active (< 7 days old)
- You haven't replied in this thread before
- Your reply adds value even if the reader ignores the product mention

A thread is risky when:
- It's a competitor's own post (looks like trolling)
- You'd only mention VibeBrowser, adding nothing else
- The subreddit has removed your comments before
- The thread is > 30 days old (low-value reply, can still trigger spam flags)
