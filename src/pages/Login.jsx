import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import { lifestyle } from '../data/products'

function Field({ label, name, type = 'text', value, onChange, ...rest }) {
  return (
    <label className="group relative block">
      <span className="eyebrow block pb-2">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        {...rest}
        className="w-full border-b border-ink-line bg-transparent py-3 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-700 focus:border-transparent"
      />
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
    </label>
  )
}

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [done, setDone] = useState(false)

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  const isLogin = mode === 'login'

  return (
    <div className="grid min-h-[calc(100svh-7rem)] grid-cols-1 lg:grid-cols-2">
      {/* Image side */}
      <div className="group relative hidden overflow-hidden lg:block">
        <img
          src={lifestyle.login}
          alt="Model wearing AL-ALAMIA OPTICS frames"
          className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition-all duration-[1400ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-12">
          <h2 className="wordmark text-4xl leading-none xl:text-5xl">
            Frame Your
            <br />
            Perspective
          </h2>
          <p className="mt-4 max-w-xs text-sm text-neutral-400">
            Track orders, save fits, and get first access to every drop.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-5 py-20 md:px-12">
        <div className="w-full max-w-md">
          {/* Mode toggle */}
          <div className="relative mb-12 flex border border-ink-line">
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="absolute inset-y-0 w-1/2 bg-bone"
              style={{ left: isLogin ? '0%' : '50%' }}
            />
            {['login', 'register'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative z-10 flex-1 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                  mode === m ? 'text-ink' : 'text-neutral-500 hover:text-bone'
                }`}
              >
                {m === 'login' ? 'Log In' : 'Register'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="wordmark text-5xl leading-none md:text-6xl">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                {isLogin
                  ? 'Sign in to track orders and saved frames.'
                  : 'One account for orders, repairs and early access.'}
              </p>

              <form onSubmit={submit} className="mt-10 space-y-8">
                {!isLogin && (
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={set}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                )}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={set}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={set}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                />

                {isLogin && (
                  <div className="flex items-center justify-between text-xs">
                    <label className="flex cursor-pointer items-center gap-2 text-neutral-500">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 accent-accent"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="link-wipe text-neutral-500 hover:text-bone"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  size="lg"
                  variant={done ? 'accent' : 'solid'}
                  className="w-full"
                >
                  {done
                    ? 'Demo — no account created ✓'
                    : isLogin
                      ? 'Log In'
                      : 'Create Account'}
                </MagneticButton>
              </form>

              <div className="mt-10 flex items-center gap-4">
                <span className="rule" />
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-neutral-700">
                  or
                </span>
                <span className="rule" />
              </div>

              <div className="mt-8 grid gap-3">
                {['Continue with Apple', 'Continue with Google'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="group relative overflow-hidden border border-ink-line py-3.5 text-xs uppercase tracking-[0.16em] text-neutral-400 transition-colors duration-300 hover:text-ink"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-bone transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                    <span className="relative z-10">{p}</span>
                  </button>
                ))}
              </div>

              <p className="mt-10 text-center text-xs text-neutral-600">
                {isLogin ? 'No account yet? ' : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setMode(isLogin ? 'register' : 'login')}
                  className="link-wipe text-accent"
                >
                  {isLogin ? 'Register' : 'Log in'}
                </button>
              </p>

              <p className="mt-8 text-center text-[11px] leading-relaxed text-neutral-700">
                Demo storefront — no credentials are stored or sent. Read our{' '}
                <Link to="/contact" className="link-wipe">
                  contact page
                </Link>{' '}
                for real support.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
