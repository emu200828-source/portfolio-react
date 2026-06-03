import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiExternalLink, FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import PageTransition from '../components/PageTransition'
import tugasSkl from '../data/tugasSkl'
import '../styles/Projects.css'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function TugasSklPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      <section id="tugas-skl-page" className="section" ref={ref} style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Tugas <span className="highlight">SKL</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Kumpulan project tugas SKL
          </motion.p>

          <motion.div
            className="projects-grid"
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {tugasSkl.map((project) => (
              <Tilt key={project.title} tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable={false} scale={1.02} transitionSpeed={400}>
                <motion.div className="project-card" variants={item}>
                  <div className="project-image" style={{ background: project.gradient }}>
                    <span className="project-image-text">{project.image}</span>
                    <div className="project-image-overlay">
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                        <FiExternalLink />
                      </a>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-live-btn">
                      <FiExternalLink /> Lihat Project
                    </a>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </motion.div>

          <motion.div
            style={{ textAlign: 'center', marginTop: '48px' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/" className="btn-primary" style={{ display: 'inline-flex' }}>
              <FiArrowLeft /> Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
