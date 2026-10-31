export type BreedTag = 'maltipoo' | 'pomeranian' | 'poodle' | 'cavapoo' | 'shih-tzu' | 'korean-teacup';
export type Origin = 'local' | 'imported';

export type PuppyMedia =
  | { kind: 'image'; src: string; width: number; height: number; alt: string; color?: string }
  | { kind: 'video'; src: string; poster: string; width: number; height: number; alt: string };

export interface Puppy {
  slug: string;
  name: string;
  breed: string;
  tags: BreedTag[];
  gender: 'boy' | 'girl' | 'boy & girl';
  age: string;
  origin: Origin;
  media: PuppyMedia[];
}

export interface FamilyPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  color?: string;
  caption: string;
}

export interface GoneHomePup {
  src: string;
  name: string;
  breed: string;
  gender: 'boy' | 'girl';
  note: string | null;
}

export interface FaqItem {
  q: string;
  a: string;
}
