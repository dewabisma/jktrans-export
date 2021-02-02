const mongoose = require('mongoose');
const rekapNotaSchema = require('./RekapNotaSchema');
const Sequence = require('./SequenceSchema');

const rekapanSchema = mongoose.Schema(
  {
    noRekapan: { type: Number },
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

rekapanSchema.pre('save', async function (next) {
  if (!this.isNew) {
    next();
  } else {
    try {
      let doc = this;

      const sequence = await Sequence.findById({ _id: 'counter' });
      sequence.sequenceRekapan += 1;
      await sequence.save();

      doc.noRekapan = sequence.sequenceRekapan;

      next();
    } catch (error) {
      return next(error);
    }
  }
});

const RekapanNota = mongoose.model('rekapanNota', rekapanSchema);

module.exports = RekapanNota;
