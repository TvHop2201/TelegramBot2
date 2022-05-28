const express = require('express')
const router = express.Router()

const ChatController = require('../controller/chat')



router.get('/getRoom', ChatController.getRoom)

router.get('/getUser', ChatController.getUser)

router.get('/getChat/', ChatController.getChatById)

router.post('/sendChat', ChatController.sendChat)





module.exports = router