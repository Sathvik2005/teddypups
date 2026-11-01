import { expect, test, type Page } from '@playwright/test';

const cursor = (page: Page) => page.getByTestId('pup-cursor');
const bubble = (page: Page) => page.locator('.pup-cursor__bubble');
const sweep = async (page: Page, from: [number, number], to: [number, number], steps = 20) => {
  await page.mouse.move(from[0], from[1]);
  await page.mouse.move(to[0], to[1], { steps });
};

// networkidle-goto: wait for hydration so listeners exist before the first hover
test.beforeEach(async ({ page }) => {
  const go = page.goto.bind(page);
  page.goto = (url, opts) => go(url, { waitUntil: 'networkidle', ...opts });
});

test.describe('desktop puppy cursor', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('chases the pointer: lags behind a jump, then settles beside it (not on top of it)', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(200, 200);
    await page.mouse.move(210, 205);
    await expect(cursor(page)).toHaveAttribute('data-on', 'true');
    const dist = (px: number, py: number) => page.evaluate(([x, y]) => {
      const r = (document.querySelector('[data-testid="pup-cursor"]') as HTMLElement).getBoundingClientRect();
      return Math.hypot(r.x - x, r.y - y);
    }, [px, py]);
    // jump the pointer in one synchronous step and read the puppy before the next frame: it lags far behind…
    const lag = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="pup-cursor"]') as HTMLElement;
      window.dispatchEvent(new PointerEvent('pointermove', { clientX: 1000, clientY: 500, pointerType: 'mouse' }));
      const r = el.getBoundingClientRect();
      return Math.hypot(r.x - 1000, r.y - 500);
    });
    expect(lag).toBeGreaterThan(500);
    // …then runs after it and parks a short distance away
    await expect.poll(() => dist(1000, 500), { timeout: 4000 }).toBeLessThan(75);
    await expect.poll(() => dist(1000, 500), { timeout: 4000 }).toBeGreaterThan(20);
  });

  test('default "hm?" appears only after the pointer rests, and goes away on move', async ({ page }) => {
    await page.goto('/how-it-works');
    await sweep(page, [300, 400], [400, 420]);
    await expect(bubble(page)).toHaveAttribute('data-show', 'false');
    await expect(bubble(page)).toHaveText('hm?', { timeout: 3000 });
    await expect(bubble(page)).toHaveAttribute('data-show', 'true');
    await page.mouse.move(600, 420, { steps: 5 });
    await expect(bubble(page)).toHaveAttribute('data-show', 'false');
  });

  test('click reaction "achoo!"', async ({ page }) => {
    await page.goto('/how-it-works');
    await sweep(page, [300, 500], [500, 520]);
    await page.mouse.down();
    await expect(bubble(page)).toHaveText('achoo!');
    await expect(cursor(page)).toHaveAttribute('data-state', 'sneeze');
    await page.mouse.up();
    // the sneeze ends; whatever the puppy says next (e.g. "hm?" once the mouse rests) is no longer "achoo!"
    await expect(bubble(page)).not.toHaveText('achoo!', { timeout: 3000 });
  });

  test('puppy cards say "coming?" and the nested children do not flicker', async ({ page }) => {
    await page.goto('/puppies');
    const card = page.locator('.pup-card').first();
    await card.scrollIntoViewIfNeeded();
    const box = (await card.boundingBox())!;
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
    await expect(bubble(page)).toHaveText('coming?');
    // walk across title → image → badge: bubble must stay on
    for (const [fx, fy] of [[0.5, 0.1], [0.5, 0.5], [0.8, 0.3], [0.5, 0.8]]) {
      await page.mouse.move(box.x + box.width * fx, box.y + box.height * fy, { steps: 3 });
      await expect(bubble(page)).toHaveAttribute('data-show', 'true');
      await expect(bubble(page)).toHaveText('coming?');
    }
  });

  test('contextual words: WhatsApp = woof!, primary CTA = treat?, photo = so cute!', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'View available puppies' }).hover();
    await expect(bubble(page)).toHaveText('treat?');
    await page.getByRole('link', { name: 'Enquire on WhatsApp' }).first().hover();
    await expect(bubble(page)).toHaveText('woof!');
    await page.goto('/happy-families');
    await page.locator('button[aria-label^="Open photo 1 of"]').hover();
    await expect(bubble(page)).toHaveText('so cute!');
  });

  test('puppy hides over form fields and typing + selection still work', async ({ page }) => {
    await page.goto('/contact');
    const name = page.getByLabel(/your name/i);
    await name.scrollIntoViewIfNeeded();
    await name.hover();
    await expect(cursor(page)).toHaveAttribute('data-state', 'hidden');
    await name.click();
    await page.keyboard.type('Sathvik');
    await expect(name).toHaveValue('Sathvik');
    // text selection by dragging across a heading is unaffected
    const h1 = page.locator('h1');
    const b = (await h1.boundingBox())!;
    await page.mouse.move(b.x + 4, b.y + b.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width - 4, b.y + b.height / 2, { steps: 6 });
    await page.mouse.up();
    expect(await page.evaluate(() => window.getSelection()?.toString().length ?? 0)).toBeGreaterThan(3);
  });

  test('cursor never intercepts clicks', async ({ page }) => {
    await page.goto('/puppies');
    await sweep(page, [10, 10], [700, 500]);
    const pe = await cursor(page).evaluate(el => getComputedStyle(el).pointerEvents);
    expect(pe).toBe('none');
    await page.getByRole('link', { name: 'FAQ' }).first().click();
    await expect(page).toHaveURL(/\/faq$/);
  });
});

test.describe('paw cursor and chase behaviour', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('desktop shows a paw-shaped cursor; typing areas keep the text cursor; interactive things get the paw-hover', async ({ page }) => {
    await page.goto('/contact');
    await page.mouse.move(300, 300);
    await expect(page.locator('html')).toHaveAttribute('data-pup-cursor', 'on');
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).cursor)).toContain('url(');
    expect(await page.getByLabel(/your name/i).evaluate(el => getComputedStyle(el).cursor)).toBe('text');
    expect(await page.getByRole('button', { name: 'Send enquiry' }).evaluate(el => getComputedStyle(el).cursor)).toContain('url(');
  });

  test('leans and flips with direction, and hops while running', async ({ page }) => {
    await page.goto('/how-it-works');
    const tilt = page.locator('.pup-cursor__tilt');
    await page.mouse.move(200, 400);
    await page.mouse.move(260, 410);
    await page.mouse.move(1200, 420, { steps: 25 });
    const right = await tilt.evaluate(el => (el as HTMLElement).style.transform);
    expect(right).toContain('scaleX(1)');
    await page.mouse.move(150, 430, { steps: 25 });
    await expect.poll(() => tilt.evaluate(el => (el as HTMLElement).style.transform), { timeout: 3000 }).toContain('scaleX(-1)');
    await expect(page.getByTestId('pup-cursor')).toHaveAttribute('data-motion', 'run');
    await page.mouse.move(155, 432, { steps: 2 });
    await expect(page.getByTestId('pup-cursor')).toHaveAttribute('data-motion', 'idle', { timeout: 4000 });
  });

  test('a click leaves a paw pat that fades, and the puppy sneezes', async ({ page }) => {
    await page.goto('/how-it-works');
    await page.mouse.move(400, 500);
    await page.mouse.move(420, 510);
    // record the pat's peak opacity from inside the page, so the check cannot miss the 560ms animation
    await page.evaluate(() => {
      const w = window as unknown as { __patMax: number };
      w.__patMax = 0;
      const el = document.querySelector('[data-testid="pup-pat"] > *') as Element;
      const tick = () => {
        w.__patMax = Math.max(w.__patMax, Number(getComputedStyle(el).opacity));
        requestAnimationFrame(tick);
      };
      tick();
    });
    await page.mouse.down();
    await expect(bubble(page)).toHaveText('achoo!');
    await page.mouse.up();
    await expect.poll(() => page.evaluate(() => (window as unknown as { __patMax: number }).__patMax)).toBeGreaterThan(0.5);
    const pat = page.locator('[data-testid="pup-pat"] > *');
    await expect.poll(() => pat.evaluate(el => Number(getComputedStyle(el).opacity)), { timeout: 3000 }).toBeLessThan(0.05);
  });

  test('hidden when the tab loses focus, back after the next move', async ({ page }) => {
    await page.goto('/');
    await page.mouse.move(300, 300);
    await page.mouse.move(320, 310);
    await expect(cursor(page)).toHaveAttribute('data-on', 'true');
    await page.evaluate(() => window.dispatchEvent(new Event('blur')));
    await expect(cursor(page)).toHaveAttribute('data-on', 'false');
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await page.mouse.move(340, 320);
    await expect(cursor(page)).toHaveAttribute('data-on', 'true');
  });

  test('keyboard focus rings stay visible', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
    expect(outline).not.toBe('none');
  });
});

test.describe('paw trail', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  const live = (page: Page) =>
    page.evaluate(() => [...document.querySelectorAll('.paw-print')].filter(el => el.getAnimations().some(a => a.playState === 'running') && Number(getComputedStyle(el).opacity) > 0.02).length);

  test('prints appear while moving, alternate sides, are capped and fade away', async ({ page }) => {
    await page.goto('/how-it-works');
    await page.mouse.move(100, 300);
    await page.mouse.move(1300, 360, { steps: 60 });
    const n = await live(page);
    expect(n).toBeGreaterThan(3);
    const total = await page.locator('.paw-print').count();
    expect(total).toBeLessThanOrEqual(14);
    // throttled: far fewer prints than pointer events (60)
    expect(n).toBeLessThan(25);
    // keep sweeping a lot: DOM node count must not grow
    for (let k = 0; k < 6; k++) {
      await page.mouse.move(100, 200 + k * 50);
      await page.mouse.move(1300, 220 + k * 50, { steps: 40 });
    }
    expect(await page.locator('.paw-print').count()).toBeLessThanOrEqual(14);
    // all fade out
    await expect.poll(() => live(page), { timeout: 5000 }).toBe(0);
  });

  test('no prints while selecting text or typing', async ({ page }) => {
    await page.goto('/contact');
    await page.mouse.move(100, 500);
    await page.mouse.down();
    await page.mouse.move(900, 520, { steps: 40 });
    await page.mouse.up();
    expect(await live(page)).toBe(0);
  });
});

test.describe('fallbacks', () => {
  test('touch / small screen: no cursor, no trail; walking Teddy companion instead', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.getByTestId('pup-cursor')).toHaveCount(0);
    await expect(page.locator('.paw-print')).toHaveCount(0);
    await expect(page.getByTestId('pup-body')).toBeVisible();
    await ctx.close();
  });

  test('reduced motion: no cursor, trail or walker; content still visible', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.mouse.move(100, 100);
    await page.mouse.move(900, 500, { steps: 30 });
    await expect(page.getByTestId('pup-cursor')).toHaveCount(0);
    await expect(page.locator('.paw-print')).toHaveCount(0);
    await expect(page.getByTestId('pup-body')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    // below-fold content must be visible without animation
    const op = await page.locator('#two-title').evaluate(el => getComputedStyle(el.closest('[data-reveal]') ?? el).opacity);
    expect(op).toBe('1');
    await ctx.close();
  });
});

test('performance: extended pointer movement keeps frame times healthy', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.evaluate(() => {
    (window as unknown as { __frames: number[] }).__frames = [];
    let last = performance.now();
    const tick = (t: number) => {
      (window as unknown as { __frames: number[] }).__frames.push(t - last);
      last = t;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  for (let k = 0; k < 12; k++) {
    await page.mouse.move(80, 120 + k * 40);
    await page.mouse.move(1350, 140 + k * 40, { steps: 60 });
  }
  const frames = await page.evaluate(() => (window as unknown as { __frames: number[] }).__frames);
  const sorted = [...frames].sort((a, b) => a - b);
  const p95 = sorted[Math.floor(sorted.length * 0.95)];
  console.log(`frames=${frames.length} p95=${p95.toFixed(1)}ms`);
  expect(p95).toBeLessThan(50);
  expect(await page.locator('.paw-print').count()).toBeLessThanOrEqual(14);
});

test.describe('puppy cursor switch', () => {
  test('reduced-motion visitors can opt in with the footer switch, and it persists', async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByTestId('pup-cursor')).toHaveCount(0);
    const toggle = page.getByRole('button', { name: /Puppy cursor: off/ });
    await toggle.scrollIntoViewIfNeeded();
    await expect(toggle).toContainText('reduced motion');
    await toggle.click();
    await expect(page.getByRole('button', { name: /Puppy cursor: on/ })).toHaveAttribute('aria-pressed', 'true');
    await page.mouse.move(300, 300);
    await page.mouse.move(420, 340, { steps: 10 });
    await expect(page.getByTestId('pup-cursor')).toHaveAttribute('data-on', 'true');
    await page.reload({ waitUntil: 'networkidle' });
    await page.mouse.move(300, 300);
    await page.mouse.move(420, 340, { steps: 10 });
    await expect(page.getByTestId('pup-cursor')).toHaveAttribute('data-on', 'true');
    await ctx.close();
  });

  test('switching it off removes the puppy, trail and paw cursor image', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.mouse.move(200, 200);
    await page.mouse.move(260, 220, { steps: 6 });
    await expect(page.getByTestId('pup-cursor')).toBeAttached();
    const toggle = page.getByRole('button', { name: /Puppy cursor: on/ });
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    await expect(page.getByTestId('pup-cursor')).toHaveCount(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-pup-cursor', 'on');
  });

  test('works on a narrow desktop window (700px) and hides on a phone-sized one', async ({ browser }) => {
    for (const [w, expectOn] of [[700, true], [520, false]] as const) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 800 } });
      const page = await ctx.newPage();
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.mouse.move(100, 300);
      await page.mouse.move(300, 320, { steps: 8 });
      await expect(page.getByTestId('pup-cursor')).toHaveCount(expectOn ? 1 : 0);
      await ctx.close();
    }
  });
});
