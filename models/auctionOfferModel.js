const mongoose = require('mongoose');

const auctionOfferSchema = new mongoose.Schema(
  {
    user :{
      type : mongoose.Types.ObjectId,
      ref : 'User',
    },
    offer :{
      type:Number,
    }, 
    auction :{
      type : mongoose.Types.ObjectId,
      ref : 'Auction',
    }
  },
  { timestamps: true }
);



const AuctionOffer = mongoose.model('AuctionOffer',auctionOfferSchema);
module.exports = AuctionOffer;