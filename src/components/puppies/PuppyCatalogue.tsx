'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { puppies, breedChips } from '@/data/puppies';
import { filterPuppies, parseQuery, toSearch, type PuppyQuery } from '@/lib/filters';
import { whatsappUrl } from '@/lib/whatsapp';
import { cn } from '@/lib/cn';
import { PuppyCard } from './PuppyCard';
import { PuppyMascot } from '@/components/mascot/PuppyMascot';
import { PuppyDecorations } from '@/components/decorations/PuppyDecorations';

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'tap rounded-full border-2 border-cocoa px-4 py-1.5 text-[0.95rem] font-semibold transition-all duration-200 hover:-translate-y-0.5',
        active ? 'bg-cocoa text-milk shadow-[0_3px_0_var(--color-toffee)]' : 'bg-milk shadow-[0_3px_0_var(--color-cocoa)] hover:bg-honey-soft',
      )}
    >
      {children}
    </Link>
  );
}

export function PuppyCatalogue() {
  const sp = useSearchParams();
  const q = parseQuery(k => sp.get(k));
  const list = filterPuppies(puppies, q);
  const href = (patch: Partial<PuppyQuery>) => `/puppies${toSearch({ ...q, ...patch })}`;
  const hasFilter = Boolean(q.origin || q.breed || q.gender);

  return (
    <div className="gutter mx-auto max-w-[110rem] pb-24">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border-[3px] border-cocoa bg-honey-soft p-5 md:p-6" role="group" aria-label="Filter puppies">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-1 w-20 text-lg">where</span>
          <Chip href={href({ origin: undefined })} active={!q.origin}>
            Everywhere
          </Chip>
          <Chip href={href({ origin: 'imported' })} active={q.origin === 'imported'}>
            Imported
          </Chip>
          <Chip href={href({ origin: 'local' })} active={q.origin === 'local'}>
            Local
          </Chip>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-1 w-20 text-lg">breed</span>
          {breedChips.map(b => (
            <Chip key={b.key} href={href({ breed: q.breed === b.key ? undefined : b.key })} active={q.breed === b.key}>
              {b.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="eyebrow mr-1 w-20 text-lg">who</span>
          <Chip href={href({ gender: q.gender === 'boy' ? undefined : 'boy' })} active={q.gender === 'boy'}>
            Boys
          </Chip>
          <Chip href={href({ gender: q.gender === 'girl' ? undefined : 'girl' })} active={q.gender === 'girl'}>
            Girls
          </Chip>
          {hasFilter && (
            <Link href="/puppies" scroll={false} className="ml-2 text-sm font-semibold underline underline-offset-4">
              Clear filters
            </Link>
          )}
        </div>
      </div>

      <h2 className="sr-only">Puppies</h2>
      <p role="status" aria-live="polite" className="mt-6 text-cocoa-soft">
        {list.length} {list.length === 1 ? 'puppy' : 'puppies'} available{hasFilter ? ' with these filters' : ''}
      </p>

      {list.length ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-8 xl:grid-cols-4" data-testid="puppy-grid">
          {list.map((p, i) => (
            <li key={p.slug} className="flex justify-center">
              <PuppyCard puppy={p} index={puppies.indexOf(p)} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-[2rem] border-[3px] border-dashed border-cocoa p-10 text-center" data-testid="empty-state">
          <PuppyDecorations preset="empty" />
          <PuppyMascot name="biscuit" expression="curious" className="relative mx-auto w-32" label="Biscuit, a curious puppy, looking around for pups" />
          <h2 className="h-card mt-3 text-3xl">No pups found. Let&apos;s try another search!</h2>
          <p className="mt-3 text-cocoa-soft">
            {q.origin === 'local'
              ? 'All of our current puppies are imported for you. New local puppies arrive often — ask us what is coming to the showroom.'
              : 'Try a different filter, or tell us what you are looking for and we will keep an eye out.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/puppies" scroll={false} className="btn btn-primary btn-sm">
              Show all puppies
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-wa btn-sm">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
