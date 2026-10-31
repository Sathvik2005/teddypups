'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Gentle looping bob/rotate for a child. Static under prefers-reduced-motion. */
export function Floating({ children, y = 8, rotate = 2, duration = 5, delay = 0, className }: { children: ReactNode; y?: number; rotate?: number; duration?: number; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduce ? undefined : { y: [0, -y, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
