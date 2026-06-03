import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { FaCode, FaYoutube } from 'react-icons/fa'
import '../styles/Hero.css'

const words = ['Frontend Developer', 'Arabic Student', 'Web Enthusiast', 'Creative Thinker']

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const current = words[wordIndex]
    let timeout
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setWordIndex((w) => (w + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex])

  return (
    <section id="hero" className="hero">
      <div className="hero-gradient-bg" />
      <div className="hero-grid" />

      <div className="container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <span className="hero-badge-dot" />
            Available for work
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Hi, I'm <span>Imu Abdurroofi</span>
          </motion.h1>

          <motion.div
            className="hero-typing"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            {words[wordIndex].substring(0, charIndex)}
            <span className="typing-cursor" />
          </motion.div>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Saya adalah pelajar yang tertarik pada web development, desain modern, dan pembelajaran bahasa Arab.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button className="btn-primary" onClick={() => navigate('/project')}>
              View My Work <FiArrowRight />
            </button>
            <button className="btn-outline" onClick={() => navigate('/contact')}>
              Contact Me <FiArrowRight />
            </button>
          </motion.div>

          <motion.div
            className="hero-social"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
          >
            <a href="https://github.com/emu200828-source" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/imu-abdurroofi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin />
            </a>
            <a href="https://instagram.com/emushi.2808" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://www.youtube.com/@emu.shi2808" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero-image-container">
            <div className="hero-image-ring" />
            <div className="hero-image-ring-2" />
            <div className="hero-image-circle">
              <div className="hero-avatar-placeholder">
                <FaCode />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="hero-stat-item">
          <div className="hero-stat-number">2+</div>
          <div className="hero-stat-label">Years Experience</div>
        </div>
        <div className="hero-stat-item">
          <div className="hero-stat-number">7+</div>
          <div className="hero-stat-label">Projects Done</div>
        </div>
        <div className="hero-stat-item">
          <div className="hero-stat-number">2</div>
          <div className="hero-stat-label">Happy Client</div>
        </div>
      </motion.div>
    </section>
  )
}
