import mongoose from 'mongoose';

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

export default Sequence;
