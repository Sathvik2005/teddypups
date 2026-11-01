import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { Home, Package, PawPrint, Plane, ShieldCheck, Headset, Heart, Truck } from 'lucide-react';
import { PageIntro, ButtonLink, WhatsAppButton } from '@/components/ui/parts';
import { Reveal } from '@/components/motion/Reveal';
import { IntroMascot } from '@/components/mascot/IntroMascot';
import { photoOf, SHOWROOM_PHOTO } from '@/data/puppies';
import { MascotShowcase } from '@/components/mascot/MascotShowcase';

export const metadata: Metadata = pageMeta({ title: 'How it works', description: 'Meet your puppy in our Downtown Dubai showroom, or order a rare teacup breed imported for you. Delivery and collection explained.', path: '/how-it-works' });

const toc = [
  ['#two-ways', 'Two ways to meet'],
  ['#promise', 'Our promise'],
  ['#delivery', 'Delivery & collection'],
  ['#why', 'Why choose us'],
] as const;

type Step = { title: string; body: string };
const Steps = ({ steps }: { steps: Step[] }) => (
  <ol className="mt-6 space-y-4">
    {steps.map((s, i) => (
      <li key={s.title} className="flex gap-4 rounded-3xl border-[3px] border-cocoa bg-milk p-5 shadow-[0_4px_0_var(--color-cocoa)]">
        <span aria-hidden="true" className="font-display grid size-10 shrink-0 place-items-center rounded-full bg-honey text-xl font-extrabold">
          {i + 1}
        </span>
        <div>
          <h3 className="h-card text-xl">{s.title}</h3>
          <p className="mt-1 text-cocoa-soft">{s.body}</p>
        </div>
      </li>
    ))}
  </ol>
);

const Card = ({ icon: Icon, title, body }: { icon: typeof Home; title: string; body: string }) => (
  <article className="h-full rounded-[1.75rem] border-[3px] border-cocoa bg-milk p-6 shadow-[0_5px_0_var(--color-cocoa)]">
    <span className="grid size-12 place-items-center rounded-full border-[3px] border-cocoa bg-honey">
      <Icon size={22} aria-hidden="true" />
    </span>
    <h3 className="h-card mt-4 text-2xl">{title}</h3>
    <p className="mt-2 text-cocoa-soft">{body}</p>
  </article>
);

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro title="How it works" photos={[SHOWROOM_PHOTO, photoOf('maltipoo-cavapoo-male'), photoOf('toy-poodle-male-female')]} mascot={<IntroMascot name="biscuit" expression="curious" say="follow me!" label="Biscuit, a curious caramel puppy, ready to guide you" />}>
        Whether you choose to visit us locally or order a premium breed from overseas, TeddyPups is here to make the experience unforgettable.
      </PageIntro>

      <nav aria-label="On this page" className="gutter mx-auto flex max-w-4xl flex-wrap justify-center gap-2.5 pb-12">
        <span className="eyebrow self-center text-lg">On this page</span>
        {toc.map(([h, l]) => (
          <a key={h} href={h} className="tap rounded-full border-2 border-cocoa bg-milk px-4 py-1.5 text-sm font-semibold shadow-[0_3px_0_var(--color-cocoa)] transition-transform hover:-translate-y-0.5">
            {l}
          </a>
        ))}
      </nav>

      <section id="two-ways" aria-labelledby="hw-two" className="gutter mx-auto grid max-w-[110rem] scroll-mt-24 gap-8 pb-20 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-[2rem] border-[3px] border-cocoa bg-honey-soft p-7 md:p-10">
            <p className="eyebrow text-lg">In Dubai</p>
            <h2 id="hw-two" className="h-card mt-1 text-4xl">Meet your puppy in person</h2>
            <p className="mt-4 text-cocoa-soft">
              Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they&apos;re raised with care, proper nutrition, and veterinary checks.
            </p>
            <Steps
              steps={[
                { title: 'Explore our puppies', body: 'Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.' },
                { title: 'Choose your puppy', body: 'Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.' },
                { title: 'Meet before you choose', body: 'Spend time bonding before making your decision.' },
                { title: 'Pick-up or delivery', body: 'Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.' },
              ]}
            />
            <ButtonLink href="/puppies?origin=local" className="mt-6">Explore our puppies</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-[2rem] border-[3px] border-cocoa bg-sky p-7 md:p-10">
            <p className="eyebrow text-lg !text-cocoa">Imported</p>
            <h2 className="h-card mt-1 text-4xl">Order upon request</h2>
            <p className="mt-4 text-cocoa-soft">
              Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world&apos;s most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.
            </p>
            <Steps
              steps={[
                { title: 'Reserve your puppy', body: 'Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.' },
                { title: 'Personalized consultation', body: "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy's journey." },
                { title: 'Import and arrival', body: 'We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.' },
                { title: 'Welcome home', body: 'Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.' },
              ]}
            />
            <ButtonLink href="/puppies?origin=imported" className="mt-6">Reserve your puppy</ButtonLink>
          </div>
        </Reveal>
      </section>

      <section id="promise" aria-labelledby="hw-promise" className="bg-diamonds scroll-mt-24 border-y-[3px] border-cocoa py-20">
        <div className="gutter mx-auto max-w-[110rem]">
          <p className="eyebrow squiggle inline-block text-xl">puppy passport</p>
          <h2 id="hw-promise" className="h-section mt-3">Our premium puppy promise</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            <li><Card icon={PawPrint} title="Hand-selected breeders" body="We work only with breeders who uphold the highest ethical and health standards." /></li>
            <li><Card icon={ShieldCheck} title="Full transparency" body="Photos, videos, and health certificates are shared before your puppy travels." /></li>
            <li><Card icon={Heart} title="Safe, stress-free delivery" body="We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you." /></li>
          </ul>
        </div>
      </section>

      <section id="delivery" aria-labelledby="hw-delivery" className="gutter mx-auto max-w-[110rem] scroll-mt-24 py-20">
        <h2 id="hw-delivery" className="h-section">Delivery &amp; collection</h2>
        <p className="mt-4 max-w-2xl text-lg text-cocoa-soft">From a same-day visit in Downtown Dubai to a flight from Korea, every puppy travels comfortably and arrives safely.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li><Card icon={Home} title="Take your puppy home the same day" body="Local puppies are available immediately — visit, fall in love, and go home together." /></li>
          <li><Card icon={Truck} title="Delivery within Dubai" body="Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably." /></li>
          <li><Card icon={Package} title="Safe international cargo" body="We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free." /></li>
          <li><Card icon={Plane} title="Worldwide delivery" body="We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance." /></li>
        </ul>
      </section>

      <section aria-labelledby="hw-crew" className="gutter mx-auto max-w-[110rem] py-20">
        <p className="eyebrow squiggle inline-block text-xl">the little crew</p>
        <h2 id="hw-crew" className="h-section mt-3">Meet the pack</h2>
        <div className="mt-10">
          <MascotShowcase />
        </div>
      </section>

      <section id="why" aria-labelledby="hw-why" className="scroll-mt-24 border-t-[3px] border-cocoa bg-honey py-20">
        <div className="gutter mx-auto grid max-w-[110rem] gap-10 lg:grid-cols-2">
          <div>
            <h2 id="hw-why" className="h-section">Why choose us</h2>
            <p className="mt-4 max-w-xl text-lg">We&apos;re here to help you find a new family member. From the moment you visit our site to the joyful day your puppy arrives at your door, we&apos;re with you every step of the way. Our mission is to make the entire adoption process smooth, transparent, and full of love.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton>Ask us on WhatsApp</WhatsAppButton>
              <ButtonLink href="/puppies" variant="ghost">See available puppies</ButtonLink>
            </div>
          </div>
          <ul className="grid gap-4">
            <li><Card icon={Headset} title="Support 24/7" body="Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we're just a message away." /></li>
            <li><Card icon={ShieldCheck} title="Health guarantee" body="All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family." /></li>
            <li><Card icon={Heart} title="Unique and high quality puppies" body="When you choose TeddyPups, you can trust that you're getting a puppy of the highest quality. We also provide guidance and support to new pet owners, offering advice on training, nutrition, and general care." /></li>
          </ul>
        </div>
      </section>
    </>
  );
}
