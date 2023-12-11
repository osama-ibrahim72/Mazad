const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Shape = require('../models/shapeModel');



// @desc    Get list of Shapes
// @route   GET /api/v1/Shapes
// @access  Public
exports.getShapes = factory.getAll(Shape);

// @desc    Get specific Shape by id
// @route   GET /api/v1/Shapes/:id
// @access  Public
exports.getShape= factory.getOne(Shape);

// @desc    Create Shape
// @route   POST  /api/v1/Shapes
// @access  Private
exports.createShape = factory.createOne(Shape);

// @desc    Update specific Shape
// @route   PUT /api/v1/Shapes/:id
// @access  Private
exports.updateShape = factory.updateOne(Shape);

// @desc    Delete specific Shape
// @route   DELETE /api/v1/Shapes/:id
// @access  Private
exports.deleteShape = factory.deleteOne(Shape);

