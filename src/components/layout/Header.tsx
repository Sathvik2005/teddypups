'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import { PawIcon } from '@/components/ui/parts';
import { MobileMenu } from './MobileMenu';

export const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(scrollY > 12);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 h-16 transition-[background-color,box-shadow,backdrop-filter] duration-300 md:h-[76px]',
        scrolled && 'bg-milk/95 backdrop-blur-md',
      )}
    >
      <div aria-hidden="true" className={cn('header-scallop pointer-events-none absolute inset-x-0 top-full h-[14px] transition-opacity duration-300', scrolled ? 'opacity-100' : 'opacity-0')} />
      <div className="gutter mx-auto flex h-full max-w-[110rem] items-center justify-between">
        <Link href="/" data-cursor-say="hello!" className="flex items-center gap-2.5" aria-label="TeddyPups U.A.E. — home">
          <Image src="/images/brand/logo.png" alt="" width={44} height={44} priority className="size-10 rounded-full md:size-11" />
          <span className="font-display text-[1.35rem] font-extrabold tracking-tight">TeddyPups</span>
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {nav.map(item => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn('group relative py-2 text-base font-semibold transition-colors duration-200 hover:text-toffee-deep', active && 'text-toffee-deep')}
              >
                {item.label}
                <PawIcon className={cn('absolute -bottom-1.5 left-1/2 size-2.5 -translate-x-1/2 transition-all duration-200', active ? 'opacity-100' : 'translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-60')} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm hidden sm:inline-flex">
            WhatsApp us
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
