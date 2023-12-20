const express = require('express');
// const {
//   getCategoryValidator,
//   createCategoryValidator,
//   updateCategoryValidator,
//   deleteCategoryValidator,
// } = require('../utils/validators/categoryValidator');

const {
  getControllers,
  getController,
  addControllers,
  updateControllers,
  getTerms,
  updateTerms,
  getPrivacy,
  updatePrivacy,
  
} = require('../services/appControllerService');

const router = express.Router();

router
  .route('/')
  .get(getControllers)
  .post( addControllers);
router
  .route('/:id')
  .get (getController)
  .put( updateControllers);


router.route('/terms').get(getTerms).put(updateTerms);
router.route('/privacy').get(getPrivacy).put(updatePrivacy);

module.exports = router;