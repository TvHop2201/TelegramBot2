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
app.use(express.static('public'))


//Mongoose
mongoose.connect(process.env.MONGOOSE)
    .then(() => console.log('Connect to MongoDB !!!!'))
    .catch(err => console.log(`Mongoose ERROR : ${err}`))

//Router
fs.readdirSync('./router/').forEach(file => {
    const path = file.split('.js')[0]
    app.use(`/${path}`, require(`./router/${path}`))
});
app.get('/', (req, res) => { res.json('Ok') })


//WebHook 
const HandleWebhook = require('./service/handleWebhook')
app.post('/webhook', (req, res) => {
    HandleWebhook.webHook([req.body]);
    res.json('dd')
})
app.get('/webhook', (req, res) => {
    res.json('webhook')
})

//webSocket
const websocket = require('./service/websocket.js')
websocket()

//CronJob
const cron = require('node-cron')
const CronJob = require('./service/cronJob')
cron.schedule('* 23 * * *', () => {
    console.log('CRON JOB REMOVE IMAGE RUNNING !!!')
    CronJob.deleteImage()
    console.log('CRON JOB REMOVE IMAGE END !!!!')
})

//Listen
app.listen(process.env.PORT || 8000, () => {
    console.log(`App listening on port ${process.env.PORT || 8000}`);
});

//check telegram api
// const handleApi = require('./utils/handleApi');
// setInterval(() => {
//     handleApi.fetchApi()
// }, 3000);

//test


