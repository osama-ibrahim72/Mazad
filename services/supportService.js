const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const Support = require('../models/supportModel');



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getSupports = factory.getAll(Support);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getSupport = factory.getOne(Support);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createSupport = factory.createOne(Support);


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteSupport = factory.deleteOne(Support);