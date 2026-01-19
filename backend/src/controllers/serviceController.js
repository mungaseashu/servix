const Service = require('../models/Service');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { 
      category, 
      page = 1, 
      limit = 12, 
      search, 
      location,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { specialties: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Sort options
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const services = await Service.find(query)
      .populate('provider', 'name email rating location avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name email rating location avatar specialties');

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.json({
      success: true,
      data: { service }
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create new service
const createService = async (req, res) => {
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
      name,
      category,
      description,
      priceRange,
      duration,
      specialties,
      location
    } = req.body;

    const service = new Service({
      name,
      category,
      description,
      priceRange,
      duration,
      specialties,
      location,
      provider: req.user.userId
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service }
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user owns the service
    if (service.provider.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this service'
      });
    }

    const {
      name,
      category,
      description,
      priceRange,
      duration,
      specialties,
      location,
      availability
    } = req.body;

    // Update fields
    if (name) service.name = name;
    if (category) service.category = category;
    if (description) service.description = description;
    if (priceRange) service.priceRange = priceRange;
    if (duration) service.duration = duration;
    if (specialties) service.specialties = specialties;
    if (location) service.location = location;
    if (availability) service.availability = availability;

    await service.save();

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service }
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    // Check if user owns the service
    if (service.provider.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this service'
      });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Search services
const searchServices = async (req, res) => {
  try {
    const { q, category, location, page = 1, limit = 12 } = req.query;

    const query = { isActive: true };

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { specialties: { $in: [new RegExp(q, 'i')] } }
      ];
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const services = await Service.find(query)
      .populate('provider', 'name email rating location avatar')
      .sort({ rating: -1, reviewCount: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: {
        services,
        pagination: {
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });
  } catch (error) {
    console.error('Search services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  searchServices
};
