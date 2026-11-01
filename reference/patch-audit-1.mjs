import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const must = (s, from, f) => { if (!s.includes(from)) throw new Error(`${f}: no match for ${String(from).slice(0, 70)}`); };

// 1. per-page metadata through pageMeta()
const META = /export const metadata: Metadata = \{\s*title: ('[^']*'|"[^"]*"),\s*description: ('[^']*'|"[^"]*"),\s*alternates: \{ canonical: '([^']*)' \},?\s*\};/;
for (const f of ['src/app/puppies/page.tsx', 'src/app/happy-families/page.tsx', 'src/app/gone-home/page.tsx', 'src/app/how-it-works/page.tsx', 'src/app/faq/page.tsx', 'src/app/contact/page.tsx']) {
  let s = read(f);
  if (!META.test(s)) throw new Error(`${f}: metadata block not recognised`);
  s = s.replace(META, (_, t, d, p) => `export const metadata: Metadata = pageMeta({ title: ${t}, description: ${d}, path: '${p}' });`);
  s = s.replace("import type { Metadata } from 'next';", "import type { Metadata } from 'next';\nimport { pageMeta } from '@/lib/seo';");
  write(f, s);
  console.log('meta ->', f);
}

// 2. layout: robots, social defaults, structured data; favicon via file convention
let l = read('src/app/layout.tsx');
must(l, "openGraph: { title: site.name, description: site.description, type: 'website', url: site.url, images: [{ url: '/images/brand/logo.png' }] },", 'layout');
l = l.replace("openGraph: { title: site.name, description: site.description, type: 'website', url: site.url, images: [{ url: '/images/brand/logo.png' }] },", "openGraph: { title: site.name, description: site.description, type: 'website', url: '/', siteName: site.name, locale: 'en_AE' },\n  robots: { index: true, follow: true },\n  alternates: { canonical: '/' },");
l = l.replace("twitter: { card: 'summary', title: site.name, description: site.description },", "twitter: { card: 'summary_large_image', title: site.name, description: site.description },");
l = l.replace("  icons: { icon: '/images/brand/logo.png', apple: '/images/brand/logo.png' },\n", '');
l = l.replace("import { site } from '@/data/site';", "import { site } from '@/data/site';\nimport { organizationJsonLd, websiteJsonLd } from '@/lib/seo';");
l = l.replace('<ScrollProgress />', `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd(), websiteJsonLd()]) }} />\n        <ScrollProgress />`);
write('src/app/layout.tsx', l);

// 3. sitemap with lastModified
let sm = read('src/app/sitemap.ts');
sm = sm.replace("...pages.map(p => ({ url: `${site.url}${p}` }))", "...pages.map(p => ({ url: `${site.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 }))").replace("...puppies.map(p => ({ url: `${site.url}/puppies/${p.slug}` }))", "...puppies.map(p => ({ url: `${site.url}/puppies/${p.slug}`, lastModified: now, priority: 0.7 }))");
sm = sm.replace("  const pages =", "  const now = new Date();\n  const pages =");
write('src/app/sitemap.ts', sm);

// 4. puppy page: twitter card + breadcrumb structured data
let pp = read('src/app/puppies/[slug]/page.tsx');
pp = pp.replace("openGraph: { title, images: photo.kind === 'image' ? [{ url: photo.src, width: photo.width, height: photo.height }] : undefined },", "openGraph: { title, url: `/puppies/${p.slug}`, siteName: 'TeddyPups U.A.E.', type: 'website', images: photo.kind === 'image' ? [{ url: photo.src, width: photo.width, height: photo.height, alt: photo.alt }] : undefined },\n    twitter: { card: 'summary_large_image', title, images: photo.kind === 'image' ? [photo.src] : undefined },");
pp = pp.replace("import { puppyMessage } from '@/lib/whatsapp';", "import { puppyMessage } from '@/lib/whatsapp';\nimport { breadcrumbJsonLd } from '@/lib/seo';");
pp = pp.replace('<nav aria-label="Breadcrumb"', `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Available puppies', path: '/puppies' }, { name: p.name, path: \`/puppies/\${p.slug}\` }])) }} />\n      <nav aria-label="Breadcrumb"`);
write('src/app/puppies/[slug]/page.tsx', pp);

// 5. heading hierarchy
let cat = read('src/components/puppies/PuppyCatalogue.tsx');
cat = cat.replace('<p role="status" aria-live="polite" className="mt-6 text-cocoa-soft">', '<h2 className="sr-only">Puppies</h2>\n      <p role="status" aria-live="polite" className="mt-6 text-cocoa-soft">');
write('src/components/puppies/PuppyCatalogue.tsx', cat);
let pg = read('src/app/puppies/page.tsx');
pg = pg.replace('<ul className="gutter mx-auto grid max-w-[110rem]', '<ul aria-label="Available puppies" className="gutter mx-auto grid max-w-[110rem]');
write('src/app/puppies/page.tsx', pg);
let faq = read('src/app/faq/page.tsx');
faq = faq.replace('<div className="gutter mx-auto max-w-3xl pb-12">', '<div className="gutter mx-auto max-w-3xl pb-12">\n        <h2 className="sr-only">Frequently asked questions</h2>');
write('src/app/faq/page.tsx', faq);
let how = read('src/app/how-it-works/page.tsx');
how = how.replace('<h4 className="h-card text-xl">{s.title}</h4>', '<h3 className="h-card text-xl">{s.title}</h3>');
write('src/app/how-it-works/page.tsx', how);

// 6. touch targets (≥44px on touch / small screens)
let css = read('src/app/globals.css');
css += `
/* ---------- touch targets: at least 44px on touch and phones ---------- */
@media (pointer: coarse), (max-width: 767px) {
  .btn-sm { min-height: 44px; }
  .tap { display: inline-flex; align-items: center; min-height: 44px; }
}
`;
write('src/app/globals.css', css);
let foot = read('src/components/layout/Footer.tsx');
foot = foot.replaceAll('transition-colors duration-200 hover:text-honey', 'tap transition-colors duration-200 hover:text-honey');
foot = foot.replace('className="inline-flex rounded-full border border-milk/30', 'className="tap inline-flex rounded-full border border-milk/30');
write('src/components/layout/Footer.tsx', foot);
let chip = read('src/components/puppies/PuppyCatalogue.tsx');
chip = chip.replace("'rounded-full border-2 border-cocoa px-4 py-1.5", "'tap rounded-full border-2 border-cocoa px-4 py-1.5");
write('src/components/puppies/PuppyCatalogue.tsx', chip);
how = read('src/app/how-it-works/page.tsx');
how = how.replace('className="rounded-full border-2 border-cocoa bg-milk px-4 py-1.5', 'className="tap rounded-full border-2 border-cocoa bg-milk px-4 py-1.5');
write('src/app/how-it-works/page.tsx', how);
console.log('audit patch 1 applied');
