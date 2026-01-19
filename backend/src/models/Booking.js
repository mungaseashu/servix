const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Customer is required']
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Provider is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
