import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Static speech bubble that pops in (CSS). Position it with `className` inside a `relative` parent. */
export function MascotSpeechBubble({ children, side = 'left', delay = 0.6, className }: { children: ReactNode; side?: 'left' | 'right'; delay?: number; className?: string }) {
  return (
    <span
      className={cn('speech-bubble', side === 'left' ? 'speech-left' : 'speech-right', className)}
      style={{ ['--bubble-delay' as string]: `${delay}s` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
