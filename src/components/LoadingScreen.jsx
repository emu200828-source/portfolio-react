import { useState, useEffect } from 'react'
import '../styles/LoadingScreen.css'

export default function LoadingScreen({ onFinish }) {
  const [exit, setExit] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true)
      setTimeout(onFinish, 600)
    }, 2500)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className={`loading-screen ${exit ? 'exit' : ''}`}>
      <div className="loading-logo">Portfolio.</div>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  )
}
