const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const morgan = require('morgan')
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'))

//Mongoose
mongoose.connect(process.env.MONGOOSE)
    .then(() => console.log('Connect to MongoDB !!!!'))
    .catch(err => console.log(`Mongoose ERROR : ${err}`))

//Router
fs.readdirSync('./router/').forEach(file => {
    const path = file.split('.js')[0]
    app.use(`/${path}`, require(`./router/${path}`))
});

//WebHook 
const HandleWebhook = require('./service/handleWebhook')
app.post('/webhook', (req, res) => {
    HandleWebhook.webHook([req.body]);
    res.json(true)
})
app.get('/webhook', (req, res) => {
    res.json(true)
})

//webSocket
const websocket = require('./service/websocket.js')
websocket()

//Listen
app.listen(process.env.PORT || 8000, () => {
    console.log(`App listening on port ${process.env.PORT || 8000}`);
});

// check telegram api
const handleApi = require('./utils/handleApi');
setInterval(() => {
    handleApi.fetchApi()
}, 5000);

//test
const userModel = require('./model/user')
const pointMessageModel = require('./model/pointMessage')

const aa = async () => {


    const data = await userModel.aggregate([
        { $match: { "create_at": { $gte: Date.now() - 604800000, $lt: Date.now() } } },
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%d-%m-%Y",
                        "date": {
                            "$toDate": "$create_at"
                        }
                    }
                },
                "count": { "$sum": 1 }
            }
        }
    ])
    console.log(data)
}
//aa()

const bb = async () => {
    let month = 6
    let first = new Date(2022, month - 1, 01).getTime()
    let last = new Date(2022, month, 01).getTime()

    const data = await userModel.aggregate([
        { $match: { "create_at": { $gte: first, $lt: last } } },
        {
            "$group": {
                "_id": {
                    "$dateToString": {
                        "format": "%d-%m-%Y",
                        "date": {
                            "$toDate": "$create_at"
                        }
                    }
                },
                "count": { "$sum": 1 }
            }
        }
    ])
    console.log(data)
}

//bb()
