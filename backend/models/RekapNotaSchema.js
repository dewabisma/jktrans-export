import mongoose from 'mongoose';

const rekapNotaSchema = mongoose.Schema({
  nota: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'nota',
  },
  colli: {
    type: Number,
    required: [true, 'colli tidak boleh kosong'],
  },
  berat: {
    type: Number,
    required: [true, 'berat tidak boleh kosong'],
  },
  franco: {
    type: Boolean,
    required: true,
    default: false,
  },
  confrankert: {
    type: Number,
    required: [true, 'confrankert tidak boleh kosong'],
  },
  penerimaBarang: {
    type: String,
    required: [true, 'penerima barang tidak boleh kosong'],
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
});

module.exports = rekapNotaSchema;
