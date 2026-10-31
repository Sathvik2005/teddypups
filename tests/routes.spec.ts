import { expect, test, type Page } from '@playwright/test';
import { puppies } from '../src/data/puppies';
import { families } from '../src/data/families';
import { goneHome } from '../src/data/gone-home';

const ROUTES = ['/', '/puppies', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact', ...puppies.map(p => `/puppies/${p.slug}`)];
const VIEWPORTS = [[1920, 1080], [1440, 900], [1024, 768], [768, 1024], [390, 844], [375, 812]] as const;

test.beforeEach(async ({ page }) => {
  const go = page.goto.bind(page);
  page.goto = (url, opts) => go(url, { waitUntil: 'networkidle', ...opts });
});

const slowScroll = async (page: Page) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 320) {
    await page.evaluate(v => scrollTo(0, v), y);
    await page.waitForTimeout(90);
  }
};

test.describe('every route', () => {
  for (const r of ROUTES) {
    test(`${r} renders, has one h1, no console errors, no broken images`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', m => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', e => errors.push(e.message));
      const res = await page.goto(r);
      expect(res!.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await slowScroll(page);
      const broken = await page.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc));
      expect(broken).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

  test('unknown route shows the friendly 404', async ({ page }) => {
    const res = await page.goto('/this-page-wandered-off');
    expect(res!.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: /wandered off/i })).toBeVisible();
  });
});

test.describe('responsive: no horizontal overflow', () => {
  for (const [w, h] of VIEWPORTS) {
    test(`${w}x${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: h });
      for (const r of ['/', '/puppies', '/puppies/maltipoo-max-male', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact']) {
        await page.goto(r);
        const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        expect(over, `${r} at ${w}px`).toBeLessThanOrEqual(0);
      }
    });
  }
});

test('scroll reveals: everything ends up visible after a normal scroll (desktop and mobile)', async ({ browser }) => {
  for (const vp of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const ctx = await browser.newContext({ viewport: vp });
    const page = await ctx.newPage();
    await page.goto('/');
    await slowScroll(page);
    await page.waitForTimeout(900);
    expect(await page.locator('[data-reveal="hidden"]').count(), `hidden reveals at ${vp.width}`).toBe(0);
    await ctx.close();
  }
});

test.describe('navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('header links navigate and mark the active page', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const [name, url] of [['Puppies', '/puppies'], ['Happy families', '/happy-families'], ['How it works', '/how-it-works'], ['FAQ', '/faq'], ['Visit & contact', '/contact'], ['Home', '/']] as const) {
      await nav.getByRole('link', { name }).click();
      await expect(page).toHaveURL(new RegExp(`${url === '/' ? '/$' : url + '$'}`));
      await expect(nav.getByRole('link', { name })).toHaveAttribute('aria-current', 'page');
    }
  });

  test('footer links are all live', async ({ page, request }) => {
    await page.goto('/');
    const hrefs = await page.locator('footer a[href^="/"]').evaluateAll(els => els.map(e => (e as HTMLAnchorElement).getAttribute('href')!));
    expect(hrefs.length).toBeGreaterThanOrEqual(7);
    for (const h of hrefs) expect((await request.get(h.split('#')[0])).status(), h).toBe(200);
  });

  test('skip link jumps to main content', async ({ page }) => {
    await page.goto('/faq');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  });
});

test('mobile menu opens, lists every link, closes with Escape and on navigation', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Menu' });
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
  await btn.tap();
  const dlg = page.getByRole('dialog', { name: 'Menu' });
  await expect(dlg).toBeVisible();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  for (const l of ['Home', 'Puppies', 'Happy families', 'How it works', 'FAQ', 'Visit & contact', 'WhatsApp us']) await expect(dlg.getByRole('link', { name: l })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dlg).toBeHidden();
  await btn.tap();
  await dlg.getByRole('link', { name: 'FAQ' }).tap();
  await expect(page).toHaveURL(/\/faq$/);
  await expect(dlg).toBeHidden();
  await ctx.close();
});

test.describe('catalogue', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  const cards = (page: Page) => page.getByTestId('puppy-grid').locator('li');
  const count = (f: (p: (typeof puppies)[number]) => boolean) => puppies.filter(f).length;

  test('lists all 15 puppies with Available badges and links to every profile', async ({ page }) => {
    await page.goto('/puppies');
    await expect(cards(page)).toHaveCount(15);
    await expect(page.locator('.badge-available')).toHaveCount(15);
    const hrefs = await cards(page).locator('a').evaluateAll(a => a.map(x => x.getAttribute('href')));
    expect(hrefs).toEqual(puppies.map(p => `/puppies/${p.slug}`));
  });

  for (const [q, fn] of [
    ['breed=maltipoo', (p: (typeof puppies)[number]) => p.tags.includes('maltipoo')],
    ['breed=pomeranian', (p: (typeof puppies)[number]) => p.tags.includes('pomeranian')],
    ['breed=poodle', (p: (typeof puppies)[number]) => p.tags.includes('poodle')],
    ['breed=cavapoo', (p: (typeof puppies)[number]) => p.tags.includes('cavapoo')],
    ['breed=shih-tzu', (p: (typeof puppies)[number]) => p.tags.includes('shih-tzu')],
    ['origin=imported', () => true],
    ['gender=girl', (p: (typeof puppies)[number]) => p.gender.includes('girl')],
  ] as const) {
    test(`?${q} filters correctly`, async ({ page }) => {
      await page.goto(`/puppies?${q}`);
      await expect(cards(page)).toHaveCount(count(fn));
    });
  }

  test('?origin=local shows the empty state', async ({ page }) => {
    await page.goto('/puppies?origin=local');
    await expect(page.getByTestId('empty-state')).toBeVisible();
  });

  test('chips update the URL and combine; clear filters resets', async ({ page }) => {
    await page.goto('/puppies');
    await page.getByRole('link', { name: 'Pomeranian', exact: true }).click();
    await expect(page).toHaveURL(/breed=pomeranian/);
    await page.getByRole('link', { name: 'Boys' }).click();
    await expect(page).toHaveURL(/breed=pomeranian&gender=boy|gender=boy&breed=pomeranian/);
    await expect(cards(page)).toHaveCount(count(p => p.tags.includes('pomeranian') && p.gender.includes('boy')));
    await page.getByRole('link', { name: 'Clear filters' }).click();
    await expect(cards(page)).toHaveCount(15);
  });

  test('card opens the puppy profile', async ({ page }) => {
    await page.goto('/puppies');
    await cards(page).first().getByRole('link').click();
    await expect(page).toHaveURL(/\/puppies\/maltipoo-max-male$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Max' })).toBeVisible();
  });
});

test.describe('puppy profile', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('gallery counter, arrows and keyboard', async ({ page }) => {
    await page.goto('/puppies/korean-teacup-maltipoo-female');
    await expect(page.getByText('1 / 11')).toBeVisible();
    await page.getByRole('button', { name: 'Next photo' }).click();
    await expect(page.getByText('2 / 11')).toBeVisible();
    await page.getByRole('button', { name: 'Previous photo' }).click();
    await page.getByRole('button', { name: 'Previous photo' }).click();
    await expect(page.getByText('11 / 11')).toBeVisible();
  });

  test('WhatsApp enquiry includes the puppy name and profile URL', async ({ page }) => {
    await page.goto('/puppies/maltipoo-max-male');
    const href = await page.getByRole('link', { name: /Ask about this puppy on WhatsApp/ }).getAttribute('href');
    const url = new URL(href!);
    expect(url.origin + url.pathname).toBe('https://wa.me/971541676733');
    const text = url.searchParams.get('text')!;
    expect(text).toContain('Max');
    expect(text).toMatch(/\/puppies\/maltipoo-max-male$/);
  });

  test('video listings expose a playable video', async ({ page }) => {
    await page.goto('/puppies/maltipoo-max-male');
    await page.getByRole('button', { name: /Show video 2 of 2/ }).click();
    await expect(page.locator('video')).toBeVisible();
  });

  test('previous / next pup and related pups link to real profiles', async ({ page, request }) => {
    await page.goto('/puppies/maltipoo-max-male');
    const hrefs = await page.locator('a[href^="/puppies/"]').evaluateAll(a => [...new Set(a.map(x => x.getAttribute('href')!))]);
    expect(hrefs.length).toBeGreaterThan(2);
    for (const h of hrefs) expect((await request.get(h)).status(), h).toBe(200);
  });
});

test.describe('galleries', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('happy families: 64 photos, lightbox wraps around and shows the counter', async ({ page }) => {
    await page.goto('/happy-families');
    await expect(page.locator('button[aria-label^="Open photo"]')).toHaveCount(families.length);
    expect(families.length).toBe(64);
    await page.locator('button[aria-label^="Open photo 64 of 64"]').click();
    await expect(page.getByText('64 / 64')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByText('1 / 64')).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(page.getByText('64 / 64')).toBeVisible();
    await page.getByRole('button', { name: 'Close photo viewer' }).click();
    await expect(page.getByText('64 / 64')).toBeHidden();
  });

  test('gone home lists every ticket without dead links', async ({ page }) => {
    await page.goto('/gone-home');
    await expect(page.locator('article')).toHaveCount(goneHome.length);
    await expect(page.locator('main a[href^="/puppies/"]')).toHaveCount(0);
  });
});
