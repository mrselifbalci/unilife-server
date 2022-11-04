const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertyTypesSchema = new Schema({
    name: {type:String, required:true, unique:true}
},{timestamps:true})

module.exports = mongoose.model('propertyType', PropertyTypesSchema)