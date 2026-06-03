import { Link } from 'react-router-dom'
import { FiArrowUp } from 'react-icons/fi'
import '../styles/Footer.css'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <span className="navbar-logo-icon" style={{ fontSize: '1rem' }}>P</span>
          Portfolio.
        </div>
        <p className="footer-text">
          &copy; {year} All rights reserved. Built with React + Vite.
        </p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/project">Projects</Link>
          <Link to="/tugas-skl">Tugas SKL</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <button className="footer-top" onClick={scrollToTop} aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}
