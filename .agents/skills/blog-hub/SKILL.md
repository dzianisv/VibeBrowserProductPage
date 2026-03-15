---
name: blog-hub
description: Write, optimize, validate, and publish Vibe blog posts using canonical product sources, with clear steps for placement in /blog, compilation, SEO/LLM optimization, and production publishing.
---

# Blog Hub Skill

## Purpose
Create high-conviction, sales-optimized blog posts for Vibe that are technically accurate, source-backed, SEO-strong, and publishable in the current Next.js product page repo.

## Canonical Product Sources (read first)
- Product truth + positioning:
  - `product/docs/product.md`
  - `landing-page.tsx`
  - `app/compare/page.tsx` (first-party competitor sources list)
- Technical capabilities and docs:
  - `README.md`
  - `app/mcp/page.tsx`
  - `components/*` related to workflow features
- Existing messaging corpus:
  - `product/docs/*.md`
  - `blog/*.md`

Do not invent capabilities. If a claim is not in canonical sources, either remove it or mark it as market context with an external citation.

## Where Blog Posts Live
- Source files: `blog/<slug>.md`
- Required frontmatter:

```yaml
---
title: "..."
description: "..."
date: "YYYY-MM-DD"
author: "..."
tags:
  - tag1
  - tag2
published: true
---
```

- Published routes:
  - `/blog` (index)
  - `/blog/<slug>` (article)

## Authoring Workflow
1. Choose one buyer-facing problem statement.
2. Map competitor claims to first-party sources.
3. Extract the core friction points from competitor workflows.
4. Explain how Vibe resolves those frictions (without overclaiming).
5. Add a commercial CTA tied to one specific next action.
6. Add references section with source URLs.

## Sales Optimization Rules
- Write for an ICP, not "everyone" (e.g., RevOps lead, founder, recruiter, analyst).
- Use this sequence:
  - Problem cost in real workflow terms
  - Why current solutions break
  - Why Vibe architecture changes outcomes
  - Proof signals
  - CTA
- Quantify impact only when evidence exists.
- Prefer concrete examples over abstract adjectives.
- Keep one conversion objective per post.

## SEO + LLM Optimization Rules
- Primary keyword in:
  - title
  - first 120 words
  - one H2
  - meta description
- Add entity-rich headings (products, use cases, categories).
- Include a references section with authoritative links.
- Use concise, factual paragraphs for easier citation by LLM systems.
- Avoid snippet-blocking controls (`nosnippet`/overly low `max-snippet`) on blog pages unless explicitly required.

## Compilation + Validation
Run before publishing:

```bash
npm run build
```

For local preview:

```bash
npm run dev
# then open /blog and /blog/<slug>
```

Validation checklist:
- Post appears on `/blog`
- Post route resolves without 404
- Metadata rendered (title/description/canonical)
- Sitemap includes `/blog` and `/blog/<slug>`
- References links are valid

## Publishing
1. Commit blog + supporting route/SEO updates.
2. Deploy:

```bash
vercel --prod
```

3. Verify production page + indexing surface:
- `https://www.vibebrowser.app/blog`
- `https://www.vibebrowser.app/blog/<slug>`
- `https://www.vibebrowser.app/sitemap.xml`

4. Request indexing in Search Console for new URL.

## Special Playbook: "State of AI Browser Solutions"
When writing competitive landscape posts (Comet, Atlas, Composite, Strawberry):
- Use explicit date in intro: "As of <Month Day, Year>".
- Separate each product into:
  - What it does well
  - Where teams hit friction
- Close with "What this means for buyers" and "Why Vibe".
- Keep tone analytical, not tribal.

## Output Contract
Return:
1. The markdown blog post file path.
2. Any route/sitemap/nav updates made.
3. Build/test commands run + results.
4. Production publish commands used.
