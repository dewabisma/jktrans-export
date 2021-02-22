import Nota from '../models/NotaSchema.js';
import asyncHandler from 'express-async-handler';

// @desc    get all nota
// @route   GET /nota
// @access  Private
const getAllNota = asyncHandler(async (req, res) => {
  try {
    const allNota = await Nota.find({}).populate('pegawai', '-password');

    if (allNota) {
      res.json(allNota);
    } else {
      res.status(404).json({ message: 'Belum ada nota tersimpan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    get nota by Id
// @route   GET /nota/:notaId
// @access  Private
const getNotaById = asyncHandler(async (req, res) => {
  const nota = await Nota.findById(req.params.notaId).populate(
    'pegawai',
    '-password'
  );

  if (nota) {
    res.json(nota);
  } else {
    res.status(404).json({ message: 'Nota tidak ditemukan' });
  }
});

// @desc    delete nota by Id
// @route   DELETE /nota/:notaId
// @access  Private
const deleteNotaById = asyncHandler(async (req, res) => {
  const nota = await Nota.findById(req.params.notaId);

  if (nota) {
    const deletedNota = await nota.remove();
    if (deletedNota) {
      res.json({ message: 'Nota berhasil dihapus', deletedNota });
    } else {
      res.json({ message: 'Gagal menghapus nota' });
    }
  } else {
    res.status(404).json({ message: 'Nota tidak ditemukan' });
  }
});

// @desc    create new nota
// @route   POST /nota
// @access  Private
const createNewNota = asyncHandler(async (req, res) => {
  const {
    user,
    body: {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang,
      totalColli,
      totalBerat,
      totalHarga,
    },
  } = req;

  const newNota = {
    pegawai: user._id,
    namaPengirim,
    namaPenerima,
    alamatPenerima,
    detailBarang,
    totalColli,
    totalHarga,
    totalBerat,
    cabang: user.cabang,
  };

  const createdNota = await Nota.create(newNota);

  if (createdNota) {
    res.status(201).json(createdNota);
  } else {
    res.json({ message: 'Gagal membuat nota' });
  }
});

// @desc    edit nota by ID
// @route   /api/nota/:notaId/edit
// @access  Private (super user only)
const editNotaById = asyncHandler(async (req, res) => {
  const {
    user,
    body: {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang,
      totalColli,
      totalBerat,
      totalHarga,
    },
  } = req;

  const nota = await Nota.findById(req.params.notaId);
  if (nota) {
    nota.namaPengirim = namaPengirim || nota.namaPengirim;
    nota.namaPenerima = namaPenerima || nota.namaPenerima;
    nota.alamatPengirim = alamatPenerima || nota.alamatPenerima;
    nota.detailBarang = detailBarang || nota.detailBarang;
    nota.totalColli = totalColli || nota.totalColli;
    nota.totalBerat = totalBerat || nota.totalBerat;
    nota.totalHarga = totalHarga || nota.totalHarga;

    const updatedNota = await nota.save();
    res.json({
      message: `Nota dengan nomor nota ${updatedNota.noNota} telah berhasil diubah`,
    });
  } else {
    res.status(404);
    throw new Error(`Nota dengan id ${req.params.notaId} tidak ditemukan`);
  }
});

export { getAllNota, getNotaById, deleteNotaById, createNewNota, editNotaById };
