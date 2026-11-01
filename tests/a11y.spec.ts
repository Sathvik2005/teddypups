import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ROUTES = ['/', '/puppies', '/puppies/maltipoo-max-male', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact'];
const SIZES = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const vp of SIZES) {
  test.describe(`axe @ ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });
    for (const r of ROUTES) {
      test(`${r} has no serious or critical WCAG A/AA violations`, async ({ page }) => {
        await page.goto(r, { waitUntil: 'networkidle' });
        // let scroll reveals and entrance animations finish so contrast is measured on final colours
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 500) {
            scrollTo(0, y);
            await new Promise(res => setTimeout(res, 50));
          }
          scrollTo(0, 0);
        });
        await page.waitForTimeout(1500);
        const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        const bad = res.violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
        const summary = bad.map(v => `${v.id} (${v.impact}) x${v.nodes.length}: ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join(' | ')}`);
        expect(summary, summary.join('\n')).toEqual([]);
      });
    }
  });
}
