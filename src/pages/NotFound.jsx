import { motion } from 'framer-motion'

import MagneticButton from '../components/MagneticButton'
import Marquee from '../components/Marquee'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-7rem)] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center">
        <Marquee
          text="LOST · OUT OF FOCUS · 404"
          repeat={8}
          speed="fast"
          className="wordmark text-[6rem] text-ink-line/50 md:text-[12rem]"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="wordmark relative text-[7rem] leading-none md:text-[14rem]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mt-4 max-w-md text-[15px] leading-relaxed text-neutral-400"
      >
        This page is out of focus. It either moved, or it never existed — either
        way, the frames are this way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative mt-10 flex flex-wrap justify-center gap-3"
      >
        <MagneticButton to="/" size="lg">
          Back Home
        </MagneticButton>
        <MagneticButton to="/shop" size="lg" variant="outline">
          Shop Frames
        </MagneticButton>
      </motion.div>
    </section>
  )
}
