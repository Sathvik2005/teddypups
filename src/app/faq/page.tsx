import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { faqs } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { PageIntro, WhatsAppButton } from '@/components/ui/parts';
import { IntroMascot } from '@/components/mascot/IntroMascot';
import { photoOf } from '@/data/puppies';

export const metadata: Metadata = pageMeta({ title: 'Questions & answers', description: 'Answers about health checks, meeting a puppy, same-day collection, importing from Korea and delivery.', path: '/faq' });

export default function FaqPage() {
  return (
    <>
      <PageIntro title="Questions & answers" photos={[photoOf('korean-teacup-poodle-female'), photoOf('shitzu-male'), photoOf('maltipoo-female')]} mascot={<IntroMascot name="mochi" say="ask away!" label="Mochi, a fluffy cream puppy, ready for your questions" />}>
        Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
      </PageIntro>
      <div className="gutter mx-auto max-w-3xl pb-12">
        <h2 className="sr-only">Frequently asked questions</h2>
        <Accordion items={faqs} defaultOpen={0} />
      </div>
      <p className="gutter pb-24 text-center">
        <WhatsAppButton>Ask us on WhatsApp</WhatsAppButton>
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          }),
        }}
      />
    </>
  );
}
