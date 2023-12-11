const express = require('express');
// const {
//   signupValidator,
//   loginValidator,


  
// } = require('../utils/validators/authValidator');

const {
  home,
} = require('../services/mazadService');

const router = express.Router();

router
  .route('/home')
  .get(home);
  



module.exports = router;