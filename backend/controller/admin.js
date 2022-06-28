const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')
const tryCatch = require('../utils/handleTryCatch').handle
class Admin {
    //user
    async getUser(req, res) {
        let { page, limit } = req.query

        const data = await userModel.find().skip((limit * page) - limit).limit(limit)
        const total = await userModel.find().count()
        if (data) {
            res.json({
                success: true,
                data: data,
                total: total
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

    async updateUser(req, res) {
        let id = req.body._id
        let fromId = req.body.fromId
        let firstName = req.body.firstName ? req.body.firstName : null
        let lastName = req.body.lastName ? req.body.lastName : null
        let userName = req.body.userName ? req.body.userName : null
        let point = req.body.point

        const data = await userModel.updateOne({
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
        let fromId = 222222228
        let firstName = 'test 08'
        let lastName = 'test 08'
        let userName = 'test08'
        let point = 10
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
            { $match: { "create_at": { $gte: Date.now() - 10014800000, $lt: Date.now() } } },
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
        let { key, page, limit } = req.query
        let data
        let total
        if (key == '') {
            key = new RegExp(`.*${key}.*`, "i")
            data = await userModel.find().skip((limit * page) - limit).limit(limit)
            total = await userModel.find().count()
        } else {
            key = new RegExp(`.*${key}.*`, "i")
            data = await userModel.find({
                $or: [
                    { userName: key },
                    { firstName: key },
                    { lastName: key }
                ]
            }).skip((limit * page) - limit).limit(limit)
            total = await userModel.find({
                $or: [
                    { userName: key },
                    { firstName: key },
                    { lastName: key }
                ]
            }).count()
        }
        if (data) {
            res.json({
                success: true,
                data: data,
                total
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
        let { page, limit } = req.query
        const datas = await pointMessageModel.find().skip((limit * page) - limit).sort({ date: -1 }).limit(limit)
        let result = []
        for (let data of datas) {
            let userReceive = await userModel.findOne({ fromId: data.idUserReceive }, { userName: 1, _id: -1, firstName: 1 })
            let userSend = await userModel.findOne({ fromId: data.idUserSendGift }, { userName: 1, _id: -1, firstName: 1 })
            result.push({ data, userReceive, userSend })
        }
        const total = await pointMessageModel.find().count()
        if (result) {
            res.json({
                success: true,
                data: result,
                total: total
            })
        } else {
            res.json({
                success: false,
            })
        }
    }
    //dashboard
    async getChartUserWithTime(req, res) {
        let { time } = req.query
        let [firstDay, firstMonth, lastDay, lastMonth] = time.split('-')
        let year = 2022
        if (firstMonth > lastMonth) {
            year = year + 1
        }
        let first = new Date(2022, firstMonth, firstDay).getTime()
        let last = new Date(year, lastMonth, lastDay).getTime()

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