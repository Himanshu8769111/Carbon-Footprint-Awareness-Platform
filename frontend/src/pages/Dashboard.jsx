import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingDown, Award, Target, Zap } from 'lucide-react'
import API from '../services/api'
import './Dashboard.css'

export default function Dashboard() {
  const { data: footprint, isLoading } = useQuery({
    queryKey: ['footprint'],
    queryFn: async () => {
      const { data } = await API.get('/footprint/baseline')
      return data.data
    }
  })

  const carbonData = useMemo(() => [
    { month: 'Jan', value: 5.2 },
    { month: 'Feb', value: 5.1 },
    { month: 'Mar', value: 4.8 },
    { month: 'Apr', value: 4.5 },
    { month: 'May', value: 4.3 },
    { month: 'Jun', value: footprint ? Number(footprint.annual_emissions) / 12 : 4.2 }
  ], [footprint])

  const categoryData = useMemo(() => footprint ? [
    { name: 'Transportation', value: Number(footprint.transportation) },
    { name: 'Energy', value: Number(footprint.energy) },
    { name: 'Food', value: Number(footprint.food) },
    { name: 'Waste', value: Number(footprint.waste) }
  ] : [
    { name: 'Transportation', value: 45 },
    { name: 'Energy', value: 30 },
    { name: 'Food', value: 15 },
    { name: 'Waste', value: 10 }
  ], [footprint])

  const COLORS = ['#e74c3c', '#f39c12', '#f1c40f', '#2ecc71']

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="skeleton skeleton-title" style={{ margin: '0 auto 3rem auto' }}></div>
          
          <div className="stats-overview">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="stat-box">
                <div className="skeleton skeleton-circle"></div>
                <div className="stat-info">
                  <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                  <div className="skeleton skeleton-text" style={{ width: '70%' }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="charts-grid">
            <div className="chart-container">
              <div className="skeleton skeleton-text" style={{ width: '50%', marginBottom: '2rem' }}></div>
              <div className="skeleton skeleton-chart"></div>
            </div>
            <div className="chart-container">
              <div className="skeleton skeleton-text" style={{ width: '50%', marginBottom: '2rem' }}></div>
              <div className="skeleton skeleton-chart"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1>Your Carbon Footprint Dashboard</h1>

        {/* Stats Overview */}
        <div className="stats-overview">
          <div className="stat-box">
            <div className="stat-icon trend-down">
              <TrendingDown size={32} />
            </div>
            <div className="stat-info">
              <h3>{footprint ? Number(footprint.annual_emissions).toFixed(1) : '0.0'}</h3>
              <p>tons CO₂/year</p>
              <small>↓ 19% from last year</small>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon trend-up">
              <Award size={32} />
            </div>
            <div className="stat-info">
              <h3>12</h3>
              <p>Badges Earned</p>
              <small>Keep it up! 🎉</small>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon trend-target">
              <Target size={32} />
            </div>
            <div className="stat-info">
              <h3>3.5</h3>
              <p>Goal Target</p>
              <small>0.7 tons to go!</small>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-icon trend-zap">
              <Zap size={32} />
            </div>
            <div className="stat-info">
              <h3>28</h3>
              <p>Days Streak</p>
              <small>Keep tracking! 💪</small>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="charts-grid">
          {/* Line Chart */}
          <div className="chart-container">
            <h2>Carbon Footprint Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#2ecc71" name="CO₂ (tons)" strokeWidth={2} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="chart-container">
            <h2>Emissions by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} label={(entry) => `${entry.name}: ${entry.value}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="recent-activities">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🚗</div>
              <div className="activity-info">
                <h4>Car Trip</h4>
                <p>15 km commute</p>
              </div>
              <div className="activity-impact">+0.5 kg CO₂</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">💡</div>
              <div className="activity-info">
                <h4>Energy Saved</h4>
                <p>Used LED lights today</p>
              </div>
              <div className="activity-impact">-0.2 kg CO₂</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">🥗</div>
              <div className="activity-info">
                <h4>Vegetarian Meal</h4>
                <p>Plant-based lunch</p>
              </div>
              <div className="activity-impact">-0.3 kg CO₂</div>
            </div>

            <div className="activity-item">
              <div className="activity-icon">✈️</div>
              <div className="activity-info">
                <h4>Flight Booked</h4>
                <p>Round trip to NYC</p>
              </div>
              <div className="activity-impact">+2.1 kg CO₂</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations">
          <h2>Personalized Recommendations</h2>
          <div className="recommendation-cards">
            <div className="recommendation-card">
              <h3>Use Public Transport</h3>
              <p>Switching 2 car trips to public transport per week can save ~1 ton CO₂/year</p>
              <button type="button" className="btn btn-primary">Learn More</button>
            </div>

            <div className="recommendation-card">
              <h3>Energy Efficient</h3>
              <p>Upgrade to LED bulbs and save up to 0.5 tons CO₂/year on electricity</p>
              <button type="button" className="btn btn-primary">Learn More</button>
            </div>

            <div className="recommendation-card">
              <h3>Reduce Meat</h3>
              <p>Going vegetarian 2 days/week can reduce your emissions by 0.3 tons CO₂/year</p>
              <button type="button" className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
