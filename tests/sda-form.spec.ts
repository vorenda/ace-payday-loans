import { test, expect } from '@playwright/test';

test.describe('SDA Page Form Test', () => {
  test('should load form after clearing cache', async ({ page }) => {
    // Navigate to the page
    await page.goto('http://localhost:3000/sda');

    // Clear localStorage cache
    await page.evaluate(() => {
      localStorage.removeItem('lms_form_cache');
    });

    console.log('✅ Cleared localStorage cache');

    // Refresh the page
    await page.reload();

    console.log('✅ Page reloaded');

    // Wait 10 seconds for form to load
    console.log('⏳ Waiting 10 seconds for form to load...');
    await page.waitForTimeout(10000);

    // Take a screenshot
    await page.screenshot({ path: '/Users/valerazatler/Developer/nextjs3/tests/sda-form-after-10s.png', fullPage: true });
    console.log('✅ Screenshot saved to tests/sda-form-after-10s.png');

    // Check if #form-content div exists
    const formContentDiv = await page.locator('#form-content');
    const formContentExists = await formContentDiv.count() > 0;
    console.log(`\n#form-content div exists: ${formContentExists}`);

    if (formContentExists) {
      // Get the HTML content
      const formContentHTML = await formContentDiv.innerHTML();
      console.log(`#form-content innerHTML length: ${formContentHTML.length}`);
      console.log(`#form-content innerHTML preview: ${formContentHTML.substring(0, 200)}...`);

      // Check if it has actual content (not just empty)
      const hasContent = formContentHTML.trim().length > 0;
      console.log(`#form-content has content: ${hasContent}`);
    }

    // Check the container ref div that holds injected HTML
    const containerDiv = await page.locator('.lms-form-container > div:not(#form-content)');
    const containerExists = await containerDiv.count() > 0;
    console.log(`\nContainer div (ref) exists: ${containerExists}`);

    if (containerExists) {
      const containerHTML = await containerDiv.first().innerHTML();
      console.log(`Container innerHTML length: ${containerHTML.length}`);
      console.log(`Container innerHTML preview: ${containerHTML.substring(0, 200)}...`);
    }

    // Check for loading spinner
    const loadingSpinner = await page.locator('.lms-form-loading');
    const isLoading = await loadingSpinner.count() > 0;
    console.log(`\nLoading spinner visible: ${isLoading}`);

    // Check for error message
    const errorDiv = await page.locator('.lms-form-error');
    const hasError = await errorDiv.count() > 0;
    console.log(`Error message visible: ${hasError}`);

    if (hasError) {
      const errorText = await errorDiv.textContent();
      console.log(`Error text: ${errorText}`);
    }

    // Check for any form fields
    const formFields = await page.locator('input, select, textarea');
    const fieldCount = await formFields.count();
    console.log(`\nForm fields found: ${fieldCount}`);

    if (fieldCount > 0) {
      console.log('Field details:');
      for (let i = 0; i < Math.min(fieldCount, 5); i++) {
        const field = formFields.nth(i);
        const tagName = await field.evaluate(el => el.tagName);
        const type = await field.getAttribute('type');
        const name = await field.getAttribute('name');
        const placeholder = await field.getAttribute('placeholder');
        console.log(`  ${i + 1}. <${tagName}> type="${type}" name="${name}" placeholder="${placeholder}"`);
      }
    }

    // Check browser console logs
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`);
    });

    // Get page title
    const title = await page.title();
    console.log(`\nPage title: ${title}`);

    // Check network requests
    const requests: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/lms-form') || request.url().includes('embeddedform')) {
        requests.push(`${request.method()} ${request.url()}`);
      }
    });

    console.log(`\nRelevant network requests: ${requests.length}`);
    requests.forEach(req => console.log(`  ${req}`));

    // Print summary
    console.log('\n========== SUMMARY ==========');
    console.log(`✓ Page loaded: Yes`);
    console.log(`✓ Cache cleared: Yes`);
    console.log(`✓ #form-content exists: ${formContentExists}`);
    console.log(`✓ Container div exists: ${containerExists}`);
    console.log(`✓ Form fields visible: ${fieldCount}`);
    console.log(`✓ Loading spinner: ${isLoading}`);
    console.log(`✓ Error message: ${hasError}`);
    console.log('=============================\n');
  });
});
