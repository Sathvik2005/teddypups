import Image from 'next/image';
import Link from 'next/link';
import { getPuppy, heroLineup, puppyPhoto } from '@/data/puppies';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';
import { Quilt } from '@/components/ui/parts';
import { HeroCopy } from './HeroCopy';

// width multiplier per slot (Teddy sits in slot 4), left → right
const SLOTS = [
  { k: 1.35, ar: '3/3.7' },
  { k: 1.75, ar: '3/4.1' },
  { k: 1.45, ar: '3/3.5' },
  { k: 2.3, ar: '' },
  { k: 1.55, ar: '3/3.8' },
  { k: 1.95, ar: '3/4.3' },
  { k: 1.3, ar: '3/3.3' },
];

export function Hero() {
  const pups = heroLineup.map(s => getPuppy(s)!);
  const order = [pups[0], pups[1], pups[2], null, pups[3], pups[4], pups[5]];
  return (
    <section aria-labelledby="hero-title" className="bg-hero relative overflow-hidden pt-28 md:pt-32">
      <PuppyDecorations preset="hero" />
      <HeroCopy />
      <div className="relative mx-auto mt-10 flex max-w-[110rem] items-end justify-center gap-[0.35rem] px-2 [--u:clamp(1.9rem,7.2vw,6.4rem)] md:mt-14 md:gap-3">
        {order.map((p, i) => {
          const slot = SLOTS[i];
          if (!p) {
            return (
              <div key="teddy" className="relative z-0 -mb-1" style={{ width: `calc(var(--u) * ${slot.k})` }}>
                
                <MascotSpeechBubble className="-top-9 left-[52%]" delay={1.4}>hello!</MascotSpeechBubble>
                <PuppyMascot name="teddy" wave className="w-full" label="Teddy, our brand ambassador, waving hello" />
              </div>
            );
          }
          const photo = puppyPhoto(p);
          return (
            <Link
              key={p.slug}
              href={`/puppies/${p.slug}`}
              aria-label={`Meet ${p.name}, ${p.breed}`}
              data-cursor-say="pick me!" className="door-card arch group relative block"
              style={{ width: `calc(var(--u) * ${slot.k})`, aspectRatio: slot.ar }}
            >
              {photo.kind === 'image' && <Image src={photo.src} alt={photo.alt} fill priority sizes="20vw" className="zoom-img object-cover" style={{ objectPosition: '50% 38%' }} />}
            </Link>
          );
        })}
      </div>
      <Quilt className="-mt-3" />
    </section>
  );
}
