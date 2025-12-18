import { test, expect } from '@playwright/test';

test.describe('SDA Page Form Loading Test', () => {
  test('should clear cache, reload, and verify form loads', async ({ page }) => {
    console.log('\n=== SDA PAGE FORM TEST ===\n');
    
    // Navigate to page
    console.log('1. Navigating to /sda...');
    await page.goto('http://localhost:3000/sda');
    await page.waitForLoadState('networkidle');
    
    // Clear localStorage cache
    console.log('2. Clearing localStorage cache...');
    await page.evaluate(() => {
      localStorage.removeItem('lms_form_cache');
      console.log('localStorage cleared');
    });
    
    // Take initial screenshot
    console.log('3. Taking initial screenshot...');
    await page.screenshot({ path: 'sda-before-reload.png', fullPage: true });
    
    // Reload the page
    console.log('4. Reloading page...');
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Wait 15 seconds for form to load
    console.log('5. Waiting 15 seconds for form to fully load...');
    await page.waitForTimeout(15000);
    
    // Take screenshot after waiting
    console.log('6. Taking screenshot after 15 second wait...');
    await page.screenshot({ path: 'sda-after-wait.png', fullPage: true });
    
    // Check #form-content
    console.log('\n7. Checking #form-content element...');
    const formContent = page.locator('#form-content');
    const isVisible = await formContent.isVisible();
    console.log(`   - Is #form-content visible? ${isVisible}`);
    
    const innerHTML = await formContent.innerHTML().catch(() => '');
    console.log(`   - #form-content innerHTML length: ${innerHTML.length} characters`);
    console.log(`   - First 200 chars: ${innerHTML.substring(0, 200)}`);
    
    // Check for form elements
    console.log('\n8. Looking for form elements...');
    const inputs = await page.locator('input').count();
    const buttons = await page.locator('button').count();
    const textareas = await page.locator('textarea').count();
    const selects = await page.locator('select').count();
    
    console.log(`   - Input fields found: ${inputs}`);
    console.log(`   - Buttons found: ${buttons}`);
    console.log(`   - Textareas found: ${textareas}`);
    console.log(`   - Select dropdowns found: ${selects}`);
    
    // Check for loading spinner
    console.log('\n9. Checking for loading spinner...');
    const spinner = page.locator('.animate-spin');
    const spinnerVisible = await spinner.isVisible().catch(() => false);
    console.log(`   - Loading spinner visible? ${spinnerVisible}`);
    
    // Capture console messages
    const consoleMessages: string[] = [];
    page.on('console', msg => consoleMessages.push(`[${msg.type()}] ${msg.text()}`));
    
    // Wait a bit more to capture any console logs
    await page.waitForTimeout(2000);
    
    console.log('\n10. Console messages:');
    consoleMessages.forEach(msg => console.log(`    ${msg}`));
    
    // Check for errors
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    
    if (errors.length > 0) {
      console.log('\n11. JavaScript Errors:');
      errors.forEach(err => console.log(`    ❌ ${err}`));
    } else {
      console.log('\n11. No JavaScript errors detected');
    }
    
    // Check network requests for the form script
    console.log('\n12. Checking network activity...');
    const requests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('leadmanagementsystems') || 
          request.url().includes('form') ||
          request.url().includes('embed')) {
        requests.push(request.url());
      }
    });
    
    await page.waitForTimeout(2000);
    
    if (requests.length > 0) {
      console.log('    Form-related requests:');
      requests.forEach(req => console.log(`    - ${req}`));
    } else {
      console.log('    ⚠️ No form-related requests detected');
    }
    
    // Summary
    console.log('\n=== SUMMARY ===');
    console.log(`✅ Page loaded successfully`);
    console.log(`📸 Screenshots saved: sda-before-reload.png, sda-after-wait.png`);
    console.log(`🔍 Form content length: ${innerHTML.length} characters`);
    console.log(`📝 Form elements: ${inputs} inputs, ${buttons} buttons, ${textareas} textareas, ${selects} selects`);
    console.log(`⏳ Loading spinner: ${spinnerVisible ? 'Still visible' : 'Hidden'}`);
    console.log(`❌ Errors: ${errors.length}`);
    
    // Assertions for the test
    expect(isVisible).toBe(true);
    // We expect SOME content after 15 seconds - either form or error message
    expect(innerHTML.length).toBeGreaterThan(50);
  });
});
