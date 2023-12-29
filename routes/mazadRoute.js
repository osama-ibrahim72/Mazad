const express = require('express');
// const {
//   signupValidator,
//   loginValidator,


  
// } = require('../utils/validators/authValidator');

const {
  home,
  createMazad,
  getMazad,
  getMazadat,
  mazadPhotos,
  mazadProfile,
  mazadDate,
} = require('../services/mazadService');

const router = express.Router();
router
  .route('/')
  .get(getMazadat)
  .post(createMazad);

router
  .route('/home')
  .get(/*mazadDate*/ home);
  

router
  .route('/photos/:id')
  .get(mazadPhotos);
  
  router
  .route('/profile/:id')
  .get(mazadProfile);
  


module.exports = router;