const express = require('express');
const router = express.Router();
const { 
  getAllOpportunities, 
  getOpportunityById, 
  createOpportunity, 
  applyToOpportunity,
  updateOpportunity, 
  deleteOpportunity 
} = require('../controllers/opportunityController');
const { validateOpportunity } = require('../middleware/validation');
const { authenticate, authorize } = require('../middleware/auth');

// Get all opportunities
router.get('/', getAllOpportunities);

// Get opportunity by ID
router.get('/:id', getOpportunityById);

// Create new opportunity
router.post('/', authenticate, validateOpportunity, createOpportunity);

// Apply to opportunity
router.post('/:id/apply', authenticate, applyToOpportunity);

// Update opportunity
router.put('/:id', authenticate, validateOpportunity, updateOpportunity);

// Delete opportunity
router.delete('/:id', authenticate, deleteOpportunity);

module.exports = router;
