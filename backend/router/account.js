const express = require('express');
const router = express.Router()

const AccountController = require('../controller/account')

router.post('/login', AccountController.login)

router.post('/register', AccountController.register)

module.exports = router