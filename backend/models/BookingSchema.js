import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('booking', bookingSchema);

export default Booking;
