const crypto = require('crypto');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const sendEmail = require('../utils/sendEmail');
const createToken = require('../utils/createToken');

const User = require('../models/userModel');

// @desc    Signup
// @route   POST /api/v1/auth/signup
// @access  Public
exports.signup = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    phone: req.body.phone,
    email : req.body.email,
    password: req.body.password,
    area : req.body.area,
    city : req.body.city,
    profileImg : req.body.profileImg
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token });
});

// @desc    Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError('Incorrect phone or password', 401));
  }
  // 3) generate token
  const token = createToken(user._id);

  // Delete password from response
  delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});

// @desc    make sure the user is logged in
// @route   PUT /api/v1/auth/protect
// @access  Public
exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Check if token exist, if exist get
  let token = req.body.token; 

  // 2) Verify token (no change happens, expired token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 3) Check if user exists
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    res.status(401).json({ error: 'The user that belong to this token does no longer exist'});
  }
  else{
    res.status(200).json({ data: currentUser, token });
  }
});



// @desc    Authorization (User Permissions)
// ["admin", "manager"]
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError('You are not allowed to access this route', 403)
      );
    }
    next();
  });


// @desc    send Otp to user
// @route   PUT /api/v1/auth/sendOTP
// @access  Public  
  exports.sendOTP = asyncHandler(async (req, res, next) =>{
    // 1) Check if token exist, if exist get
    let token = req.body.token; 

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new ApiError(
          'The user that belong to this token does no longer exist',
          401
        )
      );
    }
    otpV = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    currentUser.otp = otpV;
    await currentUser.save();
    sendEmail(currentUser);
    res.status(201).json({"otp" : currentUser.otp});
});


// @desc    get Otp from user 
// @route   PUT /api/v1/auth/getOTP
// @access  Public
exports.getOTP = asyncHandler(async (req, res, next) =>{
    // 1) Check if token exist, if exist get
    let token = req.body.token; 

    // 2) Verify token (no change happens, expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) Check if user exists
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(
        new ApiError(
          'The user that belong to this token does no longer exist',
          401
        )
      );
    }
    const otp = req.body.otp;
    console.log(otp);
    console.log(currentUser.otp);
    if(otp == currentUser.otp){
      currentUser.active =true;
      await currentUser.save();
      res.status(201).json({ data: currentUser});
    }
    else{
      return next(
        new ApiError(
          'OTP is false',
          401
        )
      );
    }
    
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotPassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    otpV = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    user.otp = otpV;
    await user.save();
    sendEmail(user);
    res.status(201).json({"email" : user.email});
});

// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  const otp = req.body.otp;
  const email = req.body.email;
  const user = await User.findOne({ email:email ,otp :otp});
  if(otp == user.otp){
    user.active =true;
    await user.save();
    res.status(201).json({ data: user});
  }
  else{
    res.status(400);
  }

});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  const newPassword = req.body.newPassword;
  const newPasswordConfirm = req.body.newPasswordConfirm;
  if(newPassword != newPasswordConfirm){
    res.status(500).json({});
  }else{
  
  user.password = req.body.newPassword;
  

  await user.save();

  // 3) if everything is ok, generate token
  const token = user._id;
  res.status(200).json({ token });
  }
});

exports.changePassword = asyncHandler (async (req,res)=>{
 // 1) Check if token exist, if exist get
 let token = req.body.token; 

 // 2) Verify token (no change happens, expired token)
 const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

 // 3) Check if user exists
 const currentUser = await User.findById(decoded.userId);
 if (!currentUser) {
   return next(
     new ApiError(
       'The user that belong to this token does no longer exist',
       401
     )
   );
 } 
  const newPassword = req.body.newPassword;
  const newPasswordConfirm = req.body.newPasswordConfirm;
  if (await bcrypt.compare(req.body.oldPassword , currentUser.password)&& newPassword == newPasswordConfirm) {
    currentUser.password = newPassword;
    await currentUser.save();
    res.status(200).json({});
  }
  else 
    res.status(500).json({});
});

// // @desc    Forgot password
// // @route   POST /api/v1/auth/forgotPassword
// // @access  Public
// exports.forgotPassword = asyncHandler(async (req, res, next) => {
//   // 1) Get user by email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(
//       new ApiError(`There is no user with that email ${req.body.email}`, 404)
//     );
//   }
//   // 2) If user exist, Generate hash reset random 6 digits and save it in db
//   const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
//   const hashedResetCode = crypto
//     .createHash('sha256')
//     .update(resetCode)
//     .digest('hex');

//   // Save hashed password reset code into db
//   user.passwordResetCode = hashedResetCode;
//   // Add expiration time for password reset code (10 min)
//   user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   user.passwordResetVerified = false;

//   await user.save();

//   // 3) Send the reset code via email
//   const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
//   try {
//     await sendEmail({
//       email: user.email,
//       subject: 'Your password reset code (valid for 10 min)',
//       message,
//     });
//   } catch (err) {
//     user.passwordResetCode = undefined;
//     user.passwordResetExpires = undefined;
//     user.passwordResetVerified = undefined;

//     await user.save();
//     return next(new ApiError('There is an error in sending email', 500));
//   }

//   res
//     .status(200)
//     .json({ status: 'Success', message: 'Reset code sent to email' });
// });

// // @desc    Verify password reset code
// // @route   POST /api/v1/auth/verifyResetCode
// // @access  Public
// exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
//   // 1) Get user based on reset code
//   const hashedResetCode = crypto
//     .createHash('sha256')
//     .update(req.body.resetCode)
//     .digest('hex');

//   const user = await User.findOne({
//     passwordResetCode: hashedResetCode,
//     passwordResetExpires: { $gt: Date.now() },
//   });
//   if (!user) {
//     return next(new ApiError('Reset code invalid or expired'));
//   }

//   // 2) Reset code valid
//   user.passwordResetVerified = true;
//   await user.save();

//   res.status(200).json({
//     status: 'Success',
//   });
// });

// // @desc    Reset password
// // @route   POST /api/v1/auth/resetPassword
// // @access  Public
// exports.resetPassword = asyncHandler(async (req, res, next) => {
//   // 1) Get user based on email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return next(
//       new ApiError(`There is no user with email ${req.body.email}`, 404)
//     );
//   }

//   // 2) Check if reset code verified
//   if (!user.passwordResetVerified) {
//     return next(new ApiError('Reset code not verified', 400));
//   }

//   user.password = req.body.newPassword;
//   user.passwordResetCode = undefined;
//   user.passwordResetExpires = undefined;
//   user.passwordResetVerified = undefined;

//   await user.save();

//   // 3) if everything is ok, generate token
//   const token = createToken(user._id);
//   res.status(200).json({ token });
// });

