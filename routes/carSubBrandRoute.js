const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  createCarSubBrand,
  deleteCarSubBrand,
  getCarSubBrand,
  getCarSubBrands,
  updateCarSubBrand,
  getSubBrandByBrand,
} = require('../services/carSubBrandService');

const router = express.Router();

router
  .route('/')
  .get(getCarSubBrands)
  .post( createCarSubBrand  );
router
  .route('/:id')
  .get( getCarSubBrand)
  .put( updateCarSubBrand)
  .delete( deleteCarSubBrand);

router.route('/carBrand/:id').get(getSubBrandByBrand);


module.exports = router;