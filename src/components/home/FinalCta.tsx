import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';
import { Parallax } from '@/components/motion/Parallax';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { SplitText } from '@/components/motion/SplitText';
import { Magnetic } from '@/components/motion/Magnetic';
import { ButtonLink, PawIcon, PupStop, WhatsAppButton } from '@/components/ui/parts';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';
import { getPuppy, puppyPhoto } from '@/data/puppies';

export function FinalCta() {
  const photo = puppyPhoto(getPuppy('maltipoo-female-2')!);
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y-[3px] border-cocoa bg-cocoa text-milk">
      <PuppyDecorations preset="cta" />
      <div className="gutter relative mx-auto grid max-w-[110rem] items-center gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="chapter text-lg text-honey md:text-xl">Chapter 05 — welcome home</p>
          <SplitText as="h2" id="cta-title" text="Ready to meet your new best friend?" className="h-section relative mt-3" />
          <PupStop name="cta" className="mt-2" />
          <Reveal delay={150}>
            <p className="mt-6 max-w-2xl text-lg text-milk/80">
              Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Magnetic>
                <WhatsAppButton />
              </Magnetic>
              <Magnetic>
                <ButtonLink href="/contact" variant="ghost" className="!border-milk !text-milk hover:!bg-milk/10">
                  Visit &amp; contact
                </ButtonLink>
              </Magnetic>
            </div>
          </Reveal>
        </div>
        <Parallax speed={0.09} className="lg:col-span-5">
          {photo.kind === 'image' && (
            <ImageReveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[3px] border-milk bg-honey-soft shadow-[0_10px_0_var(--color-toffee)]">
              <Image src={photo.src} alt={photo.alt} fill sizes="24rem" className="object-cover" />
            </ImageReveal>
          )}
        </Parallax>
      </div>
      <div className="border-t-[3px] border-milk/20 py-4 text-honey">
        <Marquee speed={48} reverse>
          {['welcome home', 'every puppy is family', 'welcome home', 'teacup puppies in Dubai'].map((t, i) => (
            <span key={i} className="flex items-center gap-5 pr-5 font-display text-2xl font-extrabold whitespace-nowrap md:text-3xl">
              {t}
              <PawIcon className="size-5 text-toffee" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
