import express from 'express';
import {
  getAllNota,
  getNotaById,
  deleteNotaById,
  createNewNota,
  editNotaById,
  requestEditNotaById,
  requestDeleteNotaById,
} from '../controllers/notaController.js';
import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getAllNota).post(protect, createNewNota);
router
  .route('/:notaId')
  .get(protect, getNotaById)
  .put(protect, superUser, editNotaById)
  .delete(protect, superUser, deleteNotaById);
router.put('/:notaId/change-request', protect, requestEditNotaById);
router.put('/:notaId/delete-request', protect, requestDeleteNotaById);

export default router;
