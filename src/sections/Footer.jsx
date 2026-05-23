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
        <div className="footer-logo">Portfolio.</div>
        <p className="footer-text">
          &copy; {year} All rights reserved. Built with React + Vite.
        </p>
        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="footer-top" onClick={scrollToTop} aria-label="Scroll to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}
