import { chromium } from '@playwright/test';
const B = 'http://localhost:3100';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const shot = async (url, name, sel) => {
  await p.goto(B + url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(1800);
  if (sel) { const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900); await el.screenshot({ path: `reference/shots/${name}.png` }); }
  else await p.screenshot({ path: `reference/shots/${name}.png` });
};
// hero with cursor hovering the lineup
await p.goto(B + '/', { waitUntil: 'networkidle' });
await p.mouse.move(150, 200); await p.mouse.move(520, 640, { steps: 30 });
await p.mouse.move(700, 700, { steps: 15 });
await p.waitForTimeout(1600);
await p.screenshot({ path: 'reference/shots/cute-hero.png' });
await shot('/how-it-works', 'cute-crew', 'section[aria-labelledby="hw-crew"]');
await shot('/puppies?origin=local', 'cute-empty', '[data-testid="empty-state"]');
await shot('/', 'cute-footer', 'footer');
await b.close();
console.log('ok');
