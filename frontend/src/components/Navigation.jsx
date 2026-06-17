import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Leaf, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './Navigation.css'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <Leaf size={32} />
          <span>Carbon Track</span>
        </Link>

        <button 
          type="button"
          className="menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul id="main-navigation" className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          <li><Link to="/calculator" onClick={() => setIsOpen(false)}>Calculator</Link></li>
          <li><Link to="/leaderboard" onClick={() => setIsOpen(false)}>Leaderboard</Link></li>
          
          {user ? (
            <>
              <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile ({user.firstName})</Link></li>
              <li><button onClick={handleLogout} className="nav-logout-btn"><LogOut size={18} /> Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
              <li><Link to="/signup" onClick={() => setIsOpen(false)} className="nav-signup-btn">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
