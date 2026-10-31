// Reference-site capture + measurement script (research only).
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const B = 'https://puppy.instabizweb.com';
const VPS = [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [390, 844], [375, 812]];
const PAGES = { home: '/', puppies: '/puppies', 'happy-families': '/happy-families', 'gone-home': '/gone-home', 'how-it-works': '/how-it-works', faq: '/faq', contact: '/contact', 'pup-max': '/puppies/maltipoo-max-male' };
const out = 'reference/screenshots';
const report = {};
const browser = await chromium.launch({ channel: 'msedge' });

async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await page.evaluate(y => window.scrollTo(0, y), y); await page.waitForTimeout(100); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

for (const [w, h] of VPS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', m => m.type() === 'error' && errors.push(m.text().slice(0, 160)));
  const names = w === 1440 || w === 390 ? Object.keys(PAGES) : ['home'];
  for (const n of names) {
    await page.goto(B + PAGES[n]);
    await settle(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    if (overflow) errors.push('H-OVERFLOW ' + n);
    await page.screenshot({ path: `${out}/${n}-${w}x${h}.png`, fullPage: true }).catch(e => errors.push('shot ' + n + ' ' + e.message.slice(0, 80)));
  }
  report[`${w}x${h}`] = { errors };
  await ctx.close();
}

const m = {};
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(B + '/');
  await settle(page);
  m[w] = await page.evaluate(() => {
    const T = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'borderRadius', 'padding', 'border', 'boxShadow'];
    const cs = (el, props) => { const s = getComputedStyle(el); return Object.fromEntries(props.map(p => [p, s[p]])); };
    const box = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
    const q = s => document.querySelector(s);
    const r = {};
    r.body = cs(document.body, T);
    r.bodyBgImage = getComputedStyle(document.body).backgroundImage.slice(0, 160);
    r.header = q('header') && { box: box(q('header')), ...cs(q('header'), ['position', 'backgroundColor', 'borderBottom', 'backdropFilter']) };
    r.h1 = q('h1') && { text: q('h1').innerText, box: box(q('h1')), ...cs(q('h1'), T) };
    r.h2s = [...document.querySelectorAll('h2')].map(e => ({ text: e.innerText.slice(0, 40), box: box(e), ...cs(e, ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'color']) }));
    r.sections = [...document.querySelectorAll('main section')].slice(0, 30).map(e => ({ cls: e.className.toString().slice(0, 80), box: box(e), bg: getComputedStyle(e).backgroundColor }));
    r.buttons = [...document.querySelectorAll('main a, header a')].filter(a => parseFloat(getComputedStyle(a).borderRadius) > 20 && a.innerText.trim()).slice(0, 8).map(a => ({ text: a.innerText.slice(0, 30), box: box(a), ...cs(a, T) }));
    r.nav = [...document.querySelectorAll('header nav a')].map(a => ({ text: a.innerText, box: box(a), ...cs(a, ['fontSize', 'fontWeight', 'color']) }));
    r.footer = q('footer') && { box: box(q('footer')), ...cs(q('footer'), ['backgroundColor', 'color']) };
    r.cards = [...document.querySelectorAll('a[href^="/puppies/"]')].slice(0, 2).map(a => ({ box: box(a), html: a.outerHTML.slice(0, 900) }));
    r.actor = [...document.querySelectorAll('[class*="actor"], [class*="pup-"]')].slice(0, 6).map(e => ({ tag: e.tagName, cls: e.className.toString().slice(0, 120), html: e.outerHTML.slice(0, 1000), css: cs(e, ['position', 'width', 'height', 'transition', 'pointerEvents', 'zIndex', 'transform']) }));
    return r;
  });
  await ctx.close();
}
fs.writeFileSync('reference/measurements.json', JSON.stringify(m, null, 1));
fs.writeFileSync('reference/capture-report.json', JSON.stringify(report, null, 1));
await browser.close();
console.log('done', JSON.stringify(report));
