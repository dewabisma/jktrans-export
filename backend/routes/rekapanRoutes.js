import express from 'express';
import { protect, superUser } from '../middleware/authMiddleware.js';
import {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  updateRekapan,
  generatePDFbyId,
  changeRekapanStatusToDelivered,
  changeRekapanStatusToPaid,
} from '../controllers/rekapanController.js';

const router = express.Router();

router.route('/').get(protect, getAllRekapan).post(protect, createNewRekapan);
router
  .route('/:rekapanId')
  .put(protect, updateRekapan)
  .delete(protect, superUser, deleteRekapan);
router.get('/:rekapanId/print', generatePDFbyId);
router.put(
  '/:rekapanId/nota/:notaId/delivered',
  protect,
  superUser,
  changeRekapanStatusToDelivered
);
router.put(
  '/:rekapanId/nota/:notaId/paid',
  protect,
  superUser,
  changeRekapanStatusToPaid
);

export default router;
