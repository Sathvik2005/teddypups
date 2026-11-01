import fs from 'node:fs';
const edit = (file, pairs) => {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${file}: no match for ${from.slice(0, 80)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(file, s);
  console.log('patched', file);
};

// shared photo helpers
edit('src/data/puppies.ts', [[
  'export const heroLineup',
  `/** {src, alt} of a puppy's first photo — for page-header collages. */
export const photoOf = (slug: string) => {
  const m = puppyPhoto(puppies.find(p => p.slug === slug)!);
  return { src: m.kind === 'image' ? m.src : m.poster, alt: m.alt };
};
export const SHOWROOM_PHOTO = { src: '/images/contact/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg', alt: 'The apricot teddy bear puppy from our showroom' };

export const heroLineup`,
]]);

// PageIntro with optional photo collage
let parts = fs.readFileSync('src/components/ui/parts.tsx', 'utf8');
parts = parts.replace(/export function PageIntro[\s\S]*?\n}\n/, `export function PageIntro({ eyebrow, title, children, mascot, photos }: { eyebrow?: string; title: string; children?: ReactNode; mascot?: ReactNode; photos?: { src: string; alt: string }[] }) {
  return (
    <header className="gutter relative mx-auto max-w-[110rem] pt-32 pb-12 md:pt-40">
      {mascot && <div className="relative mb-4 h-28 w-52">{mascot}</div>}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          {eyebrow && <p className="chapter mb-3 text-lg text-toffee-ink md:text-xl">{eyebrow}</p>}
          <h1 className="h-section">{title}</h1>
          {children && <p className="mt-6 max-w-xl text-lg text-cocoa-soft md:text-xl">{children}</p>}
        </div>
        {photos && photos.length > 0 && <PhotoCollage photos={photos} />}
      </div>
    </header>
  );
}

/** Three overlapping, tilted frames (arch · circle · polaroid) that wipe in and drift with the scroll. */
function PhotoCollage({ photos }: { photos: { src: string; alt: string }[] }) {
  const [a, b, c] = photos;
  return (
    <div aria-hidden="true" className="relative mx-auto h-64 w-full max-w-md sm:h-72 lg:col-span-5 lg:h-[24rem] lg:max-w-none">
      <Parallax speed={0.06} className="absolute top-0 left-[6%] w-[44%]">
        <ImageReveal className="photo-frame relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-honey-soft">
          <Image src={a.src} alt="" fill priority sizes="16rem" className="object-cover" />
        </ImageReveal>
      </Parallax>
      {b && (
        <Parallax speed={-0.1} className="absolute right-[4%] bottom-0 w-[38%]">
          <ImageReveal delay={0.2} className="photo-frame relative aspect-square rotate-6 overflow-hidden rounded-full bg-sky">
            <Image src={b.src} alt="" fill priority sizes="14rem" className="object-cover" />
          </ImageReveal>
        </Parallax>
      )}
      {c && (
        <Parallax speed={0.1} className="absolute top-[4%] right-[10%] w-[30%]">
          <ImageReveal delay={0.35} className="photo-frame -rotate-6 rounded-md bg-milk p-1.5 pb-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image src={c.src} alt="" fill priority sizes="11rem" className="object-cover" />
            </div>
          </ImageReveal>
        </Parallax>
      )}
    </div>
  );
}
`);
parts = parts.replace("import { cn } from '@/lib/cn';", "import Image from 'next/image';\nimport { cn } from '@/lib/cn';\nimport { ImageReveal } from '@/components/motion/ImageReveal';\nimport { Parallax } from '@/components/motion/Parallax';");
fs.writeFileSync('src/components/ui/parts.tsx', parts);
console.log('patched parts');

edit('src/app/puppies/page.tsx', [
  ["import { puppies } from '@/data/puppies';", "import { photoOf, puppies } from '@/data/puppies';"],
  ['<PageIntro eyebrow="from Teddy\'s sketchbook" title="Available puppies">', '<PageIntro eyebrow="from Teddy\'s sketchbook" title="Available puppies" photos={[photoOf(\'maltipoo-max-male\'), photoOf(\'korean-teacup-maltipoo-female\'), photoOf(\'pomeranian-female\')]}>'],
]);
edit('src/app/gone-home/page.tsx', [
  ["import { goneHome } from '@/data/gone-home';", "import { goneHome } from '@/data/gone-home';"],
  ['<PageIntro title="Puppies who have gone home">', '<PageIntro title="Puppies who have gone home" photos={[{ src: goneHome[0].src, alt: \'\' }, { src: goneHome[3].src, alt: \'\' }, { src: goneHome[9].src, alt: \'\' }]}>'],
]);
edit('src/app/how-it-works/page.tsx', [
  ["import { IntroMascot } from '@/components/mascot/IntroMascot';", "import { IntroMascot } from '@/components/mascot/IntroMascot';\nimport { photoOf, SHOWROOM_PHOTO } from '@/data/puppies';"],
  ['<PageIntro title="How it works" mascot=', '<PageIntro title="How it works" photos={[SHOWROOM_PHOTO, photoOf(\'maltipoo-cavapoo-male\'), photoOf(\'toy-poodle-male-female\')]} mascot='],
]);
edit('src/app/contact/page.tsx', [
  ["import { IntroMascot } from '@/components/mascot/IntroMascot';", "import { IntroMascot } from '@/components/mascot/IntroMascot';\nimport { photoOf, SHOWROOM_PHOTO } from '@/data/puppies';"],
  ['<PageIntro title="Get in touch with us" mascot=', '<PageIntro title="Get in touch with us" photos={[SHOWROOM_PHOTO, photoOf(\'copper-male\'), photoOf(\'shitzu-female\')]} mascot='],
]);
edit('src/app/faq/page.tsx', [
  ["import { IntroMascot } from '@/components/mascot/IntroMascot';", "import { IntroMascot } from '@/components/mascot/IntroMascot';\nimport { photoOf } from '@/data/puppies';"],
  ['<PageIntro title="Questions & answers" mascot=', '<PageIntro title="Questions & answers" photos={[photoOf(\'korean-teacup-poodle-female\'), photoOf(\'shitzu-male\'), photoOf(\'maltipoo-female\')]} mascot='],
]);
