const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name required'],
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: true,
      lowercase: true,
    },
    phone:{
      type : String,
      required: [true, 'phone required'],
      unique: true,
    },
    profileImg: String,

    password: {
      type: String,
      required: [true, 'password required'],
      minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    otp:{
      type : String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    credit :{
      type : Number,
      default : 0,
    },
    area :{
      type : String,
    },
    city:{
      type : String,
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;