const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Mobile viewport
  await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });
  
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshots/mobile-home.png' });
  
  await page.goto('http://localhost:3000/copilot', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshots/mobile-copilot.png' });
  
  await page.goto('http://localhost:3000/enterprise', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'screenshots/mobile-enterprise.png' });
  
  await browser.close();
})();
