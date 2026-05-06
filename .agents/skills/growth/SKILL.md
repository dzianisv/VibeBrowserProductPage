---
name: growth
description: Drive growth for VibeBrowser products. Use when asked to promote, post to Reddit/HN/X, find competitor complaint threads, reply to community discussions, update growth tracking files, run the daily growth routine, or check post performance. Triggers on "promote", "post to reddit", "show HN", "growth", "community post", "find threads", "check HN", "reply to", "daily routine", "track posts", "competitor search".
---

# VibeBrowser Growth

## Source of truth files (read first, update after)

| File | Purpose |
|---|---|
| `growth.md` | Strategy, positioning, channel status, post-mortems, TODO list |
| `growth.csv` | Per-post tracker — every thread created or replied to |
| `growth-daily.md` | Daily routine template + running log (update each day) |

**Always** read `growth.md` before posting. **Always** update `growth.csv` after every post or reply.

---

## Core positioning (internalize this)

- **Headline:** "90% cheaper than Browserbase — you don't need stealth mode to access your own accounts."
- **Wedge:** Browserbase/Browserless assume you're a bot pretending to be human. VibeBrowser users are already human — real sessions, no stealth tax.
- **Local-first:** Chrome extension is free, no account, works with Claude Code / Copilot / Codex / Gemini CLI via MCP (`npx @vibebrowser/mcp`).
- **Cloud option:** VibeBrowser Cloud = your real session deployed globally.
- **Never lead with features.** Lead with the user's pain: re-auth hell, billing traps, infra babysitting.

---

## Workflows

### Daily routine (run every day, ~20 min)
See `references/daily-routine.md` for the full step-by-step procedure.

Quick version:
1. Check analytics + HN thread
2. Run 3–5 competitor complaint searches (queries in `references/daily-routine.md`)
3. Answer 1 question in a target community — no product mention
4. Post 1 build-in-public update on X
5. Update `growth-daily.md` log entry for today

### Creating a new post
1. Read `growth.md` for current angles and TODO list
2. Check `growth.csv` — don't double-post to the same community
3. Check anti-ban rules: `references/anti-ban.md`
4. Write the post (platform guide: `references/platforms.md`)
5. Human reviews draft before submitting — never auto-post
6. Submit via vibebrowser MCP tools
7. Append to `growth.csv` immediately after posting
8. Update `growth.md` TODO list

### Finding & replying to competitor threads
1. Use the search queries in `references/daily-routine.md`
2. Navigate to each thread with vibebrowser MCP
3. Draft a reply that genuinely helps first; mention VibeBrowser only if it's the honest best answer
4. Human reviews draft before posting
5. Log in `growth.csv` with `type=reply`

### Updating post performance
- Check live posts in `growth.csv` (status=live)
- Navigate to each URL, capture current score + comment count
- Update the row in `growth.csv`
- If comments need replies, draft them and ask human to post

---

## growth.csv format

```csv
date,platform,community,url,title,type,status,score,comments,notes
```

- `type`: `show_hn` | `oc_post` | `reply` | `blog_share` | `reply_draft` | `thread_found`
- `status`: `live` | `ready_to_post` | `draft` | `removed` | `pending`
- Update `score` and `comments` at 1h, 24h, 7d checkpoints

---

## Platform quick rules

See `references/platforms.md` for full guides.

| Platform | Voice | Link to | Watch out for |
|---|---|---|---|
| HN | Technical, honest, humble | `/mcp` page or blog | No marketing language; reply to every comment |
| Reddit | Educational, community member | Blog post, not product page | Karma minimums; warm-up first (see anti-ban.md) |
| X/Twitter | Thread: insight → problem → built this → link | Homepage or /cloud | New account + promo link = instant ban |
| Discord | Conversational, helpful | Blog post or GitHub | Contribute first, promote after 1 week |
| Dev.to | Article cross-post | canonical → vibebrowser.app | Always set canonical URL |

---

## References

- `references/platforms.md` — per-platform posting guides (HN, Reddit subreddit matrix, X thread structure, Dev.to, Product Hunt)
- `references/anti-ban.md` — warm-up phases, per-platform karma rules, post-mortem lessons
- `references/daily-routine.md` — executable daily checklist with search queries and log format
