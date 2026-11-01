import fs from 'node:fs';
import sharp from 'sharp';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, s.replace(from, to));
  console.log('patched', f);
};

// 1. favicon: 314 KB -> a few KB (browsers show it at 16-48px)
await sharp('public/images/brand/logo.png').resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png({ palette: true, quality: 85, effort: 10 }).toFile('src/app/icon.png');
await sharp('public/images/brand/logo.png').resize(180, 180, { fit: 'contain', background: { r: 255, g: 253, b: 248, alpha: 1 } }).png({ palette: true, quality: 85, effort: 10 }).toFile('src/app/apple-icon.png');
console.log('icons: icon.png', fs.statSync('src/app/icon.png').size, 'B · apple-icon.png', fs.statSync('src/app/apple-icon.png').size, 'B');

// 2. fonts: drop the unused WONK axis (CSS already pins it to 0); the handwriting face is secondary, so it must not compete for first-load bandwidth
sub('src/app/layout.tsx', "axes: ['SOFT', 'WONK', 'opsz']", "axes: ['SOFT', 'opsz']");
sub('src/app/layout.tsx', "Shantell_Sans({ subsets: ['latin'], variable: '--font-shantell', display: 'swap' })", "Shantell_Sans({ subsets: ['latin'], variable: '--font-shantell', display: 'swap', preload: false })");

// 3. let the browser skip layout/paint for heavy below-the-fold blocks until they approach the viewport
let css = read('src/app/globals.css');
css += `
/* ---------- below-the-fold rendering budget ---------- */
.cv-auto { content-visibility: auto; contain-intrinsic-size: auto 900px; }
.cv-rail { content-visibility: auto; contain-intrinsic-size: auto 640px; }
`;
write('src/app/globals.css', css);
sub('src/components/home/TwoWays.tsx', '<section aria-labelledby="two-title" className="gutter mx-auto max-w-[110rem] py-20 md:py-28">', '<section aria-labelledby="two-title" className="cv-auto gutter mx-auto max-w-[110rem] py-20 md:py-28">');
sub('src/components/puppies/PuppyRail.tsx', '<div className="relative mt-12 md:mt-16">', '<div className="cv-rail relative mt-12 md:mt-16">');
sub('src/components/home/Trust.tsx', '<div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">', '<div className="cv-auto -mb-3 mt-12 grid grid-cols-1 gap-5 pb-3 lg:grid-cols-12">');
sub('src/components/home/Families.tsx', '<div className="mt-16">\n          <PhotoWall limit={9} variant="collage" />', '<div className="cv-auto -my-6 mt-10 py-6">\n          <PhotoWall limit={9} variant="collage" />');
