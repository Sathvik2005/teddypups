import { ImageResponse } from 'next/og';

export const alt = 'TeddyPups U.A.E. — every puppy is family';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Brand card used when a page shares without its own photo. Built at build time; no external assets. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 90px', background: 'linear-gradient(135deg, #fff1d9 0%, #f2be6b 100%)', color: '#2a170e', border: '14px solid #2a170e' }}>
        <div style={{ fontSize: 34, color: '#a24a1a', letterSpacing: 1 }}>every puppy is family</div>
        <div style={{ fontSize: 118, fontWeight: 800, lineHeight: 1, marginTop: 18 }}>TeddyPups</div>
        <div style={{ fontSize: 46, marginTop: 24, maxWidth: 900, lineHeight: 1.2 }}>Premium teacup puppies in Dubai</div>
        <div style={{ fontSize: 28, marginTop: 34, color: '#5a3a28' }}>Downtown Dubai · worldwide delivery</div>
      </div>
    ),
    size,
  );
}
