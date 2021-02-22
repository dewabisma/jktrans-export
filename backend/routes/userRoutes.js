import express from 'express';
import {
  authUser,
  logoutUser,
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
router.get('/logout', logoutUser);

export default router;
