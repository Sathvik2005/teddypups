import type { Metadata } from 'next';
import Image from 'next/image';
import { goneHome } from '@/data/gone-home';
import { PageIntro, ButtonLink, PupStop } from '@/components/ui/parts';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Gone home',
  description: 'Puppies who have already joined loving families. Looking for one just like them? Tell us — we will help you find your match.',
  alternates: { canonical: '/gone-home' },
};

export default function GoneHomePage() {
  return (
    <>
      <PageIntro title="Puppies who have gone home">
        Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we&apos;ll help you find your match.
      </PageIntro>
      <div className="gutter relative mx-auto max-w-[110rem] pb-12">
        <PupStop name="gone" className="top-0 left-1/2" />
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {goneHome.map((p, i) => (
            <li key={`${p.src}-${i}`}>
              <Reveal delay={(i % 5) * 60} className="h-full">
                <article className="photo-card flex h-full flex-col overflow-hidden rounded-3xl border-[3px] border-cocoa bg-milk shadow-[0_5px_0_var(--color-cocoa)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg]">
                  <div className="relative aspect-[4/5] overflow-hidden border-b-[3px] border-dashed border-cocoa bg-honey-soft">
                    <Image src={p.src} alt={`${p.name}, ${p.gender === 'boy' ? 'male' : 'female'} ${p.breed} puppy`} fill sizes="(min-width:1280px) 20vw, (min-width:768px) 33vw, 50vw" className="zoom-img object-cover" loading={i < 5 ? 'eager' : 'lazy'} />
                    <span className="badge-available absolute top-3 right-2">home ♥</span>
                  </div>
                  <div className="flex flex-1 flex-col px-4 py-3">
                    <p className="eyebrow text-xs tracking-wide uppercase">admit one</p>
                    <h2 className="h-card text-2xl">{p.name}</h2>
                    <p className="text-sm text-cocoa-soft">
                      {p.breed}, {p.gender}
                      {p.note ? ` · ${p.note}` : ''}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <p className="gutter pb-24 pt-8 text-center">
        <ButtonLink href="/puppies">See available puppies</ButtonLink>
      </p>
    </>
  );
}
