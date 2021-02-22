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
    if (!user.isBanned) {
      const token = generateToken(user._id);

      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'strict',
      });

      res.json({ authToken: token });
    } else {
      res.status(403);
      throw new Error('Maaf akses anda dilarang!');
    }
  } else {
    res.status(400);
    throw new Error('Username atau password salah');
  }
});

// @desc    fetch all user
// @route   GET /api/users
// @access  Super User Only
const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.json(users);
});

// @desc    register new user
// @route   POST /api/users
// @access  Super User Only
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, alamat, noHP, NIK, cabang } = req.body;

  const newUser = {
    username,
    password,
    alamat,
    noHP,
    NIK,
    cabang,
  };

  const createdUser = await User.create(newUser);

  if (createdUser) {
    res.status(201).json({ message: 'Sukses membuat user baru', createdUser });
  } else {
    res.json({ message: 'Gagal membuat user' });
  }
});

// @desc    ban user by Id
// @route   PUT /api/users/:userId
// @access  Super User Only
const banUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    user.isBanned = true;

    const bannedUser = await user.save();

    res.json({ message: `User dengan id ${bannedUser._id} berhasil dibanned` });
  } else {
    res.status(404);
    throw new Error(`User dengan id ${req.params.userId} tidak ditemukan`);
  }
});

// @desc    logout user
// @route   GET /api/user/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
});

export { logoutUser, authUser, registerUser, getAllUser, banUserById };
