import mongoose from 'mongoose';

const permohonanSchema = mongoose.Schema(
  {
    pemohon: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Pemohon tidak boleh kosong'],
      ref: 'User',
    },
    alasanPermohonan: {
      type: String,
      required: [true, 'Alasan permohonan tidak boleh kosong'],
    },
  },
  {
    timestamps: true,
  }
);

export default permohonanSchema;
