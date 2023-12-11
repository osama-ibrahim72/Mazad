const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  getShape,
  getShapes,
  createShape,
  deleteShape,
  updateShape,
} = require('../services/shapeService');

const router = express.Router();

router
  .route('/')
  .get(getShapes)
  .post(createShape);
router
  .route('/:id')
  .get(getShape)
  .put(updateShape)
  .delete( deleteShape);


module.exports = router;