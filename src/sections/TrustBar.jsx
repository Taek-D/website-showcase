import { motion } from 'framer-motion'
import { fadeUpSmall, staggerContainer, viewportShort } from '../lib/motion'

const marqueeTokens = [
  'Brand Systems',
  'Creative Development',
  'WebGL · GLSL',
  'Editorial',
  'Kinetic Narrative',
  'Generative Identity',
  'Interaction Design',
  'Type Specimen',
  'Motion · Sound',
  'Archive',
]

const studioIndex = [
  { k: 'Works', v: '047', foot: 'Selected · 2020 — 2026' },
  { k: 'Years', v: '06', foot: 'Operating in Seoul' },
  { k: 'Awards', v: '14', foot: 'Awwwards · FWA · CSSDA' },
  { k: 'Fields', v: '09', foot: 'Brand to kinetic' },
]

function Token({ label }) {
  return (
    <span className="flex items-center gap-6 px-8 shrink-0">
      <span className="font-display italic text-2xl md:text-3xl text-white/85">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="w-2 h-2 rounded-full bg-primary/70 shrink-0"
      />
    </span>
  )
}

export default function TrustBar() {
  // Duplicate the token list so the marquee can loop seamlessly (-50% shift).
  const track = [...marqueeTokens, ...marqueeTokens]

  return (
    <section
      aria-labelledby="archive-heading"
      className="relative z-10 border-y border-white/5 bg-surface-container-low/50 overflow-hidden"
    >
      <h2 id="archive-heading" className="sr-only">Studio archive index</h2>

      {/* Marquee */}
      <div className="relative py-8 md:py-10 border-b border-white/5" aria-hidden="true">
        <div className="marquee-track font-headline uppercase tracking-tight">
          {track.map((t, i) => (
            <Token key={i} label={t} />
          ))}
        </div>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Studio index counter */}
      <motion.div
        className="px-5 sm:px-8 md:px-12 py-14 sm:py-16 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={viewportShort}
        variants={staggerContainer(0.1)}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10 md:mb-14 gap-4 flex-wrap">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
              ■ Index — Ø1
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
              Vol. 04 / Archive
            </span>
          </div>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {studioIndex.map((s, i) => (
              <motion.li key={s.k} variants={fadeUpSmall} className="group">
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-[11px] text-on-surface-variant">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.04em] text-on-background leading-none">
                  {s.v}
                </div>
                <div className="mt-4 font-display italic text-xl md:text-2xl text-primary-fixed">
                  {s.k}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
                  {s.foot}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}
