
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roomSchema = new Schema({
    chatId: {
        type: String,
        required: true,
        default: null
    },
    title: {
        type: String,
        default: null,
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: "private"
    }
})
const roomModel = mongoose.model('room', roomSchema)
module.exports = roomModel