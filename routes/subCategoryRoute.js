const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
 createSubCategory,
 deleteSubCategory,
 getSubCategories,
 getSubCategory,
 updateSubCategory,
 getSubByCat
} = require('../services/subCategoryService');

const router = express.Router();

router
  .route('/')
  .get(getSubCategories)
  .post( createSubCategory );
router
  .route('/:id')
  .get(getSubCategory )
  .put(updateSubCategory)
  .delete(deleteSubCategory);

  router
  .route('/category/:id')
  .get(getSubByCat )


module.exports = router;