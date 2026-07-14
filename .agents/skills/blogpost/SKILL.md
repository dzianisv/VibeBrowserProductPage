---
name: blogpost
description: "Write or edit a general-purpose technical/news/timely blog post in the VibeBrowserProductPage repo (root `blog/*.md`), which publishes to BOTH vibebrowser.app and agentlabs.cc from one file. Use for any source-cited post that is NOT a sales/competitive-landscape piece (use blog-hub) and NOT an #ainativecompany series post (use blog-ainative). Prefer this over the global blogpost skill when working inside this repo, because it encodes the real frontmatter parser, dual-domain publishing, route-parity link rules, and validation commands. Triggers: draft/write/rewrite/review a blog post, technical announcement, news reaction, founder note, or timely research post for this repo."
---

# Blogpost (VibeBrowserProductPage)

Default post-writing skill for this repo. One markdown file, two live domains.

## Pick the right skill first

| Post type | Use |
|---|---|
| Sales / competitive-landscape / ICP-driven CTA (Comet, Atlas, Browserbase vs. Vibe) | `.agents/skills/blog-hub` |
| `#ainativecompany` series (running Vibe Technologies, required "What Does Not Work Yet" section, series index) | `.agents/skills/blog-ainative` |
| Any other technical, news, or timely source-cited post | **this skill** |
| Generic voice rules outside this repo | global `~/.agents/skills/blogpost` |

This skill is the general default. It reuses the global blogpost voice but replaces every generic assumption with this repo's real behavior below.

## How publishing actually works (verified in source)

Posts are markdown files in the **root `blog/` directory only**. There is no per-domain copy step. `shared/blog/repository.ts` (`createBlogRepository`) parses them with a custom lightweight frontmatter parser + `marked` (GFM). Both sites read the identical files:

- Root app: `lib/blog.ts` re-exports `@/shared/blog`; blog dir defaults to `process.cwd()/blog`.
- `apps/agentlabs`: `apps/agentlabs/lib/blog-directory.ts` sets `AGENTLABS_BLOG_DIRECTORY = path.resolve(currentDir, '../../../blog')` — the SAME root `blog/`.

One file → `vibebrowser.app/blog/<slug>` AND `agentlabs.cc/blog/<slug>`, automatically.

```
                 blog/<slug>.md   (single source of truth)
                        |
        createBlogRepository (shared/blog/repository.ts)
                 /                         \
   lib/blog.ts (root)          apps/agentlabs/lib/blog-directory.ts
        |                                   |
 www.vibebrowser.app/blog/<slug>     agentlabs.cc/blog/<slug>
```

**Canonical (real behavior):** each domain self-canonicalizes. `shared/blog/blog-post-page.tsx` sets `alternates.canonical` to `buildSiteUrl(config.siteUrl, ...)`, and `shared/blog/sites.ts` sets `vibebrowserBlogConfig.siteUrl = https://www.vibebrowser.app` and `agentlabsBlogConfig.siteUrl = https://agentlabs.cc`. There is NO cross-domain canonical — neither site points at the other. Do not assume a dedup strategy that isn't implemented.

## Route parity — the one rule that breaks links

Because every post also renders on agentlabs.cc, a root-relative link to a Vibe-only page 404s there. `apps/agentlabs/app/` only has: `aboutus`, `agentprobe`, `agentsdata`, `blog`, `computer-use-testing`, `llms.txt`, `marketdata`, `privacy`, `rss.xml`, `spark`, `terms`. The root `app/` has many more (`mcp`, `cloud`, `compare`, `cli`, `openclaw`, `pricing`, `install`, `uninstall`, `teams`, `enterprise`, `providers/ollama`, `opencode`, `section`, `tee`, profession pages…).

| Link target | How to write it |
|---|---|
| In BOTH trees: `/blog`, `/blog/<slug>`, `/aboutus`, `/privacy`, `/terms` | root-relative is safe |
| Vibe-only: `/mcp`, `/cloud`, `/compare`, `/cli`, `/openclaw`, `/pricing`, `/teams`, `/enterprise`, profession pages, etc. | absolute `https://www.vibebrowser.app/mcp` so it works on both domains |
| External | full absolute URL with `https://` |

When unsure whether a path exists in both, check `ls apps/agentlabs/app/` before linking root-relative.

## Frontmatter schema (exact parser support — do not invent fields)

The parser reads only these keys. Opening `---` must be the first line; block ends at `\n---\n`. Values are flat scalars; quotes are stripped. Lists (`tags`, `aliases`) accept either inline `tags: a, b, c` or `-` bullets. No nested YAML, no block scalars.

```yaml
---
title: "Exact headline — this is the <title> and H1"
description: "One sentence: who/what, what changed, why it matters"
date: "2026-07-13"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - openai-atlas
  - browser-automation
aliases:
  - old-slug-that-301s-here
published: true
---
```

| Key | Type | Behavior |
|---|---|---|
| `title` | string | Defaults to slug with dashes→spaces. Always set it. |
| `description` | string | Defaults `''`. Drives meta + social card. Always set it. |
| `date` | `YYYY-MM-DD` | Defaults `1970-01-01` (sorts to bottom). Effectively required. |
| `author` | string | Defaults `Dzianis Vashchuk`. |
| `authorUrl` | string | Defaults `https://linkedin.com/in/dzianisv`. |
| `tags` | string list | Drives related-post matching, RSS `<category>`, social-card chips. |
| `aliases` | string list | Old slugs that redirect (301) to this post. Use instead of renaming. |
| `published` | bool | Defaults `true` if omitted; set `false` to hide. Only publish switch — no draft folder. Always write `published: true` explicitly. |

**File naming:** slug = filename minus `.md`, and it is the permanent URL. Renaming changes the URL — add an `aliases` entry instead of renaming. Use `YYYY-MM-DD-slug.md` (best practice, matches most of `blog/` and the `blog-ainative` convention). Not enforced by the parser — a few undated slugs exist — but prefer the dated form.

## Rendering facts (verified)

- Markdown → HTML via `marked` with GFM.
- Headings get slugified anchor ids from raw heading text. In-post TOC `#anchor` links must match the slugified heading.
- Reading time = words / 220, rounded up.
- Posts sorted newest-first by `date`.
- Related posts: shared `tags` first, then recency fallback.
- **No Mermaid.** The renderer is plain `marked` — no Mermaid plugin is registered anywhere in `shared/blog/repository.ts`. A ```mermaid fence renders as an inert code block, not a diagram. Use ASCII diagrams in fenced code blocks — the only reliable diagram option.

## Distribution — automatic once `published: true`

`/blog` index, `/blog/<slug>`, `/sitemap.xml` (`app/sitemap.ts`), `/rss.xml` (`app/rss.xml/route.ts`, wraps `post.html` in CDATA, tags → `<category>`), `/llms.txt` (`app/llms.txt/route.ts`, latest 15 posts), and social cards via `lib/blog-social-image.tsx` (`app/blog/opengraph-image.tsx`, `.../twitter-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, `.../twitter-image.tsx`). No manual image needed — the default card auto-generates from title/description/tags. `apps/agentlabs` has its own parallel `sitemap.ts`, `rss.xml/route.ts`, `llms.txt/route.ts`, and social-image options, all reading the same shared repository.

## Voice and structure (hard defaults)

- **Short.** 450–750 words. Exceed only when verified evidence genuinely requires it.
- **Technical, plain English.** Explain it so the author's mom could follow it. Define acronyms on first use.
- **No fluff.** No filler intros ("In this post we will…"), no motivational lines, no hype words (`game-changer`, `revolutionize`, `seamless`, `unlock`, `robust` as filler).
- **Numbers first.** Exact dates, counts, costs, %, durations, benchmark results — only when verified from a real source. Never invent a number.
- **Visually readable.** Short sections, short paragraphs, useful tables, compact numbered lists, ASCII flow diagrams where they clarify architecture (never Mermaid).
- Include **at least one** visual structure (table, timeline, decision matrix, or ASCII diagram) when the topic naturally supports it. Don't force decoration onto posts that don't need it.
- **Reader value first**, product mention light and near the end.
- Headings that state the point directly.

## Evidence rules

- Every external factual claim needs an inline URL.
- Every technical claim about an owned product (VibeBrowser / AgentLabs internals) requires reading/tracing the actual implementation source **before** writing — file:line, not memory or a summary. If you cannot cite it, do not assert it.
- If you have no measurement, write "we haven't measured this yet" rather than implying certainty.

## Structure skeleton

1. Concrete problem or the news, dated ("As of July 13, 2026…").
2. The simple idea / what changed.
3. How it works — real detail, table or ASCII diagram if it clarifies.
4. Trade-offs or options.
5. Recommended path.
6. Short product tie-in (light, near the end).

## SEO

Keep the main keyword in the title if natural; write one clear `description`; use related terms in prose, not stuffing. Don't re-specify SEO depth here — run the dedicated skills:

- `~/.agents/skills/ai-seo` — keyword / LLM-citation optimization.
- `~/.agents/skills/seo-audit` — check and fix SEO issues.

## Validate (only existing scripts)

```bash
npm run build   # next build — the real parser check. generateStaticParams reads every blog/*.md
                # through the same frontmatter parser and fails loudly on malformed input.
npm run lint    # eslint
npm run dev     # preview http://localhost:3000/blog/<slug>
```

No blog-only test script and no typecheck script exist — do not invent one, do not add mock/unit tooling. `apps/agentlabs` has its own `package.json` with the same `build`/`lint`/`dev`; validate its render with:

```bash
cd apps/agentlabs && npm run lint && npm run build
```

## Publish checklist

- [ ] File is `blog/YYYY-MM-DD-slug.md`; slug is final (URL is permanent).
- [ ] Frontmatter parses: first line `---`, flat scalars, `published: true`, `date` set, `title` + `description` set, `tags` present.
- [ ] 450–750 words unless evidence justifies more.
- [ ] Every external claim has an inline URL; every owned-product claim was traced in source (file:line).
- [ ] ≥1 table / ASCII diagram when the topic supports it. No Mermaid.
- [ ] Root-relative links only to `/blog`, `/blog/<slug>`, `/aboutus`, `/privacy`, `/terms`; Vibe-only pages use `https://www.vibebrowser.app/...`.
- [ ] In-post `#anchor` links match slugified headings.
- [ ] Product mention light and near the end.
- [ ] SEO pass via `ai-seo` / `seo-audit`.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Renders on `http://localhost:3000/blog/<slug>` and `cd apps/agentlabs && npm run lint && npm run build` passes.

## Reusable template

```markdown
---
title: "Headline that states the point"
description: "One sentence: who/what, what changed, why it matters."
date: "YYYY-MM-DD"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - primary-topic
  - secondary-topic
published: true
---

One-paragraph plain-English summary. What happened and why it matters, in 2–4
sentences, no jargon.

## The problem
Specific, dated. Include real numbers where verified (link the source).

## What changed / how it works
Real detail. Table or ASCII diagram if it clarifies. No Mermaid.

## Trade-offs
Compact comparison — table or short numbered list.

## What this means
The practical takeaway for the reader.

Light product tie-in near the end, linking absolute for Vibe-only pages:
https://www.vibebrowser.app/mcp
```
