import { query } from '../config/db.js';

// @desc    Save user carbon baseline
// @route   POST /api/footprint/baseline
// @access  Private
export const saveBaseline = async (req, res, next) => {
  const { annualEmissions, baselineYear, transportation, energy, food, waste } = req.body;

  try {
    const result = await query(
      `INSERT INTO carbon_baselines (user_id, annual_emissions, baseline_year, transportation, energy, food, waste)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id) 
       DO UPDATE SET 
         annual_emissions = EXCLUDED.annual_emissions,
         baseline_year = EXCLUDED.baseline_year,
         transportation = EXCLUDED.transportation,
         energy = EXCLUDED.energy,
         food = EXCLUDED.food,
         waste = EXCLUDED.waste,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [req.user.id, annualEmissions, baselineYear || new Date().getFullYear(), transportation, energy, food, waste]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user carbon baseline
// @route   GET /api/footprint/baseline
// @access  Private
export const getBaseline = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT * FROM carbon_baselines WHERE user_id = $1',
      [req.user.id]
    );

    if (result.rows.length > 0) {
      res.json({
        success: true,
        data: result.rows[0]
      });
    } else {
      res.json({
        success: true,
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
};
