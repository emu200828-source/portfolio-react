import { useEffect, useRef, useCallback } from 'react'

export default function MouseParallax({ children, factor = 0.03, className = '' }) {
  const ref = useRef(null)
  const raf = useRef(null)

  const handleMouse = useCallback((e) => {
    if (raf.current) cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) * factor
      const y = (e.clientY - centerY) * factor
      ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`
    })
  }, [factor])

  const handleLeave = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener('mousemove', handleMouse)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouse)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [handleMouse, handleLeave])

  return (
    <div ref={ref} className={className} style={{ transition: 'transform 0.15s ease-out' }}>
      {children}
    </div>
  )
}
