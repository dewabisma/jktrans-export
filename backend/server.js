// Dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

// Local Module
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import notaRoutes from './routes/notaRoutes.js';
import rekapanRoutes from './routes/rekapanRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import priceListRoutes from './routes/priceListRoutes.js';

dotenv.config();
const app = express();

// Database Connection
connectDB();

// __Dirname
const __dirname = path.resolve();
global.__basedir = __dirname;

// Middleware
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'Development') app.use(morgan('dev'));

// Routes
app.use('/api/nota', notaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rekapan', rekapanRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/prices', priceListRoutes);
app.use('/pdf', express.static(path.join(__dirname, '/temp/pdf')));

// Send file for production
if (process.env.NODE_ENV === 'Production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} at port ${PORT}`.inverse.green
  )
);
