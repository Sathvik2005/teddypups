import { chromium } from '@playwright/test';
const B = 'http://localhost:3000';
const b = await chromium.launch({ channel: 'msedge' });
const shoot = async (w, h, url, name, steps = 0, clip) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.goto(B + url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(2200);
  for (let i = 0; i < steps; i++) { await p.mouse.wheel(0, h * 0.85); await p.waitForTimeout(900); }
  await p.waitForTimeout(500);
  await p.screenshot({ path: `reference/shots/${name}.png`, ...(clip ? { clip } : {}) });
  await ctx.close();
};
await shoot(1440, 900, '/', 'rd-hero');
await shoot(1440, 900, '/', 'rd-meet', 1);
await shoot(1440, 900, '/', 'rd-two', 2);
await shoot(1440, 900, '/', 'rd-journey', 4);
await shoot(1440, 900, '/', 'rd-trust', 6);
await shoot(1440, 900, '/puppies', 'rd-puppies');
await shoot(390, 844, '/', 'rd-mobile-hero');
await b.close();
console.log('ok');
