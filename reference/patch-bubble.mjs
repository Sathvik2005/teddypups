import fs from 'node:fs';
let css = fs.readFileSync('src/app/globals.css', 'utf8');
const a = /(\.pup-bubble \{[^}]*?)opacity: 0;\n(\s*)transform: scale\(0\.4\);([^}]*?)transition: opacity 0\.18s ease, transform 0\.22s var\(--ease-spring\), visibility 0s linear 0\.22s;/;
const b = /(\.pup-cursor__bubble \{[^}]*?)opacity: 0;\n(\s*)transform: scale\(0\.5\) translateY\(6px\);([^}]*?)transition: opacity 0\.16s ease, transform 0\.2s var\(--ease-spring\), visibility 0s linear 0\.2s;/;
if (!a.test(css) || !b.test(css)) throw new Error('bubble blocks not found');
css = css.replace(a, '$1$2transform: scale(0.4);$3transition: transform 0.22s var(--ease-spring), visibility 0s linear 0.22s;');
css = css.replace(b, '$1$2transform: scale(0.5) translateY(6px);$3transition: transform 0.2s var(--ease-spring), visibility 0s linear 0.2s;');
fs.writeFileSync('src/app/globals.css', css);
console.log('bubbles: no opacity fade (visibility + scale only)');
