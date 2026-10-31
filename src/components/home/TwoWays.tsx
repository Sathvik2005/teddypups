import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink } from '@/components/ui/parts';

function Plane() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="float w-56 max-w-full" style={{ ['--r' as string]: '-4deg' } as React.CSSProperties}>
      <path d="M10 46c0-10 16-18 54-18h96c26 0 44 8 50 18-6 10-24 18-50 18H64c-38 0-54-8-54-18Z" fill="#fffdf8" stroke="#2a170e" strokeWidth="3.5" />
      <path d="M96 30L70 4h22l36 26M96 62l-26 24h22l36-24" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M12 44h50" stroke="#c2622b" strokeWidth="4" />
      {[110, 136, 162].map(cx => (
        <circle key={cx} cx={cx} cy="44" r="7" fill="#bfddf5" stroke="#2a170e" strokeWidth="3" />
      ))}
      <circle cx="187" cy="46" r="5" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.5" />
    </svg>
  );
}

export function TwoWays() {
  return (
    <section aria-labelledby="two-title" className="gutter mx-auto max-w-[110rem] py-20 md:py-28">
      <Reveal className="text-center">
        <h2 id="two-title" className="h-section mx-auto max-w-4xl">
          Two ways to meet your puppy
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
        <Reveal>
          <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-cocoa bg-honey-soft p-7 shadow-[0_6px_0_var(--color-cocoa)] md:p-10">
            <p className="eyebrow text-lg">Puppies in Dubai</p>
            <h3 className="h-card mt-2 text-4xl md:text-5xl">In our showroom</h3>
            <p className="mt-4 max-w-md text-lg text-cocoa-soft">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <ButtonLink href="/puppies?origin=local">Meet local puppies</ButtonLink>
              <div className="arch relative hidden aspect-[3/4] w-32 sm:block">
                <Image src="/images/contact/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom" fill sizes="8rem" className="object-cover" />
              </div>
            </div>
          </article>
        </Reveal>
        <Reveal delay={120}>
          <article className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border-[3px] border-cocoa bg-sky p-7 shadow-[0_6px_0_var(--color-cocoa)] md:p-10">
            <p className="eyebrow text-lg !text-sky-deep">Korea ✈ Dubai</p>
            <h3 className="h-card mt-2 text-4xl md:text-5xl">Imported for you</h3>
            <p className="mt-4 max-w-md text-lg text-cocoa-soft">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-8">
              <ButtonLink href="/puppies?origin=imported">See imported puppies</ButtonLink>
              <Plane />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
