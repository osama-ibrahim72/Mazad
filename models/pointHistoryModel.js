const mongoose = require('mongoose');

const pointHistorySchema = new mongoose.Schema(
  {
    seller :{
      type: mongoose.Schema.ObjectId,
      ref: 'Seller',
      unique: true,
      required: [true, 'ptonts must be belong to seller'],
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