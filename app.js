const express = require('express');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db.js');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

require('dotenv').config();

const app = express();

// Database Connection
connectDB();

// View engine
app.set('view engine', ejs);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Routes
app.use('*', checkUser);
app.use(pageRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running at port ${PORT}`));
