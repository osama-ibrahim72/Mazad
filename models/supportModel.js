const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
    {
      user:{
        type : mongoose.Types.ObjectId,
        ref : 'User',
      },
      seller:{
        type : mongoose.Types.ObjectId,
        ref : 'Seller',
      },
      title : {
        type : String,
      },
      description : {
        type : String,
      }
    },
    { timestamps: true }
  );
  

  const Support = mongoose.model('Support', supportSchema);
  
  module.exports = Support;