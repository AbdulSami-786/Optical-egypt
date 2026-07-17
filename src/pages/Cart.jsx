import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import Reveal, { RevealText } from '../components/Reveal'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      {/* Float lives on the wrapper so it composes with the entrance transform
          rather than overriding it. */}
      <div className="animate-float">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="wordmark text-7xl text-ink-line md:text-9xl"
        >
          ( )
        </motion.div>
      </div>
      <h2 className="wordmark mt-8 text-3xl md:text-4xl">Your cart is empty</h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
        Nothing here yet. Go find a frame that changes how you see things.
      </p>
      <div className="mt-9">
        <MagneticButton to="/shop" size="lg">
          Browse Frames
        </MagneticButton>
      </div>
    </div>
  )
}

function QtyStepper({ line }) {
  const { setQty } = useCart()
  return (
    <div className="flex items-center border border-ink-line">
      <button
        type="button"
        onClick={() => setQty(line.id, line.color, line.qty - 1)}
        aria-label={`Decrease ${line.product.name} quantity`}
        className="px-3 py-2 text-neutral-400 transition-colors duration-300 hover:bg-bone hover:text-ink"
      >
        −
      </button>
      <span className="w-9 text-center text-sm tabular-nums">{line.qty}</span>
      <button
        type="button"
        onClick={() => setQty(line.id, line.color, line.qty + 1)}
        aria-label={`Increase ${line.product.name} quantity`}
        className="px-3 py-2 text-neutral-400 transition-colors duration-300 hover:bg-bone hover:text-ink"
      >
        +
      </button>
    </div>
  )
}

export default function Cart() {
  const {
    lines,
    count,
    subtotal,
    shipping,
    tax,
    total,
    remove,
    clear,
    freeShippingThreshold,
  } = useCart()

  const remaining = Math.max(0, freeShippingThreshold - subtotal)
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-16 md:px-10 md:pt-24">
      <header>
        <Reveal>
          <span className="eyebrow">
            {count} item{count === 1 ? '' : 's'}
          </span>
        </Reveal>
        <h1 className="wordmark mt-4 text-6xl leading-none md:text-8xl">
          <RevealText text="Cart" />
        </h1>
      </header>

      {lines.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          {/* Lines */}
          <section>
            {/* Free-shipping progress */}
            <div className="mb-10 border border-ink-line p-5">
              <p className="text-xs text-neutral-400">
                {remaining > 0 ? (
                  <>
                    Add{' '}
                    <span className="font-medium text-accent">
                      {formatPrice(remaining)}
                    </span>{' '}
                    more for free shipping
                  </>
                ) : (
                  <span className="font-medium text-accent">
                    ✓ You&apos;ve unlocked free worldwide shipping
                  </span>
                )}
              </p>
              <div className="mt-3 h-1 w-full overflow-hidden bg-ink-line">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            <ul className="divide-y divide-ink-line border-y border-ink-line">
              <AnimatePresence initial={false}>
                {lines.map((line) => (
                  <motion.li
                    key={`${line.id}-${line.color}`}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, x: -30 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group overflow-hidden"
                  >
                    <div className="flex gap-5 py-6">
                      <Link
                        to={`/product/${line.id}`}
                        className="relative h-28 w-24 shrink-0 overflow-hidden border border-ink-line bg-ink-soft"
                      >
                        <img
                          src={line.product.image}
                          alt={line.product.name}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                          <Link
                            to={`/product/${line.id}`}
                            className="text-base font-medium tracking-tight transition-colors duration-300 hover:text-accent"
                          >
                            {line.product.name}
                          </Link>
                          <p className="mt-1 text-xs text-neutral-500">
                            {line.product.tagline}
                          </p>
                          <p className="mt-2 text-xs text-neutral-600">
                            Colour: {line.color}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(line.id, line.color)}
                            className="link-wipe mt-3 text-[11px] uppercase tracking-[0.16em] text-neutral-600 transition-colors duration-300 hover:text-red-400"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="flex items-center gap-6">
                          <QtyStepper line={line} />
                          <span className="w-20 text-right text-sm font-medium tabular-nums">
                            {formatPrice(line.lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-bone"
              >
                <span className="transition-transform duration-400 group-hover:-translate-x-1">
                  ←
                </span>
                Continue shopping
              </Link>
              <button
                type="button"
                onClick={clear}
                className="link-wipe text-xs uppercase tracking-[0.16em] text-neutral-600 hover:text-red-400"
              >
                Clear cart
              </button>
            </div>
          </section>

          {/* Summary */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="border border-ink-line bg-ink-soft/60 p-7 backdrop-blur-sm">
              <h2 className="wordmark text-2xl">Summary</h2>
              <dl className="mt-7 space-y-3 text-sm">
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
                  <dt className="text-neutral-400">Estimated tax</dt>
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

              <div className="mt-8">
                <MagneticButton to="/checkout" size="lg" className="w-full">
                  Checkout
                </MagneticButton>
              </div>

              <ul className="mt-7 space-y-2 text-[11px] text-neutral-600">
                <li>✓ Free worldwide shipping over {formatPrice(freeShippingThreshold)}</li>
                <li>✓ 30-day returns, no questions</li>
                <li>✓ Lifetime hinge warranty</li>
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
