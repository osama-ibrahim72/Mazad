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
  getTermsUser,
  updateTermsUser,
  getPrivacySeller,
  getPrivacyUser,
  getTermsSeller,
  updatePrivacySeller,
  updatePrivacyUser,
  updateTermsSeller,
  
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


router.route('/terms').get(getTermsUser).put(updateTermsUser);
router.route('/privacy').get(getPrivacyUser).put(updatePrivacyUser);

module.exports = router;