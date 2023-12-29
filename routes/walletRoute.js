const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  addAmountUser , 
  amountUser,
  historyUser,
} = require('../services/walletService');

const router = express.Router();

router
  .route('/:id')
  .get(amountUser)
  .post( addAmountUser);
router.route('/history/:id').post(historyUser);

module.exports = router;