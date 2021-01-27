const { Router } = require('express');
const {
  getAllNota,
  getNotaById,
  deleteNotaById,
  createNewNota,
} = require('../controllers/notaController');
const { protect, superUser } = require('../middleware/authMiddleware');

const router = Router();

router.route('/nota').get(protect, getAllNota).post(protect, createNewNota);
router
  .route('/nota/:id')
  .get(protect, getNotaById)
  .delete(protect, superUser, deleteNotaById);

module.exports = router;
