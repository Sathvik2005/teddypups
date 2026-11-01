'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

/** Clip-path wipe-in with a settling zoom. Wrap an image (or any block) that has its own size. */
export function ImageReveal({ children, className, delay = 0, from = 'bottom', style }: { children: ReactNode; className?: string; delay?: number; from?: 'bottom' | 'left' | 'top'; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const hidden = from === 'left' ? 'inset(0 100% 0 0)' : from === 'top' ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)';
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0 0 0 0)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, delay, ease: [0.2, 0.9, 0.25, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, delay, ease: [0.2, 0.9, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
