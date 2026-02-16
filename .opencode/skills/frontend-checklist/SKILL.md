---
name: frontend-checklist
description: Comprehensive frontend production-readiness and SEO checklist for Next.js websites. Covers technical SEO, meta tags, structured data, accessibility, performance, link verification, and deployment validation.
license: MIT
compatibility: opencode
metadata:
  audience: engineering
  workflow: quality-assurance
---

# Frontend Production-Readiness & SEO Checklist

Use this checklist when reviewing or shipping any page on a Next.js App Router website. Work through each section systematically and mark items as done.

---

## 1. SEO — Meta Tags & Metadata

For every `page.tsx` or `layout.tsx` that defines a route:

- [ ] **Title** — unique, descriptive, 50-60 characters, includes primary keyword
- [ ] **Description** — unique, compelling, 150-160 characters, includes call-to-action
- [ ] **Keywords** — array of 8-15 relevant terms (branded + non-branded)
- [ ] **Canonical URL** — set via `alternates.canonical`, points to `https://www.` version
- [ ] **Open Graph tags** — `og:title`, `og:description`, `og:image` (1200x630px), `og:url`, `og:type`, `og:site_name`
- [ ] **Twitter/X tags** — `twitter:card` (summary_large_image), `twitter:site`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] **Robots** — `index, follow` for public pages; `noindex` for admin/internal pages

### Next.js App Router pattern
```typescript
// In layout.tsx or page.tsx
export const metadata: Metadata = {
  title: 'Page Title — Brand',
  description: 'Compelling description under 160 chars.',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  alternates: { canonical: 'https://www.example.com/page' },
  openGraph: {
    title: 'Page Title',
    description: 'OG description',
    url: 'https://www.example.com/page',
    siteName: 'Brand',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Description' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@handle',
    creator: '@handle',
    title: 'Page Title',
    description: 'Twitter description',
    images: ['/og-image.png'],
  },
};
```

---

## 2. SEO — Structured Data (JSON-LD)

- [ ] **Organization schema** — on homepage or root layout (name, url, logo, sameAs for social profiles)
- [ ] **WebSite schema** — on homepage (url, name, potentialAction for search)
- [ ] **Product/SoftwareApplication schema** — on product pages (name, description, offers, operatingSystem, applicationCategory)
- [ ] **Article schema** — on blog/use-case pages (headline, datePublished, dateModified, author, image)
- [ ] **FAQPage schema** — on pages with FAQ sections
- [ ] **BreadcrumbList schema** — on nested pages
- [ ] **No fake data** — never include fake `aggregateRating`, review counts, or pricing that doesn't exist
- [ ] **Validate** — test at https://validator.schema.org/ and https://search.google.com/test/rich-results

### JSON-LD pattern for Next.js
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Product Name',
    url: 'https://www.example.com',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    description: 'Product description',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@type': 'Organization', name: 'Company', url: 'https://www.example.com' },
  }) }}
/>
```

---

## 3. SEO — Technical Files

- [ ] **sitemap.xml** — lists all public routes, no redirected/dead URLs, correct `<lastmod>` dates
- [ ] **robots.txt** — allows crawling of public pages, disallows admin/api routes
- [ ] **llms.txt** — (optional) provides LLM-friendly summary of the site
- [ ] **manifest.json / site.webmanifest** — correct name, icons, theme color
- [ ] **favicon** — present in multiple sizes (16x16, 32x32, apple-touch-icon 180x180)

---

## 4. Navigation & Header Consistency

- [ ] **Every page has navigation** — no orphan pages without a way to navigate back
- [ ] **Consistent nav links** — same set of links in the same order across all pages
- [ ] **Logo links to homepage** — clicking the logo always goes to `/`
- [ ] **Mobile navigation** — hamburger menu works, all links accessible
- [ ] **Active state** — current page is visually indicated in navigation
- [ ] **Shared component** — use a single `SiteNav` or `Header` component imported across pages

---

## 5. Links & CTAs

### Internal links
- [ ] All internal links point to valid routes (no 404s)
- [ ] No links to redirect-only routes (e.g., `/v2` if it redirects to `/enterprise`)
- [ ] Anchor links (`#section`) scroll to the correct element

### External links
- [ ] All external links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] All external links return 200 (or expected 403 from bot-blocking sites like LinkedIn, OpenAI)
- [ ] Chrome Web Store extension link is correct and live

### CTA verification
- [ ] Waitlist/signup dialog opens and submits correctly
- [ ] Email subscribe form works (check network request to backend)
- [ ] "Request Demo" mailto links have correct email addresses
- [ ] "Install Extension" buttons link to correct Chrome Web Store URL
- [ ] "Manage Subscription" links to correct Stripe billing portal

### Contact information
- [ ] Email addresses are consistent with page context (e.g., `enterprise@` on enterprise page)
- [ ] All `mailto:` links match the displayed email text
- [ ] Social media links (LinkedIn, Twitter/X, Telegram, GitHub) are correct and live

---

## 6. Link Verification Script

Run this to batch-check all URLs:

```bash
#!/bin/bash
# Save as scripts/check-links.sh
urls=(
  "https://www.example.com"
  "https://www.example.com/page1"
  "https://www.example.com/page2"
  # Add all routes and external URLs
)

echo "Checking ${#urls[@]} URLs..."
failed=0
for u in "${urls[@]}"; do
  http_code=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 15 -A "Mozilla/5.0" "$u" 2>/dev/null)
  if [ "$http_code" -ge 400 ] && [ "$http_code" -ne 403 ]; then
    echo "FAIL $http_code $u"
    failed=$((failed + 1))
  else
    echo "OK   $http_code $u"
  fi
done
echo ""
echo "Done. $failed failures out of ${#urls[@]} URLs."
```

Note: 403 from LinkedIn, OpenAI, npm, and Perplexity is expected (bot blocking). Verify these manually in a browser.

---

## 7. Performance & Core Web Vitals

- [ ] **Lighthouse score** — run `npx lighthouse https://www.example.com --output html` for each key page
- [ ] **LCP (Largest Contentful Paint)** — under 2.5s
- [ ] **FID/INP (Interaction to Next Paint)** — under 200ms
- [ ] **CLS (Cumulative Layout Shift)** — under 0.1
- [ ] **Image optimization** — use `next/image` with proper `width`/`height`, avoid `unoptimized: true` in production
- [ ] **Font optimization** — use `next/font` to self-host, avoid layout shift from font loading
- [ ] **Bundle size** — check `npm run build` output, ensure no page exceeds ~200KB first-load JS

---

## 8. Accessibility

- [ ] **Semantic HTML** — use `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- [ ] **Alt text** — all `<img>` tags have descriptive `alt` attributes
- [ ] **ARIA labels** — interactive elements have `aria-label` or `aria-labelledby`
- [ ] **Keyboard navigation** — all interactive elements are reachable via Tab key
- [ ] **Color contrast** — text meets WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large)
- [ ] **Focus indicators** — visible focus rings on all interactive elements
- [ ] **Skip to content** — link at top of page for keyboard users

---

## 9. Build & Deployment Checks

- [ ] **`npm run build` passes** — no TypeScript errors, no build failures
- [ ] **All routes generate** — check build output lists all expected routes
- [ ] **Environment variables** — all required env vars set in deployment platform
- [ ] **HTTPS** — site serves over HTTPS with valid certificate
- [ ] **www redirect** — non-www redirects to www (or vice versa, consistently)
- [ ] **Trailing slash** — consistent behavior (all with or all without)
- [ ] **404 page** — custom 404 page exists and is styled consistently

---

## 10. Analytics & Tracking

- [ ] **Google Analytics 4** — gtag installed, correct measurement ID
- [ ] **Google Search Console** — site verified, sitemap submitted
- [ ] **Conversion tracking** — key CTAs (waitlist signup, demo request) fire conversion events
- [ ] **No PII in analytics** — email addresses not sent to GA

---

## 11. Security

- [ ] **No secrets in client code** — API keys, database URLs not exposed in frontend bundles
- [ ] **CSP headers** — Content Security Policy configured (if applicable)
- [ ] **CORS** — API routes have appropriate CORS settings
- [ ] **Rate limiting** — form submission endpoints have rate limiting
- [ ] **Input validation** — server-side validation on all form inputs (email format, length limits)

---

## Workflow

1. **Before shipping a new page**: Run through sections 1-6 for that page
2. **Before a release**: Run through all sections for the entire site
3. **After deployment**: Run post-deploy verification (section 12)
4. **Monthly maintenance**: Re-run link verification (section 6) and Lighthouse (section 7)
5. **After any layout/component change**: Re-run build check (section 9) and spot-check navigation (section 4)

---

## 12. Post-Deploy Production Verification

After every production deployment, verify SEO assets and page availability are intact.

### Quick smoke test (all pages return 200)
```bash
#!/bin/bash
# Save as scripts/post-deploy-check.sh
# Usage: ./scripts/post-deploy-check.sh https://www.yourdomain.com

BASE_URL="${1:-https://www.vibebrowser.app}"
pages=(
  /
  /mcp
  /tee
  /enterprise
  /teams
  /aboutus
  /agentic-team
  /compare
  /use-cases
  /use-cases/financial-advisor-morningstar-schwab
  /use-cases/privacy-first-legal-research
  /use-cases/recruiter-linkedin-automation
  /privacy
  /terms
)

echo "Checking ${#pages[@]} pages on $BASE_URL..."
failed=0
for page in "${pages[@]}"; do
  code=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 15 "$BASE_URL$page")
  if [ "$code" -ge 400 ]; then
    echo "FAIL $code $page"
    failed=$((failed + 1))
  else
    echo "OK   $code $page"
  fi
done

# Check SEO files
for file in /sitemap.xml /robots.txt; do
  code=$(curl -o /dev/null -s -w "%{http_code}" -L --max-time 10 "$BASE_URL$file")
  echo "SEO  $code $file"
done

echo ""
echo "Done. $failed page failures out of ${#pages[@]}."
```

### SEO spot checks
```bash
BASE_URL="https://www.vibebrowser.app"

# Count JSON-LD blocks on homepage (should be > 0)
curl -s "$BASE_URL/" | grep -c 'application/ld+json'

# Verify no fake aggregateRating in JSON-LD
curl -s "$BASE_URL/" | grep -o 'aggregateRating' | wc -l
# Expected: 0

# Verify OG tags on a key page
curl -s "$BASE_URL/privacy" | grep -E 'og:title|og:description|twitter:card' | head -5

# Verify canonical URL on enterprise page
curl -s "$BASE_URL/enterprise" | grep 'canonical'
# Should contain: www.vibebrowser.app/enterprise

# Verify sitemap has no stale routes
curl -s "$BASE_URL/sitemap.xml" | grep -E '/v2|enterprise\.vibebrowser' | wc -l
# Expected: 0

# Check robots.txt for Cloudflare-injected rules
curl -s "$BASE_URL/robots.txt" | head -20
# Watch for Cloudflare rules that override your custom Allow/Disallow
```

### What to check after deploy
- [ ] All pages return 200 (run smoke test above)
- [ ] `sitemap.xml` returns 200 with correct URL count
- [ ] `robots.txt` returns 200 and references sitemap
- [ ] JSON-LD blocks present on homepage (no aggregateRating)
- [ ] OG/Twitter meta tags render on social share preview (test at https://www.opengraph.xyz/)
- [ ] Canonical URLs point to `https://www.` domain (not subdomains)
- [ ] No Cloudflare robots.txt conflicts blocking desired bots
