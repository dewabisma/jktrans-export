import express from 'express';
import {
  authUser,
  registerUser,
  getAllUser,
  banUserById,
} from '../controllers/userController.js';
import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, superUser, getAllUser)
  .post(protect, superUser, registerUser);
router.put('/:userId/ban', protect, superUser, banUserById);
router.post('/login', authUser);

export default router;
