import { PhotoWall } from '@/components/gallery/PhotoWall';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { TapedNote } from '@/components/ui/TapedNote';
import { ButtonLink, PupStop } from '@/components/ui/parts';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

export function Families() {
  return (
    <section aria-labelledby="families-title" className="bg-planks relative overflow-hidden border-y-[3px] border-cocoa py-20 md:py-28">
      <PuppyDecorations preset="families" />
      <div className="gutter relative mx-auto max-w-[110rem]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="chapter text-lg text-toffee-ink md:text-xl">Chapter 06 — happy endings</p>
            <SplitText as="h2" id="families-title" text="Happy families & puppies" className="h-section relative mt-2" />
            <PupStop name="families" className="mt-2" />
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lg text-cocoa-soft">
                We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.
              </p>
            </Reveal>
          </div>
          <Reveal delay={200} className="lg:col-span-5">
            <TapedNote
              quote="TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."
              author="Sarah M., Dubai, UAE"
            />
          </Reveal>
        </div>
        <div className="cv-auto -mb-6 mt-10 py-6">
          <PhotoWall limit={9} variant="collage" />
        </div>
        <div className="mt-14 text-center">
          <ButtonLink href="/happy-families">See every happy family</ButtonLink>
        </div>
      </div>
    </section>
  );
}
