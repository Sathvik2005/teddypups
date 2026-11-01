import Link from 'next/link';
import { BadgeCheck, PawPrint, Plane } from 'lucide-react';
import { site } from '@/data/site';
import { puppies } from '@/data/puppies';
import { WhatsAppButton } from '@/components/ui/parts';
import { SplitTextCss } from '@/components/motion/SplitTextCss';
import { Magnetic } from '@/components/motion/Magnetic';

const facts = [
  { icon: PawPrint, text: `${puppies.length} pups looking for homes` },
  { icon: BadgeCheck, text: 'Vet-checked & certified' },
  { icon: Plane, text: 'Korea to Dubai, safely' },
];

const d = (s: number) => ({ ['--d' as string]: `${s}s` }) as React.CSSProperties;

/** Hero copy. Server-rendered and animated with CSS only, so the headline paints without waiting for JavaScript. */
export function HeroCopy() {
  return (
    <div className="relative z-10 lg:col-span-7">
      <p className="eyebrow squiggle rise inline-block text-xl md:text-2xl" style={d(0)}>
        {site.tagline}
      </p>
      <SplitTextCss as="h1" id="hero-title" text="Premium teacup puppies in Dubai" className="h-hero mt-4 max-w-[13ch] !text-[clamp(2.9rem,1rem+7.4vw,7.6rem)]" delay={0.05} />
      <p className="rise mt-7 max-w-xl text-lg text-cocoa-soft md:text-xl" style={d(0.2)}>
        Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
      </p>
      <div className="rise mt-9 flex flex-wrap items-center gap-4" style={d(0.3)}>
        <Magnetic>
          <Link href="/puppies" data-cursor-say="treat?" className="btn btn-primary">
            View available puppies
          </Link>
        </Magnetic>
        <Magnetic>
          <WhatsAppButton variant="ghost" />
        </Magnetic>
      </div>
      <ul className="rise mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[0.95rem] font-semibold text-cocoa-soft" style={d(0.4)}>
        {facts.map(f => (
          <li key={f.text} className="flex items-center gap-2">
            <f.icon size={18} className="text-toffee" aria-hidden="true" />
            {f.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
