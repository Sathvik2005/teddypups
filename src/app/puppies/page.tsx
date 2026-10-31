import type { Metadata } from 'next';
import { Suspense } from 'react';
import { puppies } from '@/data/puppies';
import { PageIntro } from '@/components/ui/parts';
import { PuppyCard } from '@/components/puppies/PuppyCard';
import { PuppyCatalogue } from '@/components/puppies/PuppyCatalogue';

export const metadata: Metadata = {
  title: 'Available puppies',
  description: 'Every listing shows real photos of the actual puppy. Browse Maltipoo, Pomeranian, Poodle, Cavapoo and Shih Tzu puppies available in Dubai.',
  alternates: { canonical: '/puppies' },
};

export default function PuppiesPage() {
  return (
    <>
      <PageIntro eyebrow="from Teddy's sketchbook" title="Available puppies">
        Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
      </PageIntro>
      <Suspense
        fallback={
          <ul className="gutter mx-auto grid max-w-[110rem] grid-cols-2 gap-x-4 gap-y-12 pb-24 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4">
            {puppies.map((p, i) => (
              <li key={p.slug} className="flex justify-center">
                <PuppyCard puppy={p} index={i} />
              </li>
            ))}
          </ul>
        }
      >
        <PuppyCatalogue />
      </Suspense>
    </>
  );
}
