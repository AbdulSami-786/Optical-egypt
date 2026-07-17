# ZILO·OPTICS

A storefront for a fictional handcrafted-eyewear brand, built with React, Tailwind and Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle → dist/
npm run preview  # serve the built bundle
```

## Pages

| Route            | What it is                                                        |
| ---------------- | ----------------------------------------------------------------- |
| `/`              | Split hero, value strip, featured frames, story, editorial, quotes |
| `/shop`          | Filter by collection, search, sort — filters live in the URL       |
| `/product/:id`   | Gallery with cursor zoom, colour + quantity, specs, related        |
| `/cart`          | Line items, quantity steppers, free-shipping progress, totals      |
| `/checkout`      | Three-step contact → shipping → payment, then confirmation         |
| `/our-story`     | Brand story, parallax banner, timeline, principles                 |
| `/contact`       | Form, contact channels, studios, FAQ accordion                     |
| `/login`         | Login / register toggle                                            |
| anything else    | 404                                                                |

## How it's put together

- **`src/data/products.js`** — the catalogue. Everything (shop, cart, related
  frames) derives from this one array, so adding a product is a single edit.
- **`src/context/CartContext.jsx`** — cart state via `useReducer`, persisted to
  `localStorage` and re-joined against the catalogue on read, so prices always
  come from source and stale lines are dropped.
- **`src/components/`** — `MagneticButton` (leans toward the cursor),
  `ProductCard` (3D tilt + image crossfade + quick-add), `AnimatedBackground`
  (drifting blobs, panning grid, grain), `Marquee`, `Reveal`.

### Two gotchas worth knowing before you edit

1. **A CSS keyframe transform beats a Tailwind transform utility.** Anything
   using `animate-float` / `animate-spin-slow` keeps its centring translate on a
   *separate parent* element. Merging them silently displaces the element.
2. **`Reveal` / `RevealText` default to firing on scroll.** Above the fold, pass
   `trigger="mount"` — the in-view margin can otherwise leave content near the
   bottom edge stuck at `opacity: 0` on first paint.

## Images

Photography is hot-linked from [Unsplash](https://unsplash.com) (free for
commercial use, no attribution required), sized through their imgix params. All
URLs were checked to resolve. Swap the ids in `src/data/products.js` for real
product shots — transparent PNGs on the light hero stage will look best.

## Note

A front-end demo: no backend. Checkout, contact and login forms validate and
animate but submit nowhere, and no payment is processed.
