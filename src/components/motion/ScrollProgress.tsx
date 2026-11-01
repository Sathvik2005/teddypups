'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

/** Thin toffee progress bar along the very top of the page. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.2 });
  if (reduce) return null;
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-toffee" />;
}
