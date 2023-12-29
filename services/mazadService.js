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
  const mazadat = await Mazad.find(); 
  // Create a new Date object
  var currentDate = new Date();
  mazadat.forEach(item=>{
    var finalDate = new Date(item.time);
    finalDate.setDate(item.time + item.numberOfDays);

    if(finalDate > currentDate && item.time > currentDate){
      item.remainingDate = finalDate - currentDate; 
      item.status = 1; 
    
    }
    else if (finalDate < currentDate){
      item.status =2; 
    }
    item.save();
  })
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Mazad.countDocuments();
    const apiFeatures = new ApiFeatures(Mazad.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate').populate({ path: 'user', select: '_id name area' }), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(Mazad)
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    var documents = await mongooseQuery;

   
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
});

exports.mazadPhotos = asyncHandler (async (req, res) =>{
  const { id } = req.params;
  const photos = await Mazad.findById(id , 'imageCover images');
  res.status(200).json({data : photos});
});

exports.mazadProfile = asyncHandler (async (req, res) =>{
  const { id } = req.params;
  const photos = await Mazad.findById(id , 'user').populate({ path: 'user', select: 'profileImg' });
  res.status(200).json({data : photos});
});



exports.mazadDate = asyncHandler (async (req, res , next) =>{
  const mazadat = await Mazad.find(); 
  // Create a new Date object
  var currentDate = new Date();
  mazadat.forEach(item=>{
    var finalDate = new Date(item.time);
    finalDate.setDate(item.time + item.numberOfDays);

    if(finalDate > currentDate && item.time > currentDate){
      item.remainingDate = finalDate - currentDate; 
      item.status = 1; 
    
    }
    else if (finalDate < currentDate){
      item.status =2; 
    }
    item.save();
  })
  next(home);


});
