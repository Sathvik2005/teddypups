// Downloads original public assets from the reference site into public/images and writes a manifest.
import fs from 'node:fs';
import path from 'node:path';

const B = 'https://puppy.instabizweb.com';
const SP = process.argv[2];
const media = JSON.parse(fs.readFileSync(`${SP}/media.json`, 'utf8'));
const pagesDir = `${SP}/pages`;

const items = new Map(); // url -> meta
const add = (url, meta) => { if (!items.has(url)) items.set(url, meta); };

add('/brand/logo.png', { group: 'brand', page: 'global', alt: 'TeddyPups logo', type: 'image' });

// puppies (catalogue order == media.json['puppies'] order); names from slugs list in route order of /puppies
const slugs = [...fs.readFileSync(`${pagesDir}/puppies.html`, 'utf8').matchAll(/href="\/puppies\/([^"?#]+)"/g)].map(m => m[1]);
const uniqueSlugs = [...new Set(slugs)];
for (const s of uniqueSlugs) {
  const sets = media['puppies__' + s] || [];
  (sets[0] || []).forEach((m, i) => {
    add(m.url, { group: 'puppies', page: `/puppies/${s}`, puppy: s, index: i, alt: m.alt, type: m.kind, width: m.width, height: m.height, durationS: m.durationS });
    if (m.poster) add(m.poster.url, { group: 'puppies', page: `/puppies/${s}`, puppy: s, index: i, alt: m.poster.alt, type: 'poster', width: m.poster.width, height: m.poster.height });
  });
}
(media['happy-families'][0] || []).forEach((m, i) => add(m.url, { group: 'families', page: '/happy-families', index: i, alt: m.alt, type: m.kind, width: m.width, height: m.height }));

// gone-home + contact: images only exist in rendered HTML
for (const [f, group, page] of [['gone-home', 'gone-home', '/gone-home'], ['contact', 'contact', '/contact']]) {
  const h = fs.readFileSync(`${pagesDir}/${f}.html`, 'utf8');
  const urls = [...new Set([...h.matchAll(/\/_next\/image\?url=([^&"]+)/g)].map(m => decodeURIComponent(m[1])))].filter(u => u.startsWith('/media/'));
  urls.forEach((u, i) => add(u, { group, page, index: i, alt: '', type: 'image' }));
}

const manifest = [];
let ok = 0, fail = 0;
const queue = [...items.entries()];
async function worker() {
  while (queue.length) {
    const [url, meta] = queue.shift();
    const file = path.join('public', 'images', meta.group, url.startsWith('/brand') ? 'logo.png' : path.basename(url));
    fs.mkdirSync(path.dirname(file), { recursive: true });
    try {
      const r = await fetch(B + url);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(file, buf);
      manifest.push({ ...meta, source: B + url, local: file.replace(/\\/g, '/'), bytes: buf.length });
      ok++;
    } catch (e) { fail++; manifest.push({ ...meta, source: B + url, local: null, error: String(e.message) }); }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
manifest.sort((a, b) => (a.group + (a.page || '') + (a.index ?? 0)).localeCompare(b.group + (b.page || '') + (b.index ?? 0)));
fs.writeFileSync('reference/asset-manifest.json', JSON.stringify(manifest, null, 1));
console.log({ total: items.size, ok, fail });
