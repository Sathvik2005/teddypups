import fs from 'node:fs';
const m = JSON.parse(fs.readFileSync('reference/asset-manifest.json', 'utf8'));
const g = {};
m.forEach(a => { (g[a.group] ??= []).push(a); });
const mb = b => (b / 1048576).toFixed(1);
const notes = { brand: 'logo.png', puppies: '15 profile galleries incl. mp4 videos + poster jpgs', families: '64 photos, happy-families wall', 'gone-home': '27 AVIF ticket photos (dimensions not parsed)', contact: 'showroom teddy photo' };
let o = '# Asset Manifest\n\nOriginal public assets from the reference site, downloaded locally by `reference/download-assets.mjs` (156/156 succeeded, 0 failures). Machine-readable list with source URLs, alt text and dimensions: `reference/asset-manifest.json`. Files live in `public/images/<group>/` under their original filenames.\n\n| Group | Files | Size | Notes |\n|---|---|---|---|\n';
for (const k of Object.keys(g)) o += `| ${k} | ${g[k].length} | ${mb(g[k].reduce((s, a) => s + (a.bytes || 0), 0))} MB | ${notes[k] || ''} |\n`;
o += `\n**Total:** ${m.length} files, ${mb(m.reduce((s, a) => s + (a.bytes || 0), 0))} MB.\n\n## Puppy assets\n\n| Puppy | # | Type | Dimensions | Local file |\n|---|---|---|---|---|\n`;
for (const a of g.puppies) o += `| ${a.puppy} | ${a.index + 1} | ${a.type} | ${a.width || '?'}×${a.height || '?'} | \`${a.local}\` |\n`;
o += `
## Fonts
Not downloaded: Fraunces, Figtree and Shantell Sans are Google Fonts. The clone loads them through \`next/font/google\`, which self-hosts the files at build time (the reference likewise preloads 3 hashed woff2 files).

## Not available as files (inline SVG/CSS in the reference)
Teddy mascot, fish, paw prints, scalloped quilt, scenes (plane, envelope, stamp, skyline). These are redrawn as our own SVG. Favicon \`/icon.png\` and \`/apple-icon.png\` are fetchable but not yet downloaded (unverified).

## Usage note
The photos are the shop's real listings and are used here only for an internal, non-commercial technical showcase. Do not redistribute or publish commercially without the owner's consent.
`;
fs.writeFileSync('docs/ASSET_MANIFEST.md', o);
console.log(Object.keys(g).map(k => k + ':' + g[k].length).join(' '));
