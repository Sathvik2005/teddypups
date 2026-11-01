'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createElement } from 'react';
import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

/**
 * Word-by-word headline reveal: each word rises out of a mask, staggered.
 * The element keeps the full text as its accessible name; the animated words are aria-hidden.
 */
export function SplitText({ text, as = 'h2', className, delay = 0, id, once = true }: { text: string; as?: Tag; className?: string; delay?: number; id?: string; once?: boolean }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return createElement(
    as,
    { id, className, 'aria-label': text },
    <motion.span
      aria-hidden="true"
      className="inline"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once, amount: 0.6 }}
      transition={{ staggerChildren: 0.075, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className={cn('inline-block overflow-hidden pb-[0.12em] align-bottom', i < words.length - 1 && 'mr-[0.25em]')}>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '115%', rotate: 4 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.8, ease: [0.2, 0.9, 0.25, 1] }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>,
  );
}
