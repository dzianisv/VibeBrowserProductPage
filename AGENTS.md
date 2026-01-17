# VibeBrowser Product

@./ - product next.js webapp
@./product/docs - marketing/product documentation about the Vibe AI Browser Co-Pilot
@./product/webstore - documentation and assets for publishing to webstore

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

## Troubleshooting

### Waitlist not working?
1. Check env vars: `vercel env ls`
2. Check logs: `vercel logs`
3. Test database: `node scripts/test-waitlist.js`

### Layout broken?
1. Run: `node scripts/test-layout.js`
2. Check screenshots in `screenshots/` folder
3. Validate responsive: Test at 375px, 768px, 1920px widths



