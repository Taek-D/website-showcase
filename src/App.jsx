import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import MouseGlow from './components/MouseGlow'
import ScrollProgress from './components/ScrollProgress'
import Preloader from './components/Preloader'
import TrustBar from './sections/TrustBar'
import Process from './sections/Process'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import Contact from './sections/Contact'
import {
  fadeUp,
  staggerContainer,
  smoothEase,
  viewportTall,
  viewportSection,
} from './lib/motion'

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="%23131313"/><text x="50%" y="55%" font-family="serif" font-style="italic" font-size="0.8" fill="%23adaaaa" text-anchor="middle">Plate unavailable</text></svg>'

const handleImgError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG
}

// key → section id (mapped to digit 1-6)
const navLinks = [
  { label: 'Index', href: '#archive', id: 'archive', key: '1' },
  { label: 'Works', href: '#work', id: 'work', key: '2' },
  { label: 'Approach', href: '#approach', id: 'approach', key: '3' },
  { label: 'Recognition', href: '#recognition', id: 'recognition', key: '4' },
  { label: 'Colophon', href: '#colophon', id: 'colophon', key: '5' },
  { label: 'Contact', href: '#contact', id: 'contact', key: '6' },
]

const kineticWords = ['digital things', 'quiet interfaces', 'kinetic plates', 'editorial fictions', 'brand artifacts']

const featuredCase = {
  index: 'Plate 001',
  title: 'Lumina Asset Protocol',
  subtitle: 'Reserve-backed capital, rendered as liquid architecture.',
  client: 'Lumina Capital',
  sector: 'Fintech · On-chain Protocol',
  year: '2024',
  role: 'Design · Engineering · Motion',
  recognition: 'Awwwards SOTD · FWA of the Day',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDKHQz0kCLDbfw3eUne8qk4RAQ8tueLtiNIE1clneeyNxxb54Nj5H-CckuBW2Gixoxw_g05tUazMkYRk6Zt8IsdBhPI4OMTyti7c7g59-f32iz9KuOKEFCSyJ8DQq4FN0b9frU57KNgDXKaD4CE82JGUTorXtBIee5d401o-LUFm8VuE69_yvmm1ggStz00gyvBNZZLAEZh9QGSMJwoTo22mZr879FsfDikesQxyf_-Fg8sbxyZ-6yHr0uF2xUk-zaoc4ZPGMNH53RF',
  alt: '핀테크 프로토콜 인터페이스 — 추상 건축 모티프',
}

const indexWorks = [
  {
    n: '002',
    title: 'Aura Identity',
    sector: 'Brand System',
    year: '2025',
    prize: 'FWA OTD',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxqEkovVia4urG-w7vlxwJVwSU-esfaNejcZjgFcn32kUmYj2KlONXbnRyYzg1WRCyuVUJcQANKH2Wu6aVPoLZdgzT8F1itaY7MY_8earMLTUovV_h5MlLigP_UctcjheRExxXWp1PJZqP3B2gbd3jZONtsvTDceUHvwwyhiGqkJ0QavCwkBHY47_RLm7xegc2d68Xq3VTzMDlHBxOL3IVKyu3fQp-Mq4OR2Af4ss_g8QvHHtHiEArK2r0SEU6rqfpv76gv-Hs1R6M',
  },
  {
    n: '003',
    title: 'Kinetic Spaces',
    sector: 'Interactive',
    year: '2025',
    prize: 'CSSDA SOTM',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuJAzkn9NQY_KC1RS-odSMuJRGm99IM6SF1BBcfp0F_sgetqtDa3lWzg9wNSQ7piqgvkYaxmK9tE84XrU6VaNCW3J_LFWXeSD7DO91pFt-pc8tluD_U482YGpsmk9cJPKpn_2xlyi1_Rpp0c3UTtkSWKxZO3thW4tRUo0mhi6UBw7kxXjc6PE01C5VITcvD5HBy-YznGlvIUo4koCpkmHUi3pNe9UyjbDxyGm8j2jSATxI8fxBEkVNp6UaFojNZDOExaGPsOJMdU6w',
  },
  {
    n: '004',
    title: 'Helios Journal',
    sector: 'Editorial',
    year: '2024',
    prize: 'Awwwards Honorable',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxqEkovVia4urG-w7vlxwJVwSU-esfaNejcZjgFcn32kUmYj2KlONXbnRyYzg1WRCyuVUJcQANKH2Wu6aVPoLZdgzT8F1itaY7MY_8earMLTUovV_h5MlLigP_UctcjheRExxXWp1PJZqP3B2gbd3jZONtsvTDceUHvwwyhiGqkJ0QavCwkBHY47_RLm7xegc2d68Xq3VTzMDlHBxOL3IVKyu3fQp-Mq4OR2Af4ss_g8QvHHtHiEArK2r0SEU6rqfpv76gv-Hs1R6M',
  },
  {
    n: '005',
    title: 'Volta Residence',
    sector: 'Architecture',
    year: '2023',
    prize: 'CSSDA SOTD',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuJAzkn9NQY_KC1RS-odSMuJRGm99IM6SF1BBcfp0F_sgetqtDa3lWzg9wNSQ7piqgvkYaxmK9tE84XrU6VaNCW3J_LFWXeSD7DO91pFt-pc8tluD_U482YGpsmk9cJPKpn_2xlyi1_Rpp0c3UTtkSWKxZO3thW4tRUo0mhi6UBw7kxXjc6PE01C5VITcvD5HBy-YznGlvIUo4koCpkmHUi3pNe9UyjbDxyGm8j2jSATxI8fxBEkVNp6UaFojNZDOExaGPsOJMdU6w',
  },
  {
    n: '006',
    title: 'Obsidian Type',
    sector: 'Typography',
    year: '2023',
    prize: 'TDC Excellence',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKHQz0kCLDbfw3eUne8qk4RAQ8tueLtiNIE1clneeyNxxb54Nj5H-CckuBW2Gixoxw_g05tUazMkYRk6Zt8IsdBhPI4OMTyti7c7g59-f32iz9KuOKEFCSyJ8DQq4FN0b9frU57KNgDXKaD4CE82JGUTorXtBIee5d401o-LUFm8VuE69_yvmm1ggStz00gyvBNZZLAEZh9QGSMJwoTo22mZr879FsfDikesQxyf_-Fg8sbxyZ-6yHr0uF2xUk-zaoc4ZPGMNH53RF',
  },
  {
    n: '007',
    title: 'Solstice Retail',
    sector: 'Commerce',
    year: '2022',
    prize: 'Awwwards Developer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxqEkovVia4urG-w7vlxwJVwSU-esfaNejcZjgFcn32kUmYj2KlONXbnRyYzg1WRCyuVUJcQANKH2Wu6aVPoLZdgzT8F1itaY7MY_8earMLTUovV_h5MlLigP_UctcjheRExxXWp1PJZqP3B2gbd3jZONtsvTDceUHvwwyhiGqkJ0QavCwkBHY47_RLm7xegc2d68Xq3VTzMDlHBxOL3IVKyu3fQp-Mq4OR2Af4ss_g8QvHHtHiEArK2r0SEU6rqfpv76gv-Hs1R6M',
  },
  {
    n: '008',
    title: 'Tide Broadcast',
    sector: 'Editorial',
    year: '2022',
    prize: 'Awwwards SOTD',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBuJAzkn9NQY_KC1RS-odSMuJRGm99IM6SF1BBcfp0F_sgetqtDa3lWzg9wNSQ7piqgvkYaxmK9tE84XrU6VaNCW3J_LFWXeSD7DO91pFt-pc8tluD_U482YGpsmk9cJPKpn_2xlyi1_Rpp0c3UTtkSWKxZO3thW4tRUo0mhi6UBw7kxXjc6PE01C5VITcvD5HBy-YznGlvIUo4koCpkmHUi3pNe9UyjbDxyGm8j2jSATxI8fxBEkVNp6UaFojNZDOExaGPsOJMdU6w',
  },
]

// ——— Seoul live clock ———
function LiveClock() {
  const [now, setNow] = useState(() => formatSeoulTime())

  useEffect(() => {
    const id = setInterval(() => setNow(formatSeoulTime()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant tabular-nums">
      Seoul · {now} · GMT+9
    </span>
  )
}

function formatSeoulTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Seoul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    const d = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  }
}

// ——— Kinetic word swap ———
function KineticWord({ words, className }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2600)
    return () => clearInterval(id)
  }, [words.length])

  return (
    <span
      className={`relative inline-block align-baseline ${className ?? ''}`}
      aria-live="polite"
    >
      {/* Size holder — keeps layout stable while children swap */}
      <span className="invisible whitespace-nowrap">
        {words.reduce((a, b) => (a.length >= b.length ? a : b), '')}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[idx]}
          initial={{ y: '60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-60%', opacity: 0 }}
          transition={{ duration: 0.55, ease: smoothEase }}
          className="absolute inset-0 whitespace-nowrap"
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

// ——— Cursor-follow project preview ———
function ProjectIndex() {
  const [hovered, setHovered] = useState(null)
  const sectionRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 24, stiffness: 220, mass: 0.6 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const decorY = useTransform(scrollYProgress, [0, 1], [-70, 70])
  const headingY = useTransform(scrollYProgress, [0, 1], [55, -55])

  const onMove = (e) => {
    mouseX.set(e.clientX + 24)
    mouseY.set(e.clientY - 160)
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      onMouseMove={onMove}
      className="relative z-10 py-24 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: decorY }}
        className="parallax-will-change absolute top-[5%] right-[-15%] w-[42vw] h-[42vw] bg-secondary/[0.05] blur-[130px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          style={{ y: headingY }}
          className="parallax-will-change flex items-baseline justify-between mb-14 gap-4 flex-wrap"
          initial="hidden"
          whileInView="visible"
          viewport={viewportSection}
          variants={staggerContainer(0.08)}
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant"
          >
            ■ Chapter 02 — Index of Works
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant"
          >
            Entries 002 — 008 · selected
          </motion.span>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          variants={staggerContainer(0.06)}
        >
          {indexWorks.map((w) => (
            <motion.li
              key={w.n}
              variants={fadeUp}
              onMouseEnter={() => setHovered(w)}
              onMouseLeave={() => setHovered((h) => (h?.n === w.n ? null : h))}
            >
              <a
                href={`#work-${w.n}`}
                aria-label={`작업 ${w.n} — ${w.title}, ${w.sector}, ${w.year}, ${w.prize}`}
                className="index-row focus-visible:outline-none focus-visible:bg-white/[0.03]"
              >
                <span className="font-mono text-xs tracking-[0.15em] text-on-surface-variant">
                  {w.n} / —
                </span>
                <span className="index-title font-display italic text-[clamp(2rem,5.2vw,4.5rem)] leading-none text-white">
                  {w.title}
                </span>
                <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.25em] text-on-surface-variant">
                  {w.sector}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary-fixed/90">
                  {w.year} · {w.prize}
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-16 flex items-center justify-between gap-6 flex-wrap">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant">
            Full archive available on request.
          </span>
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 font-display italic text-3xl md:text-4xl text-white hover:text-primary-fixed transition-colors duration-500"
          >
            Request full index
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-2xl transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
            >
              north_east
            </span>
          </a>
        </div>
      </div>

      {/* Floating cursor preview */}
      <motion.div
        aria-hidden="true"
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-[80] hidden md:block"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.n}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="w-[360px] aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
            >
              <img
                src={hovered.image}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
                onError={handleImgError}
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90">
                  {hovered.n} / {hovered.title} — {hovered.year}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

// ——— Featured hero case study ———
function FeaturedCase({ refForScroll }) {
  const { scrollYProgress } = useScroll({
    target: refForScroll,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], [-60, 60])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.04, 1.08])

  return (
    <section
      ref={refForScroll}
      id="featured"
      className="relative z-10 py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 overflow-hidden"
    >
      <div className="max-w-[1480px] mx-auto">
        <div className="flex items-baseline justify-between mb-10 gap-4 flex-wrap">
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-on-surface-variant">
            ■ Feature — {featuredCase.index}
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-on-surface-variant">
            /now-showing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_1.7fr] gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportTall}
            transition={{ duration: 1, ease: smoothEase }}
            className="lg:sticky lg:top-32 self-start"
          >
            <h2 className="font-display italic text-[clamp(3rem,6vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-white mb-8">
              {featuredCase.title}
            </h2>
            <p className="font-headline text-lg md:text-xl text-on-surface-variant leading-snug mb-10 max-w-md">
              {featuredCase.subtitle}
            </p>

            <dl className="mb-12">
              <div className="meta-row">
                <dt>Client</dt>
                <dd>{featuredCase.client}</dd>
              </div>
              <div className="meta-row">
                <dt>Sector</dt>
                <dd>{featuredCase.sector}</dd>
              </div>
              <div className="meta-row">
                <dt>Year</dt>
                <dd>{featuredCase.year}</dd>
              </div>
              <div className="meta-row">
                <dt>Role</dt>
                <dd>{featuredCase.role}</dd>
              </div>
              <div className="meta-row">
                <dt>Recognition</dt>
                <dd className="text-primary-fixed">
                  {featuredCase.recognition}
                </dd>
              </div>
            </dl>

            <a
              href="#"
              className="group inline-flex items-center gap-4 text-white font-headline text-base uppercase tracking-[0.25em] border-b border-white/30 pb-2 hover:border-primary-fixed hover:text-primary-fixed transition-colors duration-500"
            >
              View case study
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-lg transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2"
              >
                north_east
              </span>
            </a>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportTall}
            transition={{ duration: 1.2, ease: smoothEase }}
            className="relative overflow-hidden rounded-sm bg-surface-container-highest aspect-[4/5] lg:aspect-[5/6]"
          >
            <motion.img
              src={featuredCase.image}
              alt={featuredCase.alt}
              loading="lazy"
              decoding="async"
              onError={handleImgError}
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/60 backdrop-blur-[12px] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/90">
                Plate 001 / Lumina
              </span>
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-background/60 backdrop-blur-[12px] border border-white/10">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/90">
                001 / 047
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('archive')
  const navRef = useRef(null)
  const featuredRef = useRef(null)

  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e) => e.key === 'Escape' && setMobileOpen(false)
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMobileOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [mobileOpen])

  // Keyboard section jumps: 1-6 maps to navLinks. Skip when user is typing.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target
      if (t instanceof HTMLElement) {
        const tag = t.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || t.isContentEditable) return
      }
      const hit = navLinks.find((l) => l.key === e.key)
      if (!hit) return
      const el = document.getElementById(hit.id)
      if (el) {
        e.preventDefault()
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setActive(hit.id)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Active-section tracking via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.id)
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!nodes.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        // Prefer the entry closest to the top that's currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [])

  const { scrollY } = useScroll()
  const heroBlurLeftY = useTransform(scrollY, [0, 900], [0, 200])
  const heroBlurRightY = useTransform(scrollY, [0, 900], [0, 140])
  const heroTextY = useTransform(scrollY, [0, 600], [0, -120])

  return (
    <>
      <a href="#main" className="skip-link">본문으로 건너뛰기</a>

      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <MouseGlow />
      <div className="grain-overlay" aria-hidden="true" />

      {/* Editorial Nav */}
      <nav
        ref={navRef}
        aria-label="Primary"
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl flex justify-between items-center px-6 md:px-8 py-3 z-[100] rounded-full border border-white/10 bg-background/40 backdrop-blur-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] text-white"
      >
        <a
          href="#"
          className="flex items-baseline gap-2 font-headline tracking-tighter"
        >
          <span className="text-xl md:text-2xl font-black text-on-background">AETHERIC</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant hidden md:inline">
            /studio
          </span>
        </a>

        <ul className="hidden md:flex gap-0 items-center">
          {navLinks.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] inline-flex items-center min-h-[44px] px-3.5 py-2 rounded-full font-headline text-[13px] tracking-tight ${
                    isActive ? 'text-white' : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@aetheric.studio"
            aria-label="이메일 보내기 — hello@aetheric.studio"
            className="group hidden md:inline-flex items-center gap-2 border border-white/15 text-on-background px-5 py-2 rounded-full font-headline text-sm tracking-tight hover:bg-white/5 hover:border-primary-fixed/50 transition-colors duration-300"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-tertiary-dim animate-pulse group-hover:bg-primary-fixed transition-colors duration-300"
              aria-hidden="true"
            />
            Email
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[14px] -ml-0.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-[transform,opacity] duration-300"
            >
              arrow_outward
            </span>
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden inline-flex w-11 h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: smoothEase }}
              className="md:hidden absolute top-full left-0 right-0 mt-3 rounded-3xl border border-white/10 bg-background/80 backdrop-blur-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-4"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active === link.id ? 'page' : undefined}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-base transition-colors font-headline ${
                        active === link.id
                          ? 'text-white bg-white/5'
                          : 'text-on-surface hover:bg-white/5'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface-variant">
                        {link.key}
                      </span>
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <a
                    href="mailto:hello@aetheric.studio"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center border border-white/15 px-6 py-3 rounded-full font-headline transition-colors active:bg-white/5"
                  >
                    hello@aetheric.studio
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main" className="relative z-10 mx-auto max-w-[1920px]">
        {/* Hero — editorial statement */}
        <section className="relative min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-5 sm:px-8 md:px-12 overflow-hidden">
          <motion.div
            aria-hidden="true"
            style={{ y: heroBlurLeftY }}
            className="parallax-will-change absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
          />
          <motion.div
            aria-hidden="true"
            style={{ y: heroBlurRightY }}
            className="parallax-will-change absolute bottom-1/4 -right-1/4 w-[50vw] h-[50vw] bg-secondary/8 blur-[120px] rounded-full pointer-events-none"
          />

          {/* Top meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.6 }}
            className="relative z-10 flex items-start justify-between gap-6 flex-wrap"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant leading-relaxed max-w-[22ch]">
              Index № 004<br />
              <span className="text-white/80">Archive · 2020 — 2026</span>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant leading-relaxed text-right max-w-[22ch]">
              <span className="inline-flex items-center gap-2 text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-dim animate-pulse" />
                Accepting 2026 Q3
              </span>
              <br />
              <span className="text-white/80">4 projects · per annum</span>
            </div>
          </motion.div>

          {/* Center statement */}
          <motion.div
            className="relative z-10 parallax-will-change flex flex-col items-start text-left py-16"
            style={{ y: heroTextY }}
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.18, 2.75)}
          >
            <motion.h1
              variants={fadeUp}
              className="font-headline text-[clamp(2.5rem,9vw,9rem)] font-black leading-[0.9] tracking-[-0.045em] text-on-background max-w-[13ch]"
            >
              An archive of{' '}
              <KineticWord
                words={kineticWords}
                className="font-display italic font-normal text-white/85"
              />{' '}
              that{' '}
              <span className="font-display italic font-normal text-primary-fixed">
                refuse
              </span>{' '}
              to disappear.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-on-surface-variant text-[0.95rem] sm:text-base md:text-lg max-w-xl mt-8 sm:mt-10 leading-relaxed"
            >
              AETHERIC은 자리에 남는 디지털 작업을 만듭니다. 브랜드의 온도,
              제품의 무게, 움직임의 여운 — 가장 먼저 계산하는 것들입니다.
              한 해에 네 편, 한 편에 한 계절을 바칩니다.
            </motion.p>
          </motion.div>

          {/* Bottom meta bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 3.0, ease: smoothEase }}
            className="relative z-10 grid grid-cols-2 md:grid-cols-3 items-end gap-x-6 gap-y-4"
          >
            <div className="justify-self-start">
              <LiveClock />
            </div>
            <a
              href="#archive"
              className="group order-last md:order-none col-span-2 md:col-span-1 justify-self-start md:justify-self-center flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant hover:text-white transition-colors"
              aria-label="아카이브로 스크롤"
            >
              Scroll to archive
              <span
                aria-hidden="true"
                className="w-10 h-px bg-current group-hover:w-16 transition-[width] duration-500"
              />
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-base motion-safe:animate-bounce"
              >
                south
              </span>
            </a>
            <span className="justify-self-end font-mono text-[11px] uppercase tracking-[0.3em] text-on-surface-variant text-right">
              06 chapters ahead
            </span>
          </motion.div>
        </section>

        {/* Marquee + studio counter */}
        <div id="archive">
          <TrustBar />
        </div>

        {/* Featured case */}
        <FeaturedCase refForScroll={featuredRef} />

        {/* Index of works */}
        <ProjectIndex />

        {/* Approach / manifesto */}
        <Process />

        {/* Recognition */}
        <Testimonials />

        {/* Colophon */}
        <FAQ />

        {/* Contact */}
        <Contact />
      </main>

      {/* Editorial footer */}
      <footer className="relative z-10 w-full border-t border-white/10 px-5 sm:px-8 md:px-12 py-14 sm:py-16 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mb-14">
            <div className="max-w-lg">
              <div className="font-display italic text-5xl md:text-6xl text-white leading-[0.95] mb-4">
                AETHERIC
                <span className="text-primary-fixed">.</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                A studio monograph, edited in Seoul. Selected works only —
                the rest lives in private folders.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                  /navigate
                </div>
                <ul className="space-y-2">
                  {navLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group flex items-baseline justify-between gap-4 text-white transition-colors duration-500 hover:text-primary-fixed"
                      >
                        <span className="relative">
                          {l.label}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-fixed transition-[width] duration-500 group-hover:w-full"
                          />
                        </span>
                        <kbd className="font-mono text-[10px] uppercase tracking-[0.2em] px-1.5 py-0.5 border border-white/15 rounded text-on-surface-variant group-hover:border-primary-fixed/50 group-hover:text-primary-fixed transition-colors duration-500">
                          {l.key}
                        </kbd>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                  /elsewhere
                </div>
                <ul className="space-y-2">
                  {['Instagram', 'Behance', 'Are.na', 'Vimeo'].map((s) => (
                    <li key={s}>
                      <a
                        href="#"
                        aria-label={`AETHERIC ${s} 프로필 열기 (새 창)`}
                        className="group inline-flex items-center gap-2 text-on-background transition-colors duration-500 hover:text-primary-fixed"
                      >
                        <span className="relative">
                          {s}
                          <span
                            aria-hidden="true"
                            className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-fixed transition-[width] duration-500 group-hover:w-full"
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className="material-symbols-outlined text-sm -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-[transform,opacity] duration-500"
                        >
                          arrow_outward
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-3">
                  /correspond
                </div>
                <a
                  href="mailto:hello@aetheric.studio"
                  className="block font-display italic text-2xl text-white hover:text-primary-fixed transition-colors leading-tight"
                >
                  hello@aetheric.studio
                </a>
                <div className="mt-2 text-on-surface-variant">
                  Reply within one working day.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/10 font-mono text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
            <span>© 2020 — 2026 · AETHERIC</span>
            <span className="hidden md:inline-flex items-center gap-2">
              Press
              <kbd className="px-1.5 py-0.5 border border-white/15 rounded text-white">1</kbd>
              <span aria-hidden="true">–</span>
              <kbd className="px-1.5 py-0.5 border border-white/15 rounded text-white">6</kbd>
              to jump
            </span>
            <span>v2.6 · no cookies · no trackers</span>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
