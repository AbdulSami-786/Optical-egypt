/**
 * The brand name, in Arabic.
 *
 * <bdi> isolates the right-to-left run from the Latin text around it. Without
 * it the bidi algorithm reorders neighbouring punctuation — the period in
 * "…للنظارات. Handcrafted in Cairo" lands on the wrong side of the name.
 *
 * The two Latin faces carry no Arabic glyphs, hence font-arabic. Tracking is
 * reset because the chrome letter-spaces its wordmarks, and letter-spacing
 * prises apart the cursive joins that Arabic letterforms depend on.
 *
 * The size nudge is optical, not arbitrary: Arabic set at the same nominal size
 * as Latin reads noticeably smaller. It is in em so the name scales with
 * whatever it sits in, from the 11px ticker to the 13rem closing wordmark.
 */
export const BRAND_AR = 'العالمية للنظارات'

export default function BrandName({ className = '' }) {
  return (
    <bdi
      lang="ar"
      className={`font-arabic text-[1.15em] tracking-normal ${className}`}
    >
      {BRAND_AR}
    </bdi>
  )
}
