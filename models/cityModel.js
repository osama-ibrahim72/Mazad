const mongoose = require('mongoose');
// 1- Create Schema
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    area :{
      type: mongoose.Schema.ObjectId,
      ref : 'Area',
    }
  },
  { timestamps: true }
);

// 2- Create model
const CityModel = mongoose.model('City', citySchema);

module.exports = CityModel;