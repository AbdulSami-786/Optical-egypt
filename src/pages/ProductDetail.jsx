import { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { formatPrice, getProduct, products } from '../data/products'

const SPECS = [
  ['Material', 'Solid Italian acetate, 6-week cured'],
  ['Lens', 'Zeiss-grade, UV400, prescription-ready'],
  ['Hinge', '5-barrel stainless, lifetime repair'],
  ['Weight', '18–24 g depending on size'],
  ['Includes', 'Hard case, microfibre, cleaning spray'],
]

/** Image with a zoom lens that tracks the cursor. */
function ZoomImage({ src, alt }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [zoom, setZoom] = useState(false)

  const move = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      className="relative aspect-square cursor-zoom-in overflow-hidden border border-ink-line bg-ink-soft"
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 ease-out"
        style={{
          transform: zoom ? 'scale(2)' : 'scale(1)',
          transformOrigin: `${pos.x}% ${pos.y}%`,
        }}
      />
      <span className="pointer-events-none absolute bottom-3 right-3 border border-bone/20 bg-ink/70 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-neutral-400 backdrop-blur">
        Hover to zoom
      </span>
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add } = useCart()

  const [color, setColor] = useState(product?.colors[0])
  const [qty, setQty] = useState(1)
  const [shot, setShot] = useState(0)
  const [added, setAdded] = useState(false)

  // Unknown id — send the visitor to the shop rather than rendering an error.
  if (!product) return <Navigate to="/shop" replace />

  const gallery = [product.image, product.hoverImage]
  const related = products
    .filter((p) => p.id !== product.id && p.collection === product.collection)
    .slice(0, 3)

  const handleAdd = () => {
    add(product.id, color, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 md:pt-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-neutral-600">
          <Link to="/" className="link-wipe hover:text-bone">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="link-wipe hover:text-bone">
            Shop
          </Link>
          <span>/</span>
          <span className="text-neutral-400">{product.name}</span>
        </nav>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              key={shot}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ZoomImage src={gallery[shot]} alt={product.name} />
            </motion.div>

            <div className="mt-4 flex gap-4">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative h-24 w-24 overflow-hidden border transition-all duration-400 ${
                    shot === i
                      ? 'border-accent'
                      : 'border-ink-line opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Reveal>
              {product.badge && (
                <span className="mb-4 inline-block border border-accent/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                  {product.badge}
                </span>
              )}
              <h1 className="wordmark text-5xl leading-none md:text-7xl">
                {product.name}
              </h1>
              <p className="mt-3 text-sm text-neutral-500">{product.tagline}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-7 flex items-baseline gap-4">
                <span className="text-2xl font-medium">
                  {formatPrice(product.price)}
                </span>
                {product.compareAt && (
                  <>
                    <span className="text-base text-neutral-600 line-through">
                      {formatPrice(product.compareAt)}
                    </span>
                    <span className="bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                      Save {formatPrice(product.compareAt - product.price)}
                    </span>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-neutral-400">
                {product.description}
              </p>
            </Reveal>

            {/* Colour */}
            <Reveal delay={0.2}>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">Colour</span>
                  <span className="text-xs text-neutral-500">{color}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`group relative overflow-hidden border px-4 py-2.5 text-xs transition-colors duration-300 ${
                        color === c
                          ? 'border-bone text-ink'
                          : 'border-ink-line text-neutral-400 hover:text-ink'
                      }`}
                    >
                      <span
                        className={`absolute inset-0 origin-bottom bg-bone transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          color === c
                            ? 'scale-y-100'
                            : 'scale-y-0 group-hover:scale-y-100'
                        }`}
                      />
                      <span className="relative z-10">{c}</span>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Quantity + add */}
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap items-stretch gap-3">
                <div className="flex items-center border border-ink-line">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-4 py-4 text-lg text-neutral-400 transition-colors hover:bg-bone hover:text-ink"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-sm tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="px-4 py-4 text-lg text-neutral-400 transition-colors hover:bg-bone hover:text-ink"
                  >
                    +
                  </button>
                </div>

                <MagneticButton
                  onClick={handleAdd}
                  variant={added ? 'accent' : 'solid'}
                  className="flex-1"
                >
                  {added ? 'Added to Cart ✓' : `Add to Cart — ${formatPrice(product.price * qty)}`}
                </MagneticButton>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-3">
                <MagneticButton to="/cart" variant="outline" className="w-full">
                  View Cart
                </MagneticButton>
              </div>
            </Reveal>

            {/* Specs */}
            <Reveal delay={0.35}>
              <dl className="mt-12 divide-y divide-ink-line border-y border-ink-line">
                {SPECS.map(([k, v]) => (
                  <div
                    key={k}
                    className="group flex justify-between gap-6 py-4 transition-colors duration-300 hover:bg-ink-soft/60"
                  >
                    <dt className="text-xs uppercase tracking-[0.14em] text-neutral-600 transition-transform duration-300 group-hover:translate-x-1">
                      {k}
                    </dt>
                    <dd className="text-right text-[13px] text-neutral-300">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-ink-line">
          <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-24">
            <span className="eyebrow">You might also like</span>
            <h2 className="wordmark mt-4 text-3xl md:text-5xl">
              More from this collection
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
