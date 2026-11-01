import { chromium } from '@playwright/test';
const B = process.env.BASE || 'http://localhost:3100';
const b = await chromium.launch({ channel: 'msedge' });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  const t0 = Date.now();
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  let n = 0;
  for (let y = 0; y < H; y += 320) {
    await p.evaluate(v => scrollTo({ top: v, behavior: 'instant' }), y);
    await p.waitForTimeout(90);
    n++;
  }
  await p.waitForTimeout(900);
  const hidden = await p.evaluate(() => [...document.querySelectorAll('[data-reveal="hidden"]')].map(e => (e.textContent || '').trim().slice(0, 40) + ' @' + Math.round(e.getBoundingClientRect().top + scrollY)));
  console.log(`${w}px: pageHeight=${H} steps=${n} elapsed=${Date.now() - t0}ms hiddenReveals=${hidden.length}`, hidden.slice(0, 5));
  await ctx.close();
}
await b.close();
