import { test, expect } from '@playwright/test';

test.describe('Apply Wizard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/apply');
    await page.waitForLoadState('networkidle');
  });

  test('1. Initial state - should show Step 1 with two loan amount buttons', async ({ page }) => {
    // Take screenshot of initial state
    await page.screenshot({ path: 'screenshots/01-initial-state.png', fullPage: true });

    // Verify Step 1 heading
    await expect(page.getByText('Step 1 of 4')).toBeVisible();
    await expect(page.getByText('How much do you need?')).toBeVisible();

    // Verify both loan amount buttons exist
    const button1 = page.getByRole('button', { name: /\$100 - \$2,000/i });
    const button2 = page.getByRole('button', { name: /\$2,000 - \$50,000/i });
    
    await expect(button1).toBeVisible();
    await expect(button2).toBeVisible();

    console.log('✅ Test 1 PASSED: Initial state shows Step 1 with two loan amount buttons');
  });

  test('2. Step 1 → Step 2 - clicking loan amount should show state selection', async ({ page }) => {
    // Click the first loan amount button
    await page.getByRole('button', { name: /\$100 - \$2,000/i }).click();
    
    // Wait for Step 2 to appear
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    await expect(page.getByText('Which state are you in?')).toBeVisible();
    
    // Take screenshot of Step 2
    await page.screenshot({ path: 'screenshots/02-step2-state-selection.png', fullPage: true });

    // Verify state dropdown exists with correct options
    const stateSelect = page.locator('select');
    await expect(stateSelect).toBeVisible();
    
    const options = await stateSelect.locator('option').allTextContents();
    expect(options).toContain('California');
    expect(options).toContain('Texas');

    console.log('✅ Test 2 PASSED: Step 1 → Step 2 transition works correctly');
  });

  test('3. Texas flow - Yes (vehicle paid off)', async ({ page }) => {
    console.log('Testing Texas flow with paid off vehicle...');
    
    // Step 1: Select loan amount
    await page.getByRole('button', { name: /\$100 - \$2,000/i }).click();
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    await page.screenshot({ path: 'screenshots/03-texas-step2.png', fullPage: true });
    
    // Step 2: Select Texas
    await page.locator('select').selectOption('TX');
    
    // Wait for Step 3 to appear
    await expect(page.getByText('Step 3 of 4')).toBeVisible();
    await expect(page.getByText('Is your vehicle paid off?')).toBeVisible();
    await page.screenshot({ path: 'screenshots/03-texas-step3-vehicle.png', fullPage: true });
    
    // Verify both vehicle buttons exist
    const yesButton = page.getByRole('button', { name: /Yes, It's Paid Off/i });
    const noButton = page.getByRole('button', { name: /No, I Still Owe Money/i });
    await expect(yesButton).toBeVisible();
    await expect(noButton).toBeVisible();
    
    // Step 3: Click "Yes" (paid off)
    await yesButton.click();
    
    // Wait for iframe to appear
    await expect(page.getByText('Final Step')).toBeVisible();
    await expect(page.getByText('Complete Your Application')).toBeVisible();
    
    // Wait for iframe to load
    const iframe = page.frameLocator('iframe[title="Loan Application Form"]');
    await page.waitForTimeout(2000); // Give iframe time to load
    
    await page.screenshot({ path: 'screenshots/03-texas-salesforce-iframe.png', fullPage: true });

    // Verify iframe src contains correct parameters
    const iframeSrc = await page.locator('iframe').getAttribute('src');
    expect(iframeSrc).toContain('montanacapital.my.salesforce-sites.com');
    expect(iframeSrc).toContain('leadstate=TX');
    expect(iframeSrc).toContain('paidoff=yes');
    expect(iframeSrc).toContain('balance=0');

    console.log('✅ Test 3 PASSED: Texas flow with paid off vehicle shows Salesforce iframe');
  });

  test('4. California flow - should redirect to /sda', async ({ page }) => {
    console.log('Testing California flow...');
    
    // Step 1: Select loan amount
    await page.getByRole('button', { name: /\$100 - \$2,000/i }).click();
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    await page.screenshot({ path: 'screenshots/04-california-step2.png', fullPage: true });
    
    // Step 2: Select California
    await page.locator('select').selectOption('CA');
    
    // Wait for navigation to /sda
    await page.waitForURL('**/sda');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of SDA page
    await page.screenshot({ path: 'screenshots/04-california-sda-page.png', fullPage: true });
    
    // Verify we're on the SDA page with "Coming Soon" message
    await expect(page.getByText('Coming Soon')).toBeVisible();
    await expect(page.getByText(/We're working on bringing you this loan option/i)).toBeVisible();

    console.log('✅ Test 4 PASSED: California flow redirects to /sda with Coming Soon message');
  });

  test('5. Texas balance flow - Less than $2,000', async ({ page }) => {
    console.log('Testing Texas flow with balance less than $2,000...');
    
    // Step 1: Select loan amount
    await page.getByRole('button', { name: /\$100 - \$2,000/i }).click();
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    
    // Step 2: Select Texas
    await page.locator('select').selectOption('TX');
    await expect(page.getByText('Step 3 of 4')).toBeVisible();
    await page.screenshot({ path: 'screenshots/05-balance-step3.png', fullPage: true });
    
    // Step 3: Click "No" (vehicle not paid off)
    await page.getByRole('button', { name: /No, I Still Owe Money/i }).click();
    
    // Wait for Step 4 (balance question)
    await expect(page.getByText('Step 4 of 4')).toBeVisible();
    await expect(page.getByText('What is your balance?')).toBeVisible();
    await page.screenshot({ path: 'screenshots/05-balance-step4.png', fullPage: true });
    
    // Verify both balance buttons exist
    const lessThan2k = page.getByRole('button', { name: /Less than \$2,000/i });
    const moreThan2k = page.getByRole('button', { name: /More than \$2,000/i });
    await expect(lessThan2k).toBeVisible();
    await expect(moreThan2k).toBeVisible();
    
    // Step 4: Click "Less than $2,000"
    await lessThan2k.click();
    
    // Wait for iframe to appear
    await expect(page.getByText('Final Step')).toBeVisible();
    await expect(page.getByText('Complete Your Application')).toBeVisible();
    
    // Wait for iframe to load
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/05-balance-salesforce-iframe.png', fullPage: true });

    // Verify iframe src contains correct parameters
    const iframeSrc = await page.locator('iframe').getAttribute('src');
    expect(iframeSrc).toContain('montanacapital.my.salesforce-sites.com');
    expect(iframeSrc).toContain('leadstate=TX');
    expect(iframeSrc).toContain('paidoff=no');
    expect(iframeSrc).toContain('balance=1500');

    console.log('✅ Test 5 PASSED: Texas balance flow (less than $2,000) shows Salesforce iframe');
  });

  test('6. Texas balance flow - More than $2,000 redirects to /sda', async ({ page }) => {
    console.log('Testing Texas flow with balance more than $2,000...');
    
    // Step 1: Select loan amount
    await page.getByRole('button', { name: /\$100 - \$2,000/i }).click();
    await expect(page.getByText('Step 2 of 4')).toBeVisible();
    
    // Step 2: Select Texas
    await page.locator('select').selectOption('TX');
    await expect(page.getByText('Step 3 of 4')).toBeVisible();
    
    // Step 3: Click "No" (vehicle not paid off)
    await page.getByRole('button', { name: /No, I Still Owe Money/i }).click();
    await expect(page.getByText('Step 4 of 4')).toBeVisible();
    await page.screenshot({ path: 'screenshots/06-balance-step4-before.png', fullPage: true });
    
    // Step 4: Click "More than $2,000"
    await page.getByRole('button', { name: /More than \$2,000/i }).click();
    
    // Wait for navigation to /sda
    await page.waitForURL('**/sda');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of SDA page
    await page.screenshot({ path: 'screenshots/06-balance-more-than-2k-sda.png', fullPage: true });
    
    // Verify we're on the SDA page
    await expect(page.getByText('Coming Soon')).toBeVisible();

    console.log('✅ Test 6 PASSED: Texas balance flow (more than $2,000) redirects to /sda');
  });

  test('7. UI Elements and styling verification', async ({ page }) => {
    console.log('Testing UI elements and styling...');
    
    // Check page title
    await expect(page).toHaveTitle(/Apply Now/);
    
    // Verify hero section
    await expect(page.getByRole('heading', { name: /Apply for a Loan/i })).toBeVisible();
    
    // Verify sidebar elements
    await expect(page.getByText('Why Apply With Us?')).toBeVisible();
    await expect(page.getByText('Fast approval in minutes')).toBeVisible();
    await expect(page.getByText('Same-day funding available')).toBeVisible();
    
    await expect(page.getByText('Need Help?')).toBeVisible();
    await expect(page.getByText('What You\'ll Need')).toBeVisible();
    
    // Take full page screenshot
    await page.screenshot({ path: 'screenshots/07-full-page-ui.png', fullPage: true });
    
    console.log('✅ Test 7 PASSED: All UI elements are present and visible');
  });
});
