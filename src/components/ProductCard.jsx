import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'

/**
 * Product tile with a 3D cursor tilt, crossfade to a second image, a spotlight
 * that follows the pointer, and a quick-add bar that rises on hover.
 */
export default function ProductCard({ product, index = 0 }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [spot, setSpot] = useState({ x: 50, y: 50 })
  const [added, setAdded] = useState(false)
  const { add } = useCart()

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ rx: (0.5 - py) * 11, ry: (px - 0.5) * 11 })
    setSpot({ x: px * 100, y: py * 100 })
  }

  const reset = () => setTilt({ rx: 0, ry: 0 })

  const quickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    add(product.id, product.colors[0], 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="perspective"
    >
      <Link
        ref={ref}
        to={`/product/${product.id}`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="group relative block preserve-3d"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="relative aspect-[4/5] overflow-hidden border border-ink-line bg-ink-soft">
          {/* Base image */}
          <img
            src={product.image}
            alt={product.name}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:opacity-0"
          />
          {/* Hover image */}
          <img
            src={product.hoverImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
          />

          {/* Pointer spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 180px at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.18), transparent 70%)`,
            }}
          />

          {/* Sweeping sheen */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />

          {/* Badge */}
          {product.badge && (
            <span className="absolute left-3 top-3 z-10 border border-bone/25 bg-ink/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] backdrop-blur-sm">
              {product.badge}
            </span>
          )}

          {/* Sale tag */}
          {product.compareAt && (
            <span className="absolute right-3 top-3 z-10 bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              −{Math.round((1 - product.price / product.compareAt) * 100)}%
            </span>
          )}

          {/* Quick add bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
            <button
              type="button"
              onClick={quickAdd}
              className="relative w-full overflow-hidden bg-bone py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-brand hover:text-white"
            >
              {added ? 'Added ✓' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-start justify-between gap-4 pt-4">
          <div>
            <h3 className="text-base font-medium tracking-tight transition-colors duration-300 group-hover:text-accent">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs text-neutral-500">{product.tagline}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-sm font-medium">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="ml-2 text-xs text-neutral-600 line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
