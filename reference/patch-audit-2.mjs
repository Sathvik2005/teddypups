import fs from 'node:fs';
const read = f => fs.readFileSync(f, 'utf8');
const write = (f, s) => fs.writeFileSync(f, s);
const sub = (f, from, to, all = false) => {
  let s = read(f);
  if (!s.includes(from)) throw new Error(`${f}: no match for ${from.slice(0, 70)}`);
  s = all ? s.replaceAll(from, to) : s.replace(from, to);
  write(f, s);
  console.log('patched', f);
};

// 1. card link name = its visible content (no aria-label mismatch); the "Meet X" pill duplicates the name, so hide it from AT
sub('src/components/puppies/PuppyCard.tsx', "      aria-label={`Meet ${puppy.name}, ${puppy.breed}`}\n", '');
sub('src/components/puppies/PuppyCard.tsx', '<span className="open-pill absolute', '<span aria-hidden="true" className="open-pill absolute');

// 2. contrast
sub('src/app/how-it-works/page.tsx', '!text-sky-deep', '!text-cocoa');
sub('src/components/home/JourneyChat.tsx', '<p className="text-xs text-white/80">online</p>', '<p className="text-xs text-white">online</p>');

// 3. bubbles: truly hidden (not just transparent) until shown
let css = read('src/app/globals.css');
css = css.replace(/(\.pup-bubble \{[^}]*?)transition: opacity 0\.18s ease, transform 0\.22s var\(--ease-spring\);/, '$1visibility: hidden;\n  transition: opacity 0.18s ease, transform 0.22s var(--ease-spring), visibility 0s linear 0.22s;');
css = css.replace(/(\.pup-bubble\[data-show='true'\] \{)/, "$1\n  visibility: visible;\n  transition-delay: 0s;");
css = css.replace(/(\.pup-cursor__bubble \{[^}]*?)transition: opacity 0\.16s ease, transform 0\.2s var\(--ease-spring\);/, '$1visibility: hidden;\n  transition: opacity 0.16s ease, transform 0.2s var(--ease-spring), visibility 0s linear 0.2s;');
css = css.replace(/(\.pup-cursor__bubble\[data-show='true'\] \{)/, "$1\n  visibility: visible;\n  transition-delay: 0s;");
write('src/app/globals.css', css);
console.log('bubble visibility', css.includes('visibility 0s linear 0.22s'), css.includes('visibility 0s linear 0.2s'));
