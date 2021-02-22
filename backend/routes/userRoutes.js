import express from 'express';
import { authUser, logoutUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authUser);
router.get('/logout', logoutUser);

export default router;
