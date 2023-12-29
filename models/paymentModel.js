const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
      order:{
        type : mongoose.Types.ObjectId,
        ref : 'Order',
      },
      status:{
        type : Boolean,
      },
      method :{
        type : String,
      }
    },
    { timestamps: true }
  );
  

  const Payment = mongoose.model('Payment', paymentSchema);
  
  module.exports = Payment;