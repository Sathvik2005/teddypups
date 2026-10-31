import fs from 'node:fs';
const sp = process.argv[2];
const media = JSON.parse(fs.readFileSync(`${sp}/media.json`, 'utf8'));
const files = fs.readdirSync(`${sp}/pages`).filter(f => /^puppies__.*\.txt$/.test(f));
const rows = files.map(f => {
  const slug = f.slice(9, -4);
  const t = fs.readFileSync(`${sp}/pages/${f}`, 'utf8');
  const get = label => (t.match(new RegExp(`^\\s*${label}\\s+(.+?)\\s*$`, 'm')) || [])[1];
  const m = media['puppies__' + slug][0] || [];
  return { slug, breed: get('Breed'), gender: get('Boy or girl'), age: get('Age'), where: get('Where'), n: m.length, video: m.some(x => x.kind === 'video') };
});
fs.writeFileSync('reference/puppies-summary.json', JSON.stringify(rows, null, 1));
console.log(rows.map(r => `${r.slug}|${r.breed}|${r.gender}|${r.age}|${r.where}`).join('\n'));
