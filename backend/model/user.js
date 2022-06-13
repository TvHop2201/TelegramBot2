const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fromId: {
        type: Number,
        required: true,
        default: null
    },
    isBot: {
        type: Boolean,
        default: true,
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    userName: {
        type: String,
        default: null
    },
    point: {
        type: Number,
        default: 0
    },
    create_at: {
        type: Number,
        default: Date.now()
    }
})


const userModel = mongoose.model('user', userSchema)
module.exports = userModel