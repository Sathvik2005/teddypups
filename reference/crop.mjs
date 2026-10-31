import sharp from 'sharp';
const [file, out, top, h, w] = process.argv.slice(2);
const img = sharp(file);
const meta = await img.metadata();
await sharp(file).extract({ left: 0, top: +top, width: meta.width, height: Math.min(+h, meta.height - +top) }).resize({ width: +(w || 900) }).toFile(out);
console.log(meta.width, meta.height);
