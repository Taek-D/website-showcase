import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer, viewportTall, viewportSection, smoothEase } from '../lib/motion'

const socials = [
  { label: 'Instagram', href: '#', handle: '@aetheric.studio' },
  { label: 'Behance', href: '#', handle: 'aetheric' },
  { label: 'Are.na', href: '#', handle: 'aetheric-archive' },
  { label: 'Vimeo', href: '#', handle: 'aetheric' },
].map((s) => ({ ...s, aria: `AETHERIC ${s.label} 프로필 (${s.handle})` }))

export default function Contact() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const haloY = useTransform(scrollYProgress, [0, 1], [-120, 60])
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative z-10 py-24 sm:py-32 md:py-48 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: haloY }}
        className="parallax-will-change absolute -top-48 left-1/2 -translate-x-1/2 w-[120vw] h-[600px] bg-primary/10 blur-[160px] rounded-full pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          style={{ y: headingY }}
          className="parallax-will-change flex items-baseline justify-between mb-16 gap-4 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
          variants={staggerContainer(0.08)}
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant"
          >
            ■ Chapter 06 — Correspondence
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-secondary"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-tertiary-dim align-middle mr-2 animate-pulse" />
            Open for 2026 Q3
          </motion.span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportTall}
          transition={{ duration: 1, ease: smoothEase }}
          className="font-headline text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] mb-10 sm:mb-12 max-w-[14ch]"
        >
          Let's make something that{' '}
          <span className="font-display italic font-normal text-primary-fixed">
            stays
          </span>
          .
        </motion.p>

        <motion.a
          href="mailto:hello@aetheric.studio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportTall}
          transition={{ duration: 1, ease: smoothEase, delay: 0.2 }}
          className="group inline-flex items-baseline gap-3 sm:gap-4 md:gap-6 font-display italic text-[clamp(2.2rem,8vw,6.5rem)] leading-none break-all text-on-background hover:text-primary-fixed transition-colors duration-500"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[0.55em] -translate-y-[0.1em] transition-transform duration-700 group-hover:rotate-45"
          >
            north_east
          </span>
          hello@aetheric.studio
        </motion.a>

        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          variants={staggerContainer(0.08)}
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3">
              /studio
            </div>
            <div className="text-white font-headline">AETHERIC</div>
            <div className="text-on-surface-variant text-sm mt-1">
              Seoul, Republic of Korea
            </div>
            <div className="text-on-surface-variant text-sm">
              37.5665° N / 126.9780° E
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3">
              /hours
            </div>
            <div className="text-white font-headline">Mon — Thu</div>
            <div className="text-on-surface-variant text-sm mt-1">
              10:00 — 19:00 GMT+9
            </div>
            <div className="text-on-surface-variant text-sm">
              Reply within one working day
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant mb-3">
              /elsewhere
            </div>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-6">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.aria}
                    className="group relative flex items-center justify-between border-b border-white/10 py-3 hover:border-primary-fixed/60 transition-colors duration-500"
                  >
                    <span className="font-headline text-white group-hover:text-primary-fixed transition-colors duration-500">
                      {s.label}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant group-hover:text-white transition-colors duration-500">
                      {s.handle}
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined text-base -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-[transform,opacity] duration-500"
                      >
                        arrow_outward
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
