import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, s.replace(from, to));
  console.log('patched', f);
};
// fonts are not on the LCP path (the LCP element is the hero photo): stop preloading them so the photo gets the bandwidth first.
// next/font still emits size-adjusted fallbacks, so the swap causes no visible layout shift.
sub('src/app/layout.tsx', "axes: ['SOFT', 'opsz'], variable: '--font-fraunces', display: 'swap' })", "axes: ['SOFT', 'opsz'], variable: '--font-fraunces', display: 'swap', preload: false })");
sub('src/app/layout.tsx', "Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' })", "Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap', preload: false })");
// the LCP photo: lighter encode (it is shown ~290px wide on phones)
sub('src/components/home/HeroCollage.tsx', 'fetchPriority="high" sizes="(min-width:1024px) 30vw, 70vw"', 'fetchPriority="high" quality={62} sizes="(min-width:1024px) 30vw, 70vw"');
