import { motion } from 'framer-motion'

/**
 * Entrance animation for any block.
 *
 * `trigger="view"` (default) plays when the block scrolls into view.
 * `trigger="mount"` plays immediately — use it above the fold, where the
 * in-view margin can leave content near the bottom edge stuck at opacity 0.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  once = true,
  trigger = 'view',
  className = '',
  as = 'div',
}) {
  const MotionTag = motion[as] ?? motion.div
  const play =
    trigger === 'mount'
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once, margin: '-80px' },
        }

  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      {...play}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Splits a line of text and staggers each word upward into view.
 *
 * Each word starts translated fully below its `overflow-hidden` mask, so it is
 * clipped away entirely — meaning the word itself can never be observed as "in
 * view" and a per-word `whileInView` would deadlock. The viewport observer
 * therefore lives on the unclipped outer span, and words animate via variant
 * propagation from it.
 */
const wordVariants = {
  hidden: { y: '110%' },
  visible: { y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
}

export function RevealText({ text, className = '', delay = 0, trigger = 'view' }) {
  const words = text.split(' ')
  const play =
    trigger === 'mount'
      ? { animate: 'visible' }
      : { whileInView: 'visible', viewport: { once: true, margin: '-60px' } }

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      {...play}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          // Bottom padding keeps descenders from being shaved by the mask.
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
        >
          <motion.span variants={wordVariants} className="inline-block">
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
