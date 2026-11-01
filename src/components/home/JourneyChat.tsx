'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { whatsappUrl, GENERAL_MESSAGE } from '@/lib/whatsapp';
import { breedChips, getPuppy, puppyPhoto } from '@/data/puppies';

const THUMBS = ['maltipoo-max-male', 'pomeranian-female', 'copper-male'];

/** WhatsApp-style conversation that builds up as `step` advances (0 → 2). */
export function JourneyChat({ step }: { step: number }) {
  const reduce = useReducedMotion();
  const pop = {
    initial: reduce ? false : { opacity: 0, y: 18, scale: 0.94 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, ease: [0.34, 1.4, 0.64, 1] as const },
  };
  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 shadow-[0_10px_0_var(--color-cocoa)]">
      <div className="flex items-center gap-3 rounded-2xl bg-wa px-4 py-3 text-white">
        <span className="grid size-9 place-items-center rounded-full bg-white/20 font-display font-extrabold">T</span>
        <div className="leading-tight">
          <p className="font-bold">TeddyPups U.A.E.</p>
          <p className="text-xs text-white">online</p>
        </div>
      </div>
      <div className="min-h-[21rem] space-y-3 px-1 py-5 text-[0.95rem]" aria-live="polite">
        {step >= 0 && (
          <>
            <motion.p key="m0" {...pop} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#d9f5c8] px-4 py-2.5">
              {GENERAL_MESSAGE}
            </motion.p>
            <motion.div key="m1" {...pop} transition={{ ...pop.transition, delay: reduce ? 0 : 0.25 }} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
              <p>Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.</p>
              <p className="mt-2 flex flex-wrap gap-1.5">
                {breedChips.filter(c => c.key !== 'korean-teacup').map(c => (
                  <span key={c.key} className="rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 text-sm font-semibold">
                    {c.label}
                  </span>
                ))}
              </p>
            </motion.div>
          </>
        )}
        {step >= 1 && (
          <motion.div key="m2" {...pop} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
            <p>Our team will share real photos, health details, and all necessary information directly on WhatsApp.</p>
            <div className="mt-2 flex gap-2">
              {THUMBS.map(s => {
                const m = puppyPhoto(getPuppy(s)!);
                return m.kind === 'image' ? (
                  <span key={s} className="relative size-16 overflow-hidden rounded-xl border-2 border-cocoa">
                    <Image src={m.src} alt="" fill sizes="4rem" className="object-cover" />
                  </span>
                ) : null;
              })}
            </div>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.p key="m3" {...pop} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
            Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free. <Check size={16} className="inline text-wa" aria-hidden="true" />
          </motion.p>
        )}
      </div>
      <Link href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full">
        Say hello on WhatsApp
      </Link>
    </div>
  );
}
