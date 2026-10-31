// Measures the clone the same way capture.mjs measured the reference, and screenshots all 6 viewports.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
const B = process.env.BASE || 'http://localhost:3100';
const ref = JSON.parse(fs.readFileSync('reference/measurements.json', 'utf8'));
const VPS = [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [390, 844], [375, 812]];
const b = await chromium.launch({ channel: 'msedge' });
fs.mkdirSync('reference/shots', { recursive: true });
for (const [w, h] of VPS) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 70)); } scrollTo(0, 0); await new Promise(r => setTimeout(r, 500)); });
  const m = await p.evaluate(() => {
    const box = e => { const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y + scrollY) }; };
    const q = s => document.querySelector(s);
    const cta = [...document.querySelectorAll('main a')].find(a => /View available puppies/.test(a.textContent));
    return {
      header: box(q('header')),
      h1: { ...box(q('h1')), fs: getComputedStyle(q('h1')).fontSize },
      h2: getComputedStyle(q('h2')).fontSize,
      cta: cta && { ...box(cta), fs: getComputedStyle(cta).fontSize },
      footer: box(q('footer')),
      page: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      sections: [...document.querySelectorAll('main > section')].map(s => box(s).h),
    };
  });
  await p.screenshot({ path: `reference/shots/clone-home-${w}x${h}.png`, fullPage: true });
  const r = ref[w];
  console.log(`${w}x${h}`, JSON.stringify({ clone: { header: m.header.h, h1fs: m.h1.fs, h1h: m.h1.h, h2: m.h2, cta: m.cta && `${m.cta.w}x${m.cta.h}/${m.cta.fs}`, footerH: m.footer.h, overflow: m.overflow, sections: m.sections }, ref: r && { header: r.header.box.h, h1fs: r.h1.fontSize, h1h: r.h1.box.h, h2: r.h2s[0].fontSize, footerH: r.footer.box.h } }));
  await ctx.close();
}
await b.close();
