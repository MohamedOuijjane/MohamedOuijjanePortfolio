import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PAGES = ['/', '/projects/cpu-grid-traffic'];

async function verifyHeaders(url) {
  console.log(`\n--- Verifying Headers for: ${url} ---`);
  const res = await fetch(new URL(url, BASE_URL), { method: 'HEAD' });
  const headers = res.headers;

  const checks = [
    { name: 'Content-Security-Policy', key: 'content-security-policy' },
    { name: 'X-Content-Type-Options', key: 'x-content-type-options', expected: 'nosniff' },
    { name: 'X-Frame-Options', key: 'x-frame-options', expected: 'DENY' },
    { name: 'Referrer-Policy', key: 'referrer-policy', expected: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', key: 'permissions-policy' },
  ];

  let allPassed = true;

  for (const check of checks) {
    const value = headers.get(check.key) || headers.get(check.key + '-report-only');
    if (value) {
      if (check.expected && value !== check.expected) {
        console.log(`[FAIL] ${check.name}: Expected "${check.expected}", got "${value}"`);
        allPassed = false;
      } else {
        console.log(`[PASS] ${check.name}: ${value}`);
      }
    } else {
      console.log(`[FAIL] ${check.name}: Header missing`);
      allPassed = false;
    }
  }

  // HSTS check
  if (BASE_URL.startsWith('https://')) {
    const hsts = headers.get('strict-transport-security');
    if (hsts) {
      console.log(`[PASS] Strict-Transport-Security: ${hsts}`);
    } else {
      console.log(`[FAIL] Strict-Transport-Security: Header missing for HTTPS`);
      allPassed = false;
    }
  } else {
    console.log(`[N/A] Strict-Transport-Security: N/A (HTTPS only)`);
  }

  return allPassed;
}

async function verifySEO(url) {
  console.log(`\n--- Verifying SEO for: ${url} ---`);
  const res = await fetch(new URL(url, BASE_URL));
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  let allPassed = true;

  // Title
  const title = document.querySelector('title')?.textContent;
  if (title && title.trim().length > 0) {
    console.log(`[PASS] Title: ${title}`);
  } else {
    console.log(`[FAIL] Title: Missing or empty`);
    allPassed = false;
  }

  // Description
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
  if (description && description.trim().length > 0) {
    console.log(`[PASS] Description: ${description}`);
  } else {
    console.log(`[FAIL] Description: Missing or empty`);
    allPassed = false;
  }

  // OG Tags
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
  const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');

  if (ogTitle) console.log(`[PASS] og:title: ${ogTitle}`);
  else { console.log(`[FAIL] og:title: Missing`); allPassed = false; }

  if (ogDescription) console.log(`[PASS] og:description: ${ogDescription}`);
  else { console.log(`[FAIL] og:description: Missing`); allPassed = false; }

  // JSON-LD
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (jsonLdScripts.length > 0) {
    for (let i = 0; i < jsonLdScripts.length; i++) {
      try {
        JSON.parse(jsonLdScripts[i].textContent);
        console.log(`[PASS] JSON-LD Script #${i + 1}: Valid JSON`);
      } catch (e) {
        console.log(`[FAIL] JSON-LD Script #${i + 1}: Invalid JSON`);
        allPassed = false;
      }
    }
  } else {
    console.log(`[FAIL] JSON-LD: No scripts found`);
    allPassed = false;
  }

  return allPassed;
}

async function verifyRobots() {
  console.log(`\n--- Verifying /robots.txt ---`);
  const res = await fetch(new URL('/robots.txt', BASE_URL));
  if (res.status === 200) {
    const text = await res.text();
    if (text.includes('Sitemap:')) {
      console.log(`[PASS] robots.txt: Status 200 and contains Sitemap link`);
      return true;
    } else {
      console.log(`[FAIL] robots.txt: Sitemap link missing`);
    }
  } else {
    console.log(`[FAIL] robots.txt: Status ${res.status}`);
  }
  return false;
}

async function verifySitemap() {
  console.log(`\n--- Verifying /sitemap.xml ---`);
  const res = await fetch(new URL('/sitemap.xml', BASE_URL));
  if (res.status === 200) {
    const text = await res.text();
    const urls = [
      '/projects/cpu-grid-traffic',
      '/projects/portfolio-next'
    ];
    let allFound = true;
    for (const url of urls) {
      if (text.includes(url)) {
        console.log(`[PASS] Sitemap: Contains ${url}`);
      } else {
        console.log(`[FAIL] Sitemap: Missing ${url}`);
        allFound = false;
      }
    }
    return allFound;
  } else {
    console.log(`[FAIL] Sitemap: Status ${res.status}`);
  }
  return false;
}

async function run() {
  let success = true;

  for (const page of PAGES) {
    if (!(await verifyHeaders(page))) success = false;
    if (!(await verifySEO(page))) success = false;
  }

  if (!(await verifyRobots())) success = false;
  if (!(await verifySitemap())) success = false;

  if (success) {
    console.log('\n✅ ALL SITE VERIFICATIONS PASSED');
    process.exit(0);
  } else {
    console.log('\n❌ SITE VERIFICATION FAILED');
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
