const mongoose = require('mongoose');
// 1- Create Schema
const shapeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: String,
  },
  { timestamps: true }
);

// 2- Create model
const ShapeModel = mongoose.model('Shape', shapeSchema);

module.exports = ShapeModel;