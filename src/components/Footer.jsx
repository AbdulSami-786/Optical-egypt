import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandName from './BrandName'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import Marquee from './Marquee'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'All Frames' },
      { to: '/shop?c=sun', label: 'The Sun Collection' },
      { to: '/shop?c=optical', label: 'Optical' },
      { to: '/shop?c=sport', label: 'Sport' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/our-story', label: 'Our Story' },
      { to: '/contact', label: 'Contact' },
      { to: '/login', label: 'Account' },
      { to: '/cart', label: 'Cart' },
    ],
  },
  {
    title: 'Support',
    links: [
      { to: '/contact', label: 'Shipping & Returns' },
      { to: '/contact', label: 'Frame Fit Guide' },
      { to: '/contact', label: 'Warranty' },
      { to: '/contact', label: 'FAQ' },
    ],
  },
]

const SOCIAL = ['Instagram', 'TikTok', 'Pinterest', 'YouTube']

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSent(true)
    setEmail('')
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <footer className="relative mt-32 border-t border-ink-line bg-ink">
      {/* Oversized marquee wordmark */}
      <div className="overflow-hidden border-b border-ink-line py-8">
        <Marquee
          text={
            <>
              <BrandName /> — FRAME YOUR PERSPECTIVE
            </>
          }
          repeat={6}
          speed="fast"
          className="wordmark text-5xl text-ink-line md:text-8xl [&_span]:tracking-tight"
        />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          {/* Newsletter */}
          <div>
            <Logo className="h-14 md:h-16" fallbackClassName="text-2xl" />
            <h2 className="wordmark mt-8 text-3xl md:text-4xl">Join the list</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
              Early access to drops, restocks and the occasional thought on
              design. No noise.
            </p>

            <form onSubmit={submit} className="mt-7 max-w-md">
              <div className="group relative flex items-center border-b border-ink-line transition-colors duration-300 focus-within:border-bone">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  className="w-full bg-transparent py-3 pr-24 text-sm outline-none placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 transition-colors duration-300 hover:text-accent"
                >
                  {sent ? 'Thanks ✓' : 'Subscribe'}
                </button>
                {/* Focus underline */}
                <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-focus-within:scale-x-100" />
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group relative overflow-hidden border border-ink-line px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-neutral-400 transition-colors duration-300 hover:text-ink"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <span className="relative z-10">{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link, i) => (
                    <li key={`${link.label}-${i}`}>
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-300 hover:text-bone"
                      >
                        <span className="h-px w-0 bg-accent transition-all duration-400 ease-out group-hover:w-4" />
                        <span className="transition-transform duration-400 ease-out group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rule my-12" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} <BrandName />. Handcrafted in Cairo &amp;
            Milan. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-600">
            <span className="cursor-default transition-colors hover:text-neutral-300">
              Privacy
            </span>
            <span className="cursor-default transition-colors hover:text-neutral-300">
              Terms
            </span>
            <MagneticButton to="/shop" variant="outline" size="sm">
              Shop Now
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  )
}
