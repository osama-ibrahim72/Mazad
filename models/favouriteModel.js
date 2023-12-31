const mongoose = require('mongoose');
// 1- Create Schema
const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type : mongoose.Types.ObjectId,
      ref : 'User',
      required : [true, "Must User"]
    },
    mazad:{
      type:  mongoose.Types.ObjectId,
      ref : 'Mazad',
    },
    isCar :{
      type : Boolean,
    }
  },
  { timestamps: true }
);
favouriteSchema.index({user:1 , mazad:1} ,{unique:true});

// 2- Create model
const FavouriteModel = mongoose.model('Favourite', favouriteSchema);

module.exports = FavouriteModel;