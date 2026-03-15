---
name: google-analytics
description: Analyze Search Console compare views for vibebrowser.app (especially 28 days vs previous, breakdown=page), convert findings into prioritized SEO + LLM optimization tasks, and decide when /blog investment is justified.
---

# Google Analytics + Search Console Skill

## Purpose
Use Google Search Console performance comparisons as the source of truth for SEO impact, then turn deltas into high-confidence technical/content actions for search engines and LLM crawlers.

## Primary Scope
- URL pattern:
  - `https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Avibebrowser.app&num_of_days=28&compare_date=PREV&breakdown=page`
- Property:
  - `sc-domain:vibebrowser.app`
- Compare mode:
  - `Last 28 days` vs `Previous 28 days`
- Breakdown:
  - `Pages` first, then `Queries`

## Inputs
- Search Console page-level compare table
- Search Console query-level compare table
- Indexing -> Pages report (`Why pages aren't indexed`)
- Current sitemap/canonical/robots/structured-data state in repo

## Procedure

### 1) Normalize the report state
1. Confirm property is `vibebrowser.app`.
2. Confirm filters are exactly:
   - Search type: `Web`
   - Date: `Compare last 28 days to previous period`
   - Breakdown: `Pages`
3. Capture top cards:
   - `Total clicks`
   - `Total impressions`
   - `Average CTR`
   - `Average position`
4. Capture "Last update" timestamp.

### 2) Build the delta summary
For each top metric, compute:
- Absolute delta = `last - previous`
- Percent delta = `(last - previous) / previous`

Interpretation rules:
- Clicks down + impressions down + position mostly stable -> likely demand decline (usually brand/query volume).
- Clicks down + impressions stable/up + CTR down -> likely title/snippet mismatch for current intent.
- Impressions up + clicks flat + position <= 10 -> snippet/offer mismatch; improve SERP promise and page intent alignment.
- Position worsened materially (>1 average spot on key pages) -> relevance/competition/internal linking issue.

### 3) Triage by page clusters
Create 4 clusters from `breakdown=page`:
1. Core commercial pages:
   - `/`, `/enterprise`, `/teams`, `/mcp`, `/compare`, profession pages.
2. Emerging discovery pages:
   - New or low-volume pages with impression growth.
3. Support/docs pages:
   - `docs.vibebrowser.app/*`.
4. Noise/low-intent pages:
   - High impressions but no realistic conversion path.

Prioritize by:
- Highest click loss on core pages first.
- Then high impression growth with near-zero CTR (quick wins).
- Then indexing blockers.

### 4) Validate indexability blockers
Open Indexing -> Pages and quantify:
- `Not found (404)`
- `Page with redirect`
- `Crawled - currently not indexed`

Actions:
- 404: remove stale internal links + sitemap entries, or restore useful targets.
- Redirect pages: keep redirects, but do not include redirect URLs in sitemap/canonicals.
- Crawled-not-indexed: improve uniqueness, tighten intent, add internal links from strong pages, and request indexing after updates.

### 5) Query-to-page alignment pass
Switch to `breakdown=query` for same date compare:
- Map top 20 queries to intended landing pages.
- If query intent does not match ranking page, add/adjust dedicated page.
- For brand terms with falling clicks:
  - tighten homepage/meta copy for "download", "browser", "co-pilot", "MCP", "Google Workspace automation".

### 6) SEO execution checklist (implementation order)
1. Fix broken indexability signals:
   - sitemap should contain only canonical 200 URLs.
   - no redirect-only or dead URLs in sitemap.
2. Refresh titles/meta on pages with high impressions + low CTR.
3. Add internal links from homepage and high-authority pages to pages with impression growth.
4. Expand schema only where truthful and maintained (SoftwareApplication, FAQ, Breadcrumb).
5. Submit updated sitemap in Search Console after deploy.

### 7) LLM discoverability checklist
1. Robots policy:
   - allow desired AI crawlers in `robots.txt` (GPTBot, OAI-SearchBot if used, ClaudeBot, PerplexityBot) while keeping abusive scrapers blocked.
2. Snippet controls:
   - avoid overly restrictive `nosnippet`/`max-snippet` values on pages where citation is desired.
3. Machine-readable structure:
   - stable H1/H2 hierarchy, short factual sections, FAQ blocks where valid.
4. Entity clarity:
   - consistent organization/product naming, sameAs links, clear product capability pages.
5. Optional `llms.txt`:
   - treat as supplemental discovery aid, not a ranking replacement for technical SEO.

### 8) Should we build `/blog`?
Decision rule:
- Build `/blog` only if you can sustain high-quality, intent-matched publishing cadence (minimum 2 strong posts/month for 3 months).
- Do not build `/blog` if content will be thin, generic, or sporadic.

When `/blog` is worth it:
- You need non-brand query growth.
- You have repeatable expert content:
  - real experiments
  - comparison benchmarks
  - implementation tutorials
  - postmortems with concrete data

When `/blog` is not worth it:
- Team cannot maintain quality/cadence.
- No distribution plan (internal links, newsletter, social, developer communities).
- Content duplicates landing page copy with little new value.

### 9) First 90-day blog plan (if approved)
1. Ship `/blog` index + article template + RSS.
2. Publish 6 posts:
   - 2 integration/tutorial
   - 2 benchmark/comparison
   - 2 use-case case studies
3. Every post must include:
   - one primary intent
   - one conversion path (CTA)
   - internal links to product pages
   - FAQ section only when meaningful
4. Review in Search Console every 28 days using this skill.

## Output Format
Return:
1. Top-metric deltas (clicks, impressions, CTR, position).
2. Top 5 page losers and top 5 impression gainers.
3. Indexing blockers with counts and fix list.
4. 2-week action plan (P0/P1/P2).
5. Blog decision: `YES` or `NO`, with reason and capacity assumption.

## References
- `references/research-notes-2026-03-13.md`
