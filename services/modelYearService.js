const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const ModelYear = require('../models/modelYearModel');



// @desc    Get list of ModelYears
// @route   GET /api/v1/ModelYears
// @access  Public
exports.getModelYears = factory.getAllOnce(ModelYear);

// @desc    Get specific ModelYear by id
// @route   GET /api/v1/ModelYears/:id
// @access  Public
exports.getModelYear= factory.getOne(ModelYear);

// @desc    Create ModelYear
// @route   POST  /api/v1/ModelYears
// @access  Private
exports.createModelYear = factory.createOne(ModelYear);

// @desc    Update specific ModelYear
// @route   PUT /api/v1/ModelYears/:id
// @access  Private
exports.updateModelYear = factory.updateOne(ModelYear);

// @desc    Delete specific ModelYear
// @route   DELETE /api/v1/ModelYears/:id
// @access  Private
exports.deleteModelYear = factory.deleteOne(ModelYear);

