# Product Page Testing Checklist

This document outlines the manual and automated testing procedures for the VibeBrowser product page after any modifications.

## Quick Automated Test

Run the automated layout test:

```bash
# Test against localhost (during development)
npm run dev &
sleep 5
node scripts/test-layout.js http://localhost:3000

# Test against production
node scripts/test-layout.js https://www.vibebrowser.app
```

## Manual Testing Checklist

### 1. Hero Section

- [ ] **Install Extension Button**
  - [ ] Main button opens Chrome Web Store: `https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado`
  - [ ] Chevron dropdown opens on click
  - [ ] "Chrome Web Store" option opens correct URL
  - [ ] "Developer Version" option opens: `https://docs.vibebrowser.app/getting-started/extension`
  - [ ] Dropdown closes when clicking outside
  - [ ] Chevron rotates when dropdown is open

- [ ] **Subscribe Button**
  - [ ] Opens subscribe dialog
  - [ ] Dialog shows 3 benefits (Developer Updates, Early Access, Promotion Credits)
  - [ ] Email input works
  - [ ] Submit button shows loading state
  - [ ] Success message appears after submission
  - [ ] Dialog closes after success

### 2. Navigation

- [ ] Logo links work
- [ ] "How It Works" anchor link scrolls to section
- [ ] "Demo" anchor link scrolls to section
- [ ] "Pricing" anchor link scrolls to section
- [ ] "Docs" link opens documentation site

### 3. Demo Section

- [ ] Video plays automatically
- [ ] Demo carousel navigation works (left/right arrows)
- [ ] Demo selector buttons switch videos
- [ ] Progress dots update correctly

### 4. Comparison Table

- [ ] Table renders correctly on desktop
- [ ] Table is scrollable on mobile
- [ ] All competitor columns visible

### 5. FAQ Section

- [ ] Accordion items expand/collapse
- [ ] Content displays correctly

### 6. Pricing Section

- [ ] All 3 pricing tiers display
- [ ] "Manage Subscription" button opens Stripe portal

### 7. Footer

- [ ] All links work:
  - [ ] Demo, Features, Roadmap, Pricing (anchor links)
  - [ ] Documentation link
  - [ ] Developer Install link
  - [ ] Privacy Policy
  - [ ] Terms of Service
  - [ ] Email link
  - [ ] LinkedIn link
  - [ ] X (Twitter) link

### 8. Responsive Design

Test at these breakpoints:
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

Check for:
- [ ] No horizontal scrollbar
- [ ] Text is readable
- [ ] Buttons are tappable
- [ ] Images scale correctly

### 9. Analytics & Tracking

- [ ] GA4 loads (check Network tab for google-analytics.com requests)
- [ ] PostHog loads (check Network tab for `us.i.posthog.com`, `/decide`, `/flags`, or `/e/` requests)
- [ ] Custom PostHog events fire on waitlist dialog open and successful signup
- [ ] Proxied PostHog traffic flows through first-party `/ingest/*` requests on deployed environments
- [ ] Install CTAs emit `cta_click` events for homepage and MCP page entry points
- [ ] Honeycomb telemetry routes return `202` after env vars are configured:
  ```bash
  curl -i -X POST http://localhost:3000/api/telemetry/events \
    -H 'Content-Type: application/json' \
    --data '{"eventName":"dialog_open","pathname":"/","properties":{"dialog_name":"waitlist_dialog"}}'
  ```
- [ ] Referral tracking works with UTM parameters:
  ```
  http://localhost:3000?utm_source=test&utm_medium=manual&utm_campaign=testing
  ```
- [ ] Subscribe captures referral data (check database after signup)
- [ ] Email inputs remain masked from session replay/autocapture

### 10. Performance

- [ ] Page loads in under 3 seconds
- [ ] No console errors
- [ ] Images are optimized (check Network tab)

## Pre-Deployment Checklist

Before deploying to production:

```bash
# 1. Build check
npm run build

# 2. Run automated tests
node scripts/test-layout.js http://localhost:3000

# 3. Test waitlist functionality
node scripts/test-waitlist.js

# 4. Deploy
vercel --prod --yes

# 5. Verify production
node scripts/test-layout.js https://www.vibebrowser.app
```

## Key URLs to Verify

| URL | Expected Destination |
|-----|---------------------|
| Chrome Web Store | `https://chromewebstore.google.com/detail/vibe-ai-browser-co-pilot/djodpgokbmobeclicaicnnidccoinado` |
| Developer Install | `https://docs.vibebrowser.app/getting-started/extension` |
| Documentation | `https://docs.vibebrowser.app` |
| Stripe Portal | `https://billing.stripe.com/p/login/...` |
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |

## Reporting Issues

If you find issues during testing:
1. Note the browser and viewport size
2. Take a screenshot
3. Check browser console for errors
4. Document steps to reproduce
