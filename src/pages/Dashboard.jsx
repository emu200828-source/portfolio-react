import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiExternalLink, FiGithub, FiFolder, FiUser } from 'react-icons/fi'
import projects from '../data/projects'
import '../styles/Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const username = localStorage.getItem('username') || 'User'

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login')
    }
    setVisible(true)
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div className={`dashboard-page ${visible ? 'visible' : ''}`}>
      <div className="dashboard-bg"></div>
      <div className="dashboard-orb"></div>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-avatar">
            <FiUser />
          </div>
          <h1 className="dashboard-welcome">
            Welcome, <span className="dashboard-name">{username}</span>
          </h1>
          <p className="dashboard-desc">Portfolio Dashboard</p>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-card">
            <div className="dashboard-card-icon">
              <FiFolder />
            </div>
            <div className="dashboard-card-info">
              <span className="dashboard-card-value">{projects.length}</span>
              <span className="dashboard-card-label">Total Projects</span>
            </div>
          </div>

          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-card dashboard-card-link"
          >
            <div className="dashboard-card-icon">
              <FiGithub />
            </div>
            <div className="dashboard-card-info">
              <span className="dashboard-card-label">GitHub</span>
              <span className="dashboard-card-link-text">
                View Profile
                <FiExternalLink className="dashboard-ext-icon" />
              </span>
            </div>
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-card dashboard-card-link"
          >
            <div className="dashboard-card-icon">
              <FiExternalLink />
            </div>
            <div className="dashboard-card-info">
              <span className="dashboard-card-label">Portfolio</span>
              <span className="dashboard-card-link-text">
                Visit Now
                <FiExternalLink className="dashboard-ext-icon" />
              </span>
            </div>
          </a>
        </div>

        <button className="dashboard-logout" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  )
}
