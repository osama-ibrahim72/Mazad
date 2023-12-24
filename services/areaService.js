const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Area = require('../models/areaModel');



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getAreas = factory.getAllOnce(Area);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getArea = factory.getOne(Area);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createArea = factory.createOne(Area);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateArea = factory.updateOne(Area);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteArea = factory.deleteOne(Area);

