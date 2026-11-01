import fs from 'node:fs';
const files = process.argv.slice(2);
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const c = j.categories;
  const a = j.audits;
  const sc = k => Math.round((c[k]?.score ?? 0) * 100);
  const m = k => a[k]?.displayValue ?? 'n/a';
  console.log(`\n${f.split(/[\\/]/).pop()}  [${j.configSettings.formFactor}]  ${j.finalDisplayedUrl}`);
  console.log(`  Performance ${sc('performance')} · Accessibility ${sc('accessibility')} · Best Practices ${sc('best-practices')} · SEO ${sc('seo')}`);
  console.log(`  FCP ${m('first-contentful-paint')} · LCP ${m('largest-contentful-paint')} · TBT ${m('total-blocking-time')} · CLS ${m('cumulative-layout-shift')} · SI ${m('speed-index')}`);
  const fails = Object.values(a).filter(x => x.score !== null && x.score < 0.9 && x.scoreDisplayMode !== 'informative' && x.scoreDisplayMode !== 'notApplicable' && x.scoreDisplayMode !== 'manual');
  fails.sort((x, y) => x.score - y.score);
  console.log('  below 0.9:', fails.slice(0, 10).map(x => `${x.id}(${Math.round(x.score * 100)})`).join(', ') || 'none');
  const lcp = a['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node;
  if (lcp) console.log('  LCP element:', (lcp.snippet || '').slice(0, 110));
}
