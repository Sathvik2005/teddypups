// Responsive audit: every route type at 10 viewports. Reports overflow, off-screen elements, clipped text, tiny touch targets, broken images.
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const B = process.env.BASE || 'http://localhost:3100';
const VPS = [360, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920];
const ROUTES = ['/', '/puppies', '/puppies/maltipoo-max-male', '/puppies/korean-teacup-maltipoo-female', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact', '/nope'];
const b = await chromium.launch({ channel: 'msedge' });
const out = [];
let loads = 0;

for (const w of VPS) {
  const h = w < 700 ? 800 : w < 1100 ? 1000 : 900;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 1024, isMobile: w < 700 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', m => m.type() === 'error' && !/404/.test(m.text()) && consoleErrors.push(m.text().slice(0, 120)));
  for (const r of ROUTES) {
    await page.goto(B + r, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(res => setTimeout(res, 40)); }
      scrollTo(0, 0);
      await new Promise(res => setTimeout(res, 300));
    });
    const res = await page.evaluate(() => {
      const vw = innerWidth;
      const issues = [];
      const overflow = document.documentElement.scrollWidth - vw;
      if (overflow > 0) issues.push(`H-OVERFLOW ${overflow}px`);
      const scrollers = new Set([...document.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return /(auto|scroll|clip|hidden)/.test(s.overflowX) && e.scrollWidth > e.clientWidth; }));
      const inScroller = el => { for (let p = el.parentElement; p; p = p.parentElement) if (scrollers.has(p)) return true; return false; };
      // text/controls poking outside the viewport (ignore decorative, hidden, and anything inside an intentional scroller)
      const offscreen = [];
      for (const e of document.querySelectorAll('h1,h2,h3,p,a,button,input,select,textarea,label,li')) {
        const r = e.getBoundingClientRect();
        if (!r.width || !r.height) continue;
        const cs = getComputedStyle(e);
        if (cs.visibility === 'hidden' || cs.display === 'none') continue;
        if (e.closest('[aria-hidden="true"], .marquee, [data-reveal="hidden"]') || inScroller(e)) continue;
        if (r.right > vw + 1 || r.left < -1) offscreen.push(`${e.tagName.toLowerCase()}:${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 28)} [${Math.round(r.left)}..${Math.round(r.right)}]`);
      }
      if (offscreen.length) issues.push(`OFFSCREEN ${offscreen.slice(0, 4).join(' | ')}${offscreen.length > 4 ? ` (+${offscreen.length - 4})` : ''}`);
      // text clipped by its own box
      const clipped = [...document.querySelectorAll('h1,h2,h3,p,button,a')].filter(e => {
        const cs = getComputedStyle(e);
        return /(hidden|clip)/.test(cs.overflow) && e.scrollWidth > e.clientWidth + 2 && !e.closest('.marquee, [aria-hidden="true"]') && e.clientWidth > 0 && cs.display !== 'inline';
      }).map(e => (e.textContent || '').trim().slice(0, 24));
      if (clipped.length) issues.push(`CLIPPED ${clipped.slice(0, 3).join(' | ')}`);
      // touch targets (<44px on either axis) among visible, non-inline interactive elements
      const small = [];
      for (const e of document.querySelectorAll('a[href],button,input:not([type=hidden]),select,textarea,summary')) {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        if (!r.width || cs.visibility === 'hidden' || e.closest('[aria-hidden="true"]') || e.tabIndex < 0 && e.tagName !== 'A') continue;
        const inline = cs.display === 'inline';
        if (inline) continue; // inline text links follow WCAG's inline exception
        if (r.height < 40 || r.width < 40) small.push(`${(e.textContent || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 22)} ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0).length;
      if (broken) issues.push(`BROKEN-IMG ${broken}`);
      return { issues, small: small.slice(0, 6), smallCount: small.length };
    });
    loads++;
    out.push({ w, route: r, ...res });
  }
  if (consoleErrors.length) out.push({ w, route: '(console)', issues: [...new Set(consoleErrors)] });
  await ctx.close();
}
await b.close();
fs.writeFileSync('reference/audit-responsive.json', JSON.stringify(out, null, 1));
const bad = out.filter(o => o.issues?.length);
console.log(`loads=${loads} routes-with-issues=${bad.length}`);
for (const o of bad) console.log(`${o.w}px ${o.route}: ${o.issues.join(' ; ')}`);
const tiny = {};
for (const o of out) if (o.smallCount && o.w <= 430) for (const s of o.small || []) tiny[s] = (tiny[s] || 0) + 1;
console.log('--- small touch targets (<40px) on phones:', JSON.stringify(Object.entries(tiny).slice(0, 12)));
