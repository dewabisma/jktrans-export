import mongoose from 'mongoose';
import barangSchema from './BarangSchema.js';
import Sequence from './SequenceSchema.js';

const notaSchema = mongoose.Schema(
  {
    noNota: {
      type: Number,
    },
    pegawai: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    cabang: {
      type: String,
      required: [true, 'cabang tidak boleh kosong'],
      enum: ['SBY', 'BALI', 'Super User'],
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
      required: [true, 'total colli tidak boleh kosong'],
    },
    totalBerat: {
      type: Number,
      required: [true, 'total berat tidak boleh kosong'],
    },
    totalHarga: {
      type: Number,
      required: [true, 'total harga tidak boleh kosong'],
    },
  },
  {
    timestamps: true,
  }
);

notaSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
  } else {
    try {
      let doc = this;

      const sequence = await Sequence.findById({ _id: 'counter' });
      sequence.sequenceNota += 1;
      await sequence.save();

      doc.noNota = sequence.sequenceNota;

      next();
    } catch (error) {
      return next(error);
    }
  }
});

const Nota = mongoose.model('Nota', notaSchema);

export default Nota;
