# Blog Authoring Knowledgebase

The blog is a markdown-backed App Router section at `/blog` and `/blog/[slug]`.

## Source Files

- Blog loader/parser: `lib/blog.ts`.
- Blog index renderer: `app/blog/page.tsx`.
- Blog post renderer: `app/blog/[slug]/page.tsx`.
- Blog social image helpers: `lib/blog-social-image.tsx`, `app/blog/opengraph-image.tsx`, `app/blog/twitter-image.tsx`, `app/blog/[slug]/opengraph-image.tsx`, and `app/blog/[slug]/twitter-image.tsx`.
- RSS feed: `app/rss.xml/route.ts`.
- Sitemap inclusion: `app/sitemap.ts`.

## Post Storage And Frontmatter

- Posts are expected as `.md` files in a root-level `blog/` directory.
- Slug is the markdown filename without `.md`.
- `lib/blog.ts` ignores missing `blog/` directories and unpublished posts.
- A post appears publicly only when `published: true` is set in frontmatter.

Supported frontmatter keys:

```yaml
---
title: "Post title"
description: "Concise SEO/social description"
date: "2026-05-15"
author: "Dzianis Vashchuk"
authorUrl: "https://linkedin.com/in/dzianisv"
tags:
  - AI browser automation
  - MCP
aliases:
  - old-slug
published: true
---
```

## Rendering Behavior

- Markdown is rendered with `marked` using GitHub-flavored markdown.
- Headings receive generated anchor ids from the raw heading text.
- Reading time is estimated at 220 words per minute.
- Posts are sorted newest-first by `date`.
- Aliases redirect from `/blog/<alias>` to `/blog/<canonical-slug>`.
- Related posts are selected by shared tags first, then recent fallback posts.

## SEO And Distribution

- `/blog` and each published post generate metadata, Open Graph, Twitter cards, structured data, sitemap entries, RSS entries, and `/llms.txt` references.
- Keep titles and descriptions specific to AI browser automation, MCP workflows, browser agents, model flexibility, local/private AI, or Vibe product updates.
- Prefer canonical URLs under `https://www.vibebrowser.app/blog/<slug>`.
- Use the `blog-hub` skill for full SEO/LLM optimization workflows.
