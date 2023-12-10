const mongoose = require('mongoose');
// 1- Create Schema
const carBrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create model
const CarBrandModel = mongoose.model('CarBrand', carBrandSchema);

module.exports = CarBrandModel;