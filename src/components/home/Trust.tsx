import { Headset, Plane, ShieldCheck, Users } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { PupStop } from '@/components/ui/parts';

const points = [
  { icon: ShieldCheck, title: 'Vet-checked & healthy', body: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.', tone: 'bg-honey' },
  { icon: Plane, title: 'Korea to Dubai, safely', body: 'Trusted breeders, safe travel, and premium care from start to finish.', tone: 'bg-sky' },
  { icon: Headset, title: 'Support 24/7', body: 'Always here to help, from choosing your puppy to post-delivery support.', tone: 'bg-blush' },
  { icon: Users, title: 'Trusted by families worldwide', body: 'Puppies delivered to loving homes all around the world.', tone: 'bg-honey-soft' },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="gutter mx-auto max-w-[110rem] py-20 md:py-28">
      <Reveal className="text-center">
        <p className="eyebrow squiggle inline-block text-xl">puppy passport</p>
        <h2 id="trust-title" className="h-section relative mx-auto mt-3 max-w-4xl">
          Why families trust TeddyPups
          <PupStop name="trust" className="top-full left-1/2" />
        </h2>
      </Reveal>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 80} className="h-full">
              <article className="h-full rounded-[1.75rem] border-[3px] border-cocoa bg-milk p-6 shadow-[0_5px_0_var(--color-cocoa)] transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg]">
                <span className={`grid size-14 place-items-center rounded-full border-[3px] border-cocoa ${p.tone}`}>
                  <p.icon size={26} aria-hidden="true" />
                </span>
                <h3 className="h-card mt-5 text-2xl">{p.title}</h3>
                <p className="mt-2 text-cocoa-soft">{p.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
