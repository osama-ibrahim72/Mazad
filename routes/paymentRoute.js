const express = require('express');


const {
  addPayment,
 
} = require('../services/paymentService');

const router = express.Router();

router
  .route('/')
  .post( addPayment);



module.exports = router;