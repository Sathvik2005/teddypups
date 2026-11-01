// Post-deploy check of the real public URL: routes, images, console, doors, SEO tags, sitemap/robots.
import { chromium } from '@playwright/test';
const B = process.env.BASE || 'https://teddypups-mu.vercel.app';
const ROUTES = ['/', '/puppies', '/puppies/maltipoo-max-male', '/puppies/korean-teacup-maltipoo-female', '/puppies/shitzu-male', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact'];
const b = await chromium.launch({ channel: 'msedge' });
const results = [];
const note = (ok, label, extra = '') => { results.push(ok); console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${extra ? '  — ' + extra : ''}`); };

for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('console', m => m.type() === 'error' && errs.push(m.text().slice(0, 110)));
  p.on('pageerror', e => errs.push('PAGEERROR ' + e.message.slice(0, 110)));
  const failedReq = [];
  p.on('response', r => { if (r.status() >= 400) failedReq.push(`${r.status()} ${r.url().slice(0, 90)}`); });
  for (const r of ROUTES) {
    const res = await p.goto(B + r, { waitUntil: 'networkidle' });
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo({ top: y, behavior: 'instant' }); await new Promise(x => setTimeout(x, 50)); } scrollTo({ top: 0, behavior: 'instant' }); });
    await p.waitForTimeout(500);
    const info = await p.evaluate(() => ({
      h1: document.querySelectorAll('h1').length,
      overflow: document.documentElement.scrollWidth - innerWidth,
      broken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
      hidden: document.querySelectorAll('[data-reveal="hidden"]').length,
      title: document.title,
    }));
    const ok = res.status() === 200 && info.h1 === 1 && info.overflow <= 0 && info.broken === 0 && info.hidden === 0;
    note(ok, `${tag} ${r}`, ok ? info.title.slice(0, 48) : JSON.stringify({ status: res.status(), ...info }));
  }
  note(errs.length === 0, `${tag} console errors`, errs.slice(0, 3).join(' | '));
  note(failedReq.length === 0, `${tag} failed network requests`, failedReq.slice(0, 3).join(' | '));
  await ctx.close();
}

// doors: shut, open on hover, rail drags toward the edge
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto(B + '/', { waitUntil: 'networkidle' });
  const rail = p.getByRole('list', { name: 'Available puppies' });
  await rail.scrollIntoViewIfNeeded();
  const cos = i => p.locator('[data-door] .door-swing').nth(i).evaluate(el => { const m = getComputedStyle(el).transform; return m === 'none' ? 1 : Number(m.slice(m.indexOf('(') + 1).split(',')[0]); });
  note((await cos(0)) > 0.99, 'live: doors start shut');
  const bx = await p.locator('[data-door] .door-card').first().boundingBox();
  await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 6 });
  await p.waitForTimeout(1200);
  note((await cos(0)) < 0.5, 'live: door swings open under the cursor');
  const rb = await rail.boundingBox();
  const before = await rail.evaluate(e => e.scrollLeft);
  await p.mouse.move(rb.x + rb.width * 0.96, rb.y + 200, { steps: 8 });
  await p.waitForTimeout(900);
  note((await rail.evaluate(e => e.scrollLeft)) > before + 150, 'live: cursor near the edge drags the rail to the next doors');
  note((await p.getByTestId('pup-cursor').count()) === 1, 'live: puppy cursor is running');
  await ctx.close();
}

// SEO surface
const get = async path => (await fetch(B + path)).text();
const home = await get('/');
note(/<link rel="canonical" href="https:\/\/teddypups-mu\.vercel\.app\/?"/.test(home), 'live: canonical points at the real domain');
note(/property="og:image"/.test(home) && /name="twitter:card" content="summary_large_image"/.test(home), 'live: Open Graph image + Twitter card present');
note(/"@type":"Organization"/.test(home) && /"@type":"WebSite"/.test(home), 'live: Organization + WebSite JSON-LD present');
const sm = await get('/sitemap.xml');
note((sm.match(/<loc>/g) || []).length === 22 && sm.includes('teddypups-mu.vercel.app'), 'live: sitemap lists 22 URLs on the real domain', `${(sm.match(/<loc>/g) || []).length} urls`);
const robots = await get('/robots.txt');
note(/Sitemap: https:\/\/teddypups-mu\.vercel\.app\/sitemap\.xml/.test(robots) && /Allow: \//.test(robots), 'live: robots.txt allows crawling and points at the sitemap');
const nf = await fetch(B + '/definitely-not-here');
note(nf.status === 404, 'live: unknown route returns a real 404', String(nf.status));
const og = await fetch(B + '/opengraph-image');
note(og.status === 200 && (og.headers.get('content-type') || '').includes('image/png'), 'live: generated social image serves as PNG');
const fav = await fetch(B + '/icon.png');
note(fav.status === 200, 'live: favicon serves');
await b.close();
const pass = results.filter(Boolean).length;
console.log(`\n${pass}/${results.length} live checks passed`);
