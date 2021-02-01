const RekapanNota = require('../models/RekapanSchema');
const jwt = require('jsonwebtoken');

// @desc    get all rekapan
// @route   GET /rekapan
// @access  Private
const getAllRekapan = async (req, res) => {
  try {
    const allRekapan = await RekapanNota.find({});

    if (allRekapan) {
      res.json(allRekapan);
    } else {
      res.status(404).json({ message: 'Belum ada nota tersimpan' });
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    create new rekapan
// @route   POST /rekapan
// @access  Private
const createNewRekapan = async (req, res) => {
  try {
    const { sopirPengirim, noPolis, kumpulanNota } = req.body;
    const detailRekapanNota = kumpulanNota.map((nota) => {
      return {
        nota: nota._id,
        colli: nota.totalColli,
        berat: nota.totalBerat,
        confrankert: nota.totalHarga,
        penerimaBarang: nota.namaPenerima,
      };
    });

    const newRekapan = {
      sopirPengirim,
      noPolis,
      detailRekapanNota,
    };

    const createdRekapan = await RekapanNota.create(newRekapan);

    res
      .status(201)
      .json({ message: 'Rekapan berhasil dibuat', createdRekapan });
  } catch (error) {
    console.log(error);
  }
};

// @desc    delete a rekapan by ID
// @route   DELETE /rekapan/:id
// @access  Private/Super User
const deleteRekapan = async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.id);

    if (rekapan) {
      const deletedRekapan = await rekapan.delete();

      res.json({
        message: `Rekapan dengan id ${deletedRekapan._id} berhasil dihapus`,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
};

// @desc    change a rekapan status to paid by ID
// @route   PUT /rekapan/:id
// @access  Private/Super User
const changeRekapanStatusToPaid = async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.id);

    if (rekapan) {
      rekapan.isPaid = true;
      rekapan.paidAt = Date.now();

      const updatedRekapan = await rekapan.save();

      res.json({
        message: `Mengubah status pembayaran rekapan dengan id ${updatedRekapan._id} berhasil`,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  changeRekapanStatusToPaid,
};
