const mongoose = require('mongoose');

const creditUserHistorySchema = new mongoose.Schema(
    {
      user:{
        type : mongoose.Types.ObjectId,
        ref : 'User',
      },
      order:{
        type : mongoose.Types.ObjectId,
        ref : 'Order',
      },
      amount:{
        type : Number,
      }
    },
    { timestamps: true }
  );
  

  const CreditUserHistory = mongoose.model('CreditUserHistory', creditUserHistorySchema);
  
  module.exports = CreditUserHistory;