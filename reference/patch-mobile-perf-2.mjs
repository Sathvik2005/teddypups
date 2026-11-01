import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, s.replace(from, to));
  console.log('patched', f);
};

// layout: one lazy Effects component instead of four eager ones
let l = read('src/app/layout.tsx');
l = l.replace("import { PupActor } from '@/components/mascot/PupActor';\n", '').replace("import { PupCursor } from '@/components/cursor/PupCursor';\n", '').replace("import { PawTrail } from '@/components/cursor/PawTrail';\n", '').replace("import { ScrollProgress } from '@/components/motion/ScrollProgress';\n", '');
l = l.replace("import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';", "import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';\nimport { Effects } from '@/components/effects/Effects';");
l = l.replace('        <ScrollProgress />\n', '');
l = l.replace('        <PupActor />\n        <PupCursor />\n        <PawTrail />\n', '        <Effects />\n');
if (!l.includes('<Effects />') || l.includes('<PawTrail />')) throw new Error('layout patch failed');
write('src/app/layout.tsx', l);
console.log('patched layout');

// hero: only the big arch is the LCP image; the two small photos must not fight it for bandwidth
sub('src/components/home/HeroCollage.tsx', '<Image src={round.src} alt={round.alt} fill priority sizes="14rem" className="object-cover" />', '<Image src={round.src} alt={round.alt} fill sizes="14rem" className="object-cover" />');
sub('src/components/home/HeroCollage.tsx', '<Image src={polaroid.src} alt={polaroid.alt} fill priority sizes="12rem" className="object-cover" />', '<Image src={polaroid.src} alt={polaroid.alt} fill sizes="12rem" className="object-cover" />');
