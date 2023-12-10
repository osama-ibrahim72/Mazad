const mongoose = require('mongoose');
// 1- Create Schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: String,
    category :{
      type: mongoose.Schema.ObjectId,
      ref : 'Category',
    }
  },
  { timestamps: true }
);

// 2- Create model
const SubCategoryModel = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategoryModel;