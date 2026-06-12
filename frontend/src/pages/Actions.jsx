import { useState } from 'react'
import { CheckCircle, Lightbulb, Heart, Share2 } from 'lucide-react'
import './Actions.css'

export default function Actions() {
  const [completed, setCompleted] = useState(new Set())

  const actions = [
    {
      id: 1,
      category: 'Transportation',
      title: 'Use Public Transport',
      description: 'Take the bus, train, or metro instead of driving',
      impact: '2 kg CO₂/week',
      difficulty: 'Easy',
      icon: '🚌'
    },
    {
      id: 2,
      category: 'Energy',
      title: 'Switch to LED Bulbs',
      description: 'Replace all incandescent bulbs with LED alternatives',
      impact: '0.5 kg CO₂/month',
      difficulty: 'Easy',
      icon: '💡'
    },
    {
      id: 3,
      category: 'Food',
      title: 'Go Vegetarian for a Day',
      description: 'Skip meat one day per week to reduce emissions',
      impact: '1.5 kg CO₂/week',
      difficulty: 'Medium',
      icon: '🥗'
    },
    {
      id: 4,
      category: 'Energy',
      title: 'Install a Smart Thermostat',
      description: 'Optimize heating and cooling schedules automatically',
      impact: '5 kg CO₂/month',
      difficulty: 'Medium',
      icon: '🌡️'
    },
    {
      id: 5,
      category: 'Waste',
      title: 'Start Composting',
      description: 'Reduce organic waste by composting food scraps',
      impact: '1 kg CO₂/week',
      difficulty: 'Medium',
      icon: '♻️'
    },
    {
      id: 6,
      category: 'Transportation',
      title: 'Carpool or Bike',
      description: 'Share rides or use a bike for short trips',
      impact: '3 kg CO₂/week',
      difficulty: 'Medium',
      icon: '🚴'
    },
    {
      id: 7,
      category: 'Energy',
      title: 'Solar Panels',
      description: 'Install solar panels to generate clean energy',
      impact: '50 kg CO₂/month',
      difficulty: 'Hard',
      icon: '☀️'
    },
    {
      id: 8,
      category: 'Food',
      title: 'Buy Local & Seasonal',
      description: 'Support local farmers and reduce transportation emissions',
      impact: '2 kg CO₂/month',
      difficulty: 'Easy',
      icon: '🌾'
    }
  ]

  const toggleAction = (id) => {
    const newCompleted = new Set(completed)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
    }
    setCompleted(newCompleted)
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#2ecc71'
      case 'Medium': return '#f39c12'
      case 'Hard': return '#e74c3c'
      default: return '#95a5a6'
    }
  }

  return (
    <div className="actions-page">
      <div className="container">
        <div className="page-header">
          <h1>Eco-Friendly Actions</h1>
          <p>Discover simple actions to reduce your carbon footprint. You've completed {completed.size} actions!</p>
        </div>

        <div className="filter-section">
          <button className="btn btn-secondary">All</button>
          <button className="btn btn-secondary">Transportation</button>
          <button className="btn btn-secondary">Energy</button>
          <button className="btn btn-secondary">Food</button>
          <button className="btn btn-secondary">Waste</button>
        </div>

        <div className="actions-grid">
          {actions.map(action => (
            <div 
              key={action.id} 
              className={`action-card ${completed.has(action.id) ? 'completed' : ''}`}
            >
              <div className="action-header">
                <div className="action-icon">{action.icon}</div>
                <div className="action-meta">
                  <span className="category-badge">{action.category}</span>
                  <span className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(action.difficulty) }}>
                    {action.difficulty}
                  </span>
                </div>
              </div>

              <h3>{action.title}</h3>
              <p>{action.description}</p>

              <div className="action-impact">
                <Lightbulb size={16} />
                <span>{action.impact}</span>
              </div>

              <div className="action-buttons">
                <button 
                  className={`btn ${completed.has(action.id) ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => toggleAction(action.id)}
                >
                  {completed.has(action.id) ? (
                    <>
                      <CheckCircle size={16} />
                      Completed
                    </>
                  ) : (
                    'Complete'
                  )}
                </button>
                <button className="btn btn-icon">
                  <Heart size={16} />
                </button>
                <button className="btn btn-icon">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="action-tips">
          <h2>💡 Tips for Success</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Start Small</h4>
              <p>Don't try to do everything at once. Start with one easy action and build from there.</p>
            </div>
            <div className="tip-card">
              <h4>Make it a Habit</h4>
              <p>Consistency matters more than perfection. Small daily actions add up over time.</p>
            </div>
            <div className="tip-card">
              <h4>Share & Inspire</h4>
              <p>Encourage friends and family to join you. Community support increases success rates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
