const mongoose = require('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 5
    },
    email: {
        type: String,
        required: true,
        min: 5
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    collation: { locale: 'en_US', strength: 1 }
})

const accountModel = mongoose.model('account', accountSchema)
module.exports = accountModel