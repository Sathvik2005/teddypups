import { Marquee } from '@/components/motion/Marquee';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';
import { PawIcon } from '@/components/ui/parts';
import { getPuppy, puppyPhoto } from '@/data/puppies';
import { HeroCollage } from './HeroCollage';
import { HeroCopy } from './HeroCopy';

const TICKER = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu', 'Korean Teacup', 'every puppy is family', 'Teacup puppies in Dubai'];

const photo = (slug: string) => {
  const p = getPuppy(slug)!;
  const m = puppyPhoto(p);
  return { src: m.kind === 'image' ? m.src : '', alt: m.alt, href: `/puppies/${p.slug}`, name: p.name };
};

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-hero relative overflow-hidden pt-28 md:pt-32">
      <PuppyDecorations preset="hero" />
      <div className="gutter relative mx-auto grid max-w-[110rem] items-center gap-14 pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
        <HeroCopy />
        <HeroCollage big={photo('maltipoo-max-male')} round={photo('korean-teacup-maltipoo-female')} polaroid={photo('maltipoo-cavapoo-male')} />
      </div>
      <div className="relative z-10 border-y-[3px] border-cocoa bg-honey py-3.5 text-cocoa">
        <Marquee speed={42}>
          {TICKER.map(t => (
            <span key={t} className="flex items-center gap-5 pr-5 font-display text-2xl font-extrabold whitespace-nowrap md:text-3xl">
              {t}
              <PawIcon className="size-5 text-toffee-deep" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
