import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'
import Reveal, { RevealText } from '../components/Reveal'
import { lifestyle } from '../data/products'

const TIMELINE = [
  {
    year: '2016',
    title: 'Two rooms, one saw',
    body: 'Founded above a print shop in Downtown Cairo with a second-hand acetate saw and a stubborn idea about fit.',
  },
  {
    year: '2018',
    title: 'The Milan bench',
    body: 'Partnered with a third-generation acetate house in Lombardy. Our material has come from the same family ever since.',
  },
  {
    year: '2021',
    title: 'The Sun Collection',
    body: 'Our first fully architectural range. Sold out in nine days and taught us how to scale without cutting corners.',
  },
  {
    year: '2024',
    title: 'Lifetime hinges',
    body: 'We re-engineered every hinge in the catalogue and made the repair free, forever. It cost us margin. It was worth it.',
  },
  {
    year: 'Today',
    title: '64,000 frames later',
    body: 'Still direct. Still hand-polished. Still nine hours a frame, because the ninth hour is the one you can see.',
  },
]

const PRINCIPLES = [
  {
    title: 'Fit before form',
    body: 'A beautiful frame that slides down your nose is a failed frame. We prototype on 40 head shapes before a design ships.',
  },
  {
    title: 'Material honesty',
    body: 'Solid acetate, steel cores, real optics. No plated finishes that flake, no injection moulding pretending to be handmade.',
  },
  {
    title: 'Repair, don’t replace',
    body: 'Hinges, screws and arms are all serviceable. Send it back and we will fix it rather than sell you a new one.',
  },
]

/** Full-bleed image that drifts as the page scrolls. */
function ParallaxBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1])

  return (
    <div
      ref={ref}
      className="relative h-[60svh] overflow-hidden border-y border-ink-line md:h-[75svh]"
    >
      <motion.img
        src={lifestyle.storyPortrait}
        alt="AL-ALAMIA OPTICS frames worn on the street"
        style={{ y, scale }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
      <div className="absolute inset-0 flex items-center justify-center px-5">
        <h2 className="wordmark max-w-4xl text-center text-3xl leading-tight text-balance md:text-6xl">
          <RevealText text="“The ninth hour of polishing is the one you can actually see.”" />
        </h2>
      </div>
    </div>
  )
}

export default function OurStory() {
  return (
    <>
      {/* Hero */}
      <header className="relative overflow-hidden px-5 pb-20 pt-20 md:px-10 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <span className="eyebrow">Est. 2016 — Cairo &amp; Milan</span>
          </Reveal>
          <h1 className="wordmark mt-5 max-w-5xl text-5xl leading-[0.95] text-balance md:text-8xl">
            <RevealText text="We make frames" />
            <br />
            <RevealText text="for the long run." delay={0.15} />
          </h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <Reveal delay={0.3}>
              <p className="text-lg leading-relaxed text-neutral-300">
                AL-ALAMIA OPTICS started with a complaint, not a business plan.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-[15px] leading-relaxed text-neutral-400">
                Our founder had spent a decade buying eyewear that either fell
                apart in a year or cost more than a month&apos;s rent — usually
                both. The industry had convinced everyone that a frame was a
                fashion cycle, disposable by design. We disagreed. So we found a
                saw, a block of Italian acetate, and started cutting. Nine years
                on, the thesis hasn&apos;t moved: build it properly once, sell it
                direct, and repair it for as long as you own it.
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <ParallaxBanner />

      {/* Timeline */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <span className="eyebrow">The long version</span>
        </Reveal>
        <h2 className="wordmark mt-4 text-4xl leading-none md:text-6xl">
          <RevealText text="How we got here" />
        </h2>

        <ol className="mt-16 border-t border-ink-line">
          {TIMELINE.map((item, i) => (
            <Reveal
              key={item.year}
              delay={i * 0.06}
              as="li"
              className="group relative grid grid-cols-1 gap-4 border-b border-ink-line py-10 transition-colors duration-500 hover:bg-ink-soft/50 md:grid-cols-[10rem_1fr_1.2fr] md:gap-10 md:px-4"
            >
              {/* Accent rail */}
              <span className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="wordmark text-3xl text-neutral-600 transition-colors duration-500 group-hover:text-accent md:text-4xl">
                {item.year}
              </span>
              <h3 className="text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-neutral-400">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Principles */}
      <section className="border-y border-ink-line bg-ink-soft/50 py-24 backdrop-blur-sm md:py-28">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10">
          <Reveal>
            <span className="eyebrow">What we won&apos;t compromise</span>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px bg-ink-line md:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.1}
                className="group relative overflow-hidden bg-ink p-9 transition-colors duration-500 hover:bg-ink-soft md:p-11"
              >
                <span className="absolute inset-x-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                <span className="wordmark text-5xl text-ink-line transition-colors duration-500 group-hover:text-accent/30">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-400">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop split */}
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-16">
        <Reveal className="group relative aspect-[4/5] overflow-hidden border border-ink-line">
          <img
            src={lifestyle.storyDetail}
            alt="Hand-finishing an acetate frame"
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        </Reveal>
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="eyebrow">The bench</span>
          </Reveal>
          <h2 className="wordmark mt-4 text-4xl leading-[1.05] md:text-6xl">
            <RevealText text="Six weeks of waiting." />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-7 text-[15px] leading-relaxed text-neutral-400">
              Acetate arrives as a sheet and has to rest. Six weeks in a drying
              room lets the plasticiser settle so the material won&apos;t warp
              once it&apos;s cut. Skip it and the frame twists on the customer&apos;s
              face six months later — which is exactly why most of the industry
              skips it and we don&apos;t.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
              After cutting, each frame goes into a tumbler with wood chips and
              polishing paste for three days, then to a bench where someone
              finishes it by hand. Nine hours, start to finish. It is a stupid
              way to run a factory and a very good way to make a frame.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton to="/shop">See the Frames</MagneticButton>
              <MagneticButton to="/contact" variant="outline">
                Visit the Workshop
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing marquee */}
      <div className="overflow-hidden border-y border-ink-line py-6">
        <Marquee
          text="HANDMADE IN CAIRO · FINISHED IN MILAN · WORN EVERYWHERE"
          repeat={6}
          className="wordmark text-2xl text-neutral-700 md:text-4xl"
        />
      </div>
    </>
  )
}
