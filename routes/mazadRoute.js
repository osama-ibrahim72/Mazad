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
} = require('../services/mazadService');

const router = express.Router();
router
  .route('/')
  .get(getMazadat)
  .post(createMazad);

router
  .route('/home')
  .get(home);
  



module.exports = router;