'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';

export function MobileMenu() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.close(); // fires the dialog's onClose, which resets `open`
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="btn btn-ghost btn-sm lg:hidden"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => {
          ref.current?.showModal();
          setOpen(true);
        }}
      >
        <Menu size={18} aria-hidden="true" /> Menu
      </button>

      <dialog
        id="mobile-menu"
        ref={ref}
        aria-label="Menu"
        className="tp-menu fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-honey p-0 text-cocoa"
        onClose={() => setOpen(false)}
        onClick={e => e.target === e.currentTarget && ref.current?.close()}
      >
        <div className="gutter flex h-full flex-col pt-4 pb-8">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-xl">where to, friend?</p>
            <button type="button" className="btn btn-ghost btn-sm bg-milk/50" onClick={() => ref.current?.close()}>
              <X size={18} aria-hidden="true" /> Close
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex flex-1 flex-col justify-center">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ '--i': i } as React.CSSProperties}
                aria-current={pathname === item.href ? 'page' : undefined}
                onClick={() => ref.current?.close()}
                className={cn('tp-menu-link font-display block py-1.5 text-[clamp(2.4rem,11vw,3.6rem)] leading-none font-extrabold', pathname === item.href && 'text-toffee-ink')}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              WhatsApp us
            </a>
            <a href={site.phoneHref} className="text-center font-semibold">
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
