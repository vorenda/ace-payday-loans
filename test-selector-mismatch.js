const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('[CONSOLE]: ' + msg.text()));
  
  try {
    await page.goto('http://localhost:3000/sda', { waitUntil: 'networkidle' });
    await page.waitForTimeout(10000);
    
    const elementCheck = await page.evaluate(() => {
      return {
        hasFormContent: document.querySelector('#form-content') !== null,
        hasJsform: document.querySelector('#jsform') !== null,
        embeddedFormLoaded: typeof window.EmbeddedForm !== 'undefined'
      };
    });
    
    console.log('\n🔍 SELECTOR MISMATCH DIAGNOSIS:');
    console.log('═══════════════════════════════════════');
    console.log('EmbeddedForm script loaded: ' + elementCheck.embeddedFormLoaded);
    console.log('Script is looking for: #form-content');
    console.log('#form-content exists: ' + elementCheck.hasFormContent);
    console.log('#jsform exists: ' + elementCheck.hasJsform);
    console.log('═══════════════════════════════════════');
    console.log('\n🎯 ROOT CAUSE:');
    console.log('The init script wants to inject into #form-content,');
    console.log('but the HTML only has #jsform!');
    console.log('This is why the form is not rendering.\n');
    
    await page.screenshot({ path: '/tmp/sda-selector-mismatch.png', fullPage: true });
    
  } catch (error) {
    console.error('Error: ' + error.message);
  } finally {
    await browser.close();
  }
})();
