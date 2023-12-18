const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  getSupports,
  getSupport,
  createSupport,
  deleteSupport,
} = require('../services/supportService');

const router = express.Router();

router
  .route('/')
  .get(getSupports)
  .post(/*createCategoryValidator,*/ createSupport);
router
  .route('/:id')
  .get(/*getCategoryValidator,*/ getSupport)
  .delete(/*deleteSupport,*/ deleteSupport);

  //.put(updateCategoryValidator, updateCategory)
  //.delete(deleteCategoryValidator, deleteCategory);

module.exports = router;