const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')
const tryCatch = require('../utils/handleTryCatch').handle
class Admin {
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
        let fromId = 222222225
        let firstName = 'test 04'
        let lastName = 'test 04'
        let userName = 'test04'
        let point = 150
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
        const data = await userModel.find({}, { create_at: 1 })
        let date1 = {
            id: 1,
            total: 0,
            date: new Date().getDate()
        }
        let date2 = {
            id: 2,
            total: 0,
            date: (new Date().getDate()) - 1
        }
        let date3 = {
            id: 3,
            total: 0,
            date: (new Date().getDate()) - 2
        }
        let date4 = {
            id: 4,
            total: 0,
            date: (new Date().getDate()) - 3
        }
        let date5 = {
            id: 5,
            total: 0,
            date: (new Date().getDate()) - 4
        }
        for (const index of data) {
            if (new Date(index.create_at).getDate() === new Date().getDate()) {
                date1.total += 1
            }
            if (new Date(index.create_at).getDate() === new Date().getDate() - 1) {
                date2.total += 1
            }
            if (new Date(index.create_at).getDate() === new Date().getDate() - 2) {
                date3.total += 1
            }
            if (new Date(index.create_at).getDate() === new Date().getDate() - 3) {
                date4.total += 1
            }
            if (new Date(index.create_at).getDate() === new Date().getDate() - 4) {
                date5.total += 1
            }
        }
        let date = [{ ...date1 }, { ...date2 }, { ...date3 }, { ...date4 }, { ...date5 },]
        if (date) {
            res.json({
                success: true,
                data: date
            })
        } else {
            res.json({
                success: false,
            })
        }
    }

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

}

module.exports = new Admin()