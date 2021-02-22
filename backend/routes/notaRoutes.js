import { Router } from 'express';
import {
  getAllNota,
  getNotaById,
  deleteNotaById,
  createNewNota,
} from '../controllers/notaController';
import { protect, superUser } from '../middleware/authMiddleware';

const router = Router();

router.route('/').get(protect, getAllNota).post(protect, createNewNota);
router
  .route('/:id')
  .get(protect, getNotaById)
  .delete(protect, superUser, deleteNotaById);

export default router;
