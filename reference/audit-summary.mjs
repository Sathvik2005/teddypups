import fs from 'node:fs';
const out = JSON.parse(fs.readFileSync('reference/audit-responsive.json', 'utf8'));
const real = [];
for (const o of out) {
  const issues = (o.issues || []).filter(i => !/^CLIPPED Skip to content$/.test(i));
  if (issues.length) real.push(`${o.w}px ${o.route}: ${issues.join(' ; ')}`);
}
console.log(`rows=${out.length}  real issues=${real.length}`);
real.slice(0, 40).forEach(r => console.log(r.slice(0, 300)));
// touch targets on phones, grouped
const tiny = {};
for (const o of out) if (o.w <= 430) for (const s of o.small || []) tiny[s.replace(/ \d+x\d+$/, '')] = (tiny[s.replace(/ \d+x\d+$/, '')] || 0) + 1;
console.log('small touch targets on phones (name: occurrences):');
Object.entries(tiny).sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
