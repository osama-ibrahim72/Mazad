const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Auction = require('../models/auctionModel');
const User = require('../models/userModel');
const AppController = require('../models/appControllerModel');


const AuctionJoined = require('../models/auctionJoinedModel');
const AuctionOffer = require('../models/auctionOfferModel');




// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getAuctions = factory.getAll(Auction);

exports.addOffer = asyncHandler(async(req,res)=>{
  const user = req.body.user;
  const auction_id = req.body.auction;
  const offer = req.body.offer;
  const auction = await Auction.findById(auction_id);
  const cur = new Date();
  if(offer > auction.bestoffer && cur < auction.time){
    auction.bestoffer = offer;
    auction.user = user;
    await auction.save();
    res.status(200).json(auction);
  }
  else {
    res.status(500);
  } 

});
  

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getAuction = factory.getOne(Auction);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createAuction = asyncHandler(async (req, res) => {
  const newDoc = await Auction.create(req.body);

  res.status(201).json({ data: newDoc });
});






exports.joinAuuction = asyncHandler (async (req, res) => {
  const user = await User.findById(req.body.user)  ;

  const auction = await Auction.findById( req.body.auction) ; 
  const ctrl = await AppController.findOne({git:75});

  if (user.credit >= ctrl.depositAuctionUser ){
    const join = await AuctionJoined.create({user: user , auction: auction});
    res.status(200).json(join);
  }
  else{
    res.status(500).json({"error" : "not avaliavble to this acition!"});

  }
});



exports.auctionSellers = asyncHandler (async (req, res) => {
  const {id}  = req.params;
  const auction = await Auction.find({seller : id});
  res.status(200).json({"results" :auction.length , "data" : auction})
});


