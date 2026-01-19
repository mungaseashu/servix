const Opportunity = require('../models/Opportunity');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all opportunities
const getAllOpportunities = async (req, res) => {
  try {
    const { 
      category, 
      page = 1, 
      limit = 12, 
      search, 
      location,
      urgent,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { status: 'open' };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skillsRequired: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (urgent) {
      query.urgent = urgent === 'true';
    }

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const opportunities = await Opportunity.find(query)
      .populate('postedBy', 'name email rating avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Opportunity.countDocuments(query);

    res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get opportunities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get opportunity by ID
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('postedBy', 'name email rating avatar location specialties')
      .populate('applicants.user', 'name email rating specialties');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    res.json({
      success: true,
      data: { opportunity }
    });
  } catch (error) {
    console.error('Get opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new opportunity
const createOpportunity = async (req, res) => {
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
      title,
      description,
      category,
      budget,
      location,
      deadline,
      urgent,
      skillsRequired
    } = req.body;

    const opportunity = new Opportunity({
      title,
      description,
      category,
      budget,
      location,
      deadline,
      urgent,
      skillsRequired,
      postedBy: req.user.userId
    });

    await opportunity.save();

    res.status(201).json({
      success: true,
      message: 'Opportunity created successfully',
      data: { opportunity }
    });
  } catch (error) {
    console.error('Create opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Apply to opportunity
const applyToOpportunity = async (req, res) => {
  try {
    const { message } = req.body;
    const opportunityId = req.params.id;

    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    // Check if already applied
    const alreadyApplied = opportunity.applicants.some(
      applicant => applicant.user.toString() === req.user.userId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'Already applied to this opportunity'
      });
    }

    // Add applicant
    opportunity.applicants.push({
      user: req.user.userId,
      message,
      appliedAt: new Date()
    });

    await opportunity.save();

    res.json({
      success: true,
      message: 'Applied to opportunity successfully'
    });
  } catch (error) {
    console.error('Apply to opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update opportunity
const updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    // Check if user posted this opportunity
    if (opportunity.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this opportunity'
      });
    }

    const {
      title,
      description,
      category,
      budget,
      location,
      deadline,
      status,
      urgent
    } = req.body;

    // Update fields
    if (title) opportunity.title = title;
    if (description) opportunity.description = description;
    if (category) opportunity.category = category;
    if (budget) opportunity.budget = budget;
    if (location) opportunity.location = location;
    if (deadline) opportunity.deadline = deadline;
    if (status) opportunity.status = status;
    if (urgent !== undefined) opportunity.urgent = urgent;

    await opportunity.save();

    res.json({
      success: true,
      message: 'Opportunity updated successfully',
      data: { opportunity }
    });
  } catch (error) {
    console.error('Update opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete opportunity
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'Opportunity not found'
      });
    }

    // Check if user posted this opportunity
    if (opportunity.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this opportunity'
      });
    }

    await Opportunity.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Opportunity deleted successfully'
    });
  } catch (error) {
    console.error('Delete opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  applyToOpportunity,
  updateOpportunity,
  deleteOpportunity
};
