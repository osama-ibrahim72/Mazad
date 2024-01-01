const mongoose = require('mongoose');

const pointHistorySchema = new mongoose.Schema(
  {
    user :{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      unique: true,
    },
    dis:{
        type : String,
    },
    amount :{
      type : Number,
      default : 0,
    },
    stats :{
        type :Boolean,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('PointHistory', pointHistorySchema);