# Research Notes (2026-03-13)

This file captures current source-backed guidance used by the `google-analytics` skill.

## Search Console Analysis
- Search Console Performance report supports comparing date ranges, pages, queries, and more to evaluate whether a change helped.
- "Average position" is an average and should not be treated as an exact per-query ranking.
- The freshest Performance data can be preliminary; prefer trend windows (28d/3m) over day-level reactions.

## Google Search Optimization
- Google emphasizes "helpful, reliable, people-first content" and recommends evaluating content through clear who/how/why signals.
- For AI features in Search, Google recommends using existing preview controls (`nosnippet`, `max-snippet`, `data-nosnippet`) to limit how content appears.
- For conflicting robots/meta directives, the more restrictive rule applies.

## LLM Crawler Access
- OpenAI documents crawler controls in `robots.txt` and references `OAI-SearchBot`, `GPTBot`, and `ChatGPT-User`.
- Anthropic provides crawler control via `User-agent: ClaudeBot` and supports `Crawl-delay` examples.
- Perplexity documents separate agents (`PerplexityBot`, `Perplexity-User`) with robots controls.

## Indexing and Discovery
- IndexNow remains valid for search engines that support it; successful submission returns HTTP 200.
- `llms.txt` is currently best treated as supplemental/experimental discoverability metadata, not a substitute for standard SEO signals.

## `/blog` Decision Heuristic
- A blog helps when it produces genuinely useful, original, maintainable content mapped to specific user intents and internal product journeys.
- A low-quality or inconsistent blog can dilute crawl budget and content quality signals.

## Sources
- https://support.google.com/webmasters/answer/7576553?hl=en
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag
- https://developers.openai.com/api/docs/bots/
- https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- https://www.indexnow.org/documentation?hl=en
- https://llmstxt.org/
- https://developers.google.com/search/docs/llms.txt
