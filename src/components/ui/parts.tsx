import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { Parallax } from '@/components/motion/Parallax';
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

export function PageIntro({ eyebrow, title, children, mascot, photos }: { eyebrow?: string; title: string; children?: ReactNode; mascot?: ReactNode; photos?: { src: string; alt: string }[] }) {
  return (
    <header className="gutter relative mx-auto max-w-[110rem] pt-32 pb-12 md:pt-40">
      {mascot && <div className="relative mb-4 h-28 w-52">{mascot}</div>}
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          {eyebrow && <p className="chapter mb-3 text-lg text-toffee-ink md:text-xl">{eyebrow}</p>}
          <h1 className="h-section">{title}</h1>
          {children && <p className="mt-6 max-w-xl text-lg text-cocoa-soft md:text-xl">{children}</p>}
        </div>
        {photos && photos.length > 0 && <PhotoCollage photos={photos} />}
      </div>
    </header>
  );
}

/** Three overlapping, tilted frames (arch · circle · polaroid) that wipe in and drift with the scroll. */
function PhotoCollage({ photos }: { photos: { src: string; alt: string }[] }) {
  const [a, b, c] = photos;
  return (
    <div aria-hidden="true" className="relative mx-auto h-64 w-full max-w-md sm:h-72 lg:col-span-5 lg:h-[24rem] lg:max-w-none">
      <Parallax speed={0.06} className="absolute top-0 left-[6%] w-[44%]">
        <ImageReveal when="load" className="photo-frame relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] bg-honey-soft">
          <Image src={a.src} alt="" fill priority sizes="16rem" className="object-cover" />
        </ImageReveal>
      </Parallax>
      {b && (
        <Parallax speed={-0.1} className="absolute right-[4%] bottom-0 w-[38%]">
          <ImageReveal when="load" delay={0.2} className="photo-frame relative aspect-square rotate-6 overflow-hidden rounded-full bg-sky">
            <Image src={b.src} alt="" fill priority sizes="14rem" className="object-cover" />
          </ImageReveal>
        </Parallax>
      )}
      {c && (
        <Parallax speed={0.1} className="absolute top-[4%] right-[10%] w-[30%]">
          <ImageReveal when="load" delay={0.35} className="photo-frame -rotate-6 rounded-md bg-milk p-1.5 pb-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[3px]">
              <Image src={c.src} alt="" fill priority sizes="11rem" className="object-cover" />
            </div>
          </ImageReveal>
        </Parallax>
      )}
    </div>
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
