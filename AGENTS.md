# VibeBrowser Product

@./ - product next.js webapp
@./product/docs - marketing/product documentation about the Vibe AI Browser Co-Pilot
@./product/webstore - documentation and assets for publishing to webstore

## Git Identity

Before making any commits, configure git to use the repository owner's identity so that Vercel deployment checks pass (Vercel rejects commits from unrecognized emails):

```bash
git config user.name "Den"
git config user.email "2119348+dzianisv@users.noreply.github.com"
```

# Product Page

## Important References

- **Testing Checklist**: See @docs/testing.md for complete manual and automated testing procedures after any modifications.

## Quick Deploy & Test

### 1. Deploy to Vercel
```bash
# Link project (first time only)
vercel link

# Deploy to production
vercel --prod
```

### 2. Environment Variables
Required in Vercel dashboard:
- `SUPABASE_PROJECT_URL` - Your Supabase project URL
- `SUPABASE_API_KEY` - Supabase anon key

### 3. Database Setup
Run in Supabase SQL editor:
```bash
node scripts/create-table-pg.js
```

### 4. Test Deployment
```bash
# Test waitlist
node scripts/test-waitlist.js

# Validate layout with headless browser
npm install puppeteer
node scripts/test-layout.js
```

## Automated Layout Testing

### Headless Browser Validation
```javascript
// scripts/test-layout.js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Test production
  await page.goto('https://www.vibebrowser.app', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshots/production.png', fullPage: true });
  
  // Check for layout issues
  const errors = await page.evaluate(() => {
    const issues = [];
    // Check if main elements exist
    if (!document.querySelector('header')) issues.push('Header missing');
    if (!document.querySelector('button[aria-haspopup="dialog"]')) issues.push('Waitlist button missing');
    if (!document.querySelector('main')) issues.push('Main content missing');
    return issues;
  });
  
  if (errors.length) {
    console.error('❌ Layout issues:', errors);
  } else {
    console.log('✅ Layout validated successfully');
  }
  
  await browser.close();
})();
```

### Quick Commands
```bash
# Local development
npm run dev

# Build check
npm run build

# Deploy & test
vercel --prod && node scripts/test-layout.js
```

## Project Structure
```
/
├── app/              # Next.js app directory
├── components/       # React components
├── actions/          # Server actions (waitlist-supabase.ts)
├── scripts/          # Setup & test scripts
└── public/          # Static assets
```

## Page Tree (Routes -> Renderer)
```
/
├── /                          -> app/page.tsx (renders landing-page.tsx)
├── /aboutus                   -> app/aboutus/page.tsx (inline AboutUsPage)
├── /blog                      -> app/blog/page.tsx (blog index)
├── /blog/[slug]               -> app/blog/[slug]/page.tsx (markdown blog post renderer)
├── /admin/waitlist            -> app/admin/waitlist/page.tsx (waitlist admin UI)
├── /agentic-team              -> app/agentic-team/page.tsx (Slack demo page)
├── /amazon                    -> app/amazon/page.tsx (ProfessionTemplate)
├── /compare                   -> app/compare/page.tsx (ComparePage)
├── /copilot                   -> app/copilot/page.tsx (ProfessionTemplate for GitHub Copilot subscribers / non-engineers)
├── /crypto                    -> app/crypto/page.tsx (ProfessionTemplate)
├── /developers                -> app/developers/page.tsx (ProfessionTemplate)
├── /enterprise                -> app/enterprise/page.tsx (EnterpriseTemplate)
├── /investors                 -> app/investors/page.tsx (ProfessionTemplate)
├── /lawyers                   -> app/lawyers/page.tsx (ProfessionTemplate)
├── /mcp                       -> app/mcp/page.tsx (McpPage)
├── /people                    -> app/people/page.tsx (ProfessionTemplate)
├── /privacy                   -> app/privacy/page.tsx (renders privacy-policy.tsx)
├── /recruiters                -> app/recruiters/page.tsx (ProfessionTemplate)
├── /researchers               -> app/researchers/page.tsx (ProfessionTemplate)
├── /sales                     -> app/sales/page.tsx (ProfessionTemplate)
├── /tax                       -> app/tax/page.tsx (ProfessionTemplate)
├── /teams                     -> app/teams/page.tsx (EnterpriseTemplate)
├── /tee                       -> app/tee/page.tsx (TEE page)
└── /terms                     -> app/terms/page.tsx (renders terms-of-service.tsx)
```

System/SEO routes:
- `/robots.txt` -> `app/robots.ts`
- `/sitemap.xml` -> `app/sitemap.ts`
- `404` -> `app/not-found.tsx`

Not routed by Next.js app router (legacy/standalone):
- `products/agenticteam/page.tsx` (standalone Agentic Team page, not under `app/`)

## Key Files & Responsibilities
- `app/layout.tsx` - Global metadata, fonts, structured data, and mounts `GoogleAnalytics` + `ReferralTracker`.
- `app/globals.css` - Tailwind base and global styles.
- `app/sitemap.ts` - Sitemap builder and profession pages list.
- `lib/blog.ts` - Markdown blog loader/parser used by `/blog` and sitemap blog URLs.
- `app/copilot/page.tsx` - GitHub Copilot-for-people landing page using `ProfessionTemplate`.
- `landing-page.tsx` - Homepage content and sections (used by `app/page.tsx`).
- `privacy-policy.tsx` - Privacy policy page component (used by `app/privacy/page.tsx`).
- `terms-of-service.tsx` - Terms of service page component (used by `app/terms/page.tsx`).
- `actions/waitlist-supabase.ts` - Supabase waitlist CRUD, CSV export, Brevo sync, Resend notifications.
- `actions/waitlist.ts` - Legacy Neon-based waitlist (not used by current routes).
- `lib/referral-tracking.ts` - UTM/referrer capture + helpers for waitlist attribution.

## Custom Components (components/)
- `components/site-nav.tsx` - Top nav + profession dropdown and dark/light mode handling.
- `components/site-footer.tsx` - Footer links and mailing list embed.
- `components/profession-template.tsx` - Shared template for profession landing pages (amazon, sales, etc).
- `components/enterprise-template.tsx` - Shared template for enterprise/teams pages.
- `components/waitlist-dialog.tsx` - Primary waitlist modal (homepage).
- `components/waitlist-dialog-incognito.tsx` - Enterprise-styled waitlist modal (dark theme).
- `components/mailing-list-subscribe.tsx` - Footer mailing list form (Brevo only).
- `components/referral-tracker.tsx` - Captures referral/UTM data early in app.
- `components/google-analytics.tsx` - GA script + event helpers.
- `components/slack-demo.tsx` - Slack-style conversation UI used on `/agentic-team`.
- `components/horizontal-roadmap.tsx` - Homepage roadmap UI.
- `components/typewriter-effect.tsx` - Homepage rotating typewriter text.
- `components/ui/*.tsx` - Shadcn UI primitives (accordion, badge, button, card, dialog, input, label).

Unused/experimental components (no imports found as of 2026-02-26):
- `components/ai-first-homepage.tsx`
- `components/ai-reasoning-engine.tsx`
- `components/chatgpt-interface.tsx`
- `components/credential-management.tsx`
- `components/theme-provider.tsx`

## Adding New Profession Pages

When creating a new profession page (e.g., `/amazon`), update:

### 1. Navigation slider
Add to `components/site-nav.tsx`:
- `pageNames` object: `'/amazon': 'for Amazon Sellers',`
- `forPages` array: `{ href: '/amazon', label: 'Amazon' },`

### 2. Footer links
Add to `components/site-footer.tsx` in the "Vibe Co-Pilot for" section:
- `{ href: '/amazon', label: 'Amazon' },`

### 3. Sitemap
Add slug to `app/sitemap.ts` professionPages array

### 4. OG/Twitter images (optional)
Create `app/[slug]/opengraph-image.tsx` and `app/[slug]/twitter-image.tsx` for social sharing cards

## Troubleshooting

### Waitlist not working?
1. Check env vars: `vercel env ls`
2. Check logs: `vercel logs`
3. Test database: `node scripts/test-waitlist.js`

### Layout broken?
1. Run: `node scripts/test-layout.js`
2. Check screenshots in `screenshots/` folder
3. Validate responsive: Test at 375px, 768px, 1920px widths

## Playwriter Browser Automation Best Practices

When using the Playwriter MCP tool for browser automation:

### Do:
- **Single operations per call** - Execute one action at a time, don't chain multiple awaits
- **Use `page.evaluate()` for bulk DOM operations** - More reliable than multiple Playwright locator calls
- **Use short timeouts (5000ms)** for simple operations, longer (15000-20000ms) only for navigation
- **Check page state after each action** - Verify the action succeeded before proceeding
- **Use `{ force: true }` for stubborn clicks** - Some elements need forced clicks

### Don't:
- **Don't chain multiple `await locator.click()` calls** in one execute block - if one times out, all fail
- **Don't use aggressive timeouts** on complex forms - they cause cascading failures
- **Don't assume page context survives navigation** - Re-check URL and state after form submissions

### Example - Bad Pattern:
```javascript
// DON'T DO THIS - if any step times out, all fail
await page.locator('input1').fill('value1');
await page.locator('input2').fill('value2');
await page.locator('button').click();
```

### Example - Good Pattern:
```javascript
// DO THIS - use page.evaluate for multiple DOM operations
await page.evaluate(() => {
  document.querySelector('input1').value = 'value1';
  document.querySelector('input2').value = 'value2';
  document.querySelector('button').click();
});
```

### Handling Disconnections:
- If you get "No browser tabs are connected", ask user to click Playwriter extension icon
- **CRITICAL: NEVER call `playwriter_reset` when already disconnected** - it will NOT reconnect and wastes time
- **ONLY call `playwriter_reset`** when you have an active connection but need to refresh page/context state
- Disconnections usually happen from timeouts or page navigation, not from the tool itself
- When disconnected, STOP and ask user to reconnect - do NOT attempt any playwriter commands

### Avoiding Timeouts That Cause Disconnects:
- **NEVER use `page.waitForTimeout()`** - this is the #1 cause of disconnections
- **NEVER use long waits after form submissions** - if the page navigates during the wait, connection drops
- **Instead of waiting, immediately check state** - run `console.log('url:', page.url())` right after actions
- **Use `waitForPageLoad` sparingly** - only for initial navigation, not after button clicks

### Form Submissions That Redirect - CRITICAL:
- **Clicking submit buttons that cause page redirects WILL disconnect Playwriter**
- This is a fundamental limitation - the page context changes and connection is lost
- **For forms that redirect after submit**: Fill all fields, then ASK USER to click submit manually
- **After user submits manually**: Ask them to reconnect Playwriter, then continue
- Signs a form will redirect: signup forms, login forms, payment forms, multi-step wizards

### Embedded Forms (iframes) - CRITICAL:
- **NEVER navigate directly to iframe URLs** - Always interact through `page.frameLocator()` on the parent page
- **Embedded forms may silently redirect** - Pardot, HubSpot, Typeform iframes can redirect based on cookies/sessions
- **Always verify URL after filling fields** - Run `console.log('url:', page.url())` to confirm you're still on the expected page
- **Check for unexpected redirects** - If `page.evaluate()` returns data that doesn't match expected form structure, the page likely redirected

### Cross-Domain Navigation:
- **Avoid navigating between different domains** in the same tab - can break Playwriter connection
- **Open new tabs for different domain forms** instead of navigating away from current page
- **After any cross-domain navigation**, immediately check `page.url()` and page state
- **If a form redirects to unexpected domain**, do NOT try to navigate back - reset and start fresh on a new tab

### URL Verification Pattern:
```javascript
// ALWAYS do this after navigation or form interactions
console.log('url:', page.url());
// Verify URL matches expected before continuing
// If URL changed unexpectedly, STOP and reassess
```
