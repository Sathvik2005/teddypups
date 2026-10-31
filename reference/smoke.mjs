// Quick local smoke check: screenshots + console/overflow/broken-image scan.
import { chromium } from '@playwright/test';
const B = process.env.BASE || 'http://localhost:3100';
const routes = ['/', '/puppies', '/puppies/maltipoo-max-male', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact', '/nope'];
const browser = await chromium.launch({ channel: 'msedge' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => m.type() === 'error' && errs.push(m.text().slice(0, 140)));
  page.on('pageerror', e => errs.push('PAGEERROR ' + e.message.slice(0, 140)));
  for (const r of routes) {
    await page.goto(B + r, { waitUntil: 'networkidle' });
    const h2 = await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 300));
      const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src.slice(-50));
      return { overflow: document.documentElement.scrollWidth > innerWidth, broken, title: document.title.slice(0, 40), h1: document.querySelector('h1')?.textContent?.slice(0, 40) };
    });
    console.log(w, r, JSON.stringify(h2));
    if (r === '/' || r === '/puppies') await page.screenshot({ path: `reference/shots/local-${r === '/' ? 'home' : 'puppies'}-${w}.png`, fullPage: true });
  }
  console.log(w, 'console errors:', errs.length, errs.slice(0, 4));
  await ctx.close();
}
await browser.close();
