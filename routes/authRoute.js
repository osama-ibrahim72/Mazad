const express = require('express');
const {
  signupValidator,
  loginValidator,


  
} = require('../utils/validators/authValidator');

const {
  signup,
  login,
  forgotPassword,
  verifyPassResetCode,
  resetPassword,
  sendOTP,
  getOTP,
  changePassword,
} = require('../services/authService');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.get('/sendOTP/:id', sendOTP);
router.post('/getOTP', getOTP);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);
router.put('/changePassword', changePassword);



module.exports = router;