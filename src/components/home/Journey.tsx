import { Reveal } from '@/components/motion/Reveal';
import { PupStop } from '@/components/ui/parts';
import { JourneyChat } from './JourneyChat';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';

const steps = [
  { title: 'Choose your breed', body: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { title: 'Get photos & details', body: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.' },
  { title: 'Secure & safe delivery', body: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
];

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className="bg-diamonds relative border-y-[3px] border-cocoa py-20 md:py-28">
      <div className="gutter mx-auto grid max-w-[110rem] items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <h2 id="journey-title" className="h-section relative">
              Your puppy journey
              <PupStop name="journey" className="top-full left-10" />
            </h2>
            <p className="mt-4 max-w-xl text-lg text-cocoa-soft">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          </Reveal>
          <div className="relative mt-6 h-24 w-56">
            <PuppyMascot name="coco" expression="happy" wag className="absolute bottom-0 left-0 w-20" label="Coco, ready to guide you" />
            <MascotSpeechBubble className="top-0 left-[4.5rem]" delay={0.8}>one step at a time!</MascotSpeechBubble>
          </div>
          <ol className="mt-8 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 90} className="flex gap-4">
                  <span className="font-display grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-cocoa bg-honey text-2xl font-extrabold shadow-[0_3px_0_var(--color-cocoa)]" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="h-card text-2xl">{s.title}</h3>
                    <p className="mt-1 text-cocoa-soft">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <JourneyChat />
      </div>
    </section>
  );
}
