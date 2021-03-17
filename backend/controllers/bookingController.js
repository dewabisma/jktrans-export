import Booking from '../models/BookingSchema.js';
import asyncHandler from 'express-async-handler';

// @desc    fetch all booking
// @route   GET /api/bookings
// @access  Private
const getAllBooking = asyncHandler(async (req, res) => {
  const allBookings = await Booking.find({});

  res.json(allBookings);
});

// @desc    fetch a booking by Id
// @route   GET /api/bookings/:bookingId
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error(
      `Booking dengan id ${req.params.bookingId} tidak ditemukan`
    );
  }
});

// @desc    create new booking
// @route   POST /api/bookings
// @access  Public
const createNewBooking = asyncHandler(async (req, res) => {
  const { namaPengirim, namaPenerima, alamatPenerima } = req.body;

  const newBooking = {
    namaPengirim,
    namaPenerima,
    alamatPenerima,
  };

  const createdBooking = await Booking.create(newBooking);

  if (createdBooking) {
    res.status(201);
    res.json({ message: 'Berhasil melakukan booking', createdBooking });
  } else {
    res.status(400);
    throw new Error('Data tidak valid');
  }
});

export { getAllBooking, getBookingById, createNewBooking };
