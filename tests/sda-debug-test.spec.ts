import { test } from '@playwright/test';

test('Debug SDA page HTML and scripts', async ({ page }) => {
  console.log('\n=== DEBUGGING SDA PAGE ===\n');
  
  await page.goto('http://localhost:3000/sda');
  await page.waitForLoadState('networkidle');
  
  // Clear cache
  await page.evaluate(() => localStorage.removeItem('lms_form_cache'));
  await page.reload();
  await page.waitForLoadState('networkidle');
  
  // Get full page HTML
  const html = await page.content();
  
  // Check for form-content div
  console.log('1. Checking for #form-content in HTML...');
  if (html.includes('id="form-content"')) {
    console.log('   ✅ Found #form-content in HTML');
    
    // Extract the form-content section
    const formContentMatch = html.match(/<div[^>]*id="form-content"[^>]*>(.*?)<\/div>/s);
    if (formContentMatch) {
      console.log(`   - Content: "${formContentMatch[1].substring(0, 200)}..."`);
    }
  } else {
    console.log('   ❌ #form-content NOT found in HTML');
  }
  
  // Check for EmbeddedForm script
  console.log('\n2. Checking for EmbeddedForm script...');
  if (html.includes('EmbeddedForm')) {
    console.log('   ✅ Found EmbeddedForm script');
    
    // Look for the script tag
    const scriptMatch = html.match(/<script[^>]*>[\s\S]*?new\s+EmbeddedForm[\s\S]*?<\/script>/);
    if (scriptMatch) {
      console.log('   - Script found:');
      console.log(scriptMatch[0].substring(0, 500));
    }
  } else {
    console.log('   ❌ EmbeddedForm script NOT found');
  }
  
  // Check for the external script
  console.log('\n3. Checking for external script tag...');
  if (html.includes('leadmanagementsystems.com')) {
    console.log('   ✅ Found leadmanagementsystems script tag');
  } else {
    console.log('   ❌ External script tag NOT found');
  }
  
  // Check actual DOM elements
  console.log('\n4. Checking DOM elements...');
  const formContentElement = await page.locator('#form-content').count();
  console.log(`   - #form-content elements in DOM: ${formContentElement}`);
  
  if (formContentElement > 0) {
    const classes = await page.locator('#form-content').getAttribute('class');
    console.log(`   - Classes: ${classes}`);
    
    const styles = await page.locator('#form-content').evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        display: computed.display,
        visibility: computed.visibility,
        opacity: computed.opacity,
        height: computed.height
      };
    });
    console.log(`   - Computed styles:`, styles);
  }
  
  // Check if script loaded
  console.log('\n5. Checking if EmbeddedForm is available in window...');
  const embeddedFormExists = await page.evaluate(() => {
    return typeof (window as any).EmbeddedForm !== 'undefined';
  });
  console.log(`   - window.EmbeddedForm exists: ${embeddedFormExists}`);
  
  // Wait and check again
  console.log('\n6. Waiting 15 seconds and checking again...');
  await page.waitForTimeout(15000);
  
  const formContentAfter = await page.locator('#form-content').innerHTML();
  console.log(`   - #form-content innerHTML after wait: "${formContentAfter.substring(0, 200)}"`);
  
  const isVisibleAfter = await page.locator('#form-content').isVisible();
  console.log(`   - Is visible after wait: ${isVisibleAfter}`);
});
