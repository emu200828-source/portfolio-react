import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiFileText, FiX, FiDownload, FiAward } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import '../styles/Sertifikat.css'

const sertifikatList = [
  { id: 1, judul: "Piagam Penghargaan Juara 1 Nasional Bahasa Arab", penerbit: "JSIT INDONESIA, Islamic Youth Festival, BSI Bank Syariah Indonesia", tahun: "2025", file: "/sertifikat/jsit.pdf" },
  { id: 2, judul: "Sertifikat Olimpiade Bahasa Arab", penerbit: "Forum MGMP Bahasa Arab Se-Indonesia, Olimpiade Nasional Bahasa Arab", tahun: "2025", file: "/sertifikat/obak.pdf" },
  { id: 3, judul: "Sertifikat Coding", penerbit: "Eksplor Coding", tahun: "2025", file: "/sertifikat/eksplor-coding.pdf" },
  { id: 4, judul: "Sertifikat MHQ", penerbit: "IHBS (Ibnu Hajar Boarding School)", tahun: "2025", file: "/sertifikat/mhq.pdf" },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Sertifikat() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const closeModal = () => setSelected(null)

  return (
    <PageTransition>
      <section className="sertifikat-page section" ref={ref} style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 className="section-title">
              <FiAward style={{ display: 'inline', marginRight: '12px', verticalAlign: 'middle' }} />
              Sertifikat
            </h2>
            <p className="section-subtitle">
              Sertifikat dan penghargaan yang telah saya raih
            </p>
          </motion.div>

          <motion.div
            className="sertifikat-grid"
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {sertifikatList.map((sertifikat) => (
              <motion.div
                key={sertifikat.id}
                className="sertifikat-card"
                variants={item}
                onClick={() => setSelected(sertifikat)}
              >
                <div className="sertifikat-icon">
                  <FiFileText />
                </div>
                <div className="sertifikat-content">
                  <h3 className="sertifikat-judul">{sertifikat.judul}</h3>
                  <p className="sertifikat-penerbit">{sertifikat.penerbit}</p>
                  <span className="sertifikat-tahun">{sertifikat.tahun}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="sertifikat-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="sertifikat-modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="sertifikat-modal-close" onClick={closeModal} aria-label="Close">
                <FiX />
              </button>

              <div className="sertifikat-modal-content">
                <iframe
                  src={selected.file}
                  width="100%"
                  height="100%"
                  title={selected.judul}
                  style={{ border: 'none', borderRadius: '12px' }}
                />
              </div>

              <a
                href={selected.file}
                download
                className="sertifikat-modal-download"
                onClick={(e) => e.stopPropagation()}
              >
                <FiDownload /> Download PDF
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
