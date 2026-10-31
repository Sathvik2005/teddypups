# Route Inventory (all fetched, HTTP 200)

| Route | Type | Content source in clone |
|---|---|---|
| `/` | static | sections + `data/puppies.ts`, `families.ts`, `faq.ts` |
| `/puppies` | static + client filters | `data/puppies.ts` |
| `/puppies/[slug]` | SSG (`generateStaticParams`, 15) | `data/puppies.ts` |
| `/happy-families` | static | `data/families.ts` (64) |
| `/gone-home` | static | `data/gone-home.ts` (27) |
| `/how-it-works` | static | copy in page |
| `/faq` | static | `data/faq.ts` (9) |
| `/contact` | static + client form | — |
| `not-found` | — | custom Teddy 404 |

Query params (client-side): `?origin=local|imported`, `?breed=maltipoo|pomeranian|poodle|cavapoo|shih-tzu` (additional chips: Korean Teacup, Boys, Girls — param names ❓ for those).

## Puppies (✅ `reference/puppies-summary.json`; all "Imported for you", all Available)

| Slug | Breed | Gender | Age | Media | Video |
|---|---|---|---|---|---|
| maltipoo-max-male | Maltipoo (Max) | Boy | 3 mo | 2 | ✅ |
| korean-teacup-maltipoo-female | Korean Teacup Maltipoo | Girl | 2 mo | 11 | ✅ |
| korean-teacup-poodle-female | Korean Teacup Poodle | Girl | 2 mo | 4 | |
| maltipoo-cavapoo-male | Maltipoo & Cavapoo | Boy | 3 mo Maltipoo & 2 mo Cavapoo | 3 | ✅ |
| toy-poodle-male-female | Toy Poodle | Boy & girl | 2 mo | 3 | |
| maltipoo-female-2 | Maltipoo | Girl | 3 mo | 7 | ✅ |
| pomeranian-female | Pomeranian | Girl | 3 mo | 3 | |
| copper-male | Cavapoo (Copper) | Boy | 2 mo | 4 | |
| shitzu-female | Shih Tzu | Girl | 2 mo | 2 | |
| shitzu-male | Shih Tzu | Boy | 2 mo | 2 | |
| maltipoo-female-1 | Maltipoo | Girl | 2.5 mo | 4 | |
| maltipoo-female | Maltipoo | Girl | 2 mo | 4 | |
| korean-teacup-pomeranian | Korean Teacup Pomeranian | Girl | 2 mo | 2 | |
| korean-teacup-pomeranian-1 | Korean Teacup Pomeranian | Girl | 2 mo | 2 | |
| korean-teacup-pomeranian-male | Korean Teacup Pomeranian | Boy | 2 mo | 4 | |

Catalogue order = table order. Note: 15 listings (a third-party audit said 14).

## External links (✅)
WhatsApp `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies.` · tel `+971541676733` · mailto `teddypupsadmin@gmail.com` · Instagram `teddypups.worldwide` · TikTok `@teddypupsuae` · Facebook `profile.php?id=61567496944539` · Maps `https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7`.
