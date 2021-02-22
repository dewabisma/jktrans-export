// Dependencies
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

// Local Module
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import userRoutes from './routes/userRoutes';
import notaRoutes from './routes/notaRoutes';
import rekapanRoutes from './routes/rekapanRoutes';

dotenv.config();
const app = express();

// Database Connection
connectDB();

// __Dirname
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(notFound);
app.use(errorHandler);
if (process.env.NODE_ENV === 'Development') app.use(morgan('dev'));

// Routes
app.use('/api/nota', notaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rekapan', rekapanRoutes);

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server is running at port ${PORT}`.inverse.green)
);
