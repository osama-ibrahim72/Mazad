const mongoose = require('mongoose');

const appControllerSchema = new mongoose.Schema(
  {
    commission :{
      type: Number,
    },
    depositMazad:{
      type: Number,
    },
    depositCarMazad:{
      type: Number,
    },
    pointValue:{
      type: Number,
    },
    terms :{
      type:String,
    },
    privacy :{
      type:String,
    },
    git :{
      type : Number,
      default : 75, 
    },
  },
  { timestamps: true }
);
const AppController = mongoose.model('AppController', appControllerSchema);
module.exports = AppController;