const { Router } = require('express');
const { protect, superUser } = require('../middleware/authMiddleware');
const {
  getAllRekapan,
  createNewRekapan,
} = require('../controllers/rekapanController');

const router = Router();

router
  .route('/rekapan')
  .get(protect, getAllRekapan)
  .post(protect, createNewRekapan);

module.exports = router;
