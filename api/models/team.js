const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: { type: String },

  leader:{type:mongoose.Schema.Types.ObjectId,ref:"User"},

  code: { type: String, unique:true },

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
    default:null
  },

  deleted_at:{
    type:Date,
    default:null
  }
  
},{timestamps:true});

module.exports = mongoose.model("Team", teamSchema);
