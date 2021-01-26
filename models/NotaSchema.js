const mongoose = require('mongoose');
const barangSchema = require('./BarangSchema');

const notaSchema = mongoose.Schema(
  {
    pegawai: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    namaPengirim: {
      type: String,
      required: [true, 'nama pengirim tidak boleh kosong'],
    },
    namaPenerima: {
      type: String,
      required: [true, 'nama penerima tidak boleh kosong'],
    },
    alamatPenerima: {
      type: String,
      required: [true, 'alamat penerima tidak boleh kosong'],
    },
    detailBarang: [barangSchema],
    totalColli: {
      type: Number,
      required: [true, 'kolom colli tidak boleh kosong'],
    },
    totalHarga: {
      type: Number,
      required: [true, 'kolom biaya tidak boleh kosong'],
    },
  },
  {
    timestamps: true,
  }
);

const Nota = mongoose.model('nota', notaSchema);

module.exports = Nota;
