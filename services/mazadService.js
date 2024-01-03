// const sharp = require('sharp');
// const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Mazad = require('../models/mazadModel');
const User = require('../models/userModel');
const AppCotroller = require('../models/appControllerModel');
const MazadJoined = require('../models/mazadJoinedModel');


const ApiFeatures = require('../utils/apiFeatures');




// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getMazadat = factory.getAll(Mazad);

exports.addOffer = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.body.user);
  const mazad = await Mazad.findById(req.body.mazad);
  const control = await AppCotroller.findById({git:75});
  const offer = req.body.offer;
  if(mazad.bestoffer < offer){
    const lastUser = await User.findById(mazad.winner);
    await MazadJoined.create({user : user , mazad : mazad});
    lastUser.credit = lastUser.credit + control.commission;
    lastUser.save();
    mazad.bestoffer = offer;
    mazad.winner = user;
    mazad.save();
    user.credit = user.credit - control.commission;
  }
  res.status(200);
});
  

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getMazad = factory.getOne(Mazad);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createMazad = factory.createOne(Mazad);






exports.joinedMazad = asyncHandler (async (req, res) => {
  const { id } = req.params;
  let filter = {};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const documentsCounts = await Mazad.countDocuments();
  const apiFeatures = new ApiFeatures(MazadJoined.findById({user : id}).populate({ path: 'user', select:'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel'}), req.query)
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



exports.home = asyncHandler (async (req, res) => {
  const mazadat = await Mazad.find({}); 
  // Create a new Date object
  var currentDate = new Date();
  console.log(currentDate);
  mazadat.forEach(item=>{
    
    var finalDate = new Date(item.time);
    finalDate.setDate(item.time + item.numberOfDays);
    console.log(finalDate);
    if(item.status == 0 && item.time > currentDate){
      item.status = 1;
      item.save();
      console.log(item.status);
    }
    else if (item.status == 1 && currentDate > finalDate){
      item.status = 2;
      item.save();
      console.log(item.status);
    }

    // if(finalDate > currentDate && item.time > currentDate){
    //   item.remainingDate = finalDate - currentDate; 
    //   item.status = 1; 
    //   console.log(item.remainingDate);
    //   item.save();
    
    // }
    // else if (finalDate < currentDate){
    //   item.status =2; 
    // }
    // item.save();
  })
    let filter = {status : 1};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Mazad.countDocuments();
    const apiFeatures = new ApiFeatures(Mazad.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel').populate('model shape subCategory category carSubBrand carBrand').populate({ path: 'user', select: '_id name area city' }).populate({ path: 'winner', select: '_id name' }), req.query)
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



exports.coomingSoon = asyncHandler (async (req, res) => {
    let filter = {stuts : 0};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Mazad.countDocuments();
    const apiFeatures = new ApiFeatures(Mazad.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel').populate('model shape subCategory category carSubBrand carBrand').populate({ path: 'user', select: '_id name area city' }).populate({ path: 'winner', select: '_id name' }), req.query)
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

exports.expired = asyncHandler (async (req, res) => {
  let filter = {status : 2};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const documentsCounts = await Mazad.countDocuments();
  const apiFeatures = new ApiFeatures(Mazad.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel').populate('model shape subCategory category carSubBrand carBrand').populate({ path: 'user', select: '_id name area city' }).populate({ path: 'winner', select: '_id name' }), req.query)
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


exports.running = asyncHandler (async (req, res) => {
  let filter = {status : 2};
  if (req.filterObj) {
    filter = req.filterObj;
  }
  const documentsCounts = await Mazad.countDocuments();
  const apiFeatures = new ApiFeatures(Mazad.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel').populate('model shape subCategory category carSubBrand carBrand').populate({ path: 'user', select: '_id name area city' }).populate({ path: 'winner', select: '_id name' }), req.query)
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