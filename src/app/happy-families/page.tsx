import type { Metadata } from 'next';
import { families } from '@/data/families';
import { PageIntro, WhatsAppButton } from '@/components/ui/parts';
import { PhotoWall } from '@/components/gallery/PhotoWall';

export const metadata: Metadata = {
  title: 'Happy families',
  description: 'Real photos of families and the Teddy Pups who joined them. Tap any photo to see it larger.',
  alternates: { canonical: '/happy-families' },
};

export default function HappyFamiliesPage() {
  return (
    <>
      <PageIntro eyebrow="our favourite photos" title="Happy families">
        We are truly honored to see our puppies become cherished members of loving families. Tap a photo to see it larger — {families.length} happy homes so far.
      </PageIntro>
      <div className="gutter mx-auto max-w-[110rem] pb-16">
        <PhotoWall />
      </div>
      <p className="gutter pb-24 text-center">
        <WhatsAppButton>Start your own story</WhatsAppButton>
      </p>
    </>
  );
}
