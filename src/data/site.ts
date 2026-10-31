export const site = {
  name: 'TeddyPups U.A.E.',
  tagline: 'every puppy is family',
  description: 'Premium teacup puppies in Dubai. Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  whatsappNumber: '971541676733',
  phoneDisplay: '+971 54 167 6733',
  phoneHref: 'tel:+971541676733',
  email: 'teddypupsadmin@gmail.com',
  address: 'Downtown Dubai, United Arab Emirates',
  mapsUrl: 'https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/teddypups.worldwide/' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@teddypupsuae' },
    { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61567496944539' },
  ],
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/puppies', label: 'Puppies' },
  { href: '/happy-families', label: 'Happy families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Visit & contact' },
] as const;

export const footerExplore = [
  { href: '/puppies', label: 'Available puppies' },
  { href: '/gone-home', label: 'Gone home' },
  { href: '/happy-families', label: 'Happy families' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/how-it-works#delivery', label: 'Delivery & collection' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Visit & contact' },
] as const;
