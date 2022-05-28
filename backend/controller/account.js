const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const accountError = require('./error')
const salt = bcrypt.genSaltSync(10)
const accountModel = require('../model/account')

class AccountController {
    async login(req, res) {
        const username = req.body.username
        const password = req.body.password

        const data = await accountModel.findOne({ username: username })
        if (data) {
            const compare = bcrypt.compareSync(password, data.password)
            if (compare) {
                const token = jwt.sign({ username: data.username }, process.env.JWT_PASS)
                res.json({
                    status: true,
                    token: token
                })
            } else {
                res.json({ status: false })
            }
        } else {
            res.json({ status: false })
        }
    }
    async register(req, res) {
        try {
            const username = req.body.username
            const email = req.body.email
            const phone = req.body.phone
            const password = bcrypt.hashSync(`${req.body.password}`, salt)

            const data = await accountModel.create({
                username: username,
                email: email,
                phone: phone,
                password: password
            })
            res.json({
                status: true,
                data: data
            })
        } catch (error) {
            res.status(500).json(accountError.error(101, error))
        }







    }

}

module.exports = new AccountController()