import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ThemeToggle from './components/ThemeToggle'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './sections/Footer'
import Home from './pages/Home'
import AboutPage from './pages/About'
import ProjectsPage from './pages/Projects'
import TugasSklPage from './pages/TugasSkl'
import ContactPage from './pages/Contact'
import SertifikatPage from './pages/Sertifikat'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function RequireAuth({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default function App() {
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem("loaded") === "true")
  const location = useLocation()

  const handleDone = () => {
    sessionStorage.setItem("loaded", "true")
    setLoaded(true)
  }

  useEffect(() => {
    document.body.style.overflow = !loaded ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [loaded])

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleDone} />}
      {loaded && (
        <>
          <Navbar />
          <ThemeToggle />
          <main>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                <Route path="/about" element={<RequireAuth><AboutPage /></RequireAuth>} />
                <Route path="/project" element={<RequireAuth><ProjectsPage /></RequireAuth>} />
                <Route path="/sertifikat" element={<RequireAuth><SertifikatPage /></RequireAuth>} />
                <Route path="/contact" element={<RequireAuth><ContactPage /></RequireAuth>} />
                <Route path="/tugas-skl" element={<RequireAuth><TugasSklPage /></RequireAuth>} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </>
      )}
    </>
  )
}
