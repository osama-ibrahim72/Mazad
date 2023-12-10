const mongoose = require('mongoose');

const auctionJoinedSchema = new mongoose.Schema(
  {
    user :{
      type : mongoose.Types.ObjectId,
      ref : 'User',
    },
    auction :{
      type : mongoose.Types.ObjectId,
      ref : 'Auction',
    }
  },
  { timestamps: true }
);



const AuctionJoined = mongoose.model('AuctionJoined',auctionJoinedSchema);
module.exports = AuctionJoined;
