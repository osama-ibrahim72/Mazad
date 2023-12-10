const mongoose = require('mongoose');

const appControllerSchema = new mongoose.Schema(
  {
    commission :{
      type: Number,
    },
    depositAuctionSeller:{
      type: Number,
    },
    depositAuctionUser:{
      type: Number,
    },
    pointValue:{
      type: Number,
    },
    termsUser :{
      type:String,
    },
    termsSeller :{
      type:String,
    },
    privacyUser :{
      type:String,
    },
    privacySeller :{
      type : String,
    },
    git :{
      type : Number,
      default : 75, 
    },
    vat :{
      type : Number,
    },
    zeka :{
      type : Number,
    },
    companyAddress:{
      type: String,
    },
    companyRegisterNumber:{
      type: Number,
    }

    
    
  },
  { timestamps: true }
);
const AppController = mongoose.model('AppController', appControllerSchema);
module.exports = AppController;