import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { getPuppy, puppies, puppyPhoto } from '@/data/puppies';
import { puppyMessage } from '@/lib/whatsapp';
import { PuppyGallery } from '@/components/puppies/PuppyGallery';
import { PuppyCard } from '@/components/puppies/PuppyCard';
import { EnquiryForm } from '@/components/puppies/EnquiryForm';
import { WhatsAppButton } from '@/components/ui/parts';

export const dynamicParams = false;
export const generateStaticParams = () => puppies.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPuppy((await params).slug);
  if (!p) return {};
  const photo = puppyPhoto(p);
  const title = `${p.name} — ${p.breed}, ${p.gender}, ${p.age}`;
  return {
    title,
    description: `Meet ${p.name}, a ${p.age} old ${p.breed} (${p.gender}) available through TeddyPups U.A.E. Real photos, health details and WhatsApp enquiry.`,
    alternates: { canonical: `/puppies/${p.slug}` },
    openGraph: { title, images: photo.kind === 'image' ? [{ url: photo.src, width: photo.width, height: photo.height }] : undefined },
  };
}

const Chapter = ({ n, label }: { n: number; label: string }) => (
  <p className="mb-6 flex items-center gap-3">
    <span aria-hidden="true" className="font-display grid size-10 place-items-center rounded-full border-[3px] border-cocoa bg-honey text-xl font-extrabold">
      {n}
    </span>
    <span className="eyebrow text-xl">{label}</span>
  </p>
);

const comes = ['Vaccinated', 'Dewormed', 'Verified health certificate from licensed vets', 'Thoroughly checked before joining your family'];
const importSteps = [
  ['Reserve your puppy', 'Tell us which puppy has captured your heart.'],
  ['Personalized consultation', "We finalize details with you and share updates on your puppy's journey."],
  ['Import and arrival', 'We manage health checks, travel arrangements, and documentation.'],
  ['Welcome home', 'We help your new puppy settle in and ensure a smooth transition into your home.'],
];
const localSteps = [
  ['Visit the showroom', 'Come to Downtown Dubai and meet the puppy in person.'],
  ['Spend time together', 'Bond before you decide — there is no rush.'],
  ['Health paperwork', 'We hand over the verified health certificate and vaccination details.'],
  ['Welcome home', 'Take your puppy home the same day, or have them delivered within Dubai.'],
];

export default async function PuppyPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPuppy((await params).slug);
  if (!p) notFound();
  const idx = puppies.indexOf(p);
  const prev = puppies[(idx - 1 + puppies.length) % puppies.length];
  const next = puppies[(idx + 1) % puppies.length];
  const related = puppies.filter(o => o.slug !== p.slug && o.tags.some(t => p.tags.includes(t))).slice(0, 3);
  const steps = p.origin === 'imported' ? importSteps : localSteps;
  const facts: [string, string][] = [
    ['Breed', p.breed],
    ['Boy or girl', p.gender.charAt(0).toUpperCase() + p.gender.slice(1)],
    ['Age', p.age],
    ['Where', p.origin === 'imported' ? 'Imported for you' : 'In our Dubai showroom'],
  ];

  return (
    <article className="gutter mx-auto max-w-[110rem] pt-28 pb-24 md:pt-36">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-cocoa-soft">
        <Link href="/puppies" className="font-semibold underline underline-offset-4 hover:text-toffee-deep">
          Available puppies
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{p.name}</span>
      </nav>

      <Chapter n={1} label="hello, it's me" />
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <PuppyGallery media={p.media} name={p.name} />
        </div>
        <div className="lg:col-span-5">
          <span className="badge-available inline-block">Available</span>
          <h1 className="h-section mt-4 !text-5xl md:!text-6xl">{p.name}</h1>
          <dl className="mt-6 divide-y-2 divide-cocoa/15 rounded-3xl border-[3px] border-cocoa bg-milk">
            {facts.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-5 py-3.5">
                <dt className="text-cocoa-soft">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppButton variant="wa" message={puppyMessage(p)}>
              Ask about this puppy on WhatsApp
            </WhatsAppButton>
            <a href="#enquiry" className="btn btn-ghost">
              Send an enquiry
            </a>
          </div>
        </div>
      </div>

      <section aria-labelledby="comes-title" className="mt-20">
        <Chapter n={2} label={`what comes with this ${p.breed}`} />
        <h2 id="comes-title" className="h-card text-3xl md:text-4xl">
          Every Teddy Pup comes
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {comes.map(c => (
            <li key={c} className="flex items-center gap-3 rounded-2xl border-[3px] border-cocoa bg-honey-soft px-5 py-4 font-semibold">
              <Check size={20} className="shrink-0 text-wa" aria-hidden="true" /> {c}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="way-title" className="mt-20">
        <Chapter n={3} label="the way home" />
        <h2 id="way-title" className="h-card text-3xl md:text-4xl">
          {p.origin === 'imported' ? 'Coming home from abroad' : 'Coming home from our showroom'}
        </h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-3xl border-[3px] border-cocoa bg-milk p-5 shadow-[0_4px_0_var(--color-cocoa)]">
              <span className="font-display text-3xl font-extrabold text-toffee-deep">{i + 1}</span>
              <h3 className="h-card mt-1 text-xl">{t}</h3>
              <p className="mt-1 text-cocoa-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="enquiry" aria-labelledby="enq-title" className="mt-20 grid scroll-mt-24 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Chapter n={4} label="dear TeddyPups…" />
          <h2 id="enq-title" className="h-card text-3xl md:text-4xl">
            Ask about this puppy
          </h2>
          <p className="mt-3 text-cocoa-soft">Leave your details and our team will get back to you promptly — or message us on WhatsApp for the quickest reply.</p>
          <div className="arch relative mt-8 hidden aspect-[3/4] w-48 lg:block">
            {(() => {
              const ph = puppyPhoto(p);
              return ph.kind === 'image' ? <Image src={ph.src} alt={ph.alt} fill sizes="12rem" className="object-cover" /> : null;
            })()}
          </div>
        </div>
        <div className="lg:col-span-7">
          <EnquiryForm heading={`Enquire about ${p.name}`} defaultMessage={`Hi! I'd love to know more about ${p.name === p.breed ? p.breed : `${p.name} (${p.breed})`}.`} />
        </div>
      </section>

      <nav aria-label="More pups" className="mt-20 grid gap-4 sm:grid-cols-2">
        <Link href={`/puppies/${prev.slug}`} className="rounded-3xl border-[3px] border-cocoa bg-milk p-5 shadow-[0_4px_0_var(--color-cocoa)] transition-transform hover:-translate-y-1">
          <span className="eyebrow block text-base">← Previous pup</span>
          <span className="h-card text-2xl">{prev.name}</span>
        </Link>
        <Link href={`/puppies/${next.slug}`} className="rounded-3xl border-[3px] border-cocoa bg-milk p-5 text-right shadow-[0_4px_0_var(--color-cocoa)] transition-transform hover:-translate-y-1">
          <span className="eyebrow block text-base">Next pup →</span>
          <span className="h-card text-2xl">{next.name}</span>
        </Link>
      </nav>

      {related.length > 0 && (
        <section aria-labelledby="rel-title" className="mt-20">
          <h2 id="rel-title" className="h-card text-3xl md:text-4xl">
            More pups you might love
          </h2>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-8">
            {related.map(r => (
              <li key={r.slug} className="flex justify-center">
                <PuppyCard puppy={r} index={puppies.indexOf(r)} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
