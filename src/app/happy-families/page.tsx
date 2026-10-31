import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { families } from '@/data/families';
import { PhotoWall } from '@/components/gallery/PhotoWall';
import { TapedNote } from '@/components/ui/TapedNote';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Happy families',
  description: 'Nothing makes us happier than seeing our puppies in loving homes. Beautiful moments shared by our amazing clients after welcoming their furry friends.',
  alternates: { canonical: '/happy-families' },
};

export default function HappyFamiliesPage() {
  return (
    <div className="bg-planks relative">
      <PuppyDecorations preset="families" />
      <section aria-labelledby="families-title" className="gutter relative mx-auto max-w-[110rem] pt-32 pb-24 md:pt-40">
        <Reveal>
          <p className="eyebrow text-lg md:text-xl">our wall of happy endings</p>
          <h1 id="families-title" className="h-section mt-1 flex flex-wrap items-center gap-4">
            Happy families
            <Heart aria-hidden="true" className="size-8 text-toffee md:size-10" strokeWidth={1.8} />
          </h1>
          <p className="mt-6 max-w-[50ch] text-lg text-cocoa-soft md:text-xl">
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
          </p>
          <p className="eyebrow mt-5 text-lg md:text-xl">{families.length} moments and counting</p>
        </Reveal>

        <Reveal delay={80} className="mt-10 max-w-3xl">
          <TapedNote
            quote="TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."
            author="Sarah M., Dubai, UAE"
          />
        </Reveal>

        <div className="mt-14">
          <PhotoWall />
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <PuppyMascot name="teddy" className="w-36 md:w-44" label="Teddy, admiring the wall" />
          <p className="eyebrow text-lg">every one of them was a Teddy Pup once</p>
        </div>
      </section>
    </div>
  );
}
