'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
import { PawIcon } from '@/components/ui/parts';

interface Pic {
  src: string;
  alt: string;
  href: string;
  name: string;
}

/** Overlapping, slightly tilted photo collage with a rotating seal — the hero's visual anchor. */
export function HeroCollage({ big, round, polaroid }: { big: Pic; round: Pic; polaroid: Pic }) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] lg:col-span-5 lg:max-w-none">
      <Parallax speed={0.07} className="absolute inset-x-[12%] top-0 bottom-[9%]">
        <Link href={big.href} aria-label={`Meet ${big.name}`} data-cursor-say="pick me!" className="block h-full">
          <div className="photo-frame relative h-[min(100%,34rem)] overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-honey-soft" style={{ aspectRatio: '4/5' }}>
            <Image src={big.src} alt={big.alt} fill priority fetchPriority="high" sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" style={{ objectPosition: '50% 38%' }} />
          </div>
        </Link>
      </Parallax>

      <Parallax speed={-0.1} className="absolute bottom-[4%] -left-1 w-[40%] sm:left-0">
        <Link href={round.href} aria-label={`Meet ${round.name}`} data-cursor-say="pick me!" className="block -rotate-6 transition-transform duration-500 hover:rotate-0 hover:scale-105">
          <ImageReveal delay={0.25} className="photo-frame relative aspect-square overflow-hidden rounded-full bg-sky">
            <Image src={round.src} alt={round.alt} fill priority sizes="14rem" className="object-cover" />
          </ImageReveal>
        </Link>
      </Parallax>

      <Parallax speed={0.12} className="absolute top-[7%] -right-1 w-[34%] sm:right-0">
        <Link href={polaroid.href} aria-label={`Meet ${polaroid.name}`} data-cursor-say="pick me!" className="block rotate-[6deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
          <ImageReveal delay={0.4} className="photo-frame rounded-md bg-milk p-1.5 pb-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image src={polaroid.src} alt={polaroid.alt} fill priority sizes="12rem" className="object-cover" />
            </div>
          </ImageReveal>
        </Link>
      </Parallax>

      <div aria-hidden="true" className="absolute right-[2%] bottom-[16%] z-10 size-24 rounded-full border-[3px] border-cocoa bg-honey shadow-[0_5px_0_var(--color-cocoa)] sm:size-28">
        <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full">
          <defs>
            <path id="hero-seal" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0" />
          </defs>
          <text fontSize="11.5" fontWeight="700" letterSpacing="2.2" fill="#2a170e" fontFamily="var(--font-shantell), cursive">
            <textPath href="#hero-seal">every puppy is family • teacup pups •</textPath>
          </text>
        </svg>
        <PawIcon className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-toffee-deep" />
      </div>

      <div className="absolute bottom-[-1.2rem] left-[30%] z-20 w-[24%] min-w-[5.5rem]">
        <MascotSpeechBubble className="-top-9 left-[40%]" delay={1.4}>
          hello!
        </MascotSpeechBubble>
        <PuppyMascot name="teddy" wave className="w-full" label="Teddy, our brand ambassador, waving hello" />
      </div>
    </div>
  );
}
