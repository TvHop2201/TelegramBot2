const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')
const tryCatch = require('../utils/handleTryCatch').handle
class Admin {
    //user
    async getUser(req, res) {
        let perPage = 2
        let page = req.params.page

        const data = await userModel.find().skip((perPage * page) - perPage).limit(perPage)
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }
    async getOneUser(req, res) {
        let id = req.params.id
        const data = await userModel.findOne({ _id: id })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    async getOneUserByUserName(req, res) {
        let userName = req.params.userName
        const data = await userModel.findOne({ userName: userName })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }

    }

    async getAllUser(req, res) {
        const data = await userModel.find()
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    async postUser(req, res) {
        let id = req.body._id
        let fromId = req.body.fromId
        let firstName = req.body.firstName ? req.body.firstName : null
        let lastName = req.body.lastName ? req.body.lastName : null
        let userName = req.body.userName ? req.body.userName : null
        let point = req.body.point

        const data = userModel.updateOne({
            _id: id
        }, {
            fromId: fromId,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            point: point
        })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }

    }

    async deleteUser(req, res) {
        let id = req.params.id
        await userModel.deleteOne({ _id: id })
        res.json({
            success: true
        })
    }

    async createUser(req, res) {
        let fromId = 222222226
        let firstName = 'test 05'
        let lastName = 'test 05'
        let userName = 'test05'
        let point = 110
        const data = await userModel.create({
            fromId: fromId,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            point: point
        })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    async getCharUser(req, res) {
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
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    async findModeTableUser(req, res) {
        let key = new RegExp(`.*${req.params.key}.*`, "i")
        console.log(key)
        let data = await userModel.find({
            $or: [
                { userName: key },
                { firstName: key },
                { lastName: key }
            ]
        })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    //point
    async getChartPoint(req, res) {
        const data = await userModel.find({}, {
            firstName: 1,
            userName: 1,
            point: 1
        }).sort({ point: -1 }).limit(5)
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }

    }

    async getPointMessage(req, res) {
        let perPage = 2
        let page = req.params.page
        const datas = await pointMessageModel.find().skip((perPage * page) - perPage).sort({ date: -1 }).limit(perPage)

        let result = []
        for (let data of datas) {
            let userReceive = await userModel.findOne({ fromId: data.idUserReceive }, { userName: 1, _id: -1, firstName: 1 })
            let userSend = await userModel.findOne({ fromId: data.idUserSendGift }, { userName: 1, _id: -1, firstName: 1 })
            result.push({ data, userReceive, userSend })
        }

        if (result) {
            res.json({
                success: true,
                data: result
            })
        } else {
            res.json({
                success: false,
            })
        }
    }
    async getOnePointMessage(req, res) {
        let id = req.params.id
        console.log(id)
        const data = await pointMessageModel.findOne({ _id: id })
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

    //dashboard
    async getChartUserWithMonth(req, res) {
        let month = req.params.month
        let first = new Date(2022, month - 1, 1).getTime()
        let last = new Date(2022, month, 1).getTime()
        console.log(first)

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
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false,
            })
        }
    }





}

module.exports = new Admin()