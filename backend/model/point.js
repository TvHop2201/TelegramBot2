const mongoose = require('mongoose');
const Schema = mongoose.Schema


const pointSchema = new Schema({
    username: {
        type: String,
        default: null,
    },
    point: {
        type: Number,
        default: 0
    },

})

const pointMessageSchema = new Schema({
    id: {
        type: String
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

const pointModel = mongoose.model('point', pointSchema)
const pointMessageModel = mongoose.model('pointMessage', pointMessageSchema)

module.exports = { pointModel, pointMessageModel }

