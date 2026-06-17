import express from 'express';
import { saveBaseline, getBaseline } from '../controllers/footprintController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/baseline')
  .post(protect, saveBaseline)
  .get(protect, getBaseline);

export default router;
