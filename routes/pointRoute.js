const express = require('express');
// const {
//   getProductValidator,
//   createProductValidator,
//   updateProductValidator,
//   deleteProductValidator,
// } = require('../utils/validators/productValidator');

const {
  getPoint,
  //updatePoint,
} = require('../services/pointService');

const router = express.Router();

router
  .route('/:id')
  .get(getPoint);
  //.put(updatePoint)
  

module.exports = router;