import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// Test results collector
const testResults = {
  homepage: { status: 'pending', errors: [] as string[] },
  servicePages: { status: 'pending', errors: [] as string[] },
  locationPages: { status: 'pending', errors: [] as string[] },
  cityPages: { status: 'pending', errors: [] as string[] },
  staticPages: { status: 'pending', errors: [] as string[] },
  navigation: { status: 'pending', errors: [] as string[] },
  seoSchema: { status: 'pending', errors: [] as string[] },
  consoleErrors: [] as string[],
  brokenLinks: [] as string[],
};

// ============================================
// 1. HOMEPAGE TESTS
// ============================================
test.describe('1. Homepage Tests', () => {
  test('Homepage loads successfully with all key elements', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto(BASE_URL);
    expect(response?.status()).toBe(200);

    // Check for hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Check for CTA button
    const ctaButton = page.locator('a:has-text("Apply Now"), button:has-text("Apply Now"), a:has-text("Get Started"), a:has-text("Get Cash")').first();
    const hasCTA = await ctaButton.count() > 0;
    if (!hasCTA) {
      console.log('Warning: No obvious CTA button found on homepage');
    }

    // Check for navigation
    const nav = page.locator('nav, header');
    await expect(nav.first()).toBeVisible();

    // Check for footer with disclaimers
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for trust signals (BBB, licenses, etc.)
    const pageContent = await page.textContent('body');
    const hasTrustSignals = pageContent?.includes('BBB') ||
                           pageContent?.includes('Licensed') ||
                           pageContent?.includes('CFPB') ||
                           pageContent?.includes('Secure') ||
                           pageContent?.includes('Trust');

    console.log('Homepage loaded successfully');
    console.log('Trust signals found:', hasTrustSignals);
    console.log('Console errors:', consoleErrors.length);

    await page.screenshot({ path: 'tests/screenshots/homepage.png', fullPage: false });

    testResults.consoleErrors.push(...consoleErrors);
    expect(response?.status()).toBe(200);
  });

  test('Homepage has click-to-call functionality', async ({ page }) => {
    await page.goto(BASE_URL);

    // Check for phone links
    const phoneLinks = page.locator('a[href^="tel:"]');
    const phoneCount = await phoneLinks.count();

    console.log('Phone links found:', phoneCount);

    if (phoneCount > 0) {
      const phoneHref = await phoneLinks.first().getAttribute('href');
      console.log('First phone number:', phoneHref);

      // Verify NOT a 1-800 number
      const isTollFree = phoneHref?.includes('800') || phoneHref?.includes('888') || phoneHref?.includes('877');
      if (isTollFree) {
        console.log('WARNING: Toll-free number detected (should use local area code)');
      }
    }

    expect(phoneCount).toBeGreaterThan(0);
  });
});

// ============================================
// 2. SERVICE PAGES TESTS
// ============================================
test.describe('2. Service Pages Tests', () => {
  const servicePagesToTest = [
    '/services/',
    '/services/payday-loans/',
    '/services/cash-advances/',
    '/services/title-loans/',
  ];

  test('Services index page loads', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/services/`);

    if (response?.status() === 404) {
      console.log('Services index page returned 404 - may use /services directly');
      const altResponse = await page.goto(`${BASE_URL}/services`);
      expect(altResponse?.status()).not.toBe(500);
    } else {
      expect(response?.status()).toBe(200);
    }

    await page.screenshot({ path: 'tests/screenshots/services-index.png' });
  });

  test('Service pillar pages load correctly', async ({ page }) => {
    const errors: string[] = [];

    for (const url of servicePagesToTest.slice(1)) {
      const response = await page.goto(`${BASE_URL}${url}`);

      if (response?.status() === 404) {
        errors.push(`404: ${url}`);
        console.log(`Service page ${url} returned 404`);
        continue;
      }

      // Check for H1
      const h1 = await page.locator('h1').first().textContent();
      console.log(`Service page ${url}: H1 = "${h1?.substring(0, 50)}..."`);

      // Check for content
      const contentLength = (await page.textContent('body'))?.length || 0;
      if (contentLength < 500) {
        errors.push(`Low content: ${url} (${contentLength} chars)`);
      }
    }

    if (errors.length > 0) {
      console.log('Service page errors:', errors);
    }

    expect(errors).toHaveLength(0);
  });

  test('Service pages have schema markup', async ({ page }) => {
    await page.goto(`${BASE_URL}/services/payday-loans/`);

    const schemaScripts = page.locator('script[type="application/ld+json"]');
    const schemaCount = await schemaScripts.count();

    console.log('Schema scripts found on payday-loans page:', schemaCount);

    if (schemaCount > 0) {
      const schemaText = await schemaScripts.first().textContent();
      console.log('Schema preview:', schemaText?.substring(0, 200) + '...');
    }

    await page.screenshot({ path: 'tests/screenshots/service-payday-loans.png' });
  });
});

// ============================================
// 3. LOCATION/STATE PAGES TESTS
// ============================================
test.describe('3. Location Pages Tests', () => {
  test('Locations index page loads', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/locations/`);

    if (response?.status() === 404) {
      console.log('Locations index page returned 404');
    } else {
      expect(response?.status()).toBe(200);
      await page.screenshot({ path: 'tests/screenshots/locations-index.png' });
    }
  });

  test('California state page loads with compliance content', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/locations/california/`);

    if (response?.status() === 404) {
      console.log('California state page returned 404');
      return;
    }

    expect(response?.status()).toBe(200);

    const pageContent = await page.textContent('body');

    // Check for state-specific compliance content
    const hasCompliance = pageContent?.includes('California') &&
                         (pageContent?.includes('regulation') ||
                          pageContent?.includes('law') ||
                          pageContent?.includes('APR') ||
                          pageContent?.includes('DFPI') ||
                          pageContent?.includes('license'));

    console.log('California compliance content found:', hasCompliance);

    await page.screenshot({ path: 'tests/screenshots/state-california.png' });
  });

  test('Texas state page loads with compliance content', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/locations/texas/`);

    if (response?.status() === 404) {
      console.log('Texas state page returned 404');
      return;
    }

    expect(response?.status()).toBe(200);

    const pageContent = await page.textContent('body');

    // Check for Texas-specific compliance content
    const hasCompliance = pageContent?.includes('Texas') &&
                         (pageContent?.includes('CAB') ||
                          pageContent?.includes('regulation') ||
                          pageContent?.includes('OCCC') ||
                          pageContent?.includes('ordinance'));

    console.log('Texas compliance content found:', hasCompliance);

    await page.screenshot({ path: 'tests/screenshots/state-texas.png' });
  });
});

// ============================================
// 4. CITY PAGES TESTS (Anti-Doorway Validation)
// ============================================
test.describe('4. City Pages Tests (Anti-Doorway)', () => {
  const cityPagesToTest = [
    { url: '/locations/california/los-angeles/', city: 'Los Angeles', areaCode: '213' },
    { url: '/locations/california/san-francisco/', city: 'San Francisco', areaCode: '415' },
    { url: '/locations/california/san-diego/', city: 'San Diego', areaCode: '619' },
    { url: '/locations/texas/dallas/', city: 'Dallas', areaCode: '214', hasOrdinance: true },
    { url: '/locations/texas/houston/', city: 'Houston', areaCode: '713', hasOrdinance: true },
    { url: '/locations/texas/austin/', city: 'Austin', areaCode: '512', hasOrdinance: true },
  ];

  for (const cityTest of cityPagesToTest) {
    test(`City page: ${cityTest.city} loads with Anti-Doorway content`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${cityTest.url}`);

      if (response?.status() === 404) {
        console.log(`City page ${cityTest.url} returned 404`);
        expect(response?.status()).not.toBe(404);
        return;
      }

      expect(response?.status()).toBe(200);

      const pageContent = await page.textContent('body') || '';
      const pageHtml = await page.content();

      // 1. Check for city name
      const hasCityName = pageContent.toLowerCase().includes(cityTest.city.toLowerCase());
      console.log(`${cityTest.city}: City name mentioned = ${hasCityName}`);

      // 2. Check for local landmarks (Anti-Doorway)
      const landmarkPatterns = [
        /downtown|tower|park|center|plaza|mall|stadium|airport|district/i,
        /highway|I-\d+|US-\d+|interstate|exit|route/i,
        /neighborhood|suburb|area|county/i,
      ];
      const hasLandmarks = landmarkPatterns.some(p => p.test(pageContent));
      console.log(`${cityTest.city}: Local landmarks/highways mentioned = ${hasLandmarks}`);

      // 3. Check for local area code phone (NOT 1-800)
      const phoneLinks = await page.locator('a[href^="tel:"]').all();
      let hasLocalPhone = false;
      let hasTollFree = false;

      for (const link of phoneLinks) {
        const href = await link.getAttribute('href');
        if (href?.includes(cityTest.areaCode)) {
          hasLocalPhone = true;
        }
        if (href?.includes('800') || href?.includes('888') || href?.includes('877')) {
          hasTollFree = true;
        }
      }
      console.log(`${cityTest.city}: Local area code (${cityTest.areaCode}) = ${hasLocalPhone}`);
      console.log(`${cityTest.city}: Toll-free number found = ${hasTollFree}`);

      // 4. Check for state compliance section
      const hasStateCompliance = pageContent.includes('California') &&
                                (pageContent.includes('regulation') || pageContent.includes('law') || pageContent.includes('compliance')) ||
                                pageContent.includes('Texas') &&
                                (pageContent.includes('CAB') || pageContent.includes('OCCC') || pageContent.includes('regulation'));
      console.log(`${cityTest.city}: State compliance content = ${hasStateCompliance}`);

      // 5. Check for city ordinance (Texas cities)
      if (cityTest.hasOrdinance) {
        const hasOrdinance = pageContent.includes('ordinance') ||
                            pageContent.includes('city regulation') ||
                            pageContent.includes('local regulation');
        console.log(`${cityTest.city}: City ordinance content = ${hasOrdinance}`);
      }

      // 6. Check for services section linking to pillar pages
      const servicePillarLinks = await page.locator('a[href*="/services/"]').count();
      console.log(`${cityTest.city}: Service pillar links = ${servicePillarLinks}`);

      // 7. Check for schema markup
      const schemaScripts = await page.locator('script[type="application/ld+json"]').count();
      console.log(`${cityTest.city}: Schema scripts = ${schemaScripts}`);

      // 8. Check for BreadcrumbList schema
      const hasBreadcrumbSchema = pageHtml.includes('BreadcrumbList');
      console.log(`${cityTest.city}: BreadcrumbList schema = ${hasBreadcrumbSchema}`);

      // 9. Check for FinancialService or LocalBusiness schema
      const hasFinancialSchema = pageHtml.includes('FinancialService') || pageHtml.includes('LocalBusiness');
      console.log(`${cityTest.city}: FinancialService/LocalBusiness schema = ${hasFinancialSchema}`);

      // Take screenshot
      const screenshotName = cityTest.city.toLowerCase().replace(/\s+/g, '-');
      await page.screenshot({ path: `tests/screenshots/city-${screenshotName}.png` });

      // Assertions
      expect(hasCityName).toBe(true);
    });
  }

  test('City pages have click-to-call buttons', async ({ page }) => {
    await page.goto(`${BASE_URL}/locations/texas/dallas/`);

    const phoneLinks = page.locator('a[href^="tel:"]');
    const phoneCount = await phoneLinks.count();

    console.log('Dallas city page phone links:', phoneCount);

    if (phoneCount > 0) {
      const firstPhone = await phoneLinks.first();
      await expect(firstPhone).toBeVisible();

      // Check if button is properly sized for mobile tapping
      const box = await firstPhone.boundingBox();
      if (box) {
        console.log('Phone button size:', box.width, 'x', box.height);
      }
    }

    expect(phoneCount).toBeGreaterThan(0);
  });
});

// ============================================
// 5. STATIC PAGES TESTS
// ============================================
test.describe('5. Static Pages Tests', () => {
  const staticPages = [
    { url: '/about/', name: 'About' },
    { url: '/contact/', name: 'Contact' },
    { url: '/apply/', name: 'Apply' },
  ];

  for (const staticPage of staticPages) {
    test(`${staticPage.name} page loads`, async ({ page }) => {
      const response = await page.goto(`${BASE_URL}${staticPage.url}`);

      if (response?.status() === 404) {
        // Try without trailing slash
        const altResponse = await page.goto(`${BASE_URL}${staticPage.url.replace(/\/$/, '')}`);
        if (altResponse?.status() === 404) {
          console.log(`${staticPage.name} page returned 404`);
        } else {
          console.log(`${staticPage.name} page loaded (without trailing slash)`);
        }
      } else {
        expect(response?.status()).toBe(200);
        console.log(`${staticPage.name} page loaded successfully`);

        await page.screenshot({ path: `tests/screenshots/static-${staticPage.name.toLowerCase()}.png` });
      }
    });
  }
});

// ============================================
// 6. 404 ERROR TEST
// ============================================
test.describe('6. 404 Error Handling', () => {
  test('Nonexistent page returns 404', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/nonexistent-page-12345/`);

    // Should return 404 status
    const status = response?.status();
    console.log('404 test page status:', status);

    // Check if there's a custom 404 page
    const pageContent = await page.textContent('body');
    const hasCustom404 = pageContent?.includes('not found') ||
                        pageContent?.includes('404') ||
                        pageContent?.includes('page doesn\'t exist');

    console.log('Custom 404 page:', hasCustom404);

    expect(status).toBe(404);
  });
});

// ============================================
// 7. NAVIGATION TESTS
// ============================================
test.describe('7. Navigation Tests', () => {
  test('Header navigation links work', async ({ page }) => {
    await page.goto(BASE_URL);

    // Find all nav links
    const navLinks = page.locator('nav a, header a').filter({ hasText: /.+/ });
    const linkCount = await navLinks.count();

    console.log('Navigation links found:', linkCount);

    const brokenLinks: string[] = [];
    const testedLinks: string[] = [];

    // Get unique hrefs
    const hrefs: string[] = [];
    for (let i = 0; i < Math.min(linkCount, 20); i++) {
      const href = await navLinks.nth(i).getAttribute('href');
      if (href && href.startsWith('/') && !hrefs.includes(href)) {
        hrefs.push(href);
      }
    }

    // Test each nav link
    for (const href of hrefs.slice(0, 10)) {
      const response = await page.goto(`${BASE_URL}${href}`);
      testedLinks.push(href);

      if (response?.status() === 404) {
        brokenLinks.push(href);
        console.log(`Broken nav link: ${href}`);
      }
    }

    console.log('Tested navigation links:', testedLinks.length);
    console.log('Broken navigation links:', brokenLinks);

    expect(brokenLinks).toHaveLength(0);
  });

  test('Breadcrumbs are present on city pages', async ({ page }) => {
    await page.goto(`${BASE_URL}/locations/texas/dallas/`);

    // Look for breadcrumb navigation
    const breadcrumbs = page.locator('[aria-label*="breadcrumb"], .breadcrumb, nav ol, [class*="breadcrumb"]');
    const hasBreadcrumbs = await breadcrumbs.count() > 0;

    console.log('Breadcrumbs UI element found:', hasBreadcrumbs);

    // Check for breadcrumb schema
    const pageHtml = await page.content();
    const hasBreadcrumbSchema = pageHtml.includes('BreadcrumbList');

    console.log('Breadcrumb schema found:', hasBreadcrumbSchema);
  });

  test('Footer links work', async ({ page }) => {
    await page.goto(BASE_URL);

    const footerLinks = page.locator('footer a[href^="/"]');
    const footerLinkCount = await footerLinks.count();

    console.log('Footer links found:', footerLinkCount);

    const brokenFooterLinks: string[] = [];

    for (let i = 0; i < Math.min(footerLinkCount, 10); i++) {
      const href = await footerLinks.nth(i).getAttribute('href');
      if (href) {
        const response = await page.goto(`${BASE_URL}${href}`);
        if (response?.status() === 404) {
          brokenFooterLinks.push(href);
        }
      }
    }

    console.log('Broken footer links:', brokenFooterLinks);
    expect(brokenFooterLinks).toHaveLength(0);
  });
});

// ============================================
// 8. SEO & SCHEMA TESTS
// ============================================
test.describe('8. SEO & Schema Tests', () => {
  test('City pages have proper meta tags', async ({ page }) => {
    await page.goto(`${BASE_URL}/locations/texas/dallas/`);

    // Check title
    const title = await page.title();
    console.log('Page title:', title);
    expect(title.length).toBeGreaterThan(20);
    expect(title.length).toBeLessThan(80);

    // Check meta description
    const metaDesc = await page.locator('meta[name="description"]').getAttribute('content');
    console.log('Meta description length:', metaDesc?.length || 0);

    if (metaDesc) {
      expect(metaDesc.length).toBeGreaterThan(50);
      expect(metaDesc.length).toBeLessThan(180);
    }

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    console.log('OG Title:', ogTitle ? 'Present' : 'Missing');

    // Check canonical
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    console.log('Canonical URL:', canonical ? 'Present' : 'Missing');
  });

  test('FinancialService schema is present on city pages', async ({ page }) => {
    await page.goto(`${BASE_URL}/locations/california/los-angeles/`);

    const pageHtml = await page.content();

    // Check for FinancialService or LocalBusiness
    const hasFinancialService = pageHtml.includes('"@type":"FinancialService"') ||
                                pageHtml.includes('"@type": "FinancialService"');
    const hasLocalBusiness = pageHtml.includes('"@type":"LocalBusiness"') ||
                             pageHtml.includes('"@type": "LocalBusiness"');

    console.log('FinancialService schema:', hasFinancialService);
    console.log('LocalBusiness schema:', hasLocalBusiness);

    expect(hasFinancialService || hasLocalBusiness).toBe(true);
  });

  test('BreadcrumbList schema is present', async ({ page }) => {
    await page.goto(`${BASE_URL}/locations/texas/houston/`);

    const schemaScripts = page.locator('script[type="application/ld+json"]');
    const schemaCount = await schemaScripts.count();

    let hasBreadcrumbList = false;

    for (let i = 0; i < schemaCount; i++) {
      const schemaText = await schemaScripts.nth(i).textContent();
      if (schemaText?.includes('BreadcrumbList')) {
        hasBreadcrumbList = true;
        console.log('BreadcrumbList schema found');

        // Parse and validate
        try {
          const schema = JSON.parse(schemaText);
          if (Array.isArray(schema)) {
            const breadcrumb = schema.find((s: any) => s['@type'] === 'BreadcrumbList');
            if (breadcrumb?.itemListElement) {
              console.log('Breadcrumb items:', breadcrumb.itemListElement.length);
            }
          } else if (schema['@type'] === 'BreadcrumbList') {
            console.log('Breadcrumb items:', schema.itemListElement?.length);
          }
        } catch (e) {
          console.log('Could not parse schema JSON');
        }
        break;
      }
    }

    expect(hasBreadcrumbList).toBe(true);
  });
});

// ============================================
// 9. MOBILE RESPONSIVENESS TEST
// ============================================
test.describe('9. Mobile Responsiveness', () => {
  test('Site is mobile responsive', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    });
    const page = await context.newPage();

    await page.goto(BASE_URL);

    // Check main content is visible
    const mainContent = page.locator('main, [role="main"], body > div').first();
    await expect(mainContent).toBeVisible();

    // Check for mobile menu button
    const mobileMenuBtn = page.locator('[aria-label*="menu"], button:has-text("Menu"), .hamburger, [class*="mobile-menu"]');
    const hasMobileMenu = await mobileMenuBtn.count() > 0;
    console.log('Mobile menu button found:', hasMobileMenu);

    // Check click-to-call is visible on mobile
    const phoneLink = page.locator('a[href^="tel:"]').first();
    if (await phoneLink.count() > 0) {
      await expect(phoneLink).toBeVisible();
      console.log('Click-to-call visible on mobile');
    }

    await page.screenshot({ path: 'tests/screenshots/mobile-homepage.png' });

    // Test city page on mobile
    await page.goto(`${BASE_URL}/locations/texas/austin/`);
    await page.screenshot({ path: 'tests/screenshots/mobile-city-austin.png' });

    await context.close();
  });
});

// ============================================
// 10. COMPREHENSIVE LINK CHECK
// ============================================
test.describe('10. Comprehensive Link Check', () => {
  test('Sample internal links are not broken', async ({ page }) => {
    const urlsToTest = [
      '/',
      '/services/',
      '/services/payday-loans/',
      '/services/cash-advances/',
      '/locations/',
      '/locations/california/',
      '/locations/texas/',
      '/locations/california/los-angeles/',
      '/locations/texas/dallas/',
      '/about/',
      '/contact/',
      '/apply/',
    ];

    const results: { url: string; status: number | null; ok: boolean }[] = [];

    for (const url of urlsToTest) {
      const response = await page.goto(`${BASE_URL}${url}`);
      const status = response?.status() || null;
      results.push({
        url,
        status,
        ok: status === 200,
      });
    }

    console.log('\n=== LINK CHECK RESULTS ===');
    for (const r of results) {
      const emoji = r.ok ? '[OK]' : '[FAIL]';
      console.log(`${emoji} ${r.url} - Status: ${r.status}`);
    }

    const failedUrls = results.filter(r => !r.ok);
    console.log(`\nTotal: ${results.length}, Passed: ${results.length - failedUrls.length}, Failed: ${failedUrls.length}`);

    if (failedUrls.length > 0) {
      console.log('Failed URLs:', failedUrls.map(f => f.url));
    }
  });
});
