
const asyncHandler = require('express-async-handler');








const User = require('../models/userModel');




exports.addAmountUser =  asyncHandler(async (req, res) => { 
  const {id} = req.params;
  console.log(id);
  const amount = req.body.amount;
  var credit = await User.findById(id); 
  console.log(credit.credit);
  credit.credit = credit.credit+ amount;
  console.log(credit.credit);
  await credit.save();
  await CreditUserHistory.create({user : id , amount : amount});
  res.status(200).json({"data" : credit.credit});

});




exports.amountUser = asyncHandler(async(req,res)=>{
  const {id} = req.params;
  const credit = await User.findById(id);
  res.status(200).json({"data" : credit.credit});
})

exports.historyUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const history = await CreditUserHistory.find({user:id});
  res.status(200).json({data:history});
})

