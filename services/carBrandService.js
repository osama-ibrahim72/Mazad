const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const CarBrand = require('../models/carBrandModel');



// @desc    Get list of CarBrands
// @route   GET /api/v1/CarBrands
// @access  Public
exports.getCarBrands = factory.getAllOnce(CarBrand);

// @desc    Get specific category by id
// @route   GET /api/v1/CarBrands/:id
// @access  Public
exports.getCarBrand = factory.getOne(CarBrand);

// @desc    Create CarBrand
// @route   POST  /api/v1/CarBrands
// @access  Private
exports.createCarBrand = factory.createOne(CarBrand);

// @desc    Update specific CarBrand
// @route   PUT /api/v1/CarBrands/:id
// @access  Private
exports.updateCarBrand = factory.updateOne(CarBrand);

// @desc    Delete specific CarBrand
// @route   DELETE /api/v1/CarBrands/:id
// @access  Private
exports.deleteCarBrand = factory.deleteOne(CarBrand);

