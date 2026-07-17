/**
 * Fixed, page-wide animated backdrop: drifting colour blobs, a panning grid,
 * a slow scanline and film grain. Purely decorative — sits behind all content.
 */
export default function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Drifting light blobs, tinted to the logo's crimson */}
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] animate-gradient-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.20),transparent_62%)] blur-3xl" />
      <div
        className="absolute -right-52 top-1/4 h-[38rem] w-[38rem] animate-gradient-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(230,57,80,0.13),transparent_62%)] blur-3xl"
        style={{ animationDelay: '-6s', animationDuration: '24s' }}
      />
      <div
        className="absolute -bottom-20 left-1/3 h-[34rem] w-[34rem] animate-gradient-drift rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)] blur-3xl"
        style={{ animationDelay: '-12s', animationDuration: '30s' }}
      />

      {/* Panning technical grid */}
      <div
        className="absolute inset-0 animate-grid-pan opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)',
          animationDuration: '20s',
        }}
      />

      {/* Slow scanline sweep */}
      <div className="absolute inset-x-0 top-0 h-24 animate-scanline bg-gradient-to-b from-transparent via-white/[0.035] to-transparent" />

      {/* Static film grain */}
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.75))]" />
    </div>
  )
}
