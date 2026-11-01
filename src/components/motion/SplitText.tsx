'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

/**
 * Word-by-word headline reveal: each word rises out of a mask, staggered, once the heading scrolls into view.
 * Pure CSS animation (see `.sw` in globals.css) triggered by a tiny IntersectionObserver — no animation library.
 * The element keeps the full text as its accessible name; the animated words are aria-hidden.
 */
export function SplitText({ text, as = 'h2', className, delay = 0, id }: { text: string; as?: Tag; className?: string; delay?: number; id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(' ');
  const Tag = as as 'h2';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.in = 'true';
      return;
    }
    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting || e.boundingClientRect.bottom < 0)) {
          el.dataset.in = 'true';
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag id={id} ref={ref} className={className} aria-label={text} data-split="">
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className={cn('inline-block overflow-hidden pb-[0.12em] align-bottom', i < words.length - 1 && 'mr-[0.25em]')}>
          <span className="sw" style={{ ['--i' as string]: i, ['--d' as string]: `${delay}s` } as React.CSSProperties}>
            {w}
          </span>
        </span>
      ))}
    </Tag>
  );
}
