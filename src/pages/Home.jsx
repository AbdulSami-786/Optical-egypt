import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import BrandName from '../components/BrandName'
import MagneticButton from '../components/MagneticButton'
import ProductCard from '../components/ProductCard'
import Marquee from '../components/Marquee'
import Reveal, { RevealText } from '../components/Reveal'
import { lifestyle, products, formatPrice } from '../data/products'

/* ------------------------------------------------------------------ *
 * Hero — split portrait / product, with the floating collection card
 * ------------------------------------------------------------------ */
function Hero() {
  const sunFrames = products.filter((p) => p.collection === 'sun')
  const [active, setActive] = useState(0)
  const frame = sunFrames[active]

  const next = () => setActive((i) => (i + 1) % sunFrames.length)

  return (
    <section className="relative grid min-h-[calc(100svh-7rem)] grid-cols-1 lg:grid-cols-2">
      {/* Left — portrait */}
      <div className="group relative min-h-[62svh] overflow-hidden lg:min-h-full">
        <motion.img
          src={lifestyle.heroPortrait}
          alt="Model wearing AL-ALAMIA OPTICS acetate sunglasses"
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-center grayscale-[0.35] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-6 md:p-12">
          <h1 className="wordmark text-5xl leading-[0.95] text-balance md:text-7xl xl:text-8xl">
            <RevealText text="Frame Your" trigger="mount" />
            <br />
            <RevealText text="Perspective" delay={0.12} trigger="mount" />
          </h1>
          <Reveal delay={0.5} trigger="mount">
            <p className="mt-5 max-w-xs text-sm font-medium leading-relaxed text-neutral-300">
              Handcrafted acetate frames designed for those who see the world
              differently
            </p>
          </Reveal>
          <Reveal delay={0.65} trigger="mount">
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton to="/shop">Shop All Frames</MagneticButton>
              <MagneticButton to="/our-story" variant="outline">
                Our Story
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 right-6 hidden items-center gap-3 lg:flex">
          <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-500">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-ink-line">
            <span className="absolute inset-x-0 top-0 h-1/3 animate-scanline bg-accent" />
          </span>
        </div>
      </div>

      {/* Right — product stage + collection card */}
      <div className="relative min-h-[70svh] overflow-hidden bg-gradient-to-br from-neutral-400 via-neutral-200 to-neutral-500 lg:min-h-full">
        {/* Product fills the stage. Framer owns the transform here so the slow
            ken-burns drift can't collide with a CSS keyframe transform. */}
        <motion.div
          key={frame.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <motion.img
            src={frame.image}
            alt={frame.name}
            animate={{ scale: [1.06, 1.14, 1.06] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Rotating rings over the stage. The centring translate and the spin
            keyframe live on separate elements — a CSS animation's transform
            overrides a utility transform outright. */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full animate-spin-slow rounded-full border border-ink/10 border-t-ink/40" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full animate-spin-slow rounded-full border border-ink/10 border-b-ink/30"
            style={{ animationDirection: 'reverse', animationDuration: '26s' }}
          />
        </div>

        {/* Ties the light stage back into the dark page */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

        {/* Floating "THE SUN COLLECTION" card */}
        <motion.aside
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-6 right-4 z-10 w-[16rem] border border-white/60 bg-white/95 p-1.5 shadow-2xl backdrop-blur-sm md:bottom-10 md:right-8 md:w-[19rem]"
        >
          <div className="bg-ink p-5 text-bone md:p-6">
            <h2 className="wordmark flex justify-between gap-3 text-xl leading-tight md:text-2xl">
              <span>THE</span>
              <span>SUN</span>
            </h2>
            <h2 className="wordmark text-xl leading-tight md:text-2xl">
              COLLECTION
            </h2>
            <p className="mt-5 text-[13px] leading-relaxed text-neutral-300">
              Architectural eyewear for those who move with intention. Built to
              be worn for a lifetime.
            </p>
          </div>

          {/* Frame carousel */}
          <div className="relative flex h-32 items-center justify-center bg-bone md:h-36">
            <motion.img
              key={frame.id}
              src={frame.hoverImage}
              alt={`${frame.name} — ${formatPrice(frame.price)}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={next}
              aria-label="Next frame"
              className="group absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-ink/15 bg-white/80 backdrop-blur transition-all duration-300 hover:bg-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-ink transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-bone"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 6l6 6-6 6" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <Link
            to="/shop?c=sun"
            className="group relative flex items-center justify-center overflow-hidden bg-bone py-3.5 text-[12px] font-semibold tracking-tight text-ink"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            <span className="relative z-10 transition-all duration-300 group-hover:scale-105 group-hover:text-white">
              Shop the Collection
            </span>
          </Link>
        </motion.aside>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Value strip
 * ------------------------------------------------------------------ */
const VALUES = [
  {
    n: '01',
    title: 'Italian Acetate',
    body: 'Cured for six weeks, cut from solid block, hand-polished for nine hours.',
  },
  {
    n: '02',
    title: 'Zeiss Lenses',
    body: 'Every frame ships with Zeiss-grade optics. Prescription-ready, always.',
  },
  {
    n: '03',
    title: 'Lifetime Hinges',
    body: 'Five-barrel steel hinges rated for a decade of daily wear. We repair free.',
  },
  {
    n: '04',
    title: 'Worldwide, Free',
    body: 'Every order ships free, tracked, in a recycled hard case. 30-day returns.',
  },
]

function ValueStrip() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/60 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v, i) => (
          <Reveal
            key={v.n}
            delay={i * 0.08}
            className="group relative overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft md:p-10"
          >
            {/* Accent wipe */}
            <span className="absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            <span className="wordmark text-3xl text-ink-line transition-colors duration-500 group-hover:text-accent">
              {v.n}
            </span>
            <h3 className="mt-5 text-base font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">
              {v.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
              {v.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Featured products
 * ------------------------------------------------------------------ */
function Featured() {
  const featured = products.slice(0, 6)
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <span className="eyebrow">Selected Works</span>
          </Reveal>
          <h2 className="wordmark mt-4 text-4xl leading-none md:text-6xl">
            <RevealText text="The Frames" />
          </h2>
        </div>
        <Reveal delay={0.2}>
          <MagneticButton to="/shop" variant="outline">
            View All {products.length} Frames
          </MagneticButton>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Story split
 * ------------------------------------------------------------------ */
function StoryTeaser() {
  return (
    <section className="relative overflow-hidden border-y border-ink-line">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
        <div className="group relative min-h-[50svh] overflow-hidden lg:min-h-[38rem]">
          <img
            src={lifestyle.storyWorkshop}
            alt="Acetate frames laid out in the Al-Alamia workshop"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-ink/30 transition-opacity duration-700 group-hover:opacity-0" />
        </div>

        <div className="flex flex-col justify-center p-8 md:p-16 lg:p-20">
          <Reveal>
            <span className="eyebrow">Est. 2016 — Cairo &amp; Milan</span>
          </Reveal>
          <h2 className="wordmark mt-5 text-4xl leading-[1.05] md:text-5xl xl:text-6xl">
            <RevealText text="Nine hours of polishing." />{' '}
            <RevealText text="One frame." delay={0.15} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-neutral-400">
              We started in a two-room workshop with a single question: why does
              eyewear that fits properly cost a month&apos;s rent? Nine years
              later we still cut every frame from solid Italian acetate, still
              polish by hand, and still sell direct — so the only markup you pay
              is the one that keeps the lights on.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-9 grid max-w-md grid-cols-3 gap-6 border-t border-ink-line pt-8">
              {[
                ['9 yrs', 'Making frames'],
                ['64k', 'Frames shipped'],
                ['4.9★', 'Avg. rating'],
              ].map(([stat, label]) => (
                <div key={label} className="group cursor-default">
                  <div className="wordmark text-2xl transition-colors duration-300 group-hover:text-accent md:text-3xl">
                    {stat}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-neutral-600">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.55}>
            <div className="mt-10">
              <MagneticButton to="/our-story">Read Our Story</MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Editorial image grid
 * ------------------------------------------------------------------ */
function Editorial() {
  const shots = [
    { src: lifestyle.editorialA, label: 'Off-Duty', span: 'row-span-2' },
    { src: lifestyle.editorialB, label: 'City Light', span: '' },
    { src: lifestyle.editorialC, label: 'Clear Sky', span: '' },
    { src: lifestyle.editorialD, label: 'After Hours', span: 'sm:col-span-2' },
  ]

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <span className="eyebrow">Worn By You</span>
      </Reveal>
      <h2 className="wordmark mt-4 text-4xl leading-none md:text-6xl">
        <RevealText text="In The Wild" />
      </h2>

      <div className="mt-12 grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-3">
        {shots.map((shot, i) => (
          <Reveal
            key={shot.label}
            delay={i * 0.07}
            className={`group relative overflow-hidden border border-ink-line ${shot.span}`}
          >
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
              <span className="text-sm font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                {shot.label}
              </span>
              <span className="translate-x-4 text-accent opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */
const QUOTES = [
  {
    quote:
      'I have a big head and a bigger opinion about eyewear. These are the first frames in a decade that fit right out of the box.',
    name: 'Marcus Ade',
    role: 'Architect, Berlin',
  },
  {
    quote:
      'Three years of daily wear, one free hinge repair, zero complaints. They just do what they said they would.',
    name: 'Yara Mahfouz',
    role: 'Photographer, Cairo',
  },
  {
    quote:
      'The acetate has a depth to it that you genuinely cannot get from injection moulding. You can feel the difference.',
    name: 'Dan Reyes',
    role: 'Industrial designer, Lisbon',
  },
]

function Testimonials() {
  return (
    <section className="border-y border-ink-line bg-ink-soft/50 py-24 backdrop-blur-sm md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Reveal>
          <span className="eyebrow">4.9 average from 2,140 reviews</span>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px bg-ink-line md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal
              key={q.name}
              delay={i * 0.1}
              className="group relative overflow-hidden bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft md:p-10"
            >
              <span className="wordmark absolute -right-2 -top-6 text-8xl text-ink-line transition-all duration-700 group-hover:text-accent/20">
                &rdquo;
              </span>
              <div className="mb-5 flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, s) => (
                  <span
                    key={s}
                    className="transition-transform duration-500"
                    style={{ transitionDelay: `${s * 50}ms` }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="relative z-10 text-[15px] leading-relaxed text-neutral-300">
                {q.quote}
              </p>
              <footer className="mt-7 border-t border-ink-line pt-5">
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-xs text-neutral-600">{q.role}</div>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * Closing CTA
 * ------------------------------------------------------------------ */
function ClosingCTA() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <Marquee
          text={<BrandName />}
          repeat={10}
          className="wordmark text-[7rem] text-ink-line/60 md:text-[13rem]"
        />
      </div>
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="wordmark text-5xl leading-none text-balance md:text-7xl">
          <RevealText text="See it differently." />
        </h2>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-400">
            Free worldwide shipping, 30-day returns, and a hinge warranty that
            outlives the trend cycle.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <MagneticButton to="/shop" size="lg" variant="accent">
              Shop the Collection
            </MagneticButton>
            <MagneticButton to="/contact" size="lg" variant="outline">
              Book a Fitting
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <ValueStrip />
      <Featured />
      <StoryTeaser />
      <Editorial />
      <Testimonials />
      <ClosingCTA />
    </>
  )
}
