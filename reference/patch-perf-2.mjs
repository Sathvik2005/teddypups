import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to) => {
  const s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 80)}`);
  write(f, s.replace(from, to));
  console.log('patched', f);
};
sub('src/app/puppies/[slug]/page.tsx', "import { EnquiryForm } from '@/components/puppies/EnquiryForm';", "import { LazyEnquiryForm } from '@/components/puppies/LazyEnquiryForm';");
sub('src/app/puppies/[slug]/page.tsx', '<EnquiryForm heading=', '<LazyEnquiryForm heading=');
sub('src/app/contact/page.tsx', "import { EnquiryForm } from '@/components/puppies/EnquiryForm';", "import { LazyEnquiryForm } from '@/components/puppies/LazyEnquiryForm';");
sub('src/app/contact/page.tsx', '<EnquiryForm interests=', '<LazyEnquiryForm interests=');
// the profile's main photo is the LCP element: fetch it first
sub('src/components/puppies/PuppyGallery.tsx', '<Image src={cur.src} alt={cur.alt} fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-contain" />', '<Image src={cur.src} alt={cur.alt} fill priority fetchPriority="high" sizes="(min-width:1024px) 55vw, 100vw" className="object-contain" />');
