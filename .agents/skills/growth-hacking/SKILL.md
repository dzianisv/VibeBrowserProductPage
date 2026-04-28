---
name: growth-hacking
description: Promote VibeBrowser products on Reddit, Hacker News, and X/Twitter. Use when asked to create community posts, find relevant threads, reply to discussions, track post performance, update growth.md strategy, or log posts in growth.csv. Triggers on phrases like "post to reddit", "show HN", "promote", "growth", "community post", "find threads about", "check HN", "track our posts".
---

# VibeBrowser Growth Hacking

## Source of truth files

| File | Purpose |
|---|---|
| `growth.md` | Strategy, positioning, channel rationale, analytics status, TODO list |
| `growth.csv` | Per-post tracker: every thread/post we've created or replied to |

Always read `growth.md` first. Always update `growth.csv` after creating or finding a post.

---

## Core positioning (memorize this)

- **Headline:** "90% cheaper than Browserbase — you don't need stealth mode to access your own accounts."
- **Wedge:** Browserbase/Browserless assume you're a bot pretending to be human. VibeBrowser's users are already human — real accounts, real sessions. Makes 80% of competitor features irrelevant.
- **Local-first:** Chrome extension is free, no account, works with any MCP client.
- **Cloud option:** VibeBrowser Cloud = your real session deployed globally, no stealth costs.
- **Never lead with tech.** Lead with the user's pain (re-auth hell, billing traps, infra babysitting).

---

## Workflow

### Creating a new post

1. Read `growth.md` for latest strategy and angles
2. Check `growth.csv` — don't double-post to the same community
3. Write the post (see platform rules in `references/platforms.md`)
4. Use `vibebrowser` MCP tools to navigate and submit
5. Append the post to `growth.csv` immediately
6. Update `growth.md` TODO list

### Tracking existing threads

1. Search the platform for brand mentions ("vibebrowser", "vibe browser", "vibe mcp")
2. Log any found threads in `growth.csv` with status "found"
3. Reply to unanswered questions or upvote-worthy threads

### After posting

- Monitor for 1 hour: check for comments, reply promptly
- Update `growth.csv` with score/upvotes after 24h

---

## growth.csv format

```csv
date,platform,community,url,title,type,status,score,comments,notes
2026-04-28,hackernews,,https://news.ycombinator.com/item?id=47931565,Show HN: VibeBrowser – Give your AI agent your real logged-in browser via MCP,show_hn,live,0,0,First Show HN. Monitor comments.
```

**Columns:**
- `date` — ISO date posted (YYYY-MM-DD)
- `platform` — `hackernews` | `reddit` | `twitter` | `devto` | `producthunt`
- `community` — subreddit name, or blank for HN/Twitter
- `url` — full post URL
- `title` — post title as submitted
- `type` — `show_hn` | `oc_post` | `reply` | `blog_share` | `thread_found`
- `status` — `live` | `pending` | `removed` | `draft`
- `score` — upvotes/points at last check (update periodically)
- `comments` — comment count at last check
- `notes` — anything relevant (angle used, response quality, follow-up needed)

---

## Platform rules

See `references/platforms.md` for full per-platform guidelines.

**Quick rules:**
- HN: "Show HN" for new tools. Technical, honest, no marketing speak. Reply to every comment.
- Reddit: Educational > promotional. Share blog posts over product pages. One post per sub, days apart.
- X/Twitter: Thread format. Lead with the insight ("You're paying Browserbase $150/mo for stealth you don't need"), end with product link.
- Never cross-post the same text verbatim. Each platform needs its own voice.
