// const sharp = require('sharp');
// const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Mazad = require('../models/mazadModel');


const ApiFeatures = require('../utils/apiFeatures');




// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getMazadat = factory.getAll(Mazad);

exports.addOffer = asyncHandler(async(req,res)=>{

});
  

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getMazad = factory.getOne(Mazad);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createMazad = factory.createOne(Mazad);






exports.joinAuuction = asyncHandler (async (req, res) => {
  
});



exports.home = asyncHandler (async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Mazad.countDocuments();
    const apiFeatures = new ApiFeatures(Mazad.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(Mazad)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
});


