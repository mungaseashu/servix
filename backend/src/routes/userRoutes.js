const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, uploadAvatar, getUserServices, getUserBookings } = require('../controllers/userController');
const { validateProfileUpdate } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

// Get user profile
router.get('/profile', authenticate, getProfile);

// Update user profile
router.put('/profile', authenticate, validateProfileUpdate, updateProfile);

// Upload avatar
router.post('/avatar', authenticate, uploadAvatar);

// Get user's services
router.get('/services', authenticate, getUserServices);

// Get user's bookings
router.get('/bookings', authenticate, getUserBookings);

module.exports = router;
