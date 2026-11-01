import { chromium } from '@playwright/test';
const B = process.env.BASE || 'http://localhost:3100';
const b = await chromium.launch({ channel: 'msedge' });
const ctx = await b.newContext({ viewport: { width: 1350, height: 940 } });
const p = await ctx.newPage();
await p.addInitScript(() => {
  window.__ls = [];
  new PerformanceObserver(list => {
    for (const e of list.getEntries()) {
      if (e.hadRecentInput) continue;
      window.__ls.push({
        t: Math.round(e.startTime), v: +e.value.toFixed(4),
        src: (e.sources || []).slice(0, 4).map(s => {
          const n = s.node;
          const d = n ? `${n.nodeName.toLowerCase()}.${String(n.className || '').toString().slice(0, 45)}` : '?';
          return `${d} y:${Math.round(s.previousRect.y)}->${Math.round(s.currentRect.y)} h:${Math.round(s.previousRect.height)}->${Math.round(s.currentRect.height)}`;
        }),
      });
    }
  }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto(B + '/', { waitUntil: 'load' });
await p.waitForTimeout(2500);
const total1 = await p.evaluate(() => window.__ls.reduce((a, e) => a + e.v, 0));
console.log('CLS after load (no scrolling):', total1.toFixed(4));
// scroll like a visitor to the bottom, slowly, then wait
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(r => setTimeout(r, 120)); } });
await p.waitForTimeout(2500);
const ls = await p.evaluate(() => window.__ls);
console.log('CLS total after scrolling to bottom:', ls.reduce((a, e) => a + e.v, 0).toFixed(4));
for (const e of ls.filter(e => e.v > 0.001)) console.log(`  t=${e.t}ms v=${e.v}`, e.src.join(' | '));
await b.close();
