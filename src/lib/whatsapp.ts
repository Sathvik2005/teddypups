import { site } from '@/data/site';
import type { Puppy } from '@/data/types';

export const GENERAL_MESSAGE = "Hi TeddyPups! I'd love to know more about your puppies.";

export function whatsappUrl(text: string = GENERAL_MESSAGE): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text).replace(/%27/g, "'")}`;
}

export function puppyProfileUrl(puppy: Pick<Puppy, 'slug'>, base: string = site.url): string {
  return `${base.replace(/\/$/, '')}/puppies/${puppy.slug}`;
}

export function puppyMessage(puppy: Pick<Puppy, 'slug' | 'name' | 'breed'>, base?: string): string {
  const label = puppy.name === puppy.breed ? puppy.name : `${puppy.name} (${puppy.breed})`;
  return `Hi TeddyPups! I'd love to know more about ${label}. ${puppyProfileUrl(puppy, base)}`;
}
