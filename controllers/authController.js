const User = require('../models/UserSchema.js');
const generateToken = require('../utils/generateToken');

// @desc    auth user
// @route   POST /login
// @access  Public
const authUser = async (req, res) => {
  const { name, password } = req.body;

  const user = User.findOne({ name: name });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
    });

    res.json({ user: user._id });
  } else {
    res.status(400).json({ message: 'Username atau password salah' });
  }
};

// @desc    register new user
// @route   POST /register
// @access  Super User Only
const registerUser = async (req, res) => {
  const { username, password, alamat, noHP, NIK } = req.body;

  const newUser = {
    username,
    password,
    alamat,
    noHP,
    NIK,
  };

  const createdUser = await User.create(newUser);

  if (createdUser) {
    res.status(201).json({ message: 'Sukses membuat user baru', createdUser });
  } else {
    res.json({ message: 'Gagal membuat user' });
  }
};

// @desc    logout user
// @route   GET /logout
// @access  Public
const logoutUser = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = { logoutUser, authUser, registerUser };
