import { Router } from 'express';
import { protect, superUser } from '../middleware/authMiddleware';
import {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  updateRekapan,
  changeRekapanStatusToDelivered,
  changeRekapanStatusToPaid,
} from '../controllers/rekapanController';

const router = Router();

router.route('/').get(protect, getAllRekapan).post(protect, createNewRekapan);
router
  .route('/:rekapanId')
  .put(protect, updateRekapan)
  .delete(protect, superUser, deleteRekapan);
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
