import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { footerExplore, site } from '@/data/site';
import { whatsappUrl } from '@/lib/whatsapp';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { PupStop } from '@/components/ui/parts';
import { CursorToggle } from '@/components/cursor/CursorToggle';

function Basket() {
  return (
    <svg viewBox="0 0 220 70" aria-hidden="true" className="absolute inset-x-0 bottom-0 w-full">
      <path d="M8 6h204l-14 56c-1 4-4 6-8 6H30c-4 0-7-2-8-6L8 6Z" fill="#c2622b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" />
      <g stroke="#8e3f15" strokeWidth="2.2" opacity=".7" strokeLinecap="round">
        <path d="M18 22h184M22 38h176M27 54h166" />
        <path d="M44 8v58M80 8v58M116 8v58M152 8v58M188 8v58" />
      </g>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-footer text-milk">
      <div className="gutter mx-auto grid max-w-[110rem] gap-12 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="h-section text-milk">Home, at last.</h2>
          <p className="mt-6 max-w-lg text-lg text-milk/80">{site.name} is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
          <div className="relative mt-12 h-52 w-64" role="img" aria-label="Mochi, a sleepy puppy, snug in a basket">
            <PupStop name="footer" className="bottom-3 left-[88%]" />
            <PuppyMascot name="mochi" sleeping lookAt={false} reactive={false} className="absolute bottom-6 left-1/2 w-36 -translate-x-1/2" />
            <Basket />
          </div>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h3 className="font-display text-xl font-extrabold text-honey">Explore</h3>
          <ul className="mt-4 space-y-2.5">
            {footerExplore.map(l => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="tap transition-colors duration-200 hover:text-honey">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-display text-xl font-extrabold text-honey">Say hello</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5">
              <Phone size={18} className="mt-1 shrink-0 text-honey" aria-hidden="true" />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="tap transition-colors duration-200 hover:text-honey">
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail size={18} className="mt-1 shrink-0 text-honey" aria-hidden="true" />
              <a href={`mailto:${site.email}`} className="break-all tap transition-colors duration-200 hover:text-honey">
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={18} className="mt-1 shrink-0 text-honey" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Social media">
            {site.socials.map(s => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="tap inline-flex rounded-full border border-milk/30 bg-milk/10 px-4 py-1.5 text-sm font-semibold transition-colors duration-200 hover:border-honey hover:bg-honey hover:text-cocoa">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-milk/15">
        <p className="gutter mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-2 py-5 text-sm text-milk/70">
          <span>© 2026 {site.name}</span>
          <CursorToggle />
          <span className="eyebrow text-base !text-honey">{site.tagline}</span>
        </p>
      </div>
    </footer>
  );
}
