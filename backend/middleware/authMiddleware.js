import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Tidak berwenang, token tidak valid');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Tidak berwenang, tidak ada token');
  }
});

const superUser = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isSuperUser) {
    next();
  } else {
    res.status(401);
    throw new Error('Tidak berwenang sebagai super user');
  }
});

export { protect, superUser };
