const mongoose = require('mongoose');

const mazadJoinedSchema = new mongoose.Schema(
  {
    user :{
      type : mongoose.Types.ObjectId,
      ref : 'User',
    },
    mazad :{
      type : mongoose.Types.ObjectId,
      ref : 'Mazad',
    }
  },
  { timestamps: true }
);

mazadJoinedSchema.index({user:1 , mazad:1} ,{unique:true});




const MazadJoined = mongoose.model('MazadJoined',mazadJoinedSchema);
module.exports = MazadJoined;
