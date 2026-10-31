import type { Metadata } from 'next';
import { faqs } from '@/data/faq';
import { Accordion } from '@/components/ui/Accordion';
import { PageIntro, WhatsAppButton } from '@/components/ui/parts';
import { IntroMascot } from '@/components/mascot/IntroMascot';

export const metadata: Metadata = {
  title: 'Questions & answers',
  description: 'Answers about health checks, meeting a puppy, same-day collection, importing from Korea and delivery.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <PageIntro eyebrow="have a question?" title="Questions & answers" mascot={<IntroMascot name="mochi" say="ask away!" label="Mochi, a fluffy cream puppy, ready for your questions" />}>
        Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.
      </PageIntro>
      <div className="gutter mx-auto max-w-3xl pb-12">
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
