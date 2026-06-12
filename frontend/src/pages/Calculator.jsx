import { useState } from 'react'
import { Car, Home, UtensilsCrossed, Trash2, Calculator } from 'lucide-react'
import './Calculator.css'

export default function CalculatorPage() {
  const [calculations, setCalculations] = useState({
    transportation: 0,
    energy: 0,
    food: 0,
    waste: 0
  })

  const [inputs, setInputs] = useState({
    carMiles: 0,
    flightHours: 0,
    electricityKwh: 0,
    naturalGasTherm: 0,
    meatServings: 0,
    recycle: 0
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }))
  }

  const calculateEmissions = () => {
    const newCalc = {
      transportation: (inputs.carMiles * 0.205) + (inputs.flightHours * 0.9),
      energy: (inputs.electricityKwh * 0.385) + (inputs.naturalGasTherm * 5.3),
      food: inputs.meatServings * 2.7,
      waste: Math.max(0, (50 - inputs.recycle * 5) * 0.05)
    }
    setCalculations(newCalc)
  }

  const totalEmissions = Object.values(calculations).reduce((a, b) => a + b, 0)

  return (
    <div className="calculator-page">
      <div className="container">
        <h1>Carbon Footprint Calculator</h1>
        <p className="intro-text">
          Calculate your personal carbon emissions based on your daily activities and lifestyle choices.
        </p>

        <div className="calculator-grid">
          {/* Transportation Section */}
          <div className="calc-section">
            <div className="section-header">
              <Car size={32} />
              <h2>Transportation</h2>
            </div>
            <div className="input-group">
              <label>Weekly Car Miles</label>
              <input
                type="number"
                name="carMiles"
                value={inputs.carMiles}
                onChange={handleInputChange}
                placeholder="e.g., 100"
              />
              <small>Average: 100 miles/week</small>
            </div>
            <div className="input-group">
              <label>Monthly Flight Hours</label>
              <input
                type="number"
                name="flightHours"
                value={inputs.flightHours}
                onChange={handleInputChange}
                placeholder="e.g., 10"
              />
              <small>Per person per hour</small>
            </div>
          </div>

          {/* Energy Section */}
          <div className="calc-section">
            <div className="section-header">
              <Home size={32} />
              <h2>Home Energy</h2>
            </div>
            <div className="input-group">
              <label>Monthly Electricity (kWh)</label>
              <input
                type="number"
                name="electricityKwh"
                value={inputs.electricityKwh}
                onChange={handleInputChange}
                placeholder="e.g., 800"
              />
              <small>Check your bill</small>
            </div>
            <div className="input-group">
              <label>Monthly Natural Gas (Therms)</label>
              <input
                type="number"
                name="naturalGasTherm"
                value={inputs.naturalGasTherm}
                onChange={handleInputChange}
                placeholder="e.g., 30"
              />
              <small>Check your utility bill</small>
            </div>
          </div>

          {/* Food Section */}
          <div className="calc-section">
            <div className="section-header">
              <UtensilsCrossed size={32} />
              <h2>Food & Diet</h2>
            </div>
            <div className="input-group">
              <label>Weekly Meat Servings</label>
              <input
                type="number"
                name="meatServings"
                value={inputs.meatServings}
                onChange={handleInputChange}
                placeholder="e.g., 7"
              />
              <small>Include beef, pork, and poultry</small>
            </div>
            <div className="input-group">
              <label>Plant-Based Meals Per Week</label>
              <input
                type="number"
                name="recycle"
                value={inputs.recycle}
                onChange={handleInputChange}
                placeholder="e.g., 3"
              />
              <small>Vegetarian/vegan meals</small>
            </div>
          </div>

          {/* Waste Section */}
          <div className="calc-section">
            <div className="section-header">
              <Trash2 size={32} />
              <h2>Waste & Recycling</h2>
            </div>
            <div className="input-group">
              <label>Weekly Recycling (%)</label>
              <input
                type="number"
                name="recycle"
                min="0"
                max="100"
                value={inputs.recycle}
                onChange={handleInputChange}
                placeholder="e.g., 50"
              />
              <small>Estimate your recycling rate</small>
            </div>
            <div className="input-group">
              <p>Typical waste: ~0.5 kg/day</p>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="calculate-section">
          <button className="btn btn-primary btn-large" onClick={calculateEmissions}>
            <Calculator size={20} />
            Calculate My Emissions
          </button>
        </div>

        {/* Results */}
        {totalEmissions > 0 && (
          <div className="results-section">
            <h2>Your Annual Carbon Footprint</h2>
            <div className="total-result">
              <div className="total-number">{(totalEmissions * 365).toFixed(2)}</div>
              <div className="total-unit">tons CO₂/year</div>
            </div>

            <div className="breakdown">
              <div className="breakdown-item">
                <div className="breakdown-icon">🚗</div>
                <h3>Transportation</h3>
                <p>{(calculations.transportation * 365).toFixed(2)} tons/year</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(calculations.transportation / totalEmissions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">💡</div>
                <h3>Home Energy</h3>
                <p>{(calculations.energy * 365).toFixed(2)} tons/year</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(calculations.energy / totalEmissions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">🍽️</div>
                <h3>Food & Diet</h3>
                <p>{(calculations.food * 365).toFixed(2)} tons/year</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(calculations.food / totalEmissions) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="breakdown-item">
                <div className="breakdown-icon">♻️</div>
                <h3>Waste</h3>
                <p>{(calculations.waste * 365).toFixed(2)} tons/year</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(calculations.waste / totalEmissions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="comparison">
              <p>
                <strong>US Average: 16 tons CO₂/year</strong><br />
                <strong>Global Average: 4 tons CO₂/year</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
