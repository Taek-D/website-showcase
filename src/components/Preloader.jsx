import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DURATION_MS = 1600

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Respect reduced-motion: skip straight to done
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setCount(100)
      setDone(true)
      return
    }

    const start = performance.now()
    let raf = 0
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION_MS)
      // ease-out-expo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setCount(Math.round(eased * 100))
      if (p < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 220)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-101%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-surface-container-lowest flex flex-col justify-between p-6 md:p-10 pointer-events-none"
          aria-hidden="true"
        >
          <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-white/75">
            <span>AETHERIC — /boot</span>
            <span>archive · 2020 — 2026</span>
          </div>

          <div className="flex items-baseline gap-6 md:gap-10 flex-wrap">
            <span className="font-headline text-[clamp(5rem,18vw,14rem)] font-black leading-none tracking-[-0.05em] text-white tabular-nums">
              {String(count).padStart(3, '0')}
            </span>
            <span className="font-display italic text-2xl md:text-4xl text-white/70">
              %&nbsp;loaded
            </span>
          </div>

          <div className="relative">
            <div className="h-px w-full bg-white/10" />
            <motion.div
              className="absolute top-0 left-0 h-px bg-primary-fixed"
              style={{ width: `${count}%` }}
            />
            <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">
              <span>Compiling plates…</span>
              <span>{count === 100 ? 'Ready.' : 'stand by'}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
