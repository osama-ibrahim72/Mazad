const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
createArea,
deleteArea,
getArea,
getAreas,
updateArea,
} = require('../services/areaService');

const router = express.Router();

router
  .route('/')
  .get(getAreas)
  .post(createArea);
router
  .route('/:id')
  .get(getArea)
  .put(updateArea)
  .delete(deleteArea);


module.exports = router;