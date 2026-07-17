import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Logo from './Logo'
import Marquee from './Marquee'

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

function CartLink({ className = '' }) {
  const { count } = useCart()
  return (
    <Link
      to="/cart"
      className={`group relative text-sm font-medium tracking-tight ${className}`}
    >
      <span className="link-wipe">Cart ({count})</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            className="absolute -right-2.5 -top-1.5 h-1.5 w-1.5 rounded-full bg-accent"
          />
        )}
      </AnimatePresence>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement ticker. Both bars sit above the mobile overlay (z-40)
          so the wordmark and cart stay visible while the menu is open — the
          overlay reserves space for them with its top padding. */}
      <div className="relative z-50 bg-black py-2 text-bone">
        <Marquee text="Free worldwide shipping on all orders" />
      </div>

      {/* Main bar */}
      <div
        className={`relative z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-ink-line bg-ink/80 backdrop-blur-xl'
            : 'border-transparent bg-ink'
        }`}
      >
        <nav className="mx-auto flex h-24 max-w-[1600px] items-center justify-between px-5 md:h-28 md:px-10">
          {/* Left — desktop nav / mobile cart */}
          <div className="flex flex-1 items-center gap-8">
            <ul className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `link-wipe text-sm font-medium tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-bone' : 'text-neutral-400 hover:text-bone'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <CartLink className="md:hidden" />
          </div>

          {/* Centre — logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Logo className="h-16 md:h-24" />
          </div>

          {/* Right — desktop account / mobile burger */}
          <div className="flex flex-1 items-center justify-end gap-7">
            <Link
              to="/login"
              className="group hidden items-center gap-2 text-sm font-medium tracking-tight text-neutral-300 transition-colors hover:text-bone md:flex"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[360deg]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M6.5 19a6 6 0 0 1 11 0" strokeLinecap="round" />
              </svg>
              <span className="link-wipe">Log In</span>
            </Link>
            <CartLink className="hidden md:block text-neutral-300 hover:text-bone" />

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
            >
              <span
                className={`block h-[2px] w-7 bg-bone transition-transform duration-300 ${
                  open ? 'translate-y-[9px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-7 bg-bone transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-7 bg-bone transition-transform duration-300 ${
                  open ? '-translate-y-[9px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-40 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {[...NAV, { to: '/login', label: 'Log In' }].map((item, i) => (
                <li key={item.to} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className="group flex items-baseline justify-between border-b border-ink-line py-4"
                    >
                      <span className="wordmark text-4xl transition-transform duration-500 group-hover:translate-x-3">
                        {item.label}
                      </span>
                      <span className="text-xs text-neutral-600">
                        0{i + 1}
                      </span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>Cairo · Milan</span>
              <span>© {new Date().getFullYear()} AL-ALAMIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
