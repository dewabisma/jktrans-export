const mongoose = require('mongoose');
const rekapNotaSchema = require('./RekapNotaSchema');

const rekapanSchema = mongoose.Schema(
  {
    sopirPengirim: {
      type: String,
      required: [true, 'nama sopir tidak boleh kosong'],
    },
    noPolis: {
      type: String,
    },
    detailRekapanNota: [rekapNotaSchema],
  },
  {
    timestamps: true,
  }
);

const RekapNota = mongoose.model('rekapNota', rekapanSchema);

module.exports = RekapNota;
