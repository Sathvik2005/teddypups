import { Quote } from 'lucide-react';
import { PhotoWall } from '@/components/gallery/PhotoWall';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink, PupStop } from '@/components/ui/parts';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

export function Families() {
  return (
    <section aria-labelledby="families-title" className="bg-honey-soft relative border-y-[3px] border-cocoa py-20 md:py-28">
      <PuppyDecorations preset="families" />
      <div className="gutter mx-auto max-w-[110rem]">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="families-title" className="h-section relative">
            Happy families &amp; puppies
            <PupStop name="families" className="top-full left-1/2" />
          </h2>
          <p className="mt-4 text-lg text-cocoa-soft">
            We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
          </p>
        </Reveal>
        <Reveal className="mx-auto mt-10 max-w-3xl">
          <figure className="relative rounded-[2rem] border-[3px] border-cocoa bg-milk p-7 shadow-[0_6px_0_var(--color-cocoa)] md:p-9">
            <Quote size={34} className="absolute -top-5 left-6 rounded-full bg-honey p-1.5 text-cocoa" aria-hidden="true" />
            <blockquote className="font-display text-xl leading-snug font-bold md:text-2xl">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="mt-4 font-semibold">
              Sarah M. <span className="font-normal text-cocoa-soft">· Dubai, UAE</span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="mt-12">
          <PhotoWall limit={8} variant="prints" />
        </div>
        <div className="mt-12 text-center">
          <ButtonLink href="/happy-families">See every happy family</ButtonLink>
        </div>
      </div>
    </section>
  );
}
