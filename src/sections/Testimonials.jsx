import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer, viewportTall, viewportSection } from '../lib/motion'

const awards = [
  {
    year: '2025',
    org: 'FWA',
    kind: 'OF THE DAY',
    project: 'Aura Identity',
    sector: 'Brand System',
  },
  {
    year: '2025',
    org: 'CSSDA',
    kind: 'SITE OF THE MONTH',
    project: 'Kinetic Spaces',
    sector: 'Interactive',
  },
  {
    year: '2024',
    org: 'Awwwards',
    kind: 'SITE OF THE DAY',
    project: 'Lumina Asset Protocol',
    sector: 'Fintech',
  },
  {
    year: '2024',
    org: 'FWA',
    kind: 'OF THE DAY',
    project: 'Lumina Asset Protocol',
    sector: 'Fintech',
  },
  {
    year: '2024',
    org: 'Awwwards',
    kind: 'HONORABLE MENTION',
    project: 'Helios Journal',
    sector: 'Editorial',
  },
  {
    year: '2023',
    org: 'CSSDA',
    kind: 'SITE OF THE DAY',
    project: 'Volta Residence',
    sector: 'Architecture',
  },
  {
    year: '2023',
    org: 'Type Directors Club',
    kind: 'CERTIFICATE OF TYPOGRAPHIC EXCELLENCE',
    project: 'Obsidian Type',
    sector: 'Typography',
  },
  {
    year: '2022',
    org: 'Awwwards',
    kind: 'DEVELOPER AWARD',
    project: 'Solstice Retail',
    sector: 'Commerce',
  },
  {
    year: '2022',
    org: 'Awwwards',
    kind: 'SITE OF THE DAY',
    project: 'Tide Broadcast',
    sector: 'Editorial',
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const decorYFar = useTransform(scrollYProgress, [0, 1], [80, -40])
  const headingY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={sectionRef}
      id="recognition"
      className="relative z-10 py-24 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: decorY }}
        className="parallax-will-change absolute top-0 right-[-15%] w-[45vw] h-[45vw] bg-tertiary/[0.04] blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: decorYFar }}
        className="parallax-will-change absolute bottom-[-10%] left-[-10%] w-[38vw] h-[38vw] bg-primary/[0.05] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          style={{ y: headingY }}
          className="parallax-will-change flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
          variants={staggerContainer(0.08)}
        >
          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant mb-6">
              ■ Chapter 04 — Recognition
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-black leading-[0.95] tracking-[-0.03em]">
              Registered on the{' '}
              <span className="font-display italic font-normal text-primary-fixed">
                record
              </span>
              .
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant md:text-right"
          >
            14 entries · 2022 — 2025
          </motion.p>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          variants={staggerContainer(0.05)}
          className="divide-y divide-white/10 border-y border-white/10"
        >
          {awards.map((a, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="group grid grid-cols-[4rem_minmax(0,1fr)] md:grid-cols-[5rem_8rem_minmax(0,1fr)_minmax(0,1fr)_8rem] gap-4 md:gap-8 items-baseline py-6 md:py-7 transition-colors hover:bg-white/[0.02]"
            >
              <span className="font-mono text-xs md:text-sm tracking-[0.15em] text-on-surface-variant">
                {a.year}
              </span>
              <span className="hidden md:block font-headline text-sm uppercase tracking-[0.2em] text-white/80">
                {a.org}
              </span>
              <span className="col-span-1 md:col-span-1 font-display italic text-2xl md:text-[2.1rem] leading-tight text-white">
                {a.project}
              </span>
              <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
                {a.kind}
              </span>
              <span className="hidden md:flex items-center justify-end gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-fixed/80">
                {a.sector}
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform duration-500"
                >
                  arrow_outward
                </span>
              </span>

              {/* Mobile compact meta */}
              <span className="md:hidden col-span-2 -mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">
                {a.org} · {a.kind} · {a.sector}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
