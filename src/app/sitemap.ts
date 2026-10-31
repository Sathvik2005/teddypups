import type { MetadataRoute } from 'next';
import { puppies } from '@/data/puppies';
import { site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/puppies', '/happy-families', '/gone-home', '/how-it-works', '/faq', '/contact'];
  return [...pages.map(p => ({ url: `${site.url}${p}` })), ...puppies.map(p => ({ url: `${site.url}/puppies/${p.slug}` }))];
}
