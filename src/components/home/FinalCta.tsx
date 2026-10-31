import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink, PupStop, WhatsAppButton } from '@/components/ui/parts';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden border-y-[3px] border-cocoa bg-honey py-20 text-center md:py-28">
      <Reveal className="gutter mx-auto max-w-4xl">
        <p className="eyebrow squiggle inline-block text-xl !text-toffee-ink">welcome home</p>
        <h2 id="cta-title" className="h-section relative mt-3">
          Ready to meet your new best friend?
          <PupStop name="cta" className="top-full left-1/2" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-cocoa/85">
          Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <WhatsAppButton />
          <ButtonLink href="/contact" variant="ghost">
            Visit &amp; contact
          </ButtonLink>
        </div>
      </Reveal>
      <PuppyDecorations preset="cta" />
    </section>
  );
}
