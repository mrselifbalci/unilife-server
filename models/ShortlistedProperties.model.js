const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortlistedPropertiesSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'user'},
        property_id: { type: Schema.Types.ObjectId, ref: 'property'},
	},  
	{ timestamps: true } 
); 
 
module.exports = mongoose.model('shortlistedProperty', ShortlistedPropertiesSchema); 