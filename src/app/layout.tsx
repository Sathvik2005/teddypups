import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces, Shantell_Sans } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PupActor } from '@/components/mascot/PupActor';
import { PupCursor } from '@/components/cursor/PupCursor';
import { PawTrail } from '@/components/cursor/PawTrail';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { site } from '@/data/site';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], axes: ['SOFT', 'WONK', 'opsz'], variable: '--font-fraunces', display: 'swap' });
const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree', display: 'swap' });
const shantell = Shantell_Sans({ subsets: ['latin'], variable: '--font-shantell', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — premium teacup puppies in Dubai`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { title: site.name, description: site.description, type: 'website', url: site.url, images: [{ url: '/images/brand/logo.png' }] },
  twitter: { card: 'summary', title: site.name, description: site.description },
  icons: { icon: '/images/brand/logo.png', apple: '/images/brand/logo.png' },
};

export const viewport: Viewport = { themeColor: '#fffdf8', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${shantell.variable}`}>
      <body>
        <a href="#main" className="sr-only-focusable fixed top-1 left-1 z-[100] rounded-full bg-cocoa px-4 py-2 text-milk">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <PupActor />
        <PupCursor />
        <PawTrail />
      </body>
    </html>
  );
}
