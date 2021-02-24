import express from 'express';
import {
  getAllPriceList,
  addNewPriceToPriceList,
  updatePriceListById,
  deletePriceListById,
  getPriceListById,
} from '../controllers/priceListController.js';
import { protect, superUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getAllPriceList)
  .post(protect, superUser, addNewPriceToPriceList);
router
  .route('/:priceId')
  .get(getPriceListById)
  .put(protect, superUser, updatePriceListById)
  .delete(protect, superUser, deletePriceListById);

export default router;
