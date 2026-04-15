import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.cursorReady = 'true'
    return () => {
      delete document.documentElement.dataset.cursorReady
    }
  }, [])

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      const target = e.target
      const interactive =
        target instanceof Element &&
        target.closest('a, button, [role="button"], input, textarea, select, label')
      setHovering(!!interactive)
    }

    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    document.addEventListener('mouseenter', handleEnter)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.removeEventListener('mouseenter', handleEnter)
    }
  }, [mouseX, mouseY, visible])

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block rounded-full mix-blend-difference"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 72 : 36,
          height: hovering ? 72 : 36,
          backgroundColor: hovering ? '#ffffff' : 'rgba(255,255,255,0)',
          borderColor: hovering ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.9)',
          borderWidth: hovering ? 0 : 1.5,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      />
      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: hovering || !visible ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
