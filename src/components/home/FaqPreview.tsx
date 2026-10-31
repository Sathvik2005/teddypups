import { faqs } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/motion/Reveal';
import { ButtonLink, PupStop } from '@/components/ui/parts';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';

export function FaqPreview() {
  return (
    <section aria-labelledby="faq-title" className="gutter mx-auto grid max-w-[110rem] gap-10 py-20 md:py-28 lg:grid-cols-12">
      <Reveal className="lg:col-span-5">
        <p className="flex items-end gap-2">
          <PuppyMascot name="mochi" className="w-16" />
          <span className="eyebrow squiggle inline-block text-xl">got a question?</span>
        </p>
        <h2 id="faq-title" className="h-section relative mt-3">
          Questions, answered
          <PupStop name="faq" className="top-full left-12" />
        </h2>
        <ButtonLink href="/faq" variant="ghost" className="mt-8">
          Read all questions
        </ButtonLink>
      </Reveal>
      <Reveal delay={100} className="lg:col-span-7">
        <Accordion items={faqs.slice(0, 3)} defaultOpen={0} />
      </Reveal>
    </section>
  );
}
