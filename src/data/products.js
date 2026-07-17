// Product catalogue. Images are hot-linked from Unsplash (free for commercial
// use, no attribution required) and resized via their imgix query params.
const img = (id, w = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const collections = [
  { slug: 'all', label: 'All Frames' },
  { slug: 'sun', label: 'The Sun Collection' },
  { slug: 'optical', label: 'Optical' },
  { slug: 'sport', label: 'Sport' },
]

export const products = [
  {
    id: 'ao-001',
    name: 'Meridian',
    tagline: 'Sculpted wrap silhouette',
    price: 285,
    compareAt: 340,
    collection: 'sun',
    badge: 'Best Seller',
    colors: ['Matte Black', 'Graphite', 'Bone'],
    image: img('photo-1572635196237-14b3f281503f'),
    hoverImage: img('photo-1473496169904-658ba7c44d8a'),
    description:
      'A low-slung wrap cut from a single block of Italian acetate. The Meridian hugs the brow line and disappears when worn — engineered for motion, finished by hand.',
  },
  {
    id: 'ao-002',
    name: 'Atlas',
    tagline: 'Architectural sun frame',
    price: 320,
    compareAt: null,
    collection: 'sun',
    badge: 'New',
    colors: ['Obsidian', 'Smoke'],
    image: img('photo-1511499767150-a48a237f0083'),
    hoverImage: img('photo-1508296695146-257a814070b4'),
    description:
      'Bold, squared, unapologetic. Atlas takes its proportions from brutalist facades — heavy on the front, weightless on the temple.',
  },
  {
    id: 'ao-003',
    name: 'Vector',
    tagline: 'Performance shield',
    price: 265,
    compareAt: 310,
    collection: 'sport',
    badge: null,
    colors: ['Jet', 'Storm'],
    image: img('photo-1577803645773-f96470509666'),
    hoverImage: img('photo-1566421966482-ad8076104d8e'),
    description:
      'Built for velocity. A continuous lens sweep with anti-slip temple tips and impact-rated polycarbonate that shrugs off the worst of a day outdoors.',
  },
  {
    id: 'ao-004',
    name: 'Fold',
    tagline: 'Everyday optical',
    price: 210,
    compareAt: null,
    collection: 'optical',
    badge: null,
    colors: ['Crystal', 'Tortoise', 'Black'],
    image: img('photo-1556306510-31ca015374b0'),
    hoverImage: img('photo-1591076482161-42ce6da69f67'),
    description:
      'The frame you forget you are wearing. Fold is 18 grams of hand-polished acetate with titanium core wires and a five-barrel hinge rated for a decade of daily use.',
  },
  {
    id: 'ao-005',
    name: 'Null',
    tagline: 'Minimal round optical',
    price: 240,
    compareAt: 280,
    collection: 'optical',
    badge: 'Limited',
    colors: ['Gold', 'Silver'],
    image: img('photo-1582142407894-ec85a1260a46'),
    hoverImage: img('photo-1614715838608-dd527c46231d'),
    description:
      'A perfect circle, drawn thin. Null strips the frame back to its structural minimum — nothing left to remove.',
  },
  {
    id: 'ao-006',
    name: 'Cinder',
    tagline: 'Tortoise wayfarer',
    price: 275,
    compareAt: null,
    collection: 'sun',
    badge: null,
    colors: ['Tortoise', 'Amber'],
    image: img('photo-1559070081-648fb00b2ed1'),
    hoverImage: img('photo-1611222777277-61319d63ca94'),
    description:
      'Our take on a classic that refuses to date. Hand-laid tortoise acetate, no two frames identical, cured for six weeks before cutting.',
  },
  {
    id: 'ao-007',
    name: 'Halo',
    tagline: 'Wire-rim optical',
    price: 230,
    compareAt: null,
    collection: 'optical',
    badge: null,
    colors: ['Brushed Steel', 'Black'],
    image: img('photo-1512099053734-e6767b535838'),
    hoverImage: img('photo-1617791932882-a70117e3564d'),
    description:
      'Featherweight stainless wire bent on a single jig. Halo sits high and light, built for long days behind a screen.',
  },
  {
    id: 'ao-008',
    name: 'Drift',
    tagline: 'Oversized sun',
    price: 295,
    compareAt: 350,
    collection: 'sun',
    badge: null,
    colors: ['Ink', 'Sand'],
    image: img('photo-1584036553516-bf83210aa16c'),
    hoverImage: img('photo-1610136649349-0f646f318053'),
    description:
      'Generous coverage without the bulk. Drift oversizes the lens while thinning the rim — presence, not weight.',
  },
  {
    id: 'ao-009',
    name: 'Pulse',
    tagline: 'Runner’s frame',
    price: 250,
    compareAt: null,
    collection: 'sport',
    badge: 'New',
    colors: ['Volt', 'Black'],
    image: img('photo-1608539733292-190446b22b83'),
    hoverImage: img('photo-1653038282189-803202722a05'),
    description:
      'Vented lens channels, a hydrophilic nose bridge that grips harder as you sweat, and a frame that stays put at pace.',
  },
]

// Editorial / lifestyle photography used across the marketing pages.
export const lifestyle = {
  heroPortrait: img('photo-1552940519-2c2c6f9064c5', 1400),
  heroProduct: img('photo-1572635196237-14b3f281503f', 1400),
  sunCollection: img('photo-1473496169904-658ba7c44d8a', 900),
  storyPortrait: img('photo-1592245734204-6561336cbc6f', 1200),
  storyWorkshop: img('photo-1534078477103-9f6a18b3a5e2', 1200),
  storyDetail: img('photo-1516714819001-8ee7a13b71d7', 1200),
  editorialA: img('photo-1605813808456-26c16c0dfb77', 1000),
  editorialB: img('photo-1614252369475-531eba835eb1', 1000),
  editorialC: img('photo-1624372462825-73d8bda469e1', 1000),
  editorialD: img('photo-1637152851930-e95d1a31acef', 1000),
  contact: img('photo-1568123754291-f3c3f8a8ad83', 1200),
  login: img('photo-1605896494532-54bc7e73cfa9', 1200),
}

export const getProduct = (id) => products.find((p) => p.id === id)

// Whole amounts read as "$285"; anything with cents keeps both digits so
// derived values (tax, totals) never render as "$62.4".
export const formatPrice = (n) => {
  const cents = Math.round(n * 100) % 100 !== 0
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(n)
}
