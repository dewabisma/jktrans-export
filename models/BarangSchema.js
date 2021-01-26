const mongoose = require('mongoose');

const barangSchema = mongoose.Schema({
  banyakColli: {
    type: Number,
    required: [true, 'banyak colli tidak boleh kosong'],
  },
  macamColli: {
    type: String,
    required: [true, 'macam colli tidak boleh kosong'],
  },
  merekColli: {
    type: String,
  },
  namaBarang: {
    type: String,
    required: [true, 'nama barang tidak boleh kosong'],
  },
  beratKotor: {
    type: Number,
    required: [true, 'berat kotor tidak boleh kosong'],
  },
  biayaAngkut: {
    type: Number,
    required: [true, 'biaya angkut tidak boleh kosong'],
  },
  keterangan: {
    type: String,
  },
});

module.exports = barangSchema;
