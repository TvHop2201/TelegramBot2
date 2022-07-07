const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')
const logUserModel = require('../model/logUser')
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
            data = await userModel.find().skip((limit * page) - limit).limit(limit).sort({ _id: -1 })
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
    //log
    async getLogUser(req, res) {
        let { page, limit } = req.body
        let logData = await logUserModel.find().sort({ _id: -1 }).skip((limit * page) - limit).limit(limit)
        let total = await logUserModel.find().count()
        if (data) {
            res.json({
                success: true,
                data: logData,
                total: total
            })
        } else {
            res.json({
                success: false
            })
        }
    }
    async createLogUser(req, res) {
        let idUser = req.body.idUser
        let adminChange = req.body.admin
        let user = req.body.admin
        let pointChange = req.body.pointChange
        let message = req.body.message

        let data = await logUserModel.create({
            idUser: idUser,
            adminChange: adminChange,
            user: user,
            pointChange: pointChange,
            messaged: message
        })
        console.log(data)
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
        const datas = await pointMessageModel.find().skip((limit * page) - limit).sort({ Date: -1 }).limit(limit)
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
    async updatePointMessage(req, res) {
        let id = req.body.id
        let pointChange = req.body.pointChange
        let message = req.body.message
        console.log('first', id)
        let data = await pointMessageModel.updateOne({ _id: id }, {
            pointChange: pointChange,
            message: message
        })
        console.log(data)
        if (data) {
            res.json({
                success: true,
                data: data
            })
        } else {
            res.json({
                success: false
            })
        }
    }
    async deletePointMessage(req, res) {
        let id = req.query.id
        let data = await pointMessageModel.deleteOne({ _id: id })
        if (data.acknowledged) {
            res.json({
                success: true
            })
        } else {
            res.json({
                success: false
            })
        }

    }
    //dashboard
    async getChartUserWithTime(req, res) {
        let { startTime, endTime } = req.query
        startTime = startTime.split('-')
        endTime = endTime.split('-')
        console.log(startTime, endTime)
        let first = new Date(parseInt(startTime[0], 10), parseInt(startTime[1], 10) - 1, parseInt(startTime[2]), 10).getTime()
        let last = new Date(parseInt(endTime[0], 10), parseInt(endTime[1], 10) - 1, parseInt(endTime[2]), 10).getTime()

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
        data.sort((a, b) => {
            let adate = a._id.split('-')
            let bdate = b._id.split('-')
            return new Date(adate[2], adate[1], adate[0]) - new Date(bdate[2], bdate[1], bdate[0])
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

}

module.exports = new Admin()