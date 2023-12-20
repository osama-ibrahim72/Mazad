const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
createCity,
deleteCity,
getCities,
getCity,
updateCity,
getCityByArea,
} = require('../services/cityService');

const router = express.Router();

router
  .route('/')
  .get(getCities)
  .post(createCity);
router.route('/area/:id').get(getCityByArea);
router
  .route('/:id')
  .get(getCity)
  .put(updateCity)
  .delete(deleteCity);


module.exports = router;