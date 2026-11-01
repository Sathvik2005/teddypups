import { createElement } from 'react';
import { cn } from '@/lib/cn';

type Tag = 'h1' | 'h2' | 'h3' | 'p';

/**
 * Word-by-word rise for above-the-fold headlines, done in CSS so it works from the server-rendered HTML
 * (no JavaScript needed for first paint). The element keeps the full text as its accessible name.
 */
export function SplitTextCss({ text, as = 'h1', className, id, delay = 0 }: { text: string; as?: Tag; className?: string; id?: string; delay?: number }) {
  const words = text.split(' ');
  return createElement(
    as,
    { id, className, 'aria-label': text },
    words.map((w, i) => (
      <span key={i} aria-hidden="true" className={cn('inline-block overflow-hidden pb-[0.12em] align-bottom', i < words.length - 1 && 'mr-[0.25em]')}>
        <span className="word" style={{ ['--i' as string]: i, ['--d' as string]: `${delay}s` } as React.CSSProperties}>
          {w}
        </span>
      </span>
    )),
  );
}
