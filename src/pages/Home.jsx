import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import FloatingBlobs from '../components/effects/FloatingBlobs'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'

const sections = [
  { id: 0, Component: Hero },
  { id: 1, Component: About },
  { id: 2, Component: Skills },
]

const variants = {
  enterFromRight: { x: "110%", rotate: 45, opacity: 0 },
  enterFromLeft: { x: "-110%", rotate: -45, opacity: 0 },
  center: { x: 0, rotate: 0, opacity: 1 },
  exitToLeft: { x: "-110%", rotate: -45, opacity: 0 },
  exitToRight: { x: "110%", rotate: 45, opacity: 0 },
}

const transition = { duration: 0.85, ease: [0.76, 0, 0.24, 1] }

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [direction, setDirection] = useState(0) // 1 = down/next, -1 = up/prev
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)

  const handleScroll = (delta) => {
    if (isAnimating.current) return

    if (delta > 0 && activeSection < sections.length - 1) {
      // Scroll down
      isAnimating.current = true
      setDirection(1)
      setActiveSection((prev) => prev + 1)
      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    } else if (delta < 0 && activeSection > 0) {
      // Scroll up
      isAnimating.current = true
      setDirection(-1)
      setActiveSection((prev) => prev - 1)
      setTimeout(() => {
        isAnimating.current = false
      }, 850)
    }
  }

  const onWheel = (e) => {
    e.preventDefault()
    handleScroll(e.deltaY)
  }

  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY
    const delta = touchStartY.current - touchEndY
    if (Math.abs(delta) > 50) {
      handleScroll(delta)
    }
  }

  const ActiveComponent = sections[activeSection].Component

  return (
    <PageTransition>
      <FloatingBlobs />
      <div
        onWheel={onWheel}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSection}
            initial={direction === 1 ? "enterFromRight" : "enterFromLeft"}
            animate="center"
            exit={direction === 1 ? "exitToLeft" : "exitToRight"}
            variants={variants}
            transition={transition}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>

        {/* Section Indicators */}
        <div
          className="section-indicators"
          style={{
            position: 'fixed',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                if (!isAnimating.current && section.id !== activeSection) {
                  isAnimating.current = true
                  setDirection(section.id > activeSection ? 1 : -1)
                  setActiveSection(section.id)
                  setTimeout(() => {
                    isAnimating.current = false
                  }, 850)
                }
              }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                border: '2px solid #3B82F6',
                background: section.id === activeSection ? '#3B82F6' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
                flexShrink: 0,
              }}
              aria-label={`Go to section ${section.id + 1}`}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
