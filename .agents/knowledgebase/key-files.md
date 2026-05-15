# Key Files And Responsibilities

## Global App Shell

- `app/layout.tsx`: global metadata, fonts, JSON-LD, RSS discovery, analytics, web vitals, and referral tracking.
- `app/globals.css`: Tailwind base and global styles.
- `next.config.mjs`: redirects and PostHog proxy rewrites.
- `instrumentation-client.ts`: client-side PostHog bootstrap.
- `instrumentation.ts`: server instrumentation entrypoint.

## Main Pages And Templates

- `app/page.tsx`: homepage metadata and structured data, renders `landing-page.tsx`.
- `landing-page.tsx`: primary homepage content, sections, pricing, FAQ, and CTAs.
- `components/profession-template.tsx`: shared template for most persona/profession landing pages.
- `components/enterprise-template.tsx`: shared template for enterprise and teams pages.
- `components/site-nav.tsx`: top navigation, persona dropdown, dark/light page handling.
- `components/site-footer.tsx`: footer links, resource links, legal/contact links, mailing-list embed.

## Forms, Analytics, And Data

- `components/waitlist-dialog.tsx`: primary waitlist modal.
- `components/waitlist-dialog-incognito.tsx`: enterprise/dark-themed waitlist modal.
- `components/mailing-list-subscribe.tsx`: footer/newsletter form.
- `actions/waitlist-supabase.ts`: current Supabase waitlist CRUD, CSV export, Brevo sync, Resend notifications.
- `actions/waitlist.ts`: legacy Neon waitlist path; avoid using unless intentionally reviving legacy behavior.
- `components/google-analytics.tsx`: shared event tracking helper for GA4, PostHog, and telemetry route.
- `components/referral-tracker.tsx`: UTM/referrer capture.
- `lib/referral-tracking.ts`: referral storage and helper logic.

## SEO, Feeds, And Discovery

- `app/sitemap.ts`: sitemap builder for static, persona, legal, and blog pages.
- `app/robots.ts`: robots policy; note Cloudflare AI crawler blocking can override app rules at the CDN edge.
- `app/llms.txt/route.ts`: LLM-readable product summary and canonical URL list.
- `app/rss.xml/route.ts`: RSS feed for published blog posts.
- `lib/blog.ts`: markdown blog parser, frontmatter parser, alias resolution, related-post selection.

## Product And Marketing References

- `product/docs/product.md`: concise product/company positioning and competitive notes.
- `copy-paste-marketing.md`: marketing copy snippets.
- `cws-listing-copy.md`: Chrome Web Store listing copy.
- `growth.md` and `growth-report-*.md`: growth strategy and campaign history.
- `.opencode/skills/vibe-marketing/SKILL.md`: product messaging skill.
