const mongoose = require('mongoose');
// 1- Create Schema
const carSubBrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: String,
    carBrand :{
      type: mongoose.Schema.ObjectId,
      ref : 'CarBrand',
    }
  },
  { timestamps: true }
);

// 2- Create model
const CarSubBrandModel = mongoose.model('CarSubBrand', carSubBrandSchema);

module.exports = CarSubBrandModel;