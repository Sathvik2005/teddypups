'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Soft lift on hover/focus-within, tiny squish on press. */
export function HoverLift({ children, lift = 5, className }: { children: ReactNode; lift?: number; className?: string }) {
  return (
    <motion.div className={className} whileHover={{ y: -lift, scale: 1.015 }} whileTap={{ scale: 0.985 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}>
      {children}
    </motion.div>
  );
}
