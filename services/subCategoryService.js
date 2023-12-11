const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const SubCategory = require('../models/subCategoryModel');



// @desc    Get list of SubCategories
// @route   GET /api/v1/SubCategories
// @access  Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc    Get specific SubCategory by id
// @route   GET /api/v1/SubCategories/:id
// @access  Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    Create SubCategory
// @route   POST  /api/v1/SubCategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc    Update specific SubCategory
// @route   PUT /api/v1/SubCategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc    Delete specific SubCategory
// @route   DELETE /api/v1/SubCategories/:id
// @access  Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);

