const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: { type: String,required:true},
		email: { type: String, unique: true,required:true }, 
		password: { type: String,required:true },
		image_url: { type: String,default:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
		role: { type: String, default: 'user' },
		is_active: { type: Boolean, default: true }
		
	}, 
	{ timestamps: true } 
);  

module.exports = mongoose.model('user', UserSchema);
  