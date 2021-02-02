const { Router } = require('express');
const { protect, superUser } = require('../middleware/authMiddleware');
const {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  updateRekapan,
  changeRekapanStatusToDelivered,
  changeRekapanStatusToPaid,
} = require('../controllers/rekapanController');

const router = Router();

router
  .route('/rekapan')
  .get(protect, getAllRekapan)
  .post(protect, createNewRekapan);
router
  .route('/rekapan/:id')
  .put(protect, updateRekapan)
  .delete(protect, superUser, deleteRekapan);
router.put(
  '/rekapan/:id/nota/:notaId/delivered',
  protect,
  superUser,
  changeRekapanStatusToDelivered
);
router.put(
  '/rekapan/:id/nota/:notaId/paid',
  protect,
  superUser,
  changeRekapanStatusToPaid
);

module.exports = router;
