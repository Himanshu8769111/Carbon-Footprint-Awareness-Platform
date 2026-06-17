import { useEffect, useState } from 'react'
import { Edit, LogOut, Settings, Shield, Bell, Lock } from 'lucide-react'
import './Profile.css'

const GOOGLE_CLIENT_ID = '828319728333-n1oddhtjv8rqhlqqkov33o9tgbvv3ku7.apps.googleusercontent.com'

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

export default function Profile() {
  const [googleUser, setGoogleUser] = useState(() => {
    const saved = localStorage.getItem('googleUser')
    return saved ? JSON.parse(saved) : null
  })
  const [error, setError] = useState(null)
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : {
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: null,
      isLoggedIn: false
    }
  })

  useEffect(() => {
    const handleCredentialResponse = (response) => {
      if (!response?.credential) {
        console.warn('No credential received')
        return
      }
      setGoogleUser(response)
      localStorage.setItem('googleUser', JSON.stringify(response))
      setError(null)
      console.log('Google sign-in successful:', response)

      const payload = decodeJwt(response.credential)
      if (payload) {
        const newUser = {
          name: payload.name || 'Google User',
          email: payload.email || '',
          picture: payload.picture || null,
          isLoggedIn: true
        }
        setUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
      }
    }

    const handleError = (error) => {
      console.error('Google OAuth Error:', error)
      setError(`Google login error: ${error}`)
    }

    const initGoogle = () => {
      if (!window.google?.accounts?.id) {
        console.warn('Google Identity Services not loaded yet')
        return false
      }

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          error_callback: handleError,
          ux_mode: 'popup',
          auto_select: false,
        })

        const buttonElement = document.getElementById('google-signin-button')
        if (buttonElement && !googleUser) {
          window.google.accounts.id.renderButton(buttonElement, {
            theme: 'outline',
            size: 'large',
            width: '320',
          })
        }
        return true
      } catch (err) {
        console.error('Failed to initialize Google:', err)
        setError(`Initialization error: ${err.message}`)
        return false
      }
    }

    if (!googleUser) {
      if (!initGoogle()) {
        const interval = window.setInterval(() => {
          if (initGoogle()) {
            window.clearInterval(interval)
          }
        }, 500)

        return () => {
          if (interval) window.clearInterval(interval)
        }
      }
    }
  }, [googleUser])

  const handleLogout = () => {
    localStorage.removeItem('googleUser')
    localStorage.removeItem('user')
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      picture: null,
      isLoggedIn: false
    })
    setGoogleUser(null)
    setError(null)
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {user.isLoggedIn ? (
          <div className="google-auth-section success">
            <h2>✓ Account Connected</h2>
            <p>You are signed in with Google as <strong>{user.name}</strong>.</p>
            <button type="button" className="btn btn-secondary" onClick={handleLogout}>
              <LogOut size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Disconnect Account
            </button>
          </div>
        ) : (
          <div className="google-auth-section">
            <h2>Google Login / Sign Up</h2>
            <p>Use your Google account to sign in or create a profile.</p>
            
            {error && (
              <div className="google-error-message">
                <strong>⚠️ Error:</strong> {error}
                <br />
                <small>
                  Make sure your app domain is authorized in Google Cloud Console OAuth settings.
                  <br />
                  Authorized origins should include: {window.location.origin}
                </small>
              </div>
            )}

            <div id="google-signin-button"></div>
          </div>
        )}

        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="avatar-img" />
            ) : (
              '👤'
            )}
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p className="member-since">
              {user.isLoggedIn ? 'Connected via Google Auth' : 'Member since March 2024'}
            </p>
            <button type="button" className="btn btn-secondary">
              <Edit size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-grid">
          {/* Stats */}
          <div className="profile-section">
            <h3>Your Statistics</h3>
            <div className="stat-list">
              <div className="stat-item">
                <span>Annual Carbon Footprint</span>
                <strong>4.2 tons CO₂</strong>
              </div>
              <div className="stat-item">
                <span>Carbon Reduction</span>
                <strong>35%</strong>
              </div>
              <div className="stat-item">
                <span>Actions Completed</span>
                <strong>24</strong>
              </div>
              <div className="stat-item">
                <span>Current Streak</span>
                <strong>28 days</strong>
              </div>
              <div className="stat-item">
                <span>Badges Earned</span>
                <strong>12</strong>
              </div>
              <div className="stat-item">
                <span>Leaderboard Rank</span>
                <strong>#245 Global</strong>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="profile-section">
            <h3>🏆 Badges & Achievements</h3>
            <div className="badges-grid">
              <div className="badge">
                <span className="badge-icon">🌱</span>
                <p>Eco Starter</p>
              </div>
              <div className="badge">
                <span className="badge-icon">♻️</span>
                <p>Recycler</p>
              </div>
              <div className="badge">
                <span className="badge-icon">🚴</span>
                <p>Commuter</p>
              </div>
              <div className="badge">
                <span className="badge-icon">🥗</span>
                <p>Vegetarian</p>
              </div>
              <div className="badge">
                <span className="badge-icon">💡</span>
                <p>Energy Saver</p>
              </div>
              <div className="badge">
                <span className="badge-icon">🌟</span>
                <p>Week Warrior</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="profile-settings">
          <h3>⚙️ Settings & Preferences</h3>
          <div className="settings-grid">
            <div className="settings-card">
              <div className="settings-header">
                <Bell size={24} />
                <h4>Notifications</h4>
              </div>
              <p>Manage email and push notifications</p>
              <button type="button" className="btn btn-secondary">Manage</button>
            </div>

            <div className="settings-card">
              <div className="settings-header">
                <Shield size={24} />
                <h4>Privacy</h4>
              </div>
              <p>Control who can see your profile</p>
              <button type="button" className="btn btn-secondary">Manage</button>
            </div>

            <div className="settings-card">
              <div className="settings-header">
                <Lock size={24} />
                <h4>Security</h4>
              </div>
              <p>Change password and security settings</p>
              <button type="button" className="btn btn-secondary">Manage</button>
            </div>

            <div className="settings-card">
              <div className="settings-header">
                <Settings size={24} />
                <h4>Preferences</h4>
              </div>
              <p>Customize your experience</p>
              <button className="btn btn-secondary">Manage</button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="danger-zone">
          <h3>⚠️ Danger Zone</h3>
          <div className="danger-actions">
            <button 
              type="button"
              className="btn btn-outline" 
              onClick={handleLogout} 
              disabled={!user.isLoggedIn}
            >
              <LogOut size={18} />
              Logout
            </button>
            <button type="button" className="btn btn-danger">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
