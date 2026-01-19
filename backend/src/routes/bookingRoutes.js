const express = require('express');
const router = express.Router();
const { 
  getAllBookings, 
  getBookingById, 
  createBooking, 
  updateBooking, 
  cancelBooking 
} = require('../controllers/bookingController');
const { validateBooking } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Get all bookings for user
router.get('/', authenticate, getAllBookings);

// Get booking by ID
router.get('/:id', authenticate, getBookingById);

// Create new booking
router.post('/', authenticate, validateBooking, createBooking);

// Update booking
router.put('/:id', authenticate, updateBooking);

// Cancel booking
router.patch('/:id/cancel', authenticate, cancelBooking);

module.exports = router;
