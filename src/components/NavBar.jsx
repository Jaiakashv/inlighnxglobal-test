import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'
import logo from '../assets/logo.png'

function NavBar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  const isActive = (path) => {
    return location.pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLinkClick = () => {
    closeMenu()
    // Scroll to top immediately when link is clicked
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav className="navbar">
      <div className="navbar-top-line"></div>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo-section" onClick={handleLinkClick}>
          <div className="logo-circle">
           <img src={logo} alt="InLighn Tech" className="logo-image" />
          </div>
        </Link>
        
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={handleLinkClick}>Home</Link>
          <Link to="/about-us" className={`nav-link ${isActive('/about-us') ? 'active' : ''}`} onClick={handleLinkClick}>About Us</Link>
          <Link to="/programs" className={`nav-link ${isActive('/programs') ? 'active' : ''}`} onClick={handleLinkClick}>Programs</Link>
          <Link to="/verify-certificate" className={`nav-link ${isActive('/verify-certificate') ? 'active' : ''}`} onClick={handleLinkClick}>Verify Certificate</Link>
          <Link to="/whats-special" className={`nav-link ${isActive('/whats-special') ? 'active' : ''}`} onClick={handleLinkClick}>What's Special</Link>
          <Link to="/contact-us" className={`nav-link ${isActive('/contact-us') ? 'active' : ''}`} onClick={handleLinkClick}>Contact Us</Link>
          <button className="login-button login-button-mobile" onClick={closeMenu}>Login to Portal</button>
        </div>
        
        <button className="login-button login-button-desktop" onClick={closeMenu}>Login to Portal</button>
      </div>
    </nav>
  )
}

export default NavBar

