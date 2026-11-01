import { chromium } from '@playwright/test';
const B = process.env.BASE || 'http://localhost:3100';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 390, height: 844 } }); // plain narrow window, no mobile emulation
await p.goto(B + '/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const vw = innerWidth;
  const rows = [];
  for (const e of document.querySelectorAll('body *')) {
    const rect = e.getBoundingClientRect();
    if (rect.width && rect.right > vw + 0.5) {
      let anc = e, clipped = false;
      for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
        const o = getComputedStyle(a).overflowX;
        if (/(hidden|clip|auto|scroll)/.test(o)) { clipped = true; break; }
      }
      if (!clipped) rows.push(`${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).slice(0, 70)} right=${Math.round(rect.right)} w=${Math.round(rect.width)}`);
    }
  }
  return { scrollW: document.documentElement.scrollWidth, vw, bodyOverflowX: getComputedStyle(document.body).overflowX, htmlOverflowX: getComputedStyle(document.documentElement).overflowX, rows: rows.slice(0, 12) };
});
console.log(JSON.stringify(r, null, 1));
await b.close();
