# Platform-Specific Posting Guide

## Hacker News

**Format:** "Show HN: [tool name] — [one-line value prop]"
**Submit to:** https://news.ycombinator.com/submit
**URL:** link to the most technical page (e.g. vibebrowser.app/mcp, not homepage)
**Optimal time:** Weekday 8–10am US Eastern

**What works:**
- Open-source tools with a GitHub link
- "I built this because I was frustrated with X" framing
- Technical depth in first comment (add immediately after posting)
- Honest about limitations
- Responding to every comment, especially critical ones

**What kills it:**
- Marketing language ("revolutionary", "game-changing")
- Posting the homepage or a sales page as the URL
- Not engaging with comments
- Duplicate posts (HN shadowbans repeat submitters)

**First comment template:**
```
I built this after hitting [specific frustration]. 

How it works: [2-3 sentences of technical detail].

The hardest part was [engineering challenge]. Happy to answer questions about [specific area].

It's open source: [GitHub URL]
```

**VibeBrowser angles for HN:**
- Auth-loop problem with Playwright/Puppeteer/Browserbase
- CDP relay design (extension ↔ MCP bridge)
- Local-first vs cloud — why we built the extension first
- TEE/security model for credential vault

---

## Reddit

**General rules:**
- Read subreddit rules before every post
- Don't mention competitors by name in the title
- Link to blog posts or GitHub, not the product page
- Flair correctly (most subs require it)
- Reply within 1 hour of comments

### ⚠️ Anti-ban rules (learned from Icy_Host_1975 ban, 2026-04-28)

The account was banned from r/LocalLLaMA and had comments removed from r/MachineLearning for:
- Posting with only 16 karma (min ~100 required by high-signal subs)
- Mentioning "vibe browser" / "openclaw.vibebrowser.app" in every comment reply
- Posting in completely off-topic subs (r/womenintech got −5 downvotes)
- 7 comments across 8 subs in 48 hours = coordinated spam signal

**Hard rules:**
- ❌ Never post with < 100 karma on any high-signal sub
- ❌ Never mention the product name more than once per 24h per account
- ❌ Never post in off-topic subs to "build karma" — it backfires
- ❌ Never let agent auto-post without human review
- ✅ Use the builder's real Reddit account for promotional posts
- ✅ 2-week warm-up with genuine, product-free comments before first promo
- ✅ Only drop product link in top-level "I built this" / "Show r/..." posts

**Subreddit guide:**

### r/LocalLLaMA
- Audience: Ollama/LM Studio/local inference users
- What they want: tools that work offline, no cloud dependency, open source
- Angle: "Free Chrome extension, no cloud account, works with any MCP client"
- Title pattern: "I built a browser MCP for local LLMs — your real logged-in Chrome, no Browserbase"
- Link to: `/mcp` page or MCP blog post

### r/ClaudeAI
- Audience: Claude/Claude Code power users
- What they want: MCP tools that work with Claude Code
- Angle: "Add browser access to Claude Code in 30 seconds"
- Title pattern: "Give Claude Code your real browser via MCP (free extension)"
- Link to: `/mcp` page

### r/ChatGPTCoding / r/ChatGPT
- Audience: Codex CLI / ChatGPT plugin users
- Angle: "Browser MCP for Codex CLI — automate your own accounts"
- More cautious here — ChatGPT users less familiar with MCP

### r/LangChain
- Audience: agent framework builders
- Angle: technical — how to wire VibeBrowser as a browser tool
- Post a code snippet showing the MCP config

### r/webdev
- Audience: broad web developers
- Angle: open-source, free alternative to Browserbase for personal automation
- Lead with the cost comparison
- Avoid AI-heavy framing — lead with "browser automation"

### r/SideProject / r/IMadeThis
- For launch posts — any angle works
- Less targeted but good for early traction

---

## X / Twitter

**Format:** Thread (5–8 tweets)
**Optimal time:** Weekday 9am–12pm US Eastern
**Strategy:** Lead with the insight/rant, end with the product

**Thread structure:**
1. Hook tweet — the pain point or counterintuitive insight
2. Expand on the problem (1–2 tweets)
3. "So I built X" — introduce VibeBrowser
4. How it works (technical, with a GIF or screenshot if possible)
5. The key differentiator vs Browserbase/Playwright
6. CTA + link

**Example hook tweets:**
- "You're paying $150/mo to Browserbase for stealth mode you don't need."
- "Every AI agent tutorial shows you a fresh anonymous browser. That's the wrong mental model."
- "The 'AI agent needs a browser' problem is solved. The 're-auth every time' problem isn't. Until now."

**Hashtags:** `#AI` `#MCP` `#browserautomation` `#buildinpublic` `#openSource`

---

## Dev.to / Hashnode

- Cross-post blog articles (from `/blog`) with canonical URL set to vibebrowser.app
- Don't repost verbatim — add a "Originally published at" note and canonical link
- Tag with: `AI`, `automation`, `MCP`, `openSource`, `devtools`
- Dev.to gets good Google indexing — worth doing for every major blog post

---

## Product Hunt

*(Separate full launch plan needed — not covered here)*

Key prep:
- Hunter with 500+ followers
- Coming Soon page live 1 week before
- Gallery: screenshots + 30s demo video
- Tagline: "Your real logged-in browser for AI agents — free Chrome extension"
