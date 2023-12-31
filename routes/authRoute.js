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
  protect,
  update,
} = require('../services/authService');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.put('/sendOTP', sendOTP);
router.put('/getOTP', getOTP);
router.post('/forgotPassword', forgotPassword);
router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);
router.put('/changePassword', changePassword);
router.put('/protect', protect);
router.put('/update', update);




module.exports = router;