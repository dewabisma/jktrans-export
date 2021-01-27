const Nota = require('../models/NotaSchema');
const jwt = require('jsonwebtoken');

// @desc    get all nota
// @route   GET /nota
// @access  Private
const getAllNota = async (req, res) => {
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
};

// @desc    get nota by Id
// @route   GET /nota/:id
// @access  Private
const getNotaById = async (req, res) => {
  const nota = await Nota.findById(req.params.id).populate(
    'pegawai',
    '-password'
  );

  if (nota) {
    res.json(nota);
  } else {
    res.status(404).json({ message: 'Nota tidak ditemukan' });
  }
};

// @desc    delete nota by Id
// @route   DELETE /nota/:id
// @access  Private
const deleteNotaById = async (req, res) => {
  const nota = await Nota.findById(req.params.id);

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
};

// @desc    create new nota
// @route   POST /nota
// @access  Private
const createNewNota = async (req, res) => {
  const {
    user,
    body: {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang,
      totalColli,
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
    cabang: user.cabang,
  };

  const createdNota = await Nota.create(newNota);

  if (createdNota) {
    res.status(201).json(createdNota);
  } else {
    res.json({ message: 'Gagal membuat nota' });
  }
};

module.exports = { getAllNota, getNotaById, deleteNotaById, createNewNota };
