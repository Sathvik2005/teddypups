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

// FAQ page: Mochi
edit('src/app/faq/page.tsx', [
  ["import { PageIntro, WhatsAppButton } from '@/components/ui/parts';", "import { PageIntro, WhatsAppButton } from '@/components/ui/parts';\nimport { IntroMascot } from '@/components/mascot/IntroMascot';"],
  ['<PageIntro eyebrow="have a question?" title="Questions & answers">', '<PageIntro eyebrow="have a question?" title="Questions & answers" mascot={<IntroMascot name="mochi" say="ask away!" label="Mochi, a fluffy cream puppy, ready for your questions" />}>'],
]);
// FAQ preview: small Mochi by the heading
edit('src/components/home/FaqPreview.tsx', [
  ["import { ButtonLink, PupStop } from '@/components/ui/parts';", "import { ButtonLink, PupStop } from '@/components/ui/parts';\nimport { PuppyMascot } from '@/components/mascot/PuppyMascot';"],
  ['<p className="eyebrow squiggle inline-block text-xl">?</p>', '<p className="flex items-end gap-2">\n          <PuppyMascot name="mochi" className="w-16" />\n          <span className="eyebrow squiggle inline-block text-xl">got a question?</span>\n        </p>'],
]);
// Contact: Teddy welcomes you
edit('src/app/contact/page.tsx', [
  ["import { PageIntro } from '@/components/ui/parts';", "import { PageIntro } from '@/components/ui/parts';\nimport { IntroMascot } from '@/components/mascot/IntroMascot';"],
  ['<PageIntro eyebrow="dear TeddyPups…" title="Get in touch with us">', '<PageIntro eyebrow="dear TeddyPups…" title="Get in touch with us" mascot={<IntroMascot name="teddy" wave say="come say hi!" label="Teddy waving a friendly hello" />}>'],
]);
// How it works: Biscuit guides + the crew
edit('src/app/how-it-works/page.tsx', [
  ["import { Reveal } from '@/components/motion/Reveal';", "import { Reveal } from '@/components/motion/Reveal';\nimport { IntroMascot } from '@/components/mascot/IntroMascot';\nimport { MascotShowcase } from '@/components/mascot/MascotShowcase';"],
  ['<PageIntro eyebrow="the puppy passport" title="How it works">', '<PageIntro eyebrow="the puppy passport" title="How it works" mascot={<IntroMascot name="biscuit" expression="curious" say="follow me!" label="Biscuit, a curious caramel puppy, ready to guide you" />}>'],
  ['<section id="why"', '<section aria-labelledby="hw-crew" className="gutter mx-auto max-w-[110rem] py-20">\n        <p className="eyebrow squiggle inline-block text-xl">the little crew</p>\n        <h2 id="hw-crew" className="h-section mt-3">Meet the pack</h2>\n        <div className="mt-10">\n          <MascotShowcase />\n        </div>\n      </section>\n\n      <section id="why"'],
]);
// Catalogue empty state: curious Biscuit
edit('src/components/puppies/PuppyCatalogue.tsx', [
  ["import { PuppyCard } from './PuppyCard';", "import { PuppyCard } from './PuppyCard';\nimport { PuppyMascot } from '@/components/mascot/PuppyMascot';\nimport { PuppyDecorations } from '@/components/decorations/PuppyDecorations';"],
  ['className="mx-auto mt-10 max-w-xl rounded-[2rem] border-[3px] border-dashed border-cocoa p-10 text-center" data-testid="empty-state">\n          <h2 className="h-card text-3xl">No pups match that just yet</h2>', 'className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-[2rem] border-[3px] border-dashed border-cocoa p-10 text-center" data-testid="empty-state">\n          <PuppyDecorations preset="empty" />\n          <PuppyMascot name="biscuit" expression="curious" className="relative mx-auto w-32" label="Biscuit, a curious puppy, looking around for pups" />\n          <h2 className="h-card mt-3 text-3xl">No pups found. Let&apos;s try another search!</h2>'],
]);
// Form success: Coco celebrates (copy stays honest: nothing has been sent)
edit('src/components/puppies/EnquiryForm.tsx', [
  ["import { cn } from '@/lib/cn';", "import { cn } from '@/lib/cn';\nimport { PuppyMascot } from '@/components/mascot/PuppyMascot';"],
  ['<h3 className="h-card text-3xl">Almost there, {done.name.split(\' \')[0]}!</h3>', '<PuppyMascot name="coco" expression="happy" wag className="mascot-hover mb-2 w-24" label="Coco wagging with excitement" />\n        <h3 className="h-card text-3xl">Almost there, {done.name.split(\' \')[0]}!</h3>'],
]);
console.log('done');
