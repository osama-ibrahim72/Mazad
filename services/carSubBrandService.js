const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const CarSubBrand = require('../models/carSubBrandModel');
const CarBrand = require('../models/carBrandModel');




// @desc    Get list of CarSubBrands
// @route   GET /api/v1/CarSubBrands
// @access  Public
exports.getCarSubBrands = factory.getAllOnce(CarSubBrand);

// @desc    Get specific category by id
// @route   GET /api/v1/CarSubBrands/:id
// @access  Public
exports.getCarSubBrand = factory.getOne(CarSubBrand);

// @desc    Create CarSubBrand
// @route   POST  /api/v1/CarSubBrands
// @access  Private
exports.createCarSubBrand = factory.createOne(CarSubBrand);

// @desc    Update specific CarSubBrand
// @route   PUT /api/v1/CarSubBrands/:id
// @access  Private
exports.updateCarSubBrand = factory.updateOne(CarSubBrand);

// @desc    Delete specific CarSubBrand
// @route   DELETE /api/v1/CarSubBrands/:id
// @access  Private
exports.deleteCarSubBrand = factory.deleteOne(CarSubBrand);

exports.getSubBrandByBrand = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const carSubBrand  = await CarSubBrand.find({carBrand: id}); 
    res
      .status(200)
      .json({ data : carSubBrand });
});