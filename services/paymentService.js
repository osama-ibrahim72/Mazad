const factory = require('./handlersFactory');
const Payment = require('../models/paymentModel');
const User = require('../models/userModel');
const AppController = require('../models/appControllerModel');
const CreditUserHistory = require('../models/creditUserHistoryModel');
const Mazad = require('../models/mazadModel');







const ApiError = require('../utils/apiError');


const asyncHandler = require('express-async-handler');



exports.addPayment = asyncHandler(async (req, res) => {
  const mazad =  req.body.mazad;
  const status  = req.body.status; 
  const method = req.body.method;
  const payment = await Payment.findOne({mazad : mazad});
  payment.method = req.body.method;
  const control = await AppController.findOne({git : 75}) ; 
  if (req.body.method == "credit"){
    const user = await User.findById(req.body.user);

    if(user.credit >= (mazad.bestOffer  * control.commission ) / 100 ){
      console.log("if user has enogh credit");
      payment.status = true ; 
      user.credit -= (mazad.bestOffer  * control.commission ) / 100;
      user.save();
      payment.save();
      await CreditUserHistory.create({user : req.body.user , amount : ((mazad.bestOffer  * control.commission ) / 100) * -1 })
      //Cart.save();
    }
    else if (user.credit <= (mazad.bestOffer  * control.commission ) / 100) {
      console.log("if user has not credit");
      res.status(500)
    }
  }
  else {
    payment.status = true ; 
    payment.method = method ; 
    payment.save();
      
  } 
  res.status(200).json({"data":payment});
  
});







