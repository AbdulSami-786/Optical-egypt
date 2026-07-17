import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Brand lockup.
 *
 * `public/logo-mark.png` is derived from the supplied photo of the printed
 * logo: the paper is keyed out to transparency and the mark's black strokes are
 * remapped to bone, since black would disappear against the dark chrome. It is
 * therefore a DARK-BACKGROUND asset only — on a light surface the bone strokes
 * drop out and only the red survives. Replace it with real vector art when the
 * designer supplies it, and this constraint goes away.
 *
 * If the file is missing this falls back to a text wordmark rather than
 * rendering a broken image.
 */
const LOGO_SRC = '/logo-mark.png'

export default function Logo({
  className = 'h-9 md:h-11',
  fallbackClassName = 'text-xl md:text-2xl',
}) {
  const [failed, setFailed] = useState(false)

  return (
    <Link
      to="/"
      aria-label="Al-Alamia Optics — home"
      className="group inline-flex items-center"
    >
      {failed ? (
        <span
          className={`wordmark whitespace-nowrap leading-none ${fallbackClassName}`}
        >
          Al-Alamia Optics
        </span>
      ) : (
        <img
          src={LOGO_SRC}
          alt="Al-Alamia Optics"
          onError={() => setFailed(true)}
          className={`w-auto object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] ${className}`}
        />
      )}
    </Link>
  )
}
