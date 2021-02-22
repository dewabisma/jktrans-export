import { Router } from 'express';
import { authUser, logoutUser } from '../controllers/userController';

const router = Router();

router.post('/login', authUser);
router.get('/logout', logoutUser);

export default router;
