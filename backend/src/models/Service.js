const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['plumbing', 'cleaning', 'electrical', 'painting', 'pest', 'hvac', 'carpentry', 'landscaping', 'roofing', 'flooring']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required']
    }
  },
  duration: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  availability: {
    type: String,
    enum: ['available', 'busy', 'unavailable'],
    default: 'available'
  },
  location: {
    type: String,
    trim: true
  },
  specialties: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);
