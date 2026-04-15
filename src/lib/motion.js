export const smoothEase = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
}

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
}

export const staggerContainer = (children = 0.15, delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: children, delayChildren: delay } },
})

// Tall sections: 0.7 may never trigger on small screens. 0.3 is safer.
export const viewportTall = { once: true, amount: 0.3 }
export const viewportShort = { once: true, amount: 0.5 }
// Section-scale reveal (headings, cards that fit on screen). 70% in view.
export const viewportSection = { once: true, amount: 0.7 }
