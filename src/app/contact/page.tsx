import type { Metadata } from 'next';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { PageIntro } from '@/components/ui/parts';
import { IntroMascot } from '@/components/mascot/IntroMascot';
import { EnquiryForm } from '@/components/puppies/EnquiryForm';

export const metadata: Metadata = {
  title: 'Visit & contact',
  description: 'Visit our Downtown Dubai showroom, call or WhatsApp us, or send an enquiry about a puppy.',
  alternates: { canonical: '/contact' },
};

const interests = [
  'General enquiry',
  'Max (Maltipoo, boy)',
  'Korean Teacup Maltipoo (girl)',
  'Korean Teacup Poodle (girl)',
  'Maltipoo & Cavapoo (boy)',
  'Toy Poodle (boy & girl)',
  'Maltipoo (girl)',
  'Pomeranian (girl)',
  'Copper (Cavapoo, boy)',
  'Shih Tzu (girl)',
  'Shih Tzu (boy)',
  'Korean Teacup Pomeranian (girl)',
  'Korean Teacup Pomeranian (boy)',
];

const box = 'rounded-3xl border-[3px] border-cocoa bg-milk p-6 shadow-[0_5px_0_var(--color-cocoa)]';

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="dear TeddyPups…" title="Get in touch with us" mascot={<IntroMascot name="teddy" wave say="come say hi!" label="Teddy waving a friendly hello" />}>
        Have questions about our puppies or adoption process? Fill out the form, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we&apos;d love to hear from you!
      </PageIntro>
      <div className="gutter mx-auto grid max-w-[110rem] gap-10 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EnquiryForm interests={interests} defaultMessage="Hi! I'd love to know more about your puppies." heading="Contact form" />
        </div>
        <aside aria-label="Contact details" className="space-y-5 lg:col-span-5">
          <div className={box}>
            <p className="eyebrow flex items-center gap-2 text-lg"><Phone size={18} aria-hidden="true" /> call us</p>
            <a href={site.phoneHref} className="h-card mt-1 block text-3xl hover:text-toffee-deep">{site.phoneDisplay}</a>
          </div>
          <div className={box}>
            <p className="eyebrow flex items-center gap-2 text-lg"><Mail size={18} aria-hidden="true" /> email</p>
            <a href={`mailto:${site.email}`} className="mt-1 block font-semibold break-all underline underline-offset-4 hover:text-toffee-deep">{site.email}</a>
          </div>
          <div className={`${box} overflow-hidden`}>
            <p className="eyebrow flex items-center gap-2 text-lg"><MapPin size={18} aria-hidden="true" /> showroom</p>
            <h2 className="h-card mt-1 text-3xl">Visit us in Downtown Dubai</h2>
            <p className="mt-2 text-cocoa-soft">Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
            <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl border-[3px] border-cocoa">
              <Image src="/images/contact/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg" alt="The apricot teddy bear puppy from our showroom, held up to say hello" fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover" />
            </div>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">Open in Google Maps</a>
          </div>
        </aside>
      </div>
    </>
  );
}
