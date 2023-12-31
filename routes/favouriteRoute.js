const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  getFavourite,
  addMazad,
  deleteMazad,
} = require('../services/favouriteService');

const router = express.Router();

router
  .route('/')
  .post( addMazad);
router
  .route('/:id')
  .get( getFavourite )
  .delete( deleteMazad );


module.exports = router;