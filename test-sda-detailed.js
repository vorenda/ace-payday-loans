const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('\n🔍 Detailed /sda page analysis...\n');
  
  const consoleMessages = [];
  page.on('console', msg => {
    const msgType = msg.type();
    const msgText = msg.text();
    consoleMessages.push({ type: msgType, text: msgText });
    console.log('[CONSOLE ' + msgType + ']: ' + msgText);
  });
  
  page.on('pageerror', error => {
    console.log('[PAGE ERROR]: ' + error.message);
  });
  
  try {
    console.log('1. Navigating to page...');
    await page.goto('http://localhost:3000/sda', { waitUntil: 'networkidle' });
    
    // Take screenshot immediately
    await page.screenshot({ path: '/tmp/sda-initial.png' });
    console.log('   Initial screenshot: /tmp/sda-initial.png');
    
    // Check for loading indicator
    const hasLoadingIndicator = await page.locator('.lms-form-loading').count();
    console.log('2. Loading indicator visible: ' + (hasLoadingIndicator > 0));
    
    // Check for error message
    const hasError = await page.locator('.lms-form-error').count();
    console.log('3. Error message visible: ' + (hasError > 0));
    
    if (hasError > 0) {
      const errorText = await page.locator('.lms-form-error').textContent();
      console.log('   Error text: ' + errorText);
    }
    
    // Check for lms-form-container
    const hasContainer = await page.locator('.lms-form-container').count();
    console.log('4. LMS form container found: ' + (hasContainer > 0));
    
    if (hasContainer > 0) {
      const containerHTML = await page.evaluate(() => {
        const container = document.querySelector('.lms-form-container');
        if (container) {
          return {
            isEmpty: container.innerHTML.trim() === '',
            childrenCount: container.children.length,
            innerHTML: container.innerHTML.substring(0, 300)
          };
        }
        return null;
      });
      console.log('   Container is empty: ' + containerHTML?.isEmpty);
      console.log('   Children count: ' + containerHTML?.childrenCount);
      console.log('   HTML preview: ' + containerHTML?.innerHTML);
    }
    
    // Wait longer and check again
    console.log('\n5. Waiting 10 seconds for form to load...');
    await page.waitForTimeout(10000);
    
    await page.screenshot({ path: '/tmp/sda-after-wait.png', fullPage: true });
    console.log('   After-wait screenshot: /tmp/sda-after-wait.png');
    
    // Check again after wait
    const hasLoadingAfter = await page.locator('.lms-form-loading').count();
    const hasErrorAfter = await page.locator('.lms-form-error').count();
    const hasContainerAfter = await page.locator('.lms-form-container').count();
    
    console.log('6. After waiting:');
    console.log('   Loading indicator: ' + (hasLoadingAfter > 0));
    console.log('   Error message: ' + (hasErrorAfter > 0));
    console.log('   Form container: ' + (hasContainerAfter > 0));
    
    if (hasContainerAfter > 0) {
      const containerHTMLAfter = await page.evaluate(() => {
        const container = document.querySelector('.lms-form-container');
        if (container) {
          return {
            isEmpty: container.innerHTML.trim() === '',
            childrenCount: container.children.length,
            innerHTML: container.innerHTML
          };
        }
        return null;
      });
      console.log('   Container is empty: ' + containerHTMLAfter?.isEmpty);
      console.log('   Children count: ' + containerHTMLAfter?.childrenCount);
      console.log('   Full HTML:\n' + containerHTMLAfter?.innerHTML);
    }
    
    // Check localStorage
    const cacheData = await page.evaluate(() => {
      const cached = localStorage.getItem('lms_form_cache');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          return {
            hasCache: true,
            age: Date.now() - parsed.timestamp,
            htmlLength: parsed.html?.length || 0,
            htmlPreview: parsed.html?.substring(0, 200)
          };
        } catch (e) {
          return { hasCache: true, error: 'Failed to parse' };
        }
      }
      return { hasCache: false };
    });
    
    console.log('\n7. localStorage cache:');
    console.log(JSON.stringify(cacheData, null, 2));
    
    // Check all console errors
    const errors = consoleMessages.filter(m => m.type === 'error');
    if (errors.length > 0) {
      console.log('\n❌ Console Errors Found:');
      errors.forEach(err => console.log('   - ' + err.text));
    }
    
    console.log('\n🎯 FINAL VERDICT:');
    console.log('═══════════════════════════════════════');
    if (hasLoadingAfter > 0) {
      console.log('⚠️  Form is STUCK in LOADING state');
    } else if (hasErrorAfter > 0) {
      console.log('❌ Form ERROR displayed to user');
    } else if (hasContainerAfter > 0 && containerHTMLAfter?.isEmpty) {
      console.log('⚠️  Form container exists but is EMPTY');
    } else if (hasContainerAfter > 0 && !containerHTMLAfter?.isEmpty) {
      console.log('✅ Form HTML IS INJECTED into container!');
    } else {
      console.log('❌ No form container found at all');
    }
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Test failed: ' + error.message);
  } finally {
    await browser.close();
  }
})();
