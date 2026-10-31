import { chromium } from '@playwright/test';
const B = 'https://puppy.instabizweb.com';
const browser = await chromium.launch({ channel: 'msedge' });
const log = (k, v) => console.log(k, JSON.stringify(v));

// Mobile menu
let ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
let p = await ctx.newPage();
await p.goto(B + '/'); await p.waitForTimeout(1200);
const btn = p.locator('header button').first();
log('menuBtn', { text: await btn.innerText().catch(() => ''), aria: await btn.getAttribute('aria-label'), expanded: await btn.getAttribute('aria-expanded') });
await btn.click(); await p.waitForTimeout(900); log("menuDom", await p.evaluate(() => [...document.querySelectorAll("[class*=menu]")].slice(0,4).map(e => ({ tag: e.tagName, cls: e.className.toString().slice(0,60), role: e.getAttribute("role"), vis: getComputedStyle(e).visibility, links: [...e.querySelectorAll("a")].map(a => a.innerText.trim()).slice(0,9) }))));
log('menuOpen', { expanded: await btn.getAttribute('aria-expanded'), dialog: await p.locator('[role=dialog]').count(), links: await p.locator('[role=dialog] a, #mobile-menu a').allInnerTexts() });
await p.screenshot({ path: 'reference/screenshots/mobile-menu-390.png' });
log('actorHiddenOnTouch', await p.evaluate(() => { const l = document.querySelector('.pup-layer'); return l ? { hidden: l.hidden, cs: getComputedStyle(l).display } : null; }));
await ctx.close();

// Desktop interactions
ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
p = await ctx.newPage();
await p.goto(B + '/'); await p.waitForTimeout(1500);
log('actorDesktop', await p.evaluate(() => { const l = document.querySelector('.pup-layer'); return l ? { hidden: l.hidden, pos: getComputedStyle(l).position, z: getComputedStyle(l).zIndex, pe: getComputedStyle(l).pointerEvents } : null; }));
const t0 = await p.evaluate(() => document.querySelector('.pup-actor')?.style.transform);
await p.mouse.wheel(0, 1800); await p.waitForTimeout(1200);
const t1 = await p.evaluate(() => document.querySelector('.pup-actor')?.style.transform);
log('actorMovesOnScroll', { t0, t1 });
// click actor several times to collect bubble words
const words = new Set();
for (let i = 0; i < 14; i++) {
  await p.evaluate(() => document.querySelector(".pup-actor")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  for (let k = 0; k < 6; k++) { await p.waitForTimeout(80); const w = await p.evaluate(() => { const b = document.querySelector(".pup-bubble"); return b && b.dataset.show === "true" ? b.textContent : null; }); if (w) words.add(w); }
  await p.waitForTimeout(1300);
}
log("bubbleWords", [...words]);
// card hover
const card = p.locator("a.tp-pupcard, main section a[href^=\"/puppies/\"]").nth(3);
await card.scrollIntoViewIfNeeded(); await card.hover({ force: true }); await p.waitForTimeout(500);
log('cardHover', await card.evaluate(e => ({ tf: getComputedStyle(e).transform, tr: getComputedStyle(e).transition.slice(0, 80), img: e.querySelector('img') && getComputedStyle(e.querySelector('img')).transform })));
// FAQ page
await p.goto(B + '/faq'); await p.waitForTimeout(1000);
const q = p.locator('button[aria-expanded]').first();
log('faqBefore', await q.getAttribute('aria-expanded'));
await q.click(); await p.waitForTimeout(600);
log('faqAfter', { expanded: await q.getAttribute('aria-expanded'), tag: await q.evaluate(e => e.parentElement.tagName + '.' + e.parentElement.className.toString().slice(0, 60)) });
// Lightbox on happy-families
await p.goto(B + '/happy-families'); await p.waitForTimeout(1500);
const ph = p.locator('button[aria-label^="Open photo"]').first();
log('photoBtns', await p.locator('button[aria-label^="Open photo"]').count());
await ph.click(); await p.waitForTimeout(700);
log('lightbox', { dialog: await p.locator('[role=dialog]').count(), text: (await p.locator('[role=dialog]').first().innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 120) });
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(400);
log('afterArrow', (await p.locator('[role=dialog]').first().innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 80));
await p.keyboard.press('Escape'); await p.waitForTimeout(400);
log('afterEsc', await p.locator('[role=dialog]').count());
// Catalogue filters
await p.goto(B + '/puppies?breed=pomeranian'); await p.waitForTimeout(1200);
log('filterPom', { cards: await p.locator('main a[href^="/puppies/"]').count(), chips: await p.locator('main a[href*="breed="], main button[aria-pressed]').allInnerTexts() });
await p.goto(B + '/puppies?origin=imported'); await p.waitForTimeout(1200);
log('filterImported', await p.locator('main a[href^="/puppies/"]').count());
await p.goto(B + '/puppies?breed=zzz'); await p.waitForTimeout(1200);
log('emptyState', (await p.locator('main').innerText()).replace(/\s+/g, ' ').slice(0, 200));
// Contact validation
await p.goto(B + '/contact'); await p.waitForTimeout(1000);
await p.getByRole('button', { name: /send/i }).first().click(); await p.waitForTimeout(500);
log('contactInvalid', (await p.locator('form').first().innerText()).replace(/\s+/g, ' ').slice(0, 300));
log('formAction', await p.locator('form').first().evaluate(f => ({ action: f.action, method: f.method })));
// Scroll reveal
await p.goto(B + '/'); await p.waitForTimeout(800);
log('reveal', await p.evaluate(() => [...document.querySelectorAll('[class*="reveal"], [data-reveal]')].slice(0, 3).map(e => ({ cls: e.className.toString().slice(0, 60), op: getComputedStyle(e).opacity }))));
await browser.close();
