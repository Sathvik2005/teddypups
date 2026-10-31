import type { BreedTag, Origin, Puppy } from '@/data/types';

export interface PuppyQuery {
  origin?: Origin;
  breed?: BreedTag;
  gender?: 'boy' | 'girl';
}

const BREEDS: BreedTag[] = ['maltipoo', 'pomeranian', 'poodle', 'cavapoo', 'shih-tzu', 'korean-teacup'];

export function parseQuery(get: (key: string) => string | null | undefined): PuppyQuery {
  const origin = get('origin');
  const breed = get('breed');
  const gender = get('gender');
  return {
    origin: origin === 'local' || origin === 'imported' ? origin : undefined,
    breed: BREEDS.includes(breed as BreedTag) ? (breed as BreedTag) : undefined,
    gender: gender === 'boy' || gender === 'girl' ? gender : undefined,
  };
}

export function filterPuppies(list: Puppy[], q: PuppyQuery): Puppy[] {
  return list.filter(
    p =>
      (!q.origin || p.origin === q.origin) &&
      (!q.breed || p.tags.includes(q.breed)) &&
      (!q.gender || p.gender.includes(q.gender)),
  );
}

export function toSearch(q: PuppyQuery): string {
  const sp = new URLSearchParams();
  if (q.origin) sp.set('origin', q.origin);
  if (q.breed) sp.set('breed', q.breed);
  if (q.gender) sp.set('gender', q.gender);
  const s = sp.toString();
  return s ? `?${s}` : '';
}
