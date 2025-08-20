const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function testLayout() {
  console.log('🧪 Testing VibeBrowser Layout...\n');
  
  // Create screenshots directory
  const screenshotsDir = path.join(process.cwd(), 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  const browser = await puppeteer.launch({ 
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Test different viewports
    const viewports = [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];
    
    for (const viewport of viewports) {
      console.log(`Testing ${viewport.name} (${viewport.width}x${viewport.height})...`);
      await page.setViewport(viewport);
      
      // Load the page
      await page.goto('https://www.vibebrowser.app', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for content to load
      await page.waitForSelector('header', { timeout: 5000 });
      
      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${viewport.name}-${Date.now()}.png`);
      await page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);
      
      // Validate layout
      const validation = await page.evaluate(() => {
        const issues = [];
        const warnings = [];
        
        // Check critical elements
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const waitlistBtn = document.querySelector('button[aria-haspopup="dialog"]');
        
        if (!header) issues.push('Header element missing');
        if (!main) issues.push('Main content missing');
        if (!waitlistBtn) issues.push('Waitlist button not found');
        
        // Check for overlapping elements
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
          const rect = btn.getBoundingClientRect();
          if (rect.width === 0 || rect.height === 0) {
            warnings.push(`Button with zero dimensions: ${btn.textContent?.slice(0, 20)}`);
          }
        });
        
        // Check for text overflow
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(h => {
          if (h.scrollWidth > h.clientWidth) {
            warnings.push(`Text overflow in heading: ${h.textContent?.slice(0, 30)}`);
          }
        });
        
        // Check images
        const images = document.querySelectorAll('img');
        let brokenImages = 0;
        images.forEach(img => {
          if (!img.complete || img.naturalHeight === 0) {
            brokenImages++;
          }
        });
        if (brokenImages > 0) warnings.push(`${brokenImages} broken image(s)`);
        
        return { issues, warnings, stats: {
          buttons: buttons.length,
          images: images.length,
          headings: headings.length
        }};
      });
      
      // Report results
      if (validation.issues.length > 0) {
        console.error(`  ❌ Critical issues:`, validation.issues);
      } else {
        console.log(`  ✅ Layout structure OK`);
      }
      
      if (validation.warnings.length > 0) {
        console.warn(`  ⚠️  Warnings:`, validation.warnings);
      }
      
      console.log(`  📊 Stats: ${validation.stats.buttons} buttons, ${validation.stats.images} images, ${validation.stats.headings} headings\n`);
    }
    
    // Test waitlist functionality
    console.log('Testing waitlist dialog...');
    const page2 = await browser.newPage();
    await page2.setViewport({ width: 1920, height: 1080 });
    await page2.goto('https://www.vibebrowser.app', { waitUntil: 'networkidle2' });
    
    // Click waitlist button
    const waitlistButton = await page2.$('button[aria-haspopup="dialog"]');
    if (waitlistButton) {
      await waitlistButton.click();
      await page2.waitForTimeout(1000);
      
      // Check if dialog opened
      const dialogVisible = await page2.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        return dialog && window.getComputedStyle(dialog).display !== 'none';
      });
      
      if (dialogVisible) {
        console.log('✅ Waitlist dialog opens correctly');
        await page2.screenshot({ 
          path: path.join(screenshotsDir, `waitlist-dialog-${Date.now()}.png`)
        });
      } else {
        console.log('❌ Waitlist dialog did not open');
      }
    }
    
    console.log('\n✨ Layout testing complete!');
    console.log(`Screenshots saved in: ${screenshotsDir}`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testLayout().catch(console.error);