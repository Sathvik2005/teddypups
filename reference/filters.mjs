const B = 'https://puppy.instabizweb.com/puppies';
const known = new Set(['copper-male','korean-teacup-maltipoo-female','korean-teacup-pomeranian','korean-teacup-pomeranian-1','korean-teacup-pomeranian-male','korean-teacup-poodle-female','maltipoo-cavapoo-male','maltipoo-female','maltipoo-female-1','maltipoo-female-2','maltipoo-max-male','pomeranian-female','shitzu-female','shitzu-male','toy-poodle-male-female']);
for (const q of ['', '?origin=local', '?origin=imported', '?breed=maltipoo', '?breed=pomeranian', '?breed=poodle', '?breed=cavapoo', '?breed=shih-tzu', '?breed=zzz', '?gender=boy', '?gender=girl']) {
  const h = await (await fetch(B + q)).text();
  const slugs = [...new Set([...h.matchAll(/href="\/puppies\/([^"?#]+)"/g)].map(m => m[1]))].filter(s => known.has(s));
  console.log(q || '(none)', slugs.length, slugs.join(','));
}
