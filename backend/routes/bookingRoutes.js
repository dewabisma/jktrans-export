import express from 'express';
import {
  getAllBooking,
  getBookingById,
  createNewBooking,
} from '../controllers/bookingController.js';

import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAllBooking).post(createNewBooking);
router.route('/:bookingId').get(protect, getBookingById);

export default router;
