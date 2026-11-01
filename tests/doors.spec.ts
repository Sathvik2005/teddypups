import { expect, test, type Locator, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  const go = page.goto.bind(page);
  page.goto = (url, opts) => go(url, { waitUntil: 'networkidle', ...opts });
});

const swing = (page: Page, n: number) => page.locator('[data-door] .door-swing').nth(n);

/** cos(swing angle) read from the computed matrix: 1 = door shut, below 0.5 = clearly open. */
const closure = (loc: Locator) =>
  loc.evaluate(el => {
    const m = getComputedStyle(el).transform;
    if (m === 'none') return 1;
    return Number(m.slice(m.indexOf('(') + 1).split(',')[0]);
  });

test.describe('door rail (desktop)', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('doors start shut and swing open under the cursor, then close again', async ({ page }) => {
    await page.goto('/');
    const rail = page.getByRole('list', { name: 'Available puppies' });
    await rail.scrollIntoViewIfNeeded();
    expect(await closure(swing(page, 0))).toBeGreaterThan(0.99);
    const card = page.locator('[data-door] .door-card').first();
    const b = (await card.boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 6 });
    await expect.poll(() => closure(swing(page, 0)), { timeout: 3000 }).toBeLessThan(0.5);
    // the neighbouring door stays shut
    expect(await closure(swing(page, 1))).toBeGreaterThan(0.99);
    await page.mouse.move(20, 20, { steps: 6 });
    await expect.poll(() => closure(swing(page, 0)), { timeout: 3000 }).toBeGreaterThan(0.99);
  });

  test('moving the cursor toward the right edge drags the rail on to the next doors', async ({ page }) => {
    await page.goto('/');
    const rail = page.getByRole('list', { name: 'Available puppies' });
    await rail.scrollIntoViewIfNeeded();
    const b = (await rail.boundingBox())!;
    const before = await rail.evaluate(el => el.scrollLeft);
    await page.mouse.move(b.x + b.width * 0.5, b.y + 200, { steps: 5 });
    await page.mouse.move(b.x + b.width * 0.96, b.y + 200, { steps: 8 });
    await page.waitForTimeout(900);
    const after = await rail.evaluate(el => el.scrollLeft);
    expect(after).toBeGreaterThan(before + 150);
    // and back toward the left edge drags it back
    await page.mouse.move(b.x + b.width * 0.04, b.y + 200, { steps: 8 });
    await page.waitForTimeout(1200);
    expect(await rail.evaluate(el => el.scrollLeft)).toBeLessThan(after - 100);
  });

  test('keyboard focus opens a door and the rail buttons scroll', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('[data-door] a').first();
    await link.scrollIntoViewIfNeeded();
    await link.focus();
    await expect(link).toBeFocused();
    await expect.poll(() => closure(swing(page, 0)), { timeout: 3000 }).toBeLessThan(0.5);
    const rail = page.getByRole('list', { name: 'Available puppies' });
    const before = await rail.evaluate(el => el.scrollLeft);
    await page.getByRole('button', { name: 'Scroll puppies right' }).click();
    await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(before + 100);
  });

  test('the catalogue keeps photo-first cards (no shut doors)', async ({ page }) => {
    await page.goto('/puppies');
    await expect(page.locator('.door-swing')).toHaveCount(0);
  });
});

test('touch: the door nearest the centre opens', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto('/');
  const rail = page.getByRole('list', { name: 'Available puppies' });
  await rail.scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('.door-card[data-open="true"]').count(), { timeout: 4000 }).toBeGreaterThan(0);
  await ctx.close();
});
