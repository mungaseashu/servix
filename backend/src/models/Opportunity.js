const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['carpentry', 'electrical', 'plumbing', 'painting', 'cleaning', 'hvac', 'landscaping', 'roofing', 'flooring']
  },
  budget: {
    min: {
      type: Number,
      required: [true, 'Minimum budget is required']
    },
    max: {
      type: Number,
      required: [true, 'Maximum budget is required']
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline is required']
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    message: {
      type: String,
      maxlength: [500, 'Message cannot exceed 500 characters']
    }
  }],
  status: {
    type: String,
    enum: ['open', 'in-progress', 'closed', 'cancelled'],
    default: 'open'
  },
  urgent: {
    type: Boolean,
    default: false
  },
  skillsRequired: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
