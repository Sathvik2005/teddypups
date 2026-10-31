import { MASCOTS, type MascotName } from './mascotData';
import { PuppyMascot } from './PuppyMascot';
import { Reveal } from '@/components/motion/Reveal';

const crew: { name: MascotName; line: string; props: Partial<Parameters<typeof PuppyMascot>[0]> }[] = [
  { name: 'mochi', line: 'Naps first, questions later.', props: { sleeping: true } },
  { name: 'biscuit', line: 'Always peeking to see who is here.', props: { expression: 'curious' } },
  { name: 'coco', line: 'Will wag at absolutely anyone.', props: { wag: true, expression: 'happy' } },
  { name: 'teddy', line: 'Welcomes every visitor.', props: { wave: true } },
];

/** The four TeddyPups mascots with a one-line personality each. */
export function MascotShowcase() {
  return (
    <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
      {crew.map((c, i) => {
        const m = MASCOTS[c.name];
        return (
          <li key={c.name}>
            <Reveal delay={i * 90} className="h-full">
              <article className="h-full rounded-[1.75rem] border-[3px] border-cocoa bg-milk p-5 text-center shadow-[0_5px_0_var(--color-cocoa)] transition-transform duration-300 hover:-translate-y-1.5">
                <PuppyMascot name={c.name} className="mx-auto w-28" delay={i * 0.7} {...c.props} />
                <h3 className="h-card mt-3 text-2xl">{m.name}</h3>
                <p className="eyebrow text-sm">{m.personality}</p>
                <p className="mt-2 text-sm text-cocoa-soft">{c.line}</p>
              </article>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
