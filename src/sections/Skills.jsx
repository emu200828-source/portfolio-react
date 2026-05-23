import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaComments, FaGlobe } from 'react-icons/fa'
import '../styles/Skills.css'

const skills = [
  { name: 'HTML', icon: <FaHtml5 />, level: 92 },
  { name: 'CSS', icon: <FaCss3Alt />, level: 85 },
  { name: 'JavaScript', icon: <FaJs />, level: 78 },
  { name: 'React', icon: <FaReact />, level: 75 },
  { name: 'Public Speaking', icon: <FaComments />, level: 88 },
  { name: 'Arabic', icon: <FaGlobe />, level: 70 },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Skills & <span className="highlight">Technologies</span>
        </motion.h2>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tools and technologies I work with regularly
        </motion.p>

        <motion.div
          className="skills-grid"
          variants={container}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skills.map((skill) => (
            <motion.div key={skill.name} className="skill-card" variants={item}>
              <div className="skill-icon">{skill.icon}</div>
              <span className="skill-name">{skill.name}</span>
              <div className="skill-level">
                <div
                  className="skill-level-bar"
                  style={{
                    width: isInView ? `${skill.level}%` : '0%',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
