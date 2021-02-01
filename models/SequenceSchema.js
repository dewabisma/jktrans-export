const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  _id: {
    type: String,
    default: 'counter',
  },
  sequenceNota: {
    type: Number,
    default: 0,
  },
  sequenceRekapan: {
    type: Number,
    default: 0,
  },
});

const Sequence = mongoose.model('sequence', sequenceSchema);

module.exports = Sequence;
