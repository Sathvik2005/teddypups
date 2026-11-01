import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ButtonLink } from '@/components/ui/parts';
import { getPuppy, puppyPhoto } from '@/data/puppies';

function Plane() {
  return (
    <svg viewBox="0 0 220 90" aria-hidden="true" className="float w-44 max-w-full md:w-56" style={{ ['--r' as string]: '-4deg' } as React.CSSProperties}>
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

const panel =
  'group relative flex min-h-[30rem] flex-1 flex-col justify-end overflow-hidden rounded-[2.5rem] border-[3px] border-cocoa p-7 text-milk shadow-[0_8px_0_var(--color-cocoa)] transition-[flex-grow] duration-700 ease-out md:p-10 lg:min-h-0 lg:hover:flex-[1.55] lg:focus-within:flex-[1.55]';

export function TwoWays() {
  const imported = puppyPhoto(getPuppy('korean-teacup-poodle-female')!);
  return (
    <section aria-labelledby="two-title" className="gutter mx-auto max-w-[110rem] py-20 md:py-28">
      <p className="chapter text-lg text-toffee-ink md:text-xl">Chapter 02 — pick your path</p>
      <SplitText as="h2" id="two-title" text="Two ways to meet your puppy" className="h-section mt-2 max-w-4xl" />
      <div className="mt-12 flex flex-col gap-5 lg:h-[36rem] lg:flex-row">
        <Reveal className="flex flex-1 lg:contents">
          <article className={panel}>
            <Image src="/images/contact/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-105" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/55 to-transparent" />
            <div className="relative">
              <p className="chapter text-lg text-honey">Puppies in Dubai</p>
              <h3 className="h-card mt-1 text-4xl md:text-5xl">In our showroom</h3>
              <p className="mt-3 max-w-md text-lg text-milk/85">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
              <ButtonLink href="/puppies?origin=local" variant="honey" className="mt-6">
                Meet local puppies
              </ButtonLink>
            </div>
          </article>
        </Reveal>
        <Reveal delay={140} className="flex flex-1 lg:contents">
          <article className={panel}>
            {imported.kind === 'image' && (
              <Image src={imported.src} alt={imported.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-105" style={{ objectPosition: '50% 30%' }} />
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sky-deep via-sky-deep/55 to-transparent" />
            <div aria-hidden="true" className="absolute top-8 right-6 md:right-10">
              <Plane />
            </div>
            <div className="relative">
              <p className="chapter text-lg text-sky">Korea ✈ Dubai</p>
              <h3 className="h-card mt-1 text-4xl md:text-5xl">Imported for you</h3>
              <p className="mt-3 max-w-md text-lg text-milk/90">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
              <ButtonLink href="/puppies?origin=imported" variant="honey" className="mt-6">
                See imported puppies
              </ButtonLink>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
