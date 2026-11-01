import fs from 'node:fs';
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const re = /\.door-swing \{\s*transform: perspective\(900px\) rotateY\(-68deg\);\s*\}\s*\.door-card:hover \.door-swing,\s*\.door-card:focus-visible \.door-swing \{\s*transform: perspective\(900px\) rotateY\(-86deg\);\s*\}/;
if (!re.test(css)) throw new Error('door css block not found');
css = css.replace(
  re,
  `/* doors start shut; hover (fine pointers), keyboard focus, or data-open (touch, set by PuppyRail) swings them open */
.door-swing { transform: perspective(900px) rotateY(0deg); }
@media (hover: hover) {
  .door-card:hover .door-swing { transform: perspective(900px) rotateY(-100deg); }
}
.door-card:focus-visible .door-swing,
.door-card[data-open='true'] .door-swing { transform: perspective(900px) rotateY(-100deg); }
.door-card[data-open='true'] .open-pill { transform: translateY(0); }`,
);
fs.writeFileSync('src/app/globals.css', css);
console.log('door css patched');
