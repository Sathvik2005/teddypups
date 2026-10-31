import Link from 'next/link';
import { puppies } from '@/data/puppies';
import { PuppyRail } from '@/components/puppies/PuppyRail';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink, PupStop } from '@/components/ui/parts';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

export function MeetPups() {
  return (
    <section aria-labelledby="meet-title" className="relative bg-cream pt-16 md:pt-24">
      <PuppyDecorations preset="showcase" />
      <div className="gutter relative mx-auto flex max-w-[110rem] flex-wrap items-end justify-between gap-6">
        <PuppyMascot name="biscuit" expression="curious" className="absolute right-[17rem] -bottom-2 hidden w-16 md:block" />
        <Reveal>
          <h2 id="meet-title" className="h-section relative">
            Meet the pups
            <PupStop name="meet" className="top-full left-12" />
          </h2>
          <p className="mt-3 max-w-xl text-lg text-cocoa-soft">Real puppies, real photos, looking for their families right now.</p>
        </Reveal>
        <ButtonLink href="/puppies">See all available puppies</ButtonLink>
      </div>
      <PuppyRail puppies={puppies} />
      <p className="gutter mx-auto max-w-[110rem] py-8 text-center">
        <Link href="/puppies" className="font-semibold underline decoration-toffee decoration-2 underline-offset-4 transition-colors hover:text-toffee-deep">
          Meet them all
        </Link>
      </p>
    </section>
  );
}
