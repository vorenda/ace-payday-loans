const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  page.on('console', msg => {
    const msgType = msg.type();
    const msgText = msg.text();
    consoleMessages.push({ type: msgType, text: msgText });
    console.log('[CONSOLE ' + msgType + ']: ' + msgText);
  });
  
  // Capture page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
    console.log('[PAGE ERROR]: ' + error.message);
  });
  
  console.log('\n🔍 Testing /sda page form loading...\n');
  
  try {
    // Navigate to the page
    console.log('1. Navigating to http://localhost:3000/sda...');
    await page.goto('http://localhost:3000/sda', { waitUntil: 'networkidle' });
    
    // Wait up to 10 seconds for the form to load
    console.log('2. Waiting up to 10 seconds for form to load...');
    await page.waitForTimeout(10000);
    
    // Take screenshot
    console.log('3. Taking screenshot...');
    await page.screenshot({ path: '/tmp/sda-form-test.png', fullPage: true });
    console.log('   Screenshot saved to /tmp/sda-form-test.png');
    
    // Check if EmbeddedForm is defined
    console.log('4. Checking if window.EmbeddedForm is defined...');
    const embeddedFormExists = await page.evaluate(() => {
      return typeof window.EmbeddedForm !== 'undefined';
    });
    console.log('   window.EmbeddedForm defined: ' + embeddedFormExists);
    
    // Check if form container exists
    console.log('5. Checking for form container...');
    const containerExists = await page.locator('#embedded-form-container').count();
    console.log('   Form container found: ' + (containerExists > 0));
    
    // Check if form has content inside container
    console.log('6. Checking if form has rendered inside container...');
    const containerContent = await page.evaluate(() => {
      const container = document.getElementById('embedded-form-container');
      if (!container) return null;
      return {
        hasChildren: container.children.length > 0,
        childrenCount: container.children.length,
        innerHTML: container.innerHTML.substring(0, 200)
      };
    });
    console.log('   Container has children: ' + containerContent?.hasChildren);
    console.log('   Children count: ' + containerContent?.childrenCount);
    console.log('   Container content preview: ' + containerContent?.innerHTML);
    
    // Check for specific form elements
    console.log('7. Checking for form elements...');
    const formElementsCount = await page.locator('#embedded-form-container form').count();
    const inputsCount = await page.locator('#embedded-form-container input').count();
    const buttonsCount = await page.locator('#embedded-form-container button').count();
    console.log('   Forms found: ' + formElementsCount);
    console.log('   Inputs found: ' + inputsCount);
    console.log('   Buttons found: ' + buttonsCount);
    
    // Summary
    console.log('\n📊 SUMMARY:');
    console.log('═══════════════════════════════════════');
    console.log('✓ Page loaded successfully');
    console.log('✓ EmbeddedForm script: ' + (embeddedFormExists ? '✅ LOADED' : '❌ NOT LOADED'));
    console.log('✓ Form container: ' + (containerExists > 0 ? '✅ FOUND' : '❌ NOT FOUND'));
    console.log('✓ Form rendered: ' + (containerContent?.hasChildren ? '✅ YES' : '❌ NO'));
    console.log('✓ Form elements: ' + (formElementsCount > 0 ? '✅ FOUND' : '❌ NOT FOUND'));
    console.log('✓ Console errors: ' + consoleMessages.filter(m => m.type === 'error').length);
    console.log('✓ Page errors: ' + pageErrors.length);
    
    if (consoleMessages.filter(m => m.type === 'error').length > 0) {
      console.log('\n⚠️  Console Errors:');
      consoleMessages.filter(m => m.type === 'error').forEach(msg => {
        console.log('   - ' + msg.text);
      });
    }
    
    if (pageErrors.length > 0) {
      console.log('\n❌ Page Errors:');
      pageErrors.forEach(err => {
        console.log('   - ' + err);
      });
    }
    
    // Final verdict
    console.log('\n🎯 VERDICT:');
    if (embeddedFormExists && containerContent?.hasChildren && formElementsCount > 0) {
      console.log('✅ FORM IS RENDERING CORRECTLY!');
    } else if (embeddedFormExists && !containerContent?.hasChildren) {
      console.log('⚠️  EmbeddedForm script loaded but form not rendering in container');
    } else if (!embeddedFormExists) {
      console.log('❌ EmbeddedForm script failed to load');
    } else {
      console.log('❌ FORM IS NOT RENDERING CORRECTLY');
    }
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Test failed: ' + error.message);
  } finally {
    await browser.close();
  }
})();
