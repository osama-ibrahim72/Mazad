const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  getCarBrands,
  createCarBrand,
  deleteCarBrand,
  updateCarBrand,
  getCarBrand,
} = require('../services/carBrandService');

const router = express.Router();

router
  .route('/')
  .get(getCarBrands)
  .post( createCarBrand  );
router
  .route('/:id')
  .get( getCarBrand)
  .put( updateCarBrand)
  .delete( deleteCarBrand);


module.exports = router;