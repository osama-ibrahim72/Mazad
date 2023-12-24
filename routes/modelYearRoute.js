const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
createModelYear,
deleteModelYear,
getModelYear,
updateModelYear,
getModelYears
} = require('../services/modelYearService');

const router = express.Router();

router
  .route('/')
  .get(getModelYears)
  .post(createModelYear);
router
  .route('/:id')
  .get(getModelYear)
  .put(updateModelYear)
  .delete( deleteModelYear);


module.exports = router;