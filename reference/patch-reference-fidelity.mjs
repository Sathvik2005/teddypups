// Brings page headers in line with the reference (no invented eyebrows, split header, scalloped nav edge, paw menu button).
import fs from 'node:fs';
const edit = (file, pairs) => {
  let s = fs.readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    if (!s.includes(from)) throw new Error(`${file}: no match for ${from.slice(0, 70)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(file, s);
  console.log('patched', file);
};

// PageIntro: reference layout = title left, intro paragraph right, eyebrow only where the reference has one
let parts = fs.readFileSync('src/components/ui/parts.tsx', 'utf8');
parts = parts.replace(/export function PageIntro[\s\S]*?\n}\n/, `export function PageIntro({ eyebrow, title, children, mascot }: { eyebrow?: string; title: string; children?: ReactNode; mascot?: ReactNode }) {
  return (
    <header className="gutter mx-auto max-w-[110rem] pt-32 pb-10 md:pt-40">
      {mascot && <div className="relative mb-4 h-28 w-52">{mascot}</div>}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {eyebrow && <p className="eyebrow squiggle mb-3 inline-block text-xl md:text-2xl">{eyebrow}</p>}
          <h1 className="h-section">{title}</h1>
        </div>
        {children && <p className="text-lg text-cocoa-soft md:text-xl lg:col-span-5 lg:pb-3">{children}</p>}
      </div>
    </header>
  );
}
`);
fs.writeFileSync('src/components/ui/parts.tsx', parts);
console.log('patched PageIntro');

edit('src/components/mascot/IntroMascot.tsx', [
  ['className="absolute bottom-0 left-1/2 w-28 -translate-x-1/2"', 'className="absolute bottom-0 left-0 w-28"'],
  ['className="top-0 left-[58%]"', 'className="top-0 left-[6.5rem]"'],
]);
edit('src/app/faq/page.tsx', [['<PageIntro eyebrow="have a question?" title=', '<PageIntro title=']]);
edit('src/app/contact/page.tsx', [['<PageIntro eyebrow="dear TeddyPups…" title=', '<PageIntro title=']]);
edit('src/app/how-it-works/page.tsx', [['<PageIntro eyebrow="the puppy passport" title=', '<PageIntro title=']]);
edit('src/app/gone-home/page.tsx', [['<PageIntro eyebrow="tickets home" title=', '<PageIntro title=']]);

// home "Families": same taped-note testimonial as the reference
let fam = fs.readFileSync('src/components/home/Families.tsx', 'utf8');
fam = fam.replace(/<Reveal className="mx-auto mt-10 max-w-3xl">[\s\S]*?<\/Reveal>/, `<Reveal className="mx-auto mt-12 max-w-3xl">
          <TapedNote
            quote="TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."
            author="Sarah M., Dubai, UAE"
          />
        </Reveal>`);
fam = fam.replace("import { Quote } from 'lucide-react';\n", '').replace("import { Reveal } from '@/components/motion/Reveal';", "import { Reveal } from '@/components/motion/Reveal';\nimport { TapedNote } from '@/components/ui/TapedNote';");
fs.writeFileSync('src/components/home/Families.tsx', fam);
console.log('patched Families');

// header: scalloped bottom edge once scrolled; menu button gets a paw
edit('src/components/layout/Header.tsx', [
  ["scrolled && 'bg-milk/85 shadow-[0_1px_0_rgb(42_23_14/0.1)] backdrop-blur-md',", "scrolled && 'bg-milk/95 backdrop-blur-md',"],
  ['      <div className="gutter mx-auto flex h-full max-w-[110rem] items-center justify-between">', '      <div aria-hidden="true" className={cn(\'header-scallop pointer-events-none absolute inset-x-0 top-full h-[14px] transition-opacity duration-300\', scrolled ? \'opacity-100\' : \'opacity-0\')} />\n      <div className="gutter mx-auto flex h-full max-w-[110rem] items-center justify-between">'],
]);
edit('src/components/layout/MobileMenu.tsx', [
  ["import { Menu, X } from 'lucide-react';", "import { X } from 'lucide-react';\nimport { PawIcon } from '@/components/ui/parts';"],
  ['<Menu size={18} aria-hidden="true" /> Menu', '<PawIcon className="size-4" /> Menu'],
]);
let css = fs.readFileSync('src/app/globals.css', 'utf8');
css += `
/* ---------- reference details: scalloped header edge, plank backdrop ---------- */
.header-scallop {
  background: radial-gradient(circle at 14px 0, rgb(255 253 248 / 0.95) 13.5px, transparent 14px) 0 0 / 28px 14px repeat-x;
}
.bg-planks {
  background:
    repeating-linear-gradient(90deg, rgb(194 98 43 / 0.07) 0 2px, transparent 2px 72px),
    linear-gradient(180deg, #fff1d9 0%, #ffe8c2 100%);
}
`;
fs.writeFileSync('src/app/globals.css', css);
console.log('patched css');
