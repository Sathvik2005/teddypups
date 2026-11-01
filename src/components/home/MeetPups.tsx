import { puppies } from '@/data/puppies';
import { PuppyRail } from '@/components/puppies/PuppyRail';
import { Reveal } from '@/components/motion/Reveal';
import { SplitText } from '@/components/motion/SplitText';
import { ButtonLink, PupStop } from '@/components/ui/parts';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

export function MeetPups() {
  return (
    <section aria-labelledby="meet-title" className="relative overflow-hidden bg-cream py-20 md:py-28">
      <PuppyDecorations preset="showcase" />
      <div className="gutter relative mx-auto flex max-w-[110rem] flex-wrap items-end justify-between gap-8">
        <PuppyMascot name="biscuit" expression="curious" className="absolute right-[17rem] -bottom-2 hidden w-16 md:block" />
        <div>
          <p className="chapter text-lg text-toffee-ink md:text-xl">Chapter 01 — hello, it&apos;s us</p>
          <SplitText as="h2" id="meet-title" text="Meet the pups" className="h-section relative mt-2" />
          <PupStop name="meet" className="mt-2" />
          <Reveal delay={150}>
            <p className="mt-4 max-w-xl text-lg text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
          </Reveal>
        </div>
        <ButtonLink href="/puppies">See all available puppies</ButtonLink>
      </div>
      <PuppyRail puppies={puppies} />
    </section>
  );
}
