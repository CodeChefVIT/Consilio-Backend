const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: { type: String },

  code: { type: String },

  bio: { type: String },

  users:[
    {type:mongoose.Schema.Types.ObjectId, ref:"User"}
  ],

  avatar: {
    type: String,
    default:
      "",
  },

  submission:{
    type:String,
  },

  deleted_at:{
    type:Date,
    default:null
  }
  
},{timestamps:true});

module.exports = mongoose.model("Team", teamSchema);
