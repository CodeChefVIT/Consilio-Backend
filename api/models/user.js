const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,

	name: { type: String },

	username: { type: String },

	email: { type: String },

	mobile: { type: Number },

	password: { type: String },

	bio: { type: String },

	team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

	avatar: {
		type: String,
		default: "",
	},

	googleId: { type: String },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);
