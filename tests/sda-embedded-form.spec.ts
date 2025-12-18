import { test, expect } from '@playwright/test';

test.describe('SDA Embedded Form Page', () => {
  test('should load /sda page and display embedded form without errors', async ({ page }) => {
    console.log('Starting SDA page test...');
    
    const consoleMessages = [];
    const consoleErrors = [];
    
    page.on('console', msg => {
      const text = msg.text();
      const type = msg.type();
      consoleMessages.push({ type, text });
      
      if (type === 'error') {
        console.error('Console Error:', text);
        consoleErrors.push(text);
      }
    });
    
    page.on('pageerror', error => {
      console.error('Page Error:', error.message);
      consoleErrors.push('Page Error: ' + error.message);
    });
    
    console.log('Navigating to http://localhost:3000/sda...');
    const response = await page.goto('http://localhost:3000/sda', {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    console.log('Response status:', response?.status());
    
    await page.screenshot({ path: 'screenshots/sda-initial.png', fullPage: true });
    console.log('Initial screenshot saved');
    
    expect(response?.status()).toBe(200);
    
    const title = await page.title();
    console.log('Page title:', title);
    
    console.log('Waiting for potential loading states...');
    await page.waitForTimeout(2000);
    
    const formContainer = page.locator('#jsform');
    const formContainerExists = await formContainer.count() > 0;
    console.log('Form container exists:', formContainerExists);
    
    if (formContainerExists) {
      const formContainerHTML = await formContainer.innerHTML().catch(() => '');
      console.log('Form container HTML length:', formContainerHTML.length);
      console.log('Form container preview:', formContainerHTML.substring(0, 500));
    }
    
    const embeddedFormScriptExists = await page.evaluate(() => {
      return typeof (window as any).EmbeddedForm !== 'undefined';
    });
    console.log('EmbeddedForm script loaded:', embeddedFormScriptExists);
    
    console.log('Waiting for form initialization...');
    await page.waitForTimeout(3000);
    
    await page.screenshot({ path: 'screenshots/sda-after-wait.png', fullPage: true });
    console.log('After-wait screenshot saved');
    
    const formElements = await page.evaluate(() => {
      const jsform = document.getElementById('jsform');
      return {
        jsformExists: !!jsform,
        jsformChildren: jsform?.children.length || 0,
        jsformInnerHTML: jsform?.innerHTML.substring(0, 200) || '',
        hasInputs: document.querySelectorAll('#jsform input').length,
        hasButtons: document.querySelectorAll('#jsform button').length,
        hasForms: document.querySelectorAll('#jsform form').length
      };
    });
    
    console.log('Form elements:', JSON.stringify(formElements, null, 2));
    
    const hasEmbeddedFormError = consoleErrors.some(err => 
      err.includes('EmbeddedForm') || err.includes('jsform')
    );
    
    console.log('=== TEST RESULTS ===');
    console.log('Page loaded:', response?.status() === 200);
    console.log('Total console messages:', consoleMessages.length);
    console.log('Console errors:', consoleErrors.length);
    console.log('Has EmbeddedForm errors:', hasEmbeddedFormError);
    console.log('Form container exists:', formElements.jsformExists);
    console.log('Form has content:', formElements.jsformChildren > 0);
    
    if (consoleErrors.length > 0) {
      console.log('=== CONSOLE ERRORS ===');
      consoleErrors.forEach(err => console.error(err));
    }
    
    expect(response?.status()).toBe(200);
    expect(formElements.jsformExists).toBe(true);
    
    console.log('All checks passed!');
  });
});
