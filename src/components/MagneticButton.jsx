import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Button that leans toward the cursor and fills with a wipe on hover.
 * Renders as <Link> when `to` is passed, <a> for `href`, otherwise <button>.
 *
 * variant: 'solid' (bone fill) | 'outline' | 'ghost' | 'accent'
 */
export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  size = 'md',
  disabled = false,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Pull toward cursor, capped at ~22% of the button's own size.
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.44 * rect.width
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.44 * rect.height
    setOffset({ x, y })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  const sizes = {
    sm: 'px-5 py-2.5 text-[11px]',
    md: 'px-8 py-4 text-xs',
    lg: 'px-10 py-5 text-sm',
  }

  const variants = {
    solid: 'bg-bone text-ink border-bone',
    outline: 'bg-transparent text-bone border-bone/35 hover:border-bone',
    ghost: 'bg-transparent text-bone border-transparent',
    accent: 'bg-brand text-white border-brand',
  }

  // The wipe layer that sweeps up on hover; colour inverts against the base.
  const wipes = {
    solid: 'bg-ink',
    outline: 'bg-bone',
    ghost: 'bg-bone',
    accent: 'bg-ink',
  }
  const hoverText = {
    solid: 'group-hover:text-bone',
    outline: 'group-hover:text-ink',
    ghost: 'group-hover:text-ink',
    accent: 'group-hover:text-accent',
  }

  const Comp = to ? Link : href ? 'a' : 'button'
  const linkProps = to ? { to } : href ? { href } : { type, disabled }

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
      onClick={onClick}
      {...linkProps}
      {...rest}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden border font-medium uppercase tracking-[0.2em] transition-[transform,border-color,opacity] duration-300 ease-out will-change-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        sizes[size]
      } ${variants[variant]} ${
        disabled ? 'pointer-events-none opacity-40' : ''
      } ${className}`}
      style={{
        transform: `translate3d(${offset.x * 0.32}px, ${offset.y * 0.32}px, 0)`,
      }}
    >
      {/* Wipe fill */}
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${wipes[variant]}`}
      />
      {/* Shine sweep */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${hoverText[variant]}`}
        style={{
          transform: `translate3d(${offset.x * 0.12}px, ${offset.y * 0.12}px, 0)`,
        }}
      >
        {children}
      </span>
    </Comp>
  )
}
