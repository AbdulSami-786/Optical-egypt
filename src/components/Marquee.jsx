/**
 * Infinite ticker. The track holds two identical halves and slides exactly -50%,
 * so the loop is seamless. Pauses on hover.
 */
export default function Marquee({
  text = 'Free worldwide shipping on all orders',
  repeat = 8,
  speed = 'normal',
  className = '',
}) {
  const items = Array.from({ length: repeat })
  const anim = speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee'

  return (
    <div
      className={`group relative flex overflow-hidden whitespace-nowrap ${className}`}
    >
      {[0, 1].map((half) => (
        <div
          key={half}
          aria-hidden={half === 1}
          className={`flex shrink-0 items-center ${anim} group-hover:[animation-play-state:paused]`}
        >
          {items.map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-[11px] font-medium uppercase tracking-[0.18em]">
                {text}
              </span>
              <span className="text-[8px] opacity-60">✦</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
