import Link from 'next/link';
import { PupBuddy } from '@/components/mascot/PupBuddy';
import { PageIntro } from '@/components/ui/parts';

export default function NotFound() {
  return (
    <>
      <PageIntro eyebrow="have you seen this page?" title="This page has wandered off">
        One page, last seen wandering off. It answers to the address you typed, but it isn&apos;t here any more. Teddy is on the case.
      </PageIntro>
      <div className="gutter mx-auto flex max-w-xl flex-col items-center gap-6 pb-24 text-center">
        <PupBuddy className="pup-static w-40" label="Teddy, sniffing out the missing page" />
        <p className="eyebrow text-xl">if found, take a tab:</p>
        <p className="font-semibold">Pages that are here</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/puppies" className="btn btn-primary">Puppies</Link>
          <Link href="/faq" className="btn btn-ghost">Questions</Link>
          <Link href="/contact" className="btn btn-ghost">Contact</Link>
        </div>
      </div>
    </>
  );
}
