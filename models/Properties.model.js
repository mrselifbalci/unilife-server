const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertiesSchema = new Schema({
    city_id: {type:mongoose.Types.ObjectId,ref:'city',required:true},
    key_features:{type:Array},
    property_type:{type:String},
    property_description:{type:String},
    bedroom:{type:Number},
    bathroom:{type:Number},
    deposit:{type:Number},
    rent:{type:Number},
    availability:{type:String},
    address:{type:Object},
    images:{type:Array},

},{timestamps:true})

module.exports = mongoose.model('property', PropertiesSchema)