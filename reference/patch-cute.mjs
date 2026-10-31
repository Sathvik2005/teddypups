// One-shot patcher for the "cute" pass. Each replacement asserts that it matched.
import fs from 'node:fs';
const edit = (file, pairs) => {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${file}: no match for ${from.slice(0, 60)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(file, s);
  console.log('patched', file);
};

// --- Hero
edit('src/components/home/Hero.tsx', [
  ["import { PupBuddy } from '@/components/mascot/PupBuddy';", "import { PuppyMascot } from '@/components/mascot/PuppyMascot';\nimport { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';\nimport { PuppyDecorations } from '@/components/decorations/PuppyDecorations';"],
  ['<PupBuddy className="w-full" />', '<MascotSpeechBubble className="-top-9 left-[52%]" delay={1.4}>hello!</MascotSpeechBubble>\n                <PuppyMascot name="teddy" wave className="w-full" label="Teddy, our brand ambassador, waving hello" />'],
  ['className="door-card arch group relative block"', 'data-cursor-say="pick me!" className="door-card arch group relative block"'],
  ['<HeroCopy />', '<PuppyDecorations preset="hero" />\n      <HeroCopy />'],
]);
edit('src/components/home/HeroCopy.tsx', [
  ["import { WhatsAppButton, FishDecor } from '@/components/ui/parts';", "import { WhatsAppButton } from '@/components/ui/parts';\nimport { Decor } from '@/components/decorations/Decor';"],
  ['<Link href="/puppies" className="btn btn-primary">', '<Link href="/puppies" data-cursor-say="treat?" className="btn btn-primary">'],
  [/<FishDecor[^>]*\/>/.exec(fs.readFileSync('src/components/home/HeroCopy.tsx', 'utf8'))[0], `<Decor className="!overflow-visible" items={[{ kind: 'bone', at: { top: '-1.7rem', right: '-1.6rem' }, size: 2.6, rotate: 16, hideBelow: 'sm' }]} />`],
]);

// --- Header logo
edit('src/components/layout/Header.tsx', [['<Link href="/" className="flex items-center gap-2.5"', '<Link href="/" data-cursor-say="hello!" className="flex items-center gap-2.5"']]);

// --- Meet the pups
edit('src/components/home/MeetPups.tsx', [
  ["import { ButtonLink, PupStop } from '@/components/ui/parts';", "import { ButtonLink, PupStop } from '@/components/ui/parts';\nimport { PuppyMascot } from '@/components/mascot/PuppyMascot';\nimport { PuppyDecorations } from '@/components/decorations/PuppyDecorations';"],
  ['<div className="gutter mx-auto flex max-w-[110rem] flex-wrap items-end justify-between gap-6">', '<PuppyDecorations preset="showcase" />\n      <div className="gutter relative mx-auto flex max-w-[110rem] flex-wrap items-end justify-between gap-6">\n        <PuppyMascot name="biscuit" expression="curious" className="absolute right-[17rem] -bottom-2 hidden w-16 md:block" />'],
]);

// --- Journey: Coco guiding
edit('src/components/home/Journey.tsx', [
  ["import { JourneyChat } from './JourneyChat';", "import { JourneyChat } from './JourneyChat';\nimport { PuppyMascot } from '@/components/mascot/PuppyMascot';\nimport { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';"],
  ['<ol className="mt-10 space-y-6">', '<div className="relative mt-6 h-24 w-56">\n            <PuppyMascot name="coco" expression="happy" wag className="absolute bottom-0 left-0 w-20" label="Coco, ready to guide you" />\n            <MascotSpeechBubble className="top-0 left-[4.5rem]" delay={0.8}>one step at a time!</MascotSpeechBubble>\n          </div>\n          <ol className="mt-8 space-y-6">'],
]);

// --- Families + CTA decorations
edit('src/components/home/Families.tsx', [
  ["import { ButtonLink, PupStop } from '@/components/ui/parts';", "import { ButtonLink, PupStop } from '@/components/ui/parts';\nimport { PuppyDecorations } from '@/components/decorations/PuppyDecorations';"],
  ['className="bg-honey-soft border-y-[3px] border-cocoa py-20 md:py-28">', 'className="bg-honey-soft relative border-y-[3px] border-cocoa py-20 md:py-28">\n      <PuppyDecorations preset="families" />'],
]);
let cta = fs.readFileSync('src/components/home/FinalCta.tsx', 'utf8');
cta = cta.replace("import { ButtonLink, FishDecor, PupStop, WhatsAppButton } from '@/components/ui/parts';", "import { ButtonLink, PupStop, WhatsAppButton } from '@/components/ui/parts';\nimport { PuppyDecorations } from '@/components/decorations/PuppyDecorations';");
cta = cta.replace(/\s*<FishDecor[^>]*\/>/g, '');
cta = cta.replace('</section>', '  <PuppyDecorations preset="cta" />\n    </section>');
fs.writeFileSync('src/components/home/FinalCta.tsx', cta);
console.log('patched FinalCta');

// --- Footer: sleeping Mochi, no fish
let foot = fs.readFileSync('src/components/layout/Footer.tsx', 'utf8');
foot = foot.replace("import { PupBuddy } from '@/components/mascot/PupBuddy';", "import { PuppyMascot } from '@/components/mascot/PuppyMascot';");
foot = foot.replace("import { PupStop, FishDecor } from '@/components/ui/parts';", "import { PupStop } from '@/components/ui/parts';");
foot = foot.replace(/<PupBuddy[^>]*\/>/, '<PuppyMascot name="mochi" sleeping lookAt={false} reactive={false} className="absolute bottom-6 left-1/2 w-36 -translate-x-1/2" />');
foot = foot.replace(/\s*<FishDecor[\s\S]*?\/>\n/, '\n');
foot = foot.replace('role="img" aria-label="Teddy, sitting snug in his basket"', 'role="img" aria-label="Mochi, a sleepy puppy, snug in a basket"');
foot = foot.replace('bottom-3 left-1/2', 'bottom-3 left-[88%]');
fs.writeFileSync('src/components/layout/Footer.tsx', foot);
console.log('patched Footer');

// --- Photo wall cursor words
edit('src/components/gallery/PhotoWall.tsx', [['onClick={() => setOpen(i)}', 'data-cursor-say="so cute!"\n              onClick={() => setOpen(i)}']]);

// --- PageIntro mascot slot
edit('src/components/ui/parts.tsx', [
  ['export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {', 'export function PageIntro({ eyebrow, title, children, mascot }: { eyebrow: string; title: string; children?: ReactNode; mascot?: ReactNode }) {'],
  ['<p className="eyebrow squiggle inline-block text-xl md:text-2xl">{eyebrow}</p>', '{mascot && <div className="relative mx-auto mb-4 h-28 w-40">{mascot}</div>}\n      <p className="eyebrow squiggle inline-block text-xl md:text-2xl">{eyebrow}</p>'],
]);
// remove FishDecor entirely (dog-only brief)
let parts = fs.readFileSync('src/components/ui/parts.tsx', 'utf8');
parts = parts.replace(/export function FishDecor[\s\S]*?\n}\n\n/, '');
fs.writeFileSync('src/components/ui/parts.tsx', parts);
console.log('removed FishDecor');
