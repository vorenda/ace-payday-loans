const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  console.log('\n🔍 Debugging /sda page HTML structure...\n');
  
  try {
    await page.goto('http://localhost:3000/sda', { waitUntil: 'networkidle' });
    await page.waitForTimeout(10000);
    
    // Get the entire HTML of the form section
    const formSectionHTML = await page.evaluate(() => {
      const section = document.querySelector('section');
      if (section) {
        return section.innerHTML;
      }
      return 'No section found';
    });
    
    console.log('📄 FORM SECTION HTML:');
    console.log('═══════════════════════════════════════');
    console.log(formSectionHTML);
    console.log('═══════════════════════════════════════\n');
    
    // Check for all divs with IDs
    const allDivs = await page.evaluate(() => {
      const divs = Array.from(document.querySelectorAll('div[id]'));
      return divs.map(div => ({
        id: div.id,
        hasChildren: div.children.length > 0,
        childrenCount: div.children.length,
        className: div.className,
        innerHTML: div.innerHTML.substring(0, 100)
      }));
    });
    
    console.log('📦 ALL DIVS WITH IDs:');
    console.log('═══════════════════════════════════════');
    console.log(JSON.stringify(allDivs, null, 2));
    console.log('═══════════════════════════════════════\n');
    
    // Check window.EmbeddedForm
    const embeddedFormInfo = await page.evaluate(() => {
      if (typeof window.EmbeddedForm === 'undefined') {
        return 'undefined';
      }
      return {
        type: typeof window.EmbeddedForm,
        methods: Object.keys(window.EmbeddedForm || {}),
        hasInit: typeof window.EmbeddedForm.init === 'function'
      };
    });
    
    console.log('🔧 EMBEDDEDFORM INFO:');
    console.log('═══════════════════════════════════════');
    console.log(JSON.stringify(embeddedFormInfo, null, 2));
    console.log('═══════════════════════════════════════\n');
    
  } catch (error) {
    console.error('❌ Debug failed: ' + error.message);
  } finally {
    await browser.close();
  }
})();
