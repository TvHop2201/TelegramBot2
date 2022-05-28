const jwt = require('jsonwebtoken')
require('dotenv').config()

const accountModel = require('../model/account')
const authError = require('../controller/error')

exports.check = async (req, res, next) => {
    try {
        const [bearer, token] = (req.headers.authorization).split(' ')
        if (!token || !bearer || bearer !== 'Bearer') {
            res.status(500).json(authError(101, 'Not Found !!!!'))
        } else {
            const data = jwt.verify(token, process.env.JWT_PASS)
            if (data) {
                const data1 = await accountModel.findOne({ username: data.username })
                if (data1) {
                    next()
                } else {
                    res.status(500).json(authError(101, 'invalid username/password'))
                }
            } else {
                res.status(500).json(authError(101, 'invalid username/password'))
            }
        }
    } catch (error) {
        res.status(500).json(authError(101, error))
    }

}