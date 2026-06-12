import { Link } from 'react-router-dom'
import { TrendingDown, BarChart3, Users, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import './HomePage.css'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Track Your Carbon Footprint</h1>
            <p className="hero-subtitle">
              Understand your environmental impact and take simple actions to reduce it.
              Every step counts toward a sustainable future.
            </p>
            <div className="hero-buttons">
              <Link to="/calculator" className="btn btn-outline btn-large">
                Get Started Now
              </Link>
              <Link to="/dashboard" className="btn btn-outline btn-large">
                View Dashboard
              </Link>
            </div>
          </div>
          <div className="hero-image" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
            <div className="floating-card">
              <div className="carbon-score">
                <div className="score-number">4.2</div>
                <div className="score-label">tons/year</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Carbon Track?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 size={40} />
              </div>
              <h3>Easy Tracking</h3>
              <p>Log your daily activities with our simple, intuitive interface. Get instant carbon impact calculations.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <TrendingDown size={40} />
              </div>
              <h3>Personalized Insights</h3>
              <p>Receive AI-powered recommendations tailored to your lifestyle to reduce your carbon footprint effectively.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={40} />
              </div>
              <h3>Community Challenges</h3>
              <p>Join others in sustainability challenges and compete on the leaderboard for carbon reduction goals.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap size={40} />
              </div>
              <h3>Smart Actions</h3>
              <p>Discover hundreds of eco-friendly actions with real impact. Track your progress and celebrate wins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number">50K+</h3>
              <p className="stat-label">Active Users</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">2.5M</h3>
              <p className="stat-label">Tons CO₂ Saved</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">1K+</h3>
              <p className="stat-label">Eco-Actions</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number">95%</h3>
              <p className="stat-label">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up and tell us about your lifestyle</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Log Activities</h3>
              <p>Track your daily actions and habits</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Insights</h3>
              <p>Receive personalized recommendations</p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Make Impact</h3>
              <p>Reduce your carbon footprint today</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of people committed to creating a sustainable future.</p>
          <Link to="/calculator" className="btn btn-outline btn-large">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  )
}
