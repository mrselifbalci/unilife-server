const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriptionsSchema = new Schema({
    email: {type:String},
},{timestamps:true})

module.exports = mongoose.model('subscriptions', SubscriptionsSchema)