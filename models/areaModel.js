const mongoose = require('mongoose');
// 1- Create Schema
const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

// 2- Create model
const AreaModel = mongoose.model('Area', areaSchema);

module.exports = AreaModel;