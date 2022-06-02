const express = require('express')
const router = express.Router()

const ChatController = require('../controller/chat')



router.get('/getRoom/:page', ChatController.getRoom)

router.get('/getUser', ChatController.getUser)

router.get('/getChatById/:id', ChatController.getChatById)

router.post('/sendChat', ChatController.sendChat)

router.get('/getUserById/:id', ChatController.getUserById)

router.get('/getChatUserById/:id/:page', ChatController.getChatUserById)





module.exports = router