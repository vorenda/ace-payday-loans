const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000/sda', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const cacheContent = await page.evaluate(() => {
      const cached = localStorage.getItem('lms_form_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        return parsed.html;
      }
      return null;
    });
    
    console.log('═══════════════════════════════════════');
    console.log('CACHED FORM HTML:');
    console.log('═══════════════════════════════════════');
    console.log(cacheContent);
    console.log('═══════════════════════════════════════');
    
  } catch (error) {
    console.error('Error: ' + error.message);
  } finally {
    await browser.close();
  }
})();
