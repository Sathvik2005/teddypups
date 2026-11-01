import type { MetadataRoute } from 'next';
import { puppies } from '@/data/puppies';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/puppies', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact'];
  return [...pages.map(p => ({ url: `${site.url}${p}`, lastModified: now, priority: p === '' ? 1 : 0.8 })), ...puppies.map(p => ({ url: `${site.url}/puppies/${p.slug}`, lastModified: now, priority: 0.7 }))];
}
