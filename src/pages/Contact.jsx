import { useState } from 'react'
import { motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import Reveal, { RevealText } from '../components/Reveal'
import { lifestyle } from '../data/products'

const CHANNELS = [
  {
    label: 'General',
    value: 'hello@alalamia-optics.com',
    note: 'We reply within one business day.',
  },
  {
    label: 'Repairs & warranty',
    value: 'repairs@alalamia-optics.com',
    note: 'Include your order number and a photo.',
  },
  {
    label: 'Press & wholesale',
    value: 'press@alalamia-optics.com',
    note: 'Lookbook and line sheet on request.',
  },
]

const STUDIOS = [
  {
    city: 'Cairo',
    address: '14 Sherif St, Downtown\nCairo, Egypt',
    hours: 'Sun–Thu · 10:00–19:00',
  },
  {
    city: 'Milan',
    address: 'Via Tortona 31\n20144 Milano, Italy',
    hours: 'Mon–Fri · 09:00–18:00',
  },
]

const FAQS = [
  {
    q: 'Can I put my prescription in any frame?',
    a: 'Yes — every frame in the catalogue is prescription-ready, including the sun collection. Upload your script at checkout or email it to us afterwards.',
  },
  {
    q: 'What if the fit is wrong?',
    a: 'Send them back within 30 days for a full refund, or bring them to either studio and we will adjust them on the spot for free.',
  },
  {
    q: 'Is the hinge warranty really lifetime?',
    a: 'For as long as you own the frame. Post them to us and we will repair and return them at our cost. No receipt gymnastics.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Egypt: 1–3 days. Europe and the Gulf: 3–6 days. Everywhere else: 5–10 days. Free, tracked, on every order.',
  },
]

function Accordion({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal
      delay={index * 0.06}
      className="group border-b border-ink-line"
      as="div"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-base font-medium tracking-tight transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
          {item.q}
        </span>
        <span
          className={`shrink-0 text-xl text-neutral-500 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-neutral-400">
          {item.a}
        </p>
      </motion.div>
    </Reveal>
  )
}

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

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General',
    message: '',
  })
  const [sent, setSent] = useState(false)

  const set = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', subject: 'General', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-ink-line">
        <div className="absolute inset-0">
          <img
            src={lifestyle.contact}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        </div>
        <div className="relative mx-auto max-w-[1600px] px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-32">
          <Reveal>
            <span className="eyebrow">Talk to a human</span>
          </Reveal>
          <h1 className="wordmark mt-5 text-6xl leading-none md:text-8xl">
            <RevealText text="Contact" />
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-300">
              Questions about fit, prescriptions, repairs, or where a frame
              comes from — we answer all of it ourselves.
            </p>
          </Reveal>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          {/* Form */}
          <section>
            <h2 className="wordmark text-3xl md:text-4xl">Send a message</h2>
            <form onSubmit={submit} className="mt-10 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={set}
                  autoComplete="name"
                  placeholder="Your name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={set}
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>

              <label className="group relative block">
                <span className="eyebrow block pb-2">Subject</span>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={set}
                  className="w-full cursor-pointer border-b border-ink-line bg-transparent py-3 text-sm outline-none transition-colors duration-300 hover:border-neutral-600"
                >
                  {['General', 'Repairs & warranty', 'Press & wholesale', 'Order help'].map(
                    (s) => (
                      <option key={s} value={s} className="bg-ink">
                        {s}
                      </option>
                    ),
                  )}
                </select>
              </label>

              <label className="group relative block">
                <span className="eyebrow block pb-2">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={set}
                  required
                  rows={5}
                  placeholder="Tell us what you need."
                  className="w-full resize-none border-b border-ink-line bg-transparent py-3 text-sm outline-none transition-colors duration-300 placeholder:text-neutral-700 focus:border-transparent"
                />
                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
              </label>

              <div className="flex flex-wrap items-center gap-5">
                <MagneticButton
                  type="submit"
                  size="lg"
                  variant={sent ? 'accent' : 'solid'}
                >
                  {sent ? 'Message Sent ✓' : 'Send Message'}
                </MagneticButton>
                {sent && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-neutral-500"
                  >
                    Thanks — we&apos;ll be in touch within a day.
                  </motion.span>
                )}
              </div>
              <p className="text-[11px] text-neutral-700">
                Demo form — submissions aren&apos;t sent anywhere.
              </p>
            </form>
          </section>

          {/* Channels + studios */}
          <aside className="space-y-12">
            <div>
              <h2 className="wordmark text-3xl md:text-4xl">Direct</h2>
              <ul className="mt-8 divide-y divide-ink-line border-y border-ink-line">
                {CHANNELS.map((c) => (
                  <li key={c.label} className="group py-5">
                    <span className="eyebrow">{c.label}</span>
                    <a
                      href={`mailto:${c.value}`}
                      className="mt-2 block text-base font-medium tracking-tight transition-all duration-400 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      {c.value}
                    </a>
                    <p className="mt-1 text-xs text-neutral-600">{c.note}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="wordmark text-3xl md:text-4xl">Studios</h2>
              <div className="mt-8 grid gap-px bg-ink-line sm:grid-cols-2">
                {STUDIOS.map((s) => (
                  <div
                    key={s.city}
                    className="group relative overflow-hidden bg-ink p-6 transition-colors duration-500 hover:bg-ink-soft"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                    <h3 className="wordmark text-2xl transition-colors duration-500 group-hover:text-accent">
                      {s.city}
                    </h3>
                    <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-neutral-400">
                      {s.address}
                    </p>
                    <p className="mt-3 text-xs text-neutral-600">{s.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        <section className="mt-28">
          <Reveal>
            <span className="eyebrow">Answered already</span>
          </Reveal>
          <h2 className="wordmark mt-4 text-4xl leading-none md:text-6xl">
            <RevealText text="FAQ" />
          </h2>
          <div className="mt-12 border-t border-ink-line">
            {FAQS.map((item, i) => (
              <Accordion key={item.q} item={item} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
