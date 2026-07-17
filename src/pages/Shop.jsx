import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import ProductCard from '../components/ProductCard'
import Reveal, { RevealText } from '../components/Reveal'
import { collections, products } from '../data/products'

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Alphabetical' },
]

export default function Shop() {
  // The active collection lives in the URL so /shop?c=sun is linkable.
  const [params, setParams] = useSearchParams()
  const active = params.get('c') ?? 'all'
  const [sort, setSort] = useState('featured')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    let list =
      active === 'all'
        ? products
        : products.filter((p) => p.collection === active)

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      )
    }

    const sorted = [...list]
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name))
    return sorted
  }, [active, sort, query])

  const setCollection = (slug) => {
    if (slug === 'all') {
      params.delete('c')
    } else {
      params.set('c', slug)
    }
    setParams(params, { replace: true })
  }

  return (
    <>
      {/* Header */}
      <header className="border-b border-ink-line px-5 pb-14 pt-20 md:px-10 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <span className="eyebrow">
              {visible.length} frame{visible.length === 1 ? '' : 's'} available
            </span>
          </Reveal>
          <h1 className="wordmark mt-4 text-6xl leading-none md:text-8xl">
            <RevealText text="Shop" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-400">
              Every frame is cut from solid Italian acetate and shipped free,
              worldwide, with Zeiss-grade lenses.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Filter bar */}
      <div className="sticky top-[6.5rem] z-30 border-b border-ink-line bg-ink/85 backdrop-blur-xl md:top-[7.5rem]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          {/* Collections */}
          <div className="flex flex-wrap gap-2">
            {collections.map((c) => {
              const isActive = c.slug === active
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCollection(c.slug)}
                  className={`group relative overflow-hidden border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive
                      ? 'border-bone text-ink'
                      : 'border-ink-line text-neutral-400 hover:text-ink'
                  }`}
                >
                  <span
                    className={`absolute inset-0 origin-bottom bg-bone transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                    }`}
                  />
                  <span className="relative z-10">{c.label}</span>
                </button>
              )
            })}
          </div>

          {/* Search + sort */}
          <div className="flex items-center gap-3">
            <div className="group relative flex items-center border-b border-ink-line transition-colors focus-within:border-bone">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-neutral-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search frames"
                aria-label="Search frames"
                className="w-32 bg-transparent px-2 py-1.5 text-xs outline-none placeholder:text-neutral-600 focus:w-40 md:transition-[width] md:duration-400"
              />
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="cursor-pointer border border-ink-line bg-ink px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-neutral-400 outline-none transition-colors duration-300 hover:border-neutral-600 hover:text-bone"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-ink">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-20">
        {visible.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <span className="wordmark text-6xl text-ink-line">∅</span>
            <p className="mt-6 text-sm text-neutral-400">
              No frames match “{query}”.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCollection('all')
              }}
              className="link-wipe mt-4 text-xs uppercase tracking-[0.2em] text-accent"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </section>
    </>
  )
}
