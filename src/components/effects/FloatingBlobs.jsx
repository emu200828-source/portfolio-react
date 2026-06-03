import { useEffect, useRef } from 'react'

export default function FloatingBlobs() {
  const ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 20 - 10
      const y = (clientY / window.innerHeight) * 20 - 10
      ref.current.style.setProperty('--blob-x', `${x}px`)
      ref.current.style.setProperty('--blob-y', `${y}px`)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="floating-blobs" ref={ref}>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="glowing-orb" />
    </div>
  )
}
