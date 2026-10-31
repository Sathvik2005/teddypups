'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { site } from '@/data/site';
import { WhatsAppButton } from '@/components/ui/parts';
import { Decor } from '@/components/decorations/Decor';

export function HeroCopy() {
  const reduce = useReducedMotion();
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.11, delayChildren: 0.05 } } };
  const item: Variants = {
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.34, 1.2, 0.64, 1] } },
  };
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="gutter relative mx-auto max-w-5xl text-center">
      <motion.p variants={item} className="eyebrow squiggle inline-block text-xl md:text-2xl">
        {site.tagline}
      </motion.p>
      <motion.h1 variants={item} id="hero-title" className="h-hero mt-4">
        Premium teacup puppies in Dubai
      </motion.h1>
      <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg text-cocoa-soft md:text-xl">
        Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.
      </motion.p>
      <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <span className="relative">
          <Link href="/puppies" data-cursor-say="treat?" className="btn btn-primary">
            View available puppies
          </Link>
          <Decor className="!overflow-visible" items={[{ kind: 'bone', at: { top: '-1.7rem', right: '-1.6rem' }, size: 2.6, rotate: 16, hideBelow: 'sm' }]} />
        </span>
        <WhatsAppButton variant="ghost" />
      </motion.div>
    </motion.div>
  );
}
