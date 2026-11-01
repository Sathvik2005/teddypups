import fs from 'node:fs';
let l = fs.readFileSync('src/app/layout.tsx', 'utf8');
l = l.replace("import { Effects } from '@/components/effects/Effects';", "import { PupActor } from '@/components/mascot/PupActor';\nimport { PupCursor } from '@/components/cursor/PupCursor';\nimport { PawTrail } from '@/components/cursor/PawTrail';\nimport { ScrollProgress } from '@/components/motion/ScrollProgress';");
l = l.replace('        <Effects />\n', '        <PupActor />\n        <PupCursor />\n        <PawTrail />\n');
l = l.replace('        <Header />', '        <ScrollProgress />\n        <Header />');
if (l.includes('Effects') || !l.includes('<PawTrail />') || !l.includes('<ScrollProgress />')) throw new Error('revert failed');
fs.writeFileSync('src/app/layout.tsx', l);
fs.rmSync('src/components/effects', { recursive: true, force: true });
console.log('effects reverted to eager; effects/ removed');
