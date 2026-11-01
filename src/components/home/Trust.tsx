import Image from 'next/image';
import { Headset, Plane, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { Parallax } from '@/components/motion/Parallax';
import { PupStop } from '@/components/ui/parts';
import { getPuppy, puppyPhoto } from '@/data/puppies';
import { families } from '@/data/families';

const card = 'relative overflow-hidden rounded-[2rem] border-[3px] border-cocoa p-7 shadow-[0_7px_0_var(--color-cocoa)] md:p-9';

/** Asymmetric "bento" of the four trust points; each tile carries one big number or image. */
export function Trust() {
  const vet = puppyPhoto(getPuppy('pomeranian-female')!);
  return (
    <section aria-labelledby="trust-title" className="gutter mx-auto max-w-[110rem] py-20 md:py-28">
      <p className="chapter text-lg text-toffee-ink md:text-xl">Chapter 04 — puppy passport</p>
      <SplitText as="h2" id="trust-title" text="Why families trust TeddyPups" className="h-section relative mt-2 max-w-4xl" />
      <PupStop name="trust" className="mt-2" />

      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-7 lg:row-span-2">
          <article className={`${card} flex h-full min-h-[28rem] flex-col justify-end text-milk`}>
            {vet.kind === 'image' && <Image src={vet.src} alt={vet.alt} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover" style={{ objectPosition: '50% 30%' }} />}
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/50 to-transparent" />
            <div className="relative">
              <p className="font-display text-giant text-honey">100%</p>
              <span className="mt-3 flex size-12 items-center justify-center rounded-full border-[3px] border-cocoa bg-honey text-cocoa">
                <ShieldCheck size={24} aria-hidden="true" />
              </span>
              <h3 className="h-card mt-3 text-3xl md:text-4xl">Vet-checked &amp; healthy</h3>
              <p className="mt-2 max-w-md text-lg text-milk/85">Every puppy comes vaccinated, dewormed, and with a verified health certificate.</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5">
          <article className={`${card} h-full bg-sky`}>
            <svg viewBox="0 0 300 70" aria-hidden="true" className="w-full">
              <path d="M10 56C70 6 150 6 290 50" fill="none" stroke="#2f6e9e" strokeWidth="3" strokeDasharray="3 9" strokeLinecap="round" />
              <circle cx="10" cy="56" r="7" fill="#c2622b" stroke="#2a170e" strokeWidth="3" />
              <circle cx="290" cy="50" r="7" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" />
              <text x="20" y="68" fontSize="11" fontWeight="700" fill="#2a170e" fontFamily="var(--font-shantell), cursive">Korea</text>
              <text x="250" y="68" fontSize="11" fontWeight="700" fill="#2a170e" fontFamily="var(--font-shantell), cursive">Dubai</text>
            </svg>
            <div className="float -mt-14 ml-[44%] w-fit rounded-full border-[3px] border-cocoa bg-milk p-2.5" style={{ ['--r' as string]: '12deg' } as React.CSSProperties}>
              <Plane size={22} aria-hidden="true" />
            </div>
            <h3 className="h-card mt-4 text-3xl">Korea to Dubai, safely</h3>
            <p className="mt-2 text-lg text-cocoa/80">Trusted breeders, safe travel, and premium care from start to finish.</p>
          </article>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-5">
          <article className={`${card} h-full bg-honey`}>
            <p className="font-display text-[clamp(4rem,2rem+6vw,7rem)] leading-none font-extrabold">24/7</p>
            <span className="mt-2 flex size-11 items-center justify-center rounded-full border-[3px] border-cocoa bg-milk">
              <Headset size={22} aria-hidden="true" />
            </span>
            <h3 className="h-card mt-3 text-3xl">Support 24/7</h3>
            <p className="mt-2 text-lg text-cocoa/80">Always here to help, from choosing your puppy to post-delivery support.</p>
          </article>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-12">
          <article className={`${card} flex flex-col items-start gap-6 bg-cocoa text-milk md:flex-row md:items-center md:justify-between`}>
            <div>
              <h3 className="h-card text-3xl md:text-4xl">Trusted by families worldwide</h3>
              <p className="mt-2 max-w-md text-lg text-milk/80">Puppies delivered to loving homes all around the world.</p>
            </div>
            <Parallax speed={0.03}>
              <ul className="flex -space-x-4" aria-hidden="true">
                {families.slice(0, 8).map(f => (
                  <li key={f.id} className="relative size-14 overflow-hidden rounded-full border-[3px] border-cocoa bg-honey-soft ring-2 ring-milk md:size-16">
                    <Image src={f.src} alt="" fill sizes="4rem" className="object-cover" />
                  </li>
                ))}
              </ul>
            </Parallax>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
