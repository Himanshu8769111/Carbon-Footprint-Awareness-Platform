import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-icon">
            <AlertCircle size={80} />
          </div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you're looking for doesn't exist or has been moved.</p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-large">
              Go to Home
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-large">
              Go to Dashboard
            </Link>
          </div>

          <div className="suggestions">
            <h3>What you might want to do:</h3>
            <ul>
              <li><Link to="/calculator">Calculate your carbon footprint</Link></li>
              <li><Link to="/actions">Explore eco-friendly actions</Link></li>
              <li><Link to="/leaderboard">Check the leaderboard</Link></li>
              <li><Link to="/profile">View your profile</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
