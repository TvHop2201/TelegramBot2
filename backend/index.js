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
const HandleWebhook = require('./utils/handleWebhook')
app.post('/webhook', (req, res) => {
    HandleWebhook.webHook([req.body]);
    res.sendStatus(200)
})


//Listen
app.listen(process.env.PORT || 8000, () => {
    console.log(`App listening on port ${process.env.PORT || 8000}`);
});

//test
const handleApi = require('./utils/handleApi');
const handleWebhook = require('./utils/handleWebhook');
setInterval(() => {
    handleApi.fetchApi()
}, 1000);
///

const websocket = require('./websocket.js')

websocket()

const chatModel = require('./model/chat')
const userModel = require('./model/user')



