import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'
import { FaCode, FaUsers, FaUserAlt } from 'react-icons/fa'
import '../styles/Projects.css'

const projects = [
  {
    title: 'Massage Web',
    description: 'Website layanan massage modern dengan desain clean dan responsive.',
    icon: <FaCode />,
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    github: 'https://github.com/emu200828-source/massage-web',
    live: 'https://emu200828-source.github.io/massage-web/',
  },
  {
    title: 'Web Tim Qurban',
    description: 'Website modern untuk tim qurban dengan tampilan profesional dan informatif.',
    icon: <FaUsers />,
    tags: ['React', 'Tailwind', 'Lovable', 'Modern'],
    github: 'https://github.com/emu200828-source',
    live: 'https://miymosya-qurban.lovable.app',
  },
  {
    title: 'Web Bio',
    description: 'Website bio personal minimalis dan modern.',
    icon: <FaUserAlt />,
    tags: ['HTML', 'CSS', 'JavaScript', 'Minimalis'],
    github: 'https://github.com/emu200828-source/web-bio',
    live: 'https://emu200828-source.github.io/web-bio/',
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Featured <span className="highlight">Projects</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A collection of projects I've built and contributed to
        </motion.p>

        <motion.div
          className="projects-grid"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div key={project.title} className="project-card" variants={item}>
              <div className="project-image">
                <div className="project-image-icon">{project.icon}</div>
                <div className="project-image-overlay">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FiGithub />
                  </a>
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
