import mongoose from 'mongoose';

const priceListSchema = mongoose.Schema(
  {
    jenisBarang: {
      type: String,
      required: [true, 'Jenis barang tidak boleh kosong'],
    },
    biayaAngkut: {
      type: Number,
      required: [true, 'Biaya angkut tidak boleh kosong'],
    },
  },
  {
    timestamps: true,
  }
);

const PriceList = mongoose.model('priceList', priceListSchema);

export default PriceList;
