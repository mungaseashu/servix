const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  response: {
    type: String,
    maxlength: [1000, 'Response cannot exceed 1000 characters']
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
