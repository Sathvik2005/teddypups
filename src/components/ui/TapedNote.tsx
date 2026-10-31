import { cn } from '@/lib/cn';

/** Lined notepaper held up with a strip of tape — the reference's testimonial treatment. */
export function TapedNote({ quote, author, className }: { quote: string; author: string; className?: string }) {
  return (
    <figure
      className={cn('relative rotate-[-1.4deg] rounded-[3px] bg-[#fffdf3] px-6 pt-9 pb-5 shadow-[0_10px_22px_rgb(42_23_14/0.13)] md:px-10 md:pt-11 md:pb-7', className)}
      style={{ backgroundImage: 'repeating-linear-gradient(180deg, transparent 0 31px, rgb(42 23 14 / 0.08) 31px 32px)' }}
    >
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-[2deg] rounded-[2px] bg-sky/70 shadow-[0_1px_2px_rgb(42_23_14/0.18)]" />
      <blockquote className="font-display text-lg leading-8 md:text-xl md:leading-8">“{quote}”</blockquote>
      <figcaption className="eyebrow mt-3 text-lg">{author}</figcaption>
    </figure>
  );
}
