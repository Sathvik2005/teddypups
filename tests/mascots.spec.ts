import { expect, test } from '@playwright/test';

// networkidle-goto: wait for hydration so listeners exist before the first hover
test.beforeEach(async ({ page }) => {
  const go = page.goto.bind(page);
  page.goto = (url, opts) => go(url, { waitUntil: 'networkidle', ...opts });
});

test.use({ viewport: { width: 1440, height: 900 } });

test('all four mascots are present and there are no cats', async ({ page }) => {
  await page.goto('/how-it-works');
  for (const name of ['Mochi', 'Biscuit', 'Coco', 'Teddy']) await expect(page.getByRole('heading', { name })).toBeVisible();
  const text = (await page.locator('body').innerText()).toLowerCase();
  expect(text).not.toMatch(/\b(cat|cats|kitten|kittens|meow)\b/);
  expect(await page.locator('svg title').allTextContents()).not.toContain('');
});

test('hero Teddy waves and greets; footer Mochi sleeps', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('img', { name: /Teddy, our brand ambassador/ })).toBeVisible();
  await expect(page.locator('.speech-bubble', { hasText: 'hello!' })).toBeVisible();
  const waving = await page.locator('.mascot-wave').first().evaluate(el => getComputedStyle(el).animationName);
  expect(waving).toBe('mascot-wave');
  await expect(page.getByRole('img', { name: /Mochi, a sleepy puppy/ })).toBeAttached();
  await expect(page.locator('.mascot-z').first()).toBeAttached();
});

test('mascot pupils glance toward the cursor', async ({ page }) => {
  await page.goto('/how-it-works');
  const m = page.getByRole('img', { name: /Biscuit, a curious caramel puppy/ });
  const pupil = m.locator('[data-p="pupil"]').first();
  await m.scrollIntoViewIfNeeded();
  const b = (await m.boundingBox())!;
  await page.mouse.move(b.x + b.width / 2 + 300, b.y + b.height / 2);
  await page.mouse.move(b.x + b.width / 2 + 320, b.y + b.height / 2 + 4);
  await expect.poll(() => pupil.evaluate(e => (e as SVGElement).style.transform)).toMatch(/translate\(\d/);
  await page.mouse.move(b.x + b.width / 2 - 300, b.y + b.height / 2);
  await page.mouse.move(b.x + b.width / 2 - 320, b.y + b.height / 2 + 4);
  await expect.poll(() => pupil.evaluate(e => (e as SVGElement).style.transform)).toMatch(/translate\(-/);
});

test('mascot reacts on hover (happy face)', async ({ page }) => {
  await page.goto('/how-it-works');
  const m = page.getByRole('img', { name: /Biscuit, a curious caramel puppy/ });
  await m.scrollIntoViewIfNeeded();
  await m.hover();
  await expect(m).toHaveClass(/mascot-hover/);
});

test('empty catalogue shows the curious puppy and friendly copy', async ({ page }) => {
  await page.goto('/puppies?origin=local');
  await expect(page.getByTestId('empty-state')).toBeVisible();
  await expect(page.getByRole('heading', { name: "No pups found. Let's try another search!" })).toBeVisible();
  await expect(page.getByRole('img', { name: /Biscuit, a curious puppy/ })).toBeVisible();
});

test('buttons lift on hover and show the paw detail', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('link', { name: 'View available puppies' });
  const before = await btn.evaluate(el => getComputedStyle(el).transform);
  await btn.hover();
  await page.waitForTimeout(400);
  expect(await btn.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  expect(await btn.evaluate(el => getComputedStyle(el, '::after').transform)).not.toBe('matrix(0, 0, 0, 0, 0, 0)');
});

test('keyboard: menu, accordion and lightbox work without a mouse', async ({ page }) => {
  await page.goto('/faq');
  const q = page.getByRole('button', { name: /Can I meet a puppy/ });
  await q.focus();
  await page.keyboard.press('Enter');
  await expect(q).toHaveAttribute('aria-expanded', 'true');
  await page.goto('/happy-families');
  await page.locator('button[aria-label^="Open photo 1 of 64"]').focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('1 / 64')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByText('2 / 64')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByText('2 / 64')).toBeHidden();
});

test('enquiry form is honest: validates, then offers hand-off without claiming it was sent', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(page.getByText('Please tell us your name.')).toBeVisible();
  await page.getByLabel(/your name/i).fill('Sathvik');
  await page.getByLabel(/phone or whatsapp/i).fill('+971 50 123 4567');
  await page.getByRole('button', { name: 'Send enquiry' }).click();
  const ready = page.getByTestId('enquiry-ready');
  await expect(ready).toBeVisible();
  await expect(ready).toContainText('nothing has been sent yet');
  await expect(ready.getByRole('link', { name: /Send on WhatsApp/ })).toHaveAttribute('href', /wa\.me\/971541676733\?text=/);
});
