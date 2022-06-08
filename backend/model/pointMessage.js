const mongoose = require('mongoose');
const Schema = mongoose.Schema

const pointMessageSchema = new Schema({
    id: {
        type: String
    },
    idGift: {
        type: String
    },
    pointChange: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    Date: {
        type: Number,
        default: Date.now()
    }
})

const pointMessageModel = mongoose.model('pointMessage', pointMessageSchema)
module.exports = pointMessageModel