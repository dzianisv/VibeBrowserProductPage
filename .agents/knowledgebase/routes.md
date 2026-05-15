# App Routes And Renderers

Most public pages live in the Next.js App Router under `app/` and inherit the root layout in `app/layout.tsx`.

## Core Routes

- `/` -> `app/page.tsx`, renders `landing-page.tsx`.
- `/aboutus` -> `app/aboutus/page.tsx`.
- `/blog` -> `app/blog/page.tsx`.
- `/blog/[slug]` -> `app/blog/[slug]/page.tsx`, backed by markdown posts loaded through `lib/blog.ts`.
- `/compare` -> `app/compare/page.tsx`.
- `/cloud` -> `app/cloud/page.tsx`.
- `/mcp` -> `app/mcp/page.tsx`.
- `/cli` -> `app/cli/page.tsx`.
- `/openclaw` -> `app/openclaw/page.tsx`.
- `/providers/ollama` -> `app/providers/ollama/page.tsx`.
- `/section` -> `app/section/page.tsx`.
- `/agentic-team` -> `app/agentic-team/page.tsx`.
- `/enterprise` -> `app/enterprise/page.tsx`.
- `/teams` -> `app/teams/page.tsx`.
- `/privacy` -> `app/privacy/page.tsx`.
- `/terms` -> `app/terms/page.tsx`.
- `/admin/waitlist` -> `app/admin/waitlist/page.tsx`.

## Persona And Profession Pages

- `/copilot` -> `app/copilot/page.tsx`.
- `/claude` -> `app/claude/page.tsx`.
- `/gemini` -> `app/gemini/page.tsx`.
- `/codex` -> `app/codex/page.tsx`.
- `/people` -> `app/people/page.tsx`.
- `/lawyers` -> `app/lawyers/page.tsx`.
- `/recruiters` -> `app/recruiters/page.tsx`.
- `/sales` -> `app/sales/page.tsx`.
- `/researchers` -> `app/researchers/page.tsx`.
- `/developers` -> `app/developers/page.tsx`.
- `/investors` -> `app/investors/page.tsx`.
- `/crypto` -> `app/crypto/page.tsx`.
- `/tax` -> `app/tax/page.tsx`.
- `/mobile` -> `app/mobile/page.tsx`.
- `/mom` -> `app/mom/page.tsx`.

## System And Feed Routes

- `/robots.txt` -> `app/robots.ts`.
- `/sitemap.xml` -> `app/sitemap.ts`.
- `/rss.xml` -> `app/rss.xml/route.ts`.
- `/llms.txt` -> `app/llms.txt/route.ts`.
- 404 -> `app/not-found.tsx`.

## Route Maintenance Checklist

- Add public pages to `app/sitemap.ts` when they should be indexed.
- Add persona pages to `components/site-nav.tsx` and `components/site-footer.tsx` when they belong in the "for" page lists.
- Add or update `layout.tsx`, `opengraph-image.tsx`, and `twitter-image.tsx` for page-specific metadata and social cards when needed.
- `products/agenticteam/page.tsx` is legacy/standalone and is not part of the active App Router tree.
