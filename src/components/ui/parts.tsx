import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { whatsappUrl } from '@/lib/whatsapp';

export function PawIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className} fill="currentColor">
      <ellipse cx="14" cy="28" rx="6" ry="8" />
      <ellipse cx="27" cy="16" rx="6" ry="9" />
      <ellipse cx="41" cy="16" rx="6" ry="9" />
      <ellipse cx="53" cy="28" rx="6" ry="8" />
      <path d="M32 30c-9 0-17 9-17 17 0 6 5 9 10 8 3-.6 5-1.6 7-1.6s4 1 7 1.6c5 1 10-2 10-8 0-8-8-17-17-17Z" />
    </svg>
  );
}

/** Invisible anchor Teddy can walk to. Place inside a `relative` parent; its bottom edge is where Teddy's feet land. */
export function PupStop({ name, className }: { name: string; className?: string }) {
  return <span data-pup-stop={name} aria-hidden="true" className={cn('pointer-events-none absolute h-px w-px', className)} />;
}

export function WhatsAppButton({
  children = 'Enquire on WhatsApp',
  message,
  variant = 'primary',
  className,
  ...rest
}: { children?: ReactNode; message?: string; variant?: 'primary' | 'wa' | 'ghost' | 'honey' } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn('btn', variant === 'primary' && 'btn-primary', variant === 'wa' && 'btn-wa', variant === 'ghost' && 'btn-ghost', variant === 'honey' && 'btn-honey', className)}
      {...rest}
    >
      {variant === 'wa' && <MessageCircle size={18} aria-hidden="true" />}
      {children}
    </a>
  );
}

export function ButtonLink({ variant = 'primary', className, ...props }: { variant?: 'primary' | 'ghost' | 'honey' } & ComponentProps<typeof Link>) {
  return <Link className={cn('btn', variant === 'primary' && 'btn-primary', variant === 'ghost' && 'btn-ghost', variant === 'honey' && 'btn-honey', className)} {...props} />;
}

export function PageIntro({ eyebrow, title, children, mascot }: { eyebrow: string; title: string; children?: ReactNode; mascot?: ReactNode }) {
  return (
    <header className="gutter mx-auto max-w-[110rem] pt-32 pb-10 text-center md:pt-40">
      {mascot && <div className="relative mx-auto mb-4 h-28 w-40">{mascot}</div>}
      <p className="eyebrow squiggle inline-block text-xl md:text-2xl">{eyebrow}</p>
      <h1 className="h-section mx-auto mt-4 max-w-5xl">{title}</h1>
      {children && <p className="mx-auto mt-5 max-w-2xl text-lg text-cocoa-soft">{children}</p>}
    </header>
  );
}

const SCALLOP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='30' viewBox='0 0 56 30'%3E%3Cpath d='M1.5 30A26.5 26.5 0 0 1 54.5 30' fill='%23fff0d6' stroke='%232a170e' stroke-width='3'/%3E%3Cpath d='M9 30A19 19 0 0 1 47 30' fill='none' stroke='%23c2622b' stroke-opacity='.4' stroke-width='1.6' stroke-dasharray='3 3'/%3E%3C/svg%3E")`;

/** Scalloped quilt edge + diamond fill (hero, footer transitions). */
export function Quilt({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none relative z-10', className)}>
      <div className="h-[30px] w-full" style={{ backgroundImage: SCALLOP, backgroundRepeat: 'repeat-x', backgroundSize: '56px 30px' }} />
      <div className="bg-diamonds h-24 md:h-36" />
    </div>
  );
}
