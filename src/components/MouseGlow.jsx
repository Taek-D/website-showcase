import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function MouseGlow() {
  const mouseX = useMotionValue(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  )
  const mouseY = useMotionValue(
    typeof window !== 'undefined' ? window.innerHeight / 2 : 0
  )

  // ~0.1s lag using spring (lower stiffness → slower trailing)
  const lagConfig = { damping: 30, stiffness: 80, mass: 1 }
  const smoothX = useSpring(mouseX, lagConfig)
  const smoothY = useSpring(mouseY, lagConfig)

  // Offset to center the 900x900 blur on the cursor
  const translateX = useTransform(smoothX, (v) => v - 450)
  const translateY = useTransform(smoothY, (v) => v - 450)

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 w-[900px] h-[900px] rounded-full z-0 will-change-transform"
      style={{
        x: translateX,
        y: translateY,
        background:
          'radial-gradient(circle at center, rgba(223,142,255,0.22) 0%, rgba(0,238,252,0.12) 35%, rgba(14,14,14,0) 70%)',
        filter: 'blur(80px)',
      }}
    />
  )
}
