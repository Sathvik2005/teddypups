import { Hero } from '@/components/home/Hero';
import { MeetPups } from '@/components/home/MeetPups';
import { TwoWays } from '@/components/home/TwoWays';
import { Journey } from '@/components/home/Journey';
import { Trust } from '@/components/home/Trust';
import { Families } from '@/components/home/Families';
import { FaqPreview } from '@/components/home/FaqPreview';
import { FinalCta } from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MeetPups />
      <TwoWays />
      <Journey />
      <Trust />
      <Families />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
