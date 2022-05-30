const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    messageId: {
        type: String,
        default: null
    },
    chatId: {
        type: Number,
        default: null,
    },
    fromId: {
        type: Number,
        default: null
    },
    date: {
        type: String,
        default: null,
    },
    text: {
        type: String,
        default: null
    }
})
const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel