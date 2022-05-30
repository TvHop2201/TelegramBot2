const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//Mongoose
mongoose.connect(process.env.MONGOOSE)
    .then(() => console.log('Connect to MongoDB !!!!'))
    .catch(err => console.log(`Mongoose ERROR : ${err}`))

//Router
fs.readdirSync('./router/').forEach(file => {
    const path = file.split('.js')[0]
    app.use(`/${path}`, require(`./router/${path}`))
});


//Listen
app.listen(process.env.PORT || 8000, () => {
    console.log(`App listening on port ${process.env.PORT || 8000}`);
});

//test
const handleApi = require('./controller/handleApi')
// setInterval(() => {
//     handleApi.fetchApi()
// }, 30000);

const chatModel = require('./model/chat');
const userModel = require('./model/user');


