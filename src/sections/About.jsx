import { motion } from 'framer-motion'
import { FiUser, FiMail, FiMapPin, FiCalendar, FiHome } from 'react-icons/fi'
import { FaCode } from 'react-icons/fa'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import '../styles/About.css'

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about section" ref={ref}>
      <div className="container">
        <motion.div
          className="about-image-wrapper"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeIn}
          custom={0}
        >
          <div className="about-image-card" style={{ position: 'relative' }}>
            <FaCode className="about-avatar-icon" />
            <div className="about-experience-badge">
              <span className="number">2+</span>
              <span className="label">Years of Experience</span>
            </div>
          </div>
        </motion.div>

        <div className="about-content">
          <motion.h2
            className="section-title"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            custom={1}
          >
            About <span className="highlight">Me</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            custom={2}
          >
            Get to know me a little better
          </motion.p>
          <motion.p
            className="about-text"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            custom={3}
          >
            Saya adalah pelajar yang tertarik pada web development, desain modern, dan pembelajaran bahasa Arab.
          </motion.p>
          <motion.p
            className="about-text"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            custom={4}
          >
            Saya percaya bahwa teknologi dan bahasa adalah jembatan untuk masa depan. Saya terus belajar dan berkembang baik dalam dunia coding maupun bahasa Arab.
          </motion.p>

          <motion.div
            className="about-details"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            custom={5}
          >
            <div className="about-detail-item">
              <FiUser />
              <span>Imu Abdurroofi</span>
            </div>
            <div className="about-detail-item">
              <FiMail />
              <span>emu200828@gmail.com</span>
            </div>
            <div className="about-detail-item">
              <FiMapPin />
              <span>Tangerang Selatan, Indonesia</span>
            </div>
            <div className="about-detail-item">
              <FiCalendar />
              <span>28 Juli 2008</span>
            </div>
            <div className="about-detail-item">
              <FiHome />
              <span>Tangerang Selatan</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
