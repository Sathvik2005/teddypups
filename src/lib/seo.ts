import type { Metadata } from 'next';
import { site } from '@/data/site';

/**
 * Per-page metadata: unique title/description, canonical, Open Graph and Twitter card.
 * The social image comes from `app/opengraph-image.tsx` (and `twitter-image.tsx`) unless a page passes its own.
 */
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: { url: string; width?: number; height?: number; alt?: string } }): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: site.name, locale: 'en_AE', type: 'website', ...(image ? { images: [image] } : {}) },
    twitter: { card: 'summary_large_image', title: full, description, ...(image ? { images: [image.url] } : {}) },
  };
}

/** Accurate organisation data only: nothing here that the business has not published itself (no ratings, prices or credentials). */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/brand/logo.png`,
    email: site.email,
    telephone: '+971541676733',
    description: site.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE', streetAddress: 'Downtown Dubai' },
    sameAs: site.socials.map(s => s.href),
  };
}

export function websiteJsonLd() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, description: site.description, inLanguage: 'en' };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
  };
}
