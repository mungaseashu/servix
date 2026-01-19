const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all bookings for a user
const getAllBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = { 
      $or: [
        { customer: req.user.userId },
        { provider: req.user.userId }
      ]
    };

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('service', 'name category priceRange')
      .populate('customer', 'name email phone')
      .populate('provider', 'name email phone')
      .sort({ date: -1, time: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(query);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service', 'name category priceRange')
      .populate('customer', 'name email phone')
      .populate('provider', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is involved in this booking
    if (booking.customer._id.toString() !== req.user.userId && 
        booking.provider._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new booking
const createBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      service,
      date,
      time,
      duration,
      location,
      description
    } = req.body;

    // Check if service exists
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const booking = new Booking({
      service,
      customer: req.user.userId,
      provider: serviceDoc.provider,
      date,
      time,
      duration,
      location,
      description,
      price: serviceDoc.priceRange.min // Use minimum price as default
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update booking
const updateBooking = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is involved in this booking
    if (booking.customer._id.toString() !== req.user.userId && 
        booking.provider._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    const {
      status,
      notes
    } = req.body;

    if (status) booking.status = status;
    if (notes) booking.notes = notes;

    await booking.save();

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: { booking }
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is involved in this booking
    if (booking.customer._id.toString() !== req.user.userId && 
        booking.provider._id.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking
};
