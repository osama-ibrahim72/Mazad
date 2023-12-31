const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const Favourite = require('../models/favouriteModel');



// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getFavourite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let filter = {user :id};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    const documentsCounts = await Favourite.countDocuments();
    const apiFeatures = new ApiFeatures(Favourite.find(filter , 'title price _id numberOfDays bestoffer time category status isCar remainingDate description user category carBrand carSubBrand subCategory shape model winner cancel').populate('model shape subCategory category carSubBrand carBrand').populate({ path: 'user', select: '_id name area city' }).populate({ path: 'winner', select: '_id name' }), req.query)
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
//exports.addProduct = factory.createOne(Cart);

exports.addMazad = asyncHandler( async(req, res) =>{
  const user = req.query.user;
  const mazad = req.query.mazad;
  const isCar = req.query.isCar;
  const fav = await Favourite.find({user: user , mazad: mazad});
  if(fav){
    await Favourite.deleteById(fav._id);
    res.status(200).json({data :true});
  }
  else{
    Favourite.create({user: user, mazad: mazad, isCar: isCar});
    res.status(200).json({data :false});
  }
  
})


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteMazad = factory.deleteOne(Favourite);