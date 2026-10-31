import { puppies } from './puppies.generated';
import type { Puppy } from './types';

export { puppies };

export const getPuppy = (slug: string): Puppy | undefined => puppies.find(p => p.slug === slug);

export const puppyPhoto = (p: Puppy) => p.media.find(m => m.kind === 'image') ?? p.media[0];
export const hasVideo = (p: Puppy) => p.media.some(m => m.kind === 'video');

/** "boy, 3 months" style summary used on cards. */
export const puppySummary = (p: Puppy) => `${p.gender}, ${p.age}${hasVideo(p) ? ', with video' : ''}`;

export const heroLineup = [
  'maltipoo-max-male',
  'korean-teacup-maltipoo-female',
  'korean-teacup-poodle-female',
  'maltipoo-cavapoo-male',
  'toy-poodle-male-female',
  'maltipoo-female-2',
] as const;

export const breedChips = [
  { key: 'korean-teacup', label: 'Korean Teacup' },
  { key: 'maltipoo', label: 'Maltipoo' },
  { key: 'pomeranian', label: 'Pomeranian' },
  { key: 'poodle', label: 'Poodle' },
  { key: 'cavapoo', label: 'Cavapoo' },
  { key: 'shih-tzu', label: 'Shih Tzu' },
] as const;
