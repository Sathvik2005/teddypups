import { PhotoWall } from '@/components/gallery/PhotoWall';
import { Reveal } from '@/components/motion/Reveal';
import { TapedNote } from '@/components/ui/TapedNote';
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
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <TapedNote
            quote="TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind."
            author="Sarah M., Dubai, UAE"
          />
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
