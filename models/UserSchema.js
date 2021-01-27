const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  alamat: {
    type: String,
    required: true,
  },
  noHP: {
    type: String,
    required: true,
  },
  NIK: {
    type: String,
    required: true,
    unique: true,
  },
  cabang: {
    type: String,
    required: [true, 'cabang tidak boleh kosong'],
    enum: ['SBY', 'BALI', 'Super User'],
  },
  isSuperUser: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
