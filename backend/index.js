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
// let userModel = require('./model/user')
// let pointMessageModel = require('./model/pointMessage')
// const aa = async () => {
//     let data = await userModel.findOne({ userName: 'bachcanhki' })
//     console.log(data)
//     if (!data) {
//         let text = '<b>không tồn tại người dùng !!! </b>'
//         console.log(text)
//     } else {
//         let data2 = await pointMessageModel.find({ idUserReceive: data.fromId }, { array_field: { $slice: -1 } }).limit(10)
//         let text = '<b>message</b>\n'
//         for (const index of data2) {
//             text = text + 'add : ' + index.pointChange + ' - ' + new Date(index.Date).toLocaleDateString() + ' : ' + index.message + "\n"
//         }
        
//         console.log(text)
//     }
// }
// aa()