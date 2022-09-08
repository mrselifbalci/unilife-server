const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertiesSchema = new Schema({
    city_id: {type:Schema.Types.ObjectId,ref:'city',required:true},
    key_features:{type:Array},
    property_type:{type:String},
    property_description:{type:String},
    bedroom_number:{type:Number},
    bathroom_number:{type:Number},
    deposit:{type:Number},
    rent:{type:Number},
    availability:{type:String},
    address:{type:Object},
    images:{type:Array},
    furnished:{type:String},
    bedroom_prices:{type:Object}

},{timestamps:true})

module.exports = mongoose.model('property', PropertiesSchema)