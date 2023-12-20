const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const City = require('../models/cityModel');



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCities = factory.getAll(City);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCity = factory.getOne(City);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCity = factory.createOne(City);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCity = factory.updateOne(City);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCity = factory.deleteOne(City);

exports.getCityByArea = asyncHandler(async (req,res) => {
    const { id } = req.params;
    const city  = await City.find({area: id}); 
    res
      .status(200)
      .json({ data : city });
});