const mongoose = require('mongoose');
// 1- Create Schema
const modelYearSchema = new mongoose.Schema(
  {
    year : Number, 
  },
  { timestamps: true }
);

// 2- Create model
const ModelYearModel = mongoose.model('ModelYear', modelYearSchema);

module.exports = ModelYearModel;