import User from '../models/UserSchema.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    auth user
// @route   POST /api/user/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: 'strict',
    });

    res.json({ authToken: token });
  } else {
    res.status(400).json({ message: 'Username atau password salah' });
  }
});

// @desc    register new user
// @route   POST /api/user/register
// @access  Super User Only
const registerUser = asyncHandler(async (req, res) => {
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
});

// @desc    logout user
// @route   GET /api/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
});

export { logoutUser, authUser, registerUser };
