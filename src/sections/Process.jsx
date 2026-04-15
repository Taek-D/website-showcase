import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fadeUp, staggerContainer, viewportTall, viewportSection, smoothEase } from '../lib/motion'

const manifesto = [
  {
    k: 'Weight',
    body:
      '디자인은 무게를 가져야 합니다. 픽셀의 중력, 여백의 관성, 타이포그래피의 밀도 — 측정할 수 없지만 반드시 느껴지는 것.',
  },
  {
    k: 'Tempo',
    body:
      '빠른 릴리즈보다 오래 남을 구성을 택합니다. 움직임은 장식이 아니라, 이 화면이 어떤 속도로 읽혀야 하는가에 대한 답.',
  },
  {
    k: 'Monograph',
    body:
      '한 해에 네 편. 각 프로젝트는 한 권의 모노그래프처럼 다루어집니다. 출시는 끝이 아니라 아카이브에 들어가는 입장권입니다.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  // Decor moves slower than scroll (0.3x), heading moves slightly faster (1.25x)
  const orbY = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const orbYFar = useTransform(scrollYProgress, [0, 1], [40, -120])
  const headingY = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative z-10 py-24 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 bg-surface-container-low overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: orbY }}
        className="parallax-will-change absolute -top-32 -left-32 w-[60vw] h-[60vw] bg-primary/5 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        aria-hidden="true"
        style={{ y: orbYFar }}
        className="parallax-will-change absolute bottom-0 right-[-20%] w-[40vw] h-[40vw] bg-secondary/[0.04] blur-[120px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
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
            ■ Chapter 03 — Approach
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant"
          >
            Essay / Untitled
          </motion.span>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: smoothEase }}
          viewport={viewportTall}
          className="max-w-6xl"
        >
          <p className="font-display italic text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.03em] text-white/95">
            “우리는 속도를 경쟁하지&nbsp;않습니다.{' '}
            <span className="text-primary-fixed">남는 것</span>을 만들 뿐입니다.”
          </p>

          <footer className="mt-10 flex items-center gap-6">
            <span
              aria-hidden="true"
              className="h-px w-16 bg-white/30"
            />
            <cite className="not-italic font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
              Studio note · spring 2026
            </cite>
          </footer>
        </motion.blockquote>

        <motion.ol
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 mt-28 md:mt-36 border border-white/10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          variants={staggerContainer(0.12)}
        >
          {manifesto.map((m, i) => (
            <motion.li
              key={m.k}
              variants={fadeUp}
              className="bg-background p-10 md:p-12 flex flex-col gap-6 min-h-[320px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
                  Note {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined text-base text-on-surface-variant"
                >
                  north_east
                </span>
              </div>
              <h3 className="font-display italic text-5xl md:text-6xl text-white leading-none">
                {m.k}
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-[0.95rem] mt-auto">
                {m.body}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
