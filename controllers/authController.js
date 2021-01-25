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
    res.status(400).json({ message: 'Incorrect username or password' });
  }
};

// @desc    logout user
// @route   GET /logout
// @access  Public
const logoutUser = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = { logoutUser, authUser };
