import { query } from '../config/db.js';

// @desc    Get global leaderboard
// @route   GET /api/leaderboard
// @access  Public
export const getGlobalLeaderboard = async (req, res, next) => {
  try {
    // Rank users by lowest annual emissions or highest impact from actions
    // For now, let's rank by lowest annual emissions from baseline
    const result = await query(
      `SELECT u.id, u.first_name, u.last_name, u.avatar_url, cb.annual_emissions
       FROM users u
       JOIN carbon_baselines cb ON u.id = cb.user_id
       ORDER BY cb.annual_emissions ASC
       LIMIT 100`
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};
