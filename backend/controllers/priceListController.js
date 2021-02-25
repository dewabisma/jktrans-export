import PriceList from '../models/PriceListSchema.js';
import asyncHandler from 'express-async-handler';

// @desc    fetch all price list
// @route   GET /api/prices
// @access  Public
const getAllPriceList = asyncHandler(async (req, res) => {
  const priceList = await PriceList.find({});

  res.json(priceList);
});

// @desc    fetch price list by id
// @route   GET /api/prices/:priceId
// @access  Public
const getPriceListById = asyncHandler(async (req, res) => {
  const price = await PriceList.findById(req.params.priceId);

  if (price) {
    res.json(price);
  } else {
    res.status(404);
    throw new Error(`Biaya angkut item dengan id ${price._id} tidak ditemukan`);
  }
});

// @desc    add new price to price list
// @route   POST /api/prices
// @access  Super User Only
const addNewPriceToPriceList = asyncHandler(async (req, res) => {
  const { jenisBarang, biayaAngkut } = req.body;

  const newPrice = {
    jenisBarang,
    biayaAngkut,
  };

  const createdPrice = await PriceList.create(newPrice);

  res.json({
    Message: `Biaya angkut ${createdPrice.jenisBarang} berhasil ditambahkan ke dalam daftar harga`,
  });
});

// @desc    update price list by id
// @route   PUT /api/prices/:priceId
// @access  Super User Only
const updatePriceListById = asyncHandler(async (req, res) => {
  const { jenisBarang, biayaAngkut } = req.body;

  const price = await PriceList.findById(req.params.priceId);

  if (price) {
    price.jenisBarang = jenisBarang || price.jenisBarang;
    price.biayaAngkut = biayaAngkut || price.biayaAngkut;

    const updatedPrice = await price.save();

    res.json({
      Message: `Biaya angkut ${updatedPrice.jenisBarang} berhasil diperbarui`,
    });
  } else {
    res.status(404);
    throw new Error(`Biaya angkut item dengan id ${price._id} tidak ditemukan`);
  }
});

// @desc    delete price list by id
// @route   DELETE /api/prices/:priceId
// @access  Super User Only
const deletePriceListById = asyncHandler(async (req, res) => {
  const price = await PriceList.findById(req.params.priceId);

  if (price) {
    const deletedPrice = await price.remove();

    res.json({
      Message: `Biaya angkut ${deletedPrice.jenisBarang} berhasil dihapus`,
    });
  } else {
    res.status(404);
    throw new Error(`Biaya angkut item dengan id ${price._id} tidak ditemukan`);
  }
});

export {
  getAllPriceList,
  updatePriceListById,
  addNewPriceToPriceList,
  getPriceListById,
  deletePriceListById,
};
