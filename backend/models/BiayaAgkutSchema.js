import mongoose from 'mongoose';

const biayaAngkutSchema = mongoose.Schema({
  kaca: {
    type: Number,
    required: [true, 'biaya kaca tidak boleh kosong'],
    default: 20000,
  },
  besi: {
    type: Number,
    required: [true, 'biaya besi tidak boleh kosong'],
    default: 20000,
  },
  kayu: {
    type: Number,
    required: [true, 'biaya kayu tidak boleh kosong'],
    default: 20000,
  },
  pangan: {
    type: Number,
    required: [true, 'biaya pangan tidak boleh kosong'],
    default: 20000,
  },
});

const BiayaAngkut = mongoose.model('biayaAngkut', biayaAngkutSchema);

export default BiayaAngkut;
