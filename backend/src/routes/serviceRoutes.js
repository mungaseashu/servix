const express = require('express');
const router = express.Router();
const { 
  getAllServices, 
  getServiceById, 
  createService, 
  updateService, 
  deleteService, 
  searchServices 
} = require('../controllers/serviceController');
const { validateService } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

// Get all services
router.get('/', getAllServices);

// Search services
router.get('/search', searchServices);

// Get service by ID
router.get('/:id', getServiceById);

// Create new service (providers only)
router.post('/', authenticate, authorize('provider', 'admin'), validateService, createService);

// Update service (providers only)
router.put('/:id', authenticate, authorize('provider', 'admin'), validateService, updateService);

// Delete service (providers only)
router.delete('/:id', authenticate, authorize('provider', 'admin'), deleteService);

module.exports = router;
