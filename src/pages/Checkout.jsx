import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const STEPS = ['Contact', 'Shipping', 'Payment']

/** Text input with a floating label and an underline that wipes in on focus. */
function Field({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = true,
  className = '',
  autoComplete,
  placeholder,
}) {
  return (
    <label className={`group relative block ${className}`}>
      <span className="eyebrow block pb-2">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full border-b border-ink-line bg-transparent py-3 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-700 focus:border-transparent"
      />
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
    </label>
  )
}

function OrderConfirmed({ orderId, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex min-h-[60svh] flex-col items-center justify-center px-5 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.15 }}
        className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent text-4xl text-accent"
      >
        ✓
      </motion.div>
      <h1 className="wordmark mt-10 text-5xl leading-none md:text-7xl">
        Order confirmed
      </h1>
      <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">
        Thank you. Your frames are being hand-checked and boxed. A confirmation
        is on its way to your inbox.
      </p>
      <p className="mt-6 border border-ink-line px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-neutral-500">
        Order {orderId}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <MagneticButton to="/shop" size="lg">
          Keep Shopping
        </MagneticButton>
        <MagneticButton onClick={onReset} variant="outline" size="lg">
          Place Another Order
        </MagneticButton>
      </div>
    </motion.div>
  )
}

export default function Checkout() {
  const { lines, subtotal, shipping, tax, total, count, clear } = useCart()
  const [step, setStep] = useState(0)
  const [placed, setPlaced] = useState(null)
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    country: 'Egypt',
    card: '',
    expiry: '',
    cvc: '',
  })

  const set = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // An empty cart has nothing to check out — bounce back, unless we just
  // placed an order (in which case the cart is empty by design).
  if (count === 0 && !placed) return <Navigate to="/cart" replace />

  if (placed) {
    return (
      <OrderConfirmed
        orderId={placed}
        onReset={() => {
          setPlaced(null)
          setStep(0)
        }}
      />
    )
  }

  const submit = (e) => {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    // Final step — "place" the order.
    const id = `AO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setPlaced(id)
    clear()
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
      <header>
        <span className="eyebrow">Secure checkout</span>
        <h1 className="wordmark mt-4 text-6xl leading-none md:text-8xl">
          Checkout
        </h1>
      </header>

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        {/* Form */}
        <section>
          {/* Stepper */}
          <ol className="flex items-center gap-3">
            {STEPS.map((s, i) => (
              <li key={s} className="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  className={`flex items-center gap-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
                    i === step
                      ? 'text-bone'
                      : i < step
                        ? 'cursor-pointer text-accent hover:text-bone'
                        : 'cursor-default text-neutral-700'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center border text-[10px] transition-all duration-400 ${
                      i === step
                        ? 'border-bone bg-bone text-ink'
                        : i < step
                          ? 'border-accent text-accent'
                          : 'border-ink-line'
                    }`}
                  >
                    {i < step ? '✓' : i + 1}
                  </span>
                  {s}
                </button>
                {i < STEPS.length - 1 && (
                  <span className="h-px flex-1 bg-ink-line">
                    <motion.span
                      className="block h-full bg-accent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: i < step ? 1 : 0 }}
                      style={{ originX: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </span>
                )}
              </li>
            ))}
          </ol>

          <form onSubmit={submit} className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-7"
              >
                {step === 0 && (
                  <>
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={set}
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label="First name"
                        name="firstName"
                        value={form.firstName}
                        onChange={set}
                        autoComplete="given-name"
                      />
                      <Field
                        label="Last name"
                        name="lastName"
                        value={form.lastName}
                        onChange={set}
                        autoComplete="family-name"
                      />
                    </div>
                  </>
                )}

                {step === 1 && (
                  <>
                    <Field
                      label="Address"
                      name="address"
                      value={form.address}
                      onChange={set}
                      autoComplete="street-address"
                      placeholder="12 Nile View, Apt 4"
                    />
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={set}
                        autoComplete="address-level2"
                      />
                      <Field
                        label="Postcode"
                        name="postcode"
                        value={form.postcode}
                        onChange={set}
                        autoComplete="postal-code"
                      />
                    </div>
                    <Field
                      label="Country"
                      name="country"
                      value={form.country}
                      onChange={set}
                      autoComplete="country-name"
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <Field
                      label="Card number"
                      name="card"
                      value={form.card}
                      onChange={set}
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                    />
                    <div className="grid gap-7 sm:grid-cols-2">
                      <Field
                        label="Expiry"
                        name="expiry"
                        value={form.expiry}
                        onChange={set}
                        autoComplete="cc-exp"
                        placeholder="MM / YY"
                      />
                      <Field
                        label="CVC"
                        name="cvc"
                        value={form.cvc}
                        onChange={set}
                        autoComplete="cc-csc"
                        placeholder="123"
                      />
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-600">
                      This is a demo storefront — no payment is processed and no
                      card details are sent anywhere.
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              {step > 0 && (
                <MagneticButton
                  onClick={() => setStep((s) => s - 1)}
                  variant="outline"
                >
                  Back
                </MagneticButton>
              )}
              <MagneticButton
                type="submit"
                variant={step === STEPS.length - 1 ? 'accent' : 'solid'}
                size="lg"
                className="flex-1"
              >
                {step === STEPS.length - 1
                  ? `Pay ${formatPrice(total)}`
                  : 'Continue'}
              </MagneticButton>
            </div>
          </form>
        </section>

        {/* Order summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="border border-ink-line bg-ink-soft/60 p-7 backdrop-blur-sm">
            <h2 className="wordmark text-2xl">Your order</h2>

            <ul className="mt-7 space-y-5">
              {lines.map((line) => (
                <li
                  key={`${line.id}-${line.color}`}
                  className="group flex gap-4"
                >
                  <Link
                    to={`/product/${line.id}`}
                    className="relative h-20 w-16 shrink-0 overflow-hidden border border-ink-line"
                  >
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-bone text-[10px] font-bold text-ink">
                      {line.qty}
                    </span>
                  </Link>
                  <div className="flex flex-1 justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{line.product.name}</p>
                      <p className="mt-0.5 text-xs text-neutral-600">
                        {line.color}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums">
                      {formatPrice(line.lineTotal)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rule my-6" />

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-neutral-400">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Shipping</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-accent">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-neutral-400">Tax</dt>
                <dd className="tabular-nums">{formatPrice(tax)}</dd>
              </div>
              <div className="rule my-4" />
              <div className="flex items-baseline justify-between">
                <dt className="text-base font-medium">Total</dt>
                <dd className="text-2xl font-medium tabular-nums">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  )
}
