import RekapanNota from '../models/RekapanSchema.js';
import Nota from '../models/NotaSchema.js';
import asyncHandler from 'express-async-handler';

// @desc    get all rekapan
// @route   GET /api/rekapan
// @access  Private
const getAllRekapan = asyncHandler(async (req, res) => {
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
});

// @desc    create new rekapan
// @route   POST /api/rekapan
// @access  Private
const createNewRekapan = asyncHandler(async (req, res) => {
  try {
    const { sopirPengirim, noPolis, kumpulanIdNota } = req.body;

    const kumpulanNota = await Nota.find({ _id: { $in: kumpulanIdNota } });
    mongoose.find({ title: { $in: ['some title', 'some other title'] } });

    console.log(kumpulanNota);

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
});

// @desc    delete a rekapan by ID
// @route   DELETE /api/rekapan/:rekapanId
// @access  Private/Super User
const deleteRekapan = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

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
});

// @desc    update a rekapan by ID
// @route   PUT /api/rekapan/:rekapanId
// @access  Private
const updateRekapan = asyncHandler(async (req, res) => {
  try {
    const change = req.body;
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      rekapan.sopirPengirim = change.sopirPengirim || rekapan.sopirPengirim;
      rekapan.noPolis = change.noPolis || rekapan.noPolis;
      if (change.kumpulanIdNota) {
        const kumpulanNota = await Nota.find({
          _id: { $in: change.kumpulanIdNota },
        });

        const detailRekapanNota = kumpulanNota.map((nota) => {
          return {
            nota: nota._id,
            colli: nota.totalColli,
            berat: nota.totalBerat,
            confrankert: nota.totalHarga,
            penerimaBarang: nota.namaPenerima,
          };
        });

        rekapan.detailRekapanNota = detailRekapanNota;
      }

      const updatedRekapan = await rekapan.save();

      res.json({
        message: `Rekapan dengan id ${updatedRekapan._id} berhasil diupdate`,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    change a nota status in rekapan to paid by ID
// @route   PUT /api/rekapan/:rekapanId/nota/:notaId/paid
// @access  Private/Super User
const changeRekapanStatusToPaid = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      const indexOfNota = rekapan.detailRekapanNota.findIndex((nota) => {
        return nota.nota.toString() === req.params.notaId;
      });

      if (indexOfNota !== -1) {
        rekapan.detailRekapanNota[indexOfNota].isPaid = true;
        rekapan.detailRekapanNota[indexOfNota].paidAt = Date.now();
      } else {
        res.status(404).json({ message: 'Nota tidak ditemukan dalam rekapan' });
      }

      await rekapan.save();

      res.json({
        message: `Mengubah status pembayaran nota dengan id ${req.params.notaId} di rekapan berhasil`,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    change a rekapan status to delivered by ID
// @route   PUT /api/rekapan/:rekapanId/nota/:notaId/delivered
// @access  Private/Super User
const changeRekapanStatusToDelivered = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      const indexOfNota = rekapan.detailRekapanNota.findIndex((nota) => {
        return nota.nota.toString() === req.params.notaId;
      });

      if (indexOfNota !== -1) {
        rekapan.detailRekapanNota[indexOfNota].isDelivered = true;
        rekapan.detailRekapanNota[indexOfNota].deliveredAt = Date.now();

        await rekapan.save();

        res.json({
          message: `Mengubah status pengiriman nota dengan id ${req.params.notaId} di rekapan berhasil`,
        });
      } else {
        res.status(404).json({ message: 'Nota tidak ditemukan dalam rekapan' });
      }
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  updateRekapan,
  changeRekapanStatusToPaid,
  changeRekapanStatusToDelivered,
};