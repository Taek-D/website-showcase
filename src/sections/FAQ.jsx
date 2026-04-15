import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer, viewportTall, viewportSection } from '../lib/motion'

const colophon = [
  { k: 'Typography', v: 'Manrope · Instrument Serif · JetBrains Mono' },
  { k: 'Engine', v: 'React 18 · Vite 6 · Tailwind 4' },
  { k: 'Motion', v: 'Framer Motion · cubic-bezier(0.22, 1, 0.36, 1)' },
  { k: 'Palette', v: 'OKLCH · film grain · mix-blend-difference' },
  { k: 'Hosted', v: 'Vercel · Global Edge · KR region' },
  { k: 'Performance', v: 'LCP 1.1s · CLS 0.01 · TBT 42ms' },
  { k: 'A11y', v: 'WCAG 2.2 AA · reduced-motion aware' },
  { k: 'Browsers', v: 'Chromium 121+ · Safari 17 · Firefox 122' },
]

const credits = [
  { k: 'Direction & Design', v: 'AETHERIC' },
  { k: 'Development', v: 'AETHERIC' },
  { k: 'Sound (Optional)', v: 'Silent by default' },
  { k: 'Photography', v: 'Synthetic · in-house renders' },
  { k: 'Last Edit', v: '2026 · Apr · Seoul' },
]

export default function FAQ() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [-50, 50])
  const headingY = useTransform(scrollYProgress, [0, 1], [45, -45])

  return (
    <section
      ref={sectionRef}
      id="colophon"
      className="relative z-10 py-24 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 bg-surface-container-low overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: decorY }}
        className="parallax-will-change absolute top-[10%] left-[-20%] w-[50vw] h-[50vw] bg-secondary/[0.03] blur-[140px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          style={{ y: headingY }}
          className="parallax-will-change flex items-baseline justify-between mb-20 gap-4 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
          variants={staggerContainer(0.08)}
        >
          <motion.div variants={fadeUp}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant mb-4">
              ■ Chapter 05 — Colophon
            </div>
            <h2 className="font-headline text-5xl md:text-7xl font-black leading-[0.95] tracking-[-0.03em]">
              How this{' '}
              <span className="font-display italic font-normal">page</span>{' '}
              was set.
            </h2>
          </motion.div>
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant"
          >
            v2.6 · 2026
          </motion.span>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10 md:gap-14 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          variants={staggerContainer(0.08)}
        >
          {/* Stack */}
          <motion.dl variants={fadeUp}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-fixed mb-4">
              /stack
            </div>
            {colophon.map((item) => (
              <div key={item.k} className="meta-row">
                <dt>{item.k}</dt>
                <dd className="font-headline text-[0.92rem] md:text-base">
                  {item.v}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Credits */}
          <motion.dl variants={fadeUp}>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-fixed mb-4">
              /credits
            </div>
            {credits.map((item) => (
              <div key={item.k} className="meta-row">
                <dt>{item.k}</dt>
                <dd className="font-display italic text-xl md:text-2xl leading-tight">
                  {item.v}
                </dd>
              </div>
            ))}
            <p className="mt-10 text-on-surface-variant leading-relaxed text-sm">
              이 페이지의 모든 구성은 스튜디오가 단독으로 설계·개발했습니다.
              코드베이스는 작고 소리 내지 않는 방식으로 유지되며, 방문자의
              맥락에 맞추어 조용히 물러나도록 조정되어 있습니다.
            </p>
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
