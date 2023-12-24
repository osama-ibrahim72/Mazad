const mongoose = require('mongoose');

const mazadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      trim: true,
    },
    priceAfterDiscount: {
      type: Number,
    },
    bestoffer:{
      type:Number,
    },
    time:{
      type : Date,
    },
    user : {
      type : mongoose.Types.ObjectId,
      ref : 'User',
    },

    imageCover: {
      type: String,
      //required: [true, 'Product Image cover is required'],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Product must be belong to category'],

    },
    status : {
      type : Boolean,
      default: true,
    },
    isCar : {
      type :Boolean,
    },
    carBrand: {
      type: mongoose.Schema.ObjectId,
      ref: 'CarBrand',
    },
    carSubBrand: {
      type: mongoose.Schema.ObjectId,
      ref: 'CarSubBrand',
    },
    subCategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'SubCategory',
    },
    shape: {
      type: mongoose.Schema.ObjectId,
      ref: 'Shape',
    },
    model :{
      type: mongoose.Schema.ObjectId,
      ref: 'ModelYear',
    }

  },
  { timestamps: true }

);
const Mazad = mongoose.model('Mazad', mazadSchema);
module.exports = Mazad;