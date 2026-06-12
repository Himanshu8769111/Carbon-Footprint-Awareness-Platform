import { Trophy, Medal, Flame } from 'lucide-react'
import './Leaderboard.css'

export default function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: 'Alex Green', emissions: 2.1, reduction: 65, icon: '👤' },
    { rank: 2, name: 'Jordan Smith', emissions: 2.8, reduction: 60, icon: '👤' },
    { rank: 3, name: 'Casey Johnson', emissions: 3.2, reduction: 55, icon: '👤' },
    { rank: 4, name: 'Morgan Lee', emissions: 3.5, reduction: 50, icon: '👤' },
    { rank: 5, name: 'Riley Brown', emissions: 3.9, reduction: 45, icon: '👤' },
    { rank: 6, name: 'Taylor White', emissions: 4.1, reduction: 42, icon: '👤' },
    { rank: 7, name: 'Drew Martinez', emissions: 4.3, reduction: 40, icon: '👤' },
    { rank: 8, name: 'Avery Garcia', emissions: 4.5, reduction: 38, icon: '👤' },
    { rank: 9, name: 'Quinn Davis', emissions: 4.7, reduction: 35, icon: '👤' },
    { rank: 10, name: 'Sam Wilson', emissions: 4.9, reduction: 32, icon: '👤' }
  ]

  const getMedalColor = (rank) => {
    switch(rank) {
      case 1: return '#FFD700'
      case 2: return '#C0C0C0'
      case 3: return '#CD7F32'
      default: return '#ecf0f1'
    }
  }

  const getMedalIcon = (rank) => {
    switch(rank) {
      case 1: return <Trophy size={24} />
      case 2: return <Medal size={24} />
      case 3: return <Medal size={24} />
      default: return rank
    }
  }

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="leaderboard-header">
          <h1>🏆 Global Leaderboard</h1>
          <p>Compete with others and celebrate your progress toward sustainability</p>
        </div>

        <div className="leaderboard-filters">
          <button className="btn btn-secondary">This Month</button>
          <button className="btn btn-secondary">This Year</button>
          <button className="btn btn-secondary">All Time</button>
          <button className="btn btn-secondary">My Region</button>
        </div>

        <div className="leaderboard-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Annual Emissions</th>
                <th>Reduction</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map(entry => (
                <tr key={entry.rank} className={`rank-${entry.rank}`}>
                  <td className="rank-cell">
                    <div 
                      className="medal"
                      style={{ backgroundColor: getMedalColor(entry.rank) }}
                    >
                      {getMedalIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="name-cell">
                    <div className="user-info">
                      <span className="avatar">{entry.icon}</span>
                      <span className="name">{entry.name}</span>
                    </div>
                  </td>
                  <td className="emissions-cell">
                    {entry.emissions} tons CO₂
                  </td>
                  <td className="reduction-cell">
                    <div className="reduction-badge">
                      <Flame size={16} />
                      {entry.reduction}%
                    </div>
                  </td>
                  <td className="status-cell">
                    {entry.rank <= 3 ? '🌟 Champion' : '🌱 Active'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="leaderboard-info">
          <div className="info-card">
            <h3>💡 How We Calculate</h3>
            <p>Rankings are based on lowest annual carbon emissions and highest percentage of reduction from baseline.</p>
          </div>

          <div className="info-card">
            <h3>🏅 Achievements</h3>
            <ul>
              <li><strong>Top 10:</strong> 🏆 Emerald Warrior</li>
              <li><strong>50% Reduction:</strong> 🌿 Eco Guardian</li>
              <li><strong>100 Actions:</strong> 🌍 Planet Protector</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>📊 Challenge Hub</h3>
            <p>Join monthly challenges with other users and compete for exclusive badges and recognition!</p>
            <button className="btn btn-primary">Explore Challenges</button>
          </div>
        </div>
      </div>
    </div>
  )
}
