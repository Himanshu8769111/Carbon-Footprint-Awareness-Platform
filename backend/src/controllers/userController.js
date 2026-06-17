import { query } from '../config/db.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const result = await query(
      'SELECT id, email, first_name, last_name, avatar_url, bio, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    const user = result.rows[0];

    if (user) {
      res.json({
        success: true,
        data: user
      });
    } else {
      res.status(404);
      next(new Error('User not found'));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  const { firstName, lastName, bio, avatarUrl } = req.body;

  try {
    const result = await query(
      `UPDATE users 
       SET first_name = COALESCE($1, first_name), 
           last_name = COALESCE($2, last_name), 
           bio = COALESCE($3, bio), 
           avatar_url = COALESCE($4, avatar_url),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5 
       RETURNING id, email, first_name, last_name, avatar_url, bio`,
      [firstName, lastName, bio, avatarUrl, req.user.id]
    );

    const updatedUser = result.rows[0];

    res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
