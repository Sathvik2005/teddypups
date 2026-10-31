'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { whatsappUrl, GENERAL_MESSAGE } from '@/lib/whatsapp';
import { breedChips } from '@/data/puppies';

/** Animated WhatsApp-style conversation illustrating the 3-step journey. */
export function JourneyChat() {
  const reduce = useReducedMotion();
  const msg = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16, scale: 0.94 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-12% 0px' },
    transition: { delay: reduce ? 0 : i * 0.5, duration: 0.45, ease: [0.34, 1.4, 0.64, 1] as const },
  });
  return (
    <div className="mx-auto w-full max-w-md rounded-[2rem] border-[3px] border-cocoa bg-milk p-4 shadow-[0_8px_0_var(--color-cocoa)]">
      <div className="flex items-center gap-3 rounded-2xl bg-wa px-4 py-3 text-white">
        <span className="grid size-9 place-items-center rounded-full bg-white/20 font-display font-extrabold">T</span>
        <div className="leading-tight">
          <p className="font-bold">TeddyPups U.A.E.</p>
          <p className="text-xs text-white/80">online</p>
        </div>
      </div>
      <div aria-hidden="true" className="space-y-3 px-1 py-5 text-[0.95rem]">
        <motion.p {...msg(0)} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[#d9f5c8] px-4 py-2.5">
          {GENERAL_MESSAGE}
        </motion.p>
        <motion.div {...msg(1)} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
          <p>Select your preferred breed or tell us what you&apos;re looking for. We&apos;ll guide you based on availability and your lifestyle.</p>
          <p className="mt-2 flex flex-wrap gap-1.5">
            {breedChips.filter(c => c.key !== 'korean-teacup').map(c => (
              <span key={c.key} className="rounded-full border-2 border-cocoa bg-milk px-2.5 py-0.5 text-sm font-semibold">
                {c.label}
              </span>
            ))}
          </p>
        </motion.div>
        <motion.p {...msg(2)} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
          Our team will share real photos, health details, and all necessary information directly on WhatsApp.
        </motion.p>
        <motion.p {...msg(3)} className="max-w-[88%] rounded-2xl rounded-bl-sm bg-honey-soft px-4 py-2.5">
          Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.{' '}
          <Check size={16} className="inline text-wa" />
        </motion.p>
      </div>
      <Link href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full">
        Say hello on WhatsApp
      </Link>
    </div>
  );
}
