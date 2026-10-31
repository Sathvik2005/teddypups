// Pulls the hand-lettered labels and page intros (font-scrawl / h1 / lead paragraphs) from each reference page's flight payload.
import fs from 'node:fs';
const sp = process.argv[2];
const pages = ['happy-families', 'gone-home', 'how-it-works', 'faq', 'contact', 'puppies'];
for (const name of pages) {
  const h = fs.readFileSync(`${sp}/pages/${name}.html`, 'utf8');
  const all = [...h.matchAll(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)<\/script>/g)].map(m => JSON.parse('"' + m[1] + '"')).join('');
  // elements: ["$","tag",null,{"className":"...","children":"text"}]
  const re = /\["\$","(h1|h2|p|span)",null,\{"className":"([^"]*)","children":"((?:[^"\\]|\\.)*)"/g;
  const rows = [...all.matchAll(re)].map(m => `${m[1]}[${m[2].replace(/\s+/g, ' ').slice(0, 40)}] ${m[3].slice(0, 170)}`);
  const keep = rows.filter(r => /font-scrawl|tp-|text-\[|lead|eyebrow|h1|font-plush/.test(r) && !/WhatsApp us|Home, at last|TeddyPups U\.A\.E\. is a Dubai/.test(r));
  console.log(`\n=== ${name}`);
  console.log([...new Set(keep)].slice(0, 14).join('\n'));
}
