import { chromium } from '@playwright/test';
const b = await chromium.launch({ channel: 'msedge' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:3000/puppies', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
// run across the page → mid-chase frame with trail
await p.mouse.move(120, 520); await p.mouse.move(150, 530);
await p.mouse.move(820, 560, { steps: 40 });
await p.screenshot({ path: 'reference/shots/puppy-chase.png', clip: { x: 0, y: 380, width: 1000, height: 300 } });
// settle beside the pointer over a card (coming?)
const card = p.locator('.pup-card').first();
await card.scrollIntoViewIfNeeded();
const bx = (await card.boundingBox());
await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 20 });
await p.waitForTimeout(1400);
await p.screenshot({ path: 'reference/shots/puppy-card.png', clip: { x: Math.max(0, bx.x - 80), y: Math.max(0, bx.y - 40), width: 460, height: 420 } });
await b.close();
console.log('ok');
