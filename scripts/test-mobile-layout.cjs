const puppeteer = require('puppeteer');

const routes = [
  '/',
  '/aboutus',
  '/blog',
  '/agentic-team',
  '/enterprise',
  '/teams',
  '/tee',
  '/amazon',
  '/developers'
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  
  console.log('Testing pages for mobile layout issues (width: 375px)...\n');
  
  for (const route of routes) {
    const url = `http://localhost:3000${route}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      const issues = await page.evaluate(() => {
        const errors = [];
        const warnings = [];
        
        // Check horizontal scroll / overflow
        if (document.documentElement.scrollWidth > window.innerWidth) {
          errors.push(`Page has horizontal scroll! scrollWidth: ${document.documentElement.scrollWidth}, innerWidth: ${window.innerWidth}`);
        }
        if (document.body.scrollWidth > window.innerWidth) {
          errors.push(`Body has horizontal scroll! scrollWidth: ${document.body.scrollWidth}, innerWidth: ${window.innerWidth}`);
        }
        
        // Check for elements that overflow the viewport
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'NOSCRIPT' || el.tagName === 'META') continue;
          
          const rect = el.getBoundingClientRect();
          if (rect.right > window.innerWidth && rect.width > 0 && rect.height > 0) {
            // Ignore some acceptable overflows like code blocks that have internal scroll
            const overflowX = window.getComputedStyle(el).overflowX;
            if (overflowX !== 'auto' && overflowX !== 'scroll' && overflowX !== 'hidden') {
              // Try to find a meaningful identifier for the element
              let identifier = el.tagName.toLowerCase();
              if (el.id) identifier += `#${el.id}`;
              if (el.className && typeof el.className === 'string') {
                const classes = el.className.split(' ').filter(c => c.trim().length > 0).join('.');
                if (classes) identifier += `.${classes}`;
              }
              
              const textContent = (el.textContent || '').substring(0, 30).trim();
              
              warnings.push(`Element wider than viewport: ${identifier} (Right: ${Math.round(rect.right)}, Viewport: ${window.innerWidth}) ${textContent ? `"${textContent}..."` : ''}`);
            }
          }
        }
        
        // Remove duplicate warnings for parent-child chains where both overflow
        return { errors, warnings: [...new Set(warnings)].slice(0, 10) }; // limit to 10 warnings
      });
      
      console.log(`[${route}]`);
      if (issues.errors.length === 0 && issues.warnings.length === 0) {
        console.log('  ✅ Looks good (No horizontal overflow detected)');
      } else {
        if (issues.errors.length > 0) {
          console.log('  ❌ ERRORS:');
          issues.errors.forEach(e => console.log(`     - ${e}`));
        }
        if (issues.warnings.length > 0) {
          console.log('  ⚠️ WARNINGS:');
          issues.warnings.forEach(w => console.log(`     - ${w}`));
        }
      }
      console.log('');
    } catch (e) {
      console.log(`[${route}] ❌ Failed to load: ${e.message}\n`);
    }
  }
  
  await browser.close();
})();
