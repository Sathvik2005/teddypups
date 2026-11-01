'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { cn } from '@/lib/cn';
import { PupStop } from '@/components/ui/parts';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { MascotSpeechBubble } from '@/components/mascot/MascotSpeechBubble';
import { SplitText } from '@/components/motion/SplitText';
import { JourneyChat } from './JourneyChat';

const steps = [
  { title: 'Choose your breed', body: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { title: 'Get photos & details', body: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.' },
  { title: 'Secure & safe delivery', body: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
];

const WIDE = '(min-width: 1024px)';
const subscribe = (cb: () => void) => {
  const m = matchMedia(WIDE);
  m.addEventListener('change', cb);
  return () => m.removeEventListener('change', cb);
};

/** Sticky scroll-storytelling: the chat on the left builds as each step on the right passes the middle of the screen. */
export function Journey() {
  const [active, setStep] = useState(0);
  const wide = useSyncExternalStore(subscribe, () => matchMedia(WIDE).matches, () => true);
  // below lg the layout is stacked: show the whole conversation instead of scroll-driving it
  const step = wide ? active : 2;
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (!wide) return;
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [wide]);

  return (
    <section aria-labelledby="journey-title" className="bg-diamonds relative border-y-[3px] border-cocoa py-20 md:py-28">
      <div className="gutter mx-auto grid max-w-[110rem] gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="chapter text-lg text-toffee-ink md:text-xl">Chapter 03 — the way home</p>
          <SplitText as="h2" id="journey-title" text="Your puppy journey" className="h-section relative mt-2" />
          <PupStop name="journey" className="mt-2" />
          <p className="mt-4 max-w-xl text-lg text-cocoa-soft">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <div className="relative mt-6 mb-2 h-24 w-56">
            <PuppyMascot name="coco" expression="happy" wag className="absolute bottom-0 left-0 w-20" label="Coco, ready to guide you" />
            <MascotSpeechBubble className="top-0 left-[4.5rem]" delay={0.8}>
              one step at a time!
            </MascotSpeechBubble>
          </div>
          <div className="mt-6">
            <JourneyChat step={step} />
          </div>
        </div>

        <ol className="lg:pt-[8vh] lg:pb-[12vh]">
          {steps.map((s, i) => (
            <li
              key={s.title}
              ref={el => {
                refs.current[i] = el;
              }}
              data-step={i}
              className={cn('flex gap-5 py-6 transition-opacity duration-500 lg:min-h-[62vh] lg:items-center lg:py-0', step === i ? 'opacity-100' : 'lg:opacity-30')}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'font-display grid size-16 shrink-0 place-items-center rounded-full border-[3px] border-cocoa text-3xl font-extrabold shadow-[0_4px_0_var(--color-cocoa)] transition-colors duration-500 md:size-20 md:text-4xl',
                  step === i ? 'bg-toffee text-milk' : 'bg-honey',
                )}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="h-card text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-3 max-w-md text-lg text-cocoa-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
