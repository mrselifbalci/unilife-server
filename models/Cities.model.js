const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitiesSchema = new Schema({
    name: {type:String, required:true, unique:true},
    universities: {type:String},
    student_life: {type:String},
    image_url:{type:String}
},{timestamps:true})

module.exports = mongoose.model('city', CitiesSchema)