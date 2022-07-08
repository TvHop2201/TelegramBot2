const axios = require('axios')
require('dotenv').config()
const fs = require('fs')

const chatModel = require('../model/chat')
const userModel = require('../model/user')
const pointMessageModel = require('../model/pointMessage')

const handlePhoto = require('../utils/handlePhoto')

const telegramBot = `http://api.telegram.org/bot${process.env.BOT_TOKEN}`
const url4 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

class HandleCommand {
    async command(text, chatId, fromId) {
        console.log('command : ', text)
        let commandFull = ['time', 'help', 'thank', 'point']
        if (commandFull.indexOf(text.split(' ')[0]) === -1) {
            let textA = '<b> Wrong command !!!! </b>'
            this.sendText(textA, chatId)
        }


        if (text.split(' ')[0] === 'help') {
            let text1 = `<b>Danh Sách Command</b>\n <b>/thank <i> _user _point "_message" </i> : Tặng điểm</b>`
                + `\n<b>/point<i> _user</i> : Xem nhật ký cập nhật điểm và message của user</b> \n<b>/point : Xem điểm của top user điểm cao</b>`
            this.sendText(text1, chatId)
        }
        if (text.split(' ')[0] === 'time') {
            let text1 = new Date().toLocaleString()
            this.sendText(text1, chatId)
        }
        if (text.split(' ')[0] === 'thank') {
            this.handleThankCommand(text, chatId, fromId)
        }
        if (text.split(' ')[0] === 'point') {
            this.handlePointCommand(text, chatId)
        }
    }

    async handleThankCommand(text, chatId, fromIdsend) {
        let [minPoint, maxPoint] = [15, 150]
        let [text1, message] = text.split('"')
        let [thank, userReceive, pointChange] = text1.split(' ')
        //xử lý đầu vào
        if (!pointChange) {
            pointChange = minPoint
        }
        pointChange = parseInt(pointChange)
        if (Number.isNaN(pointChange)) {
            let text = '<b>Wrong point !!!</b>'
            this.sendText(text, chatId)
            return 0;
        }
        if (pointChange > maxPoint) {
            let text = `<b>Không thể tặng hơn 150 điểm </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (pointChange < minPoint) {
            let text = `<b>Không thể tặng dưới 15 điểm </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (!userReceive) {
            let text = `<b>Mời nhập username người nhận  </b>`
            this.sendText(text, chatId)
            return 0
        }
        if (!message) {
            let text = `<b>Phải nhập lời nhắn trong dấu ngoặc kép</b>`
            this.sendText(text, chatId)
            return 0
        }

        //check điểm của bot
        let botPoint = await userModel.findOne({ fromId: 11111111 }, { point: 1 })
        if (botPoint.point <= 1) {
            let text = `<b>Bot Đã Hết Số điểm Để Gửi!!!!</b>`
            this.sendText(text, chatId)
            return 0
        }

        //trường hợp là userName
        if (userReceive.charAt(0) === '@') {
            userReceive = userReceive.split('@')[1]
            let dataUN = await userModel.findOne({ userName: userReceive })
            if (!dataUN) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
                return 0
            } else {
                if (dataUN.fromId === 11111111) {
                    let text = `<b>không thể gửi điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                if (dataUN.fromId === fromIdsend) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                await pointMessageModel.create({
                    idUserReceive: dataUN.fromId,
                    idUserSendGift: fromIdsend,
                    pointChange: pointChange,
                    message: message
                })
                this.sendThankPhoto(chatId, fromIdsend, dataUN.fromId, dataUN.userName, pointChange, message)
                return 0
            }
        } else {
            if (userReceive.search("_")) {
                userReceive = userReceive.split('_').join(' ')
            }
            let dataFN = await userModel.findOne({ firstName: userReceive })
            console.log(dataFN)
            if (!dataFN) {
                let text = '<b>không tồn tại người dùng !!! </b>'
                this.sendText(text, chatId)
                return 0
            } else {
                if (dataFN.fromId === 11111111) {
                    let text = `<b>không thể gửi điểm cho Bot!!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                if (dataFN.fromId === fromIdsend) {
                    let text = `<b>không thể tự gửi cho bản thân !!!!</b>`
                    this.sendText(text, chatId)
                    return 0
                }
                //gửi
                await pointMessageModel.create({
                    idUserReceive: dataFN.fromId,
                    idUserSendGift: fromIdsend,
                    pointChange: pointChange,
                    message: message
                })
                this.sendThankPhoto(chatId, fromIdsend, dataFN.fromId, dataFN.firstName, pointChange, message)
                return 0
            }
        }
    }

    async handlePointCommand(text, chatId) {
        let [pointCM, userView] = text.split(' ')
        if (userView === 'Bot') {
            let text = '<b>Không Thể Xem Điểm Của Bot !!! </b>'
            this.sendText(text, chatId)
            return 0
        }
        if (!userView) {
            let listData = await userModel.find({ fromId: { $ne: 11111111 } }).sort({ point: -1 }).limit(10)
            let listUser = []
            listData.forEach(index => {
                let text = {
                    user: index.userName ? index.userName : `${index.firstName} ${index.lastName}`,
                    point: index.point
                }
                listUser.push(text)
            })
            this.sendListPointPhoto(listUser, chatId)
        } else {
            if (userView.charAt(0) === '@') {
                userView = userView.split('@')[1]
                let dataUN = await userModel.findOne({ userName: userView }, { point: 1, fromId: 1 })
                if (!dataUN) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    console.log(text)
                    this.sendText(text, chatId)
                    return 0
                }
                let dataMessage = await pointMessageModel.find({ idUserReceive: dataUN.fromId }, { pointChange: 1, message: 1, _id: 0 }).limit(5).sort({ _id: -1 })
                let outData = {
                    fromId: dataUN.fromId,
                    userName: userView,
                    point: dataUN.point,
                    message: dataMessage
                }
                this.sendUserPointPhoto(outData, chatId)

            } else {
                if (userView.search("_")) {
                    userView = userView.split("_").join(" ")
                }
                let dataFN = await userModel.findOne({ firstName: userView }, { point: 1, fromId: 1 })
                if (!dataFN) {
                    let text = '<b>không tồn tại người dùng !!! </b>'
                    this.sendText(text, chatId)
                    return 0
                }
                let dataMessage = await pointMessageModel.find({ idUserReceive: dataFN.fromId }, { pointChange: 1, message: 1, _id: 0 }).limit(5).sort({ _id: -1 })
                let outData = {
                    fromId: dataFN.fromId,
                    userName: userView,
                    point: dataFN.point,
                    message: dataMessage
                }
                this.sendUserPointPhoto(outData, chatId)

            }
        }

    }

    async sendText(text, chatId) {
        let textEncode = encodeURI(text)
        await axios.post(`${telegramBot}/sendMessage?chat_id=${chatId}&text=${textEncode}&parse_mode=html`)
    }


    async sendThankPhoto(chatId, fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage) {
        let date = Date.now()
        let fixPointMessage = pointMessage.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
        await handlePhoto.randomPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, fixPointMessage, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
            })
            .catch(err => console.log(err))
    }

    async sendListPointPhoto(listUser, chatId) {
        let date = Date.now()
        await handlePhoto.mergeListPoint(listUser, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/PointListand${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/PointListand${date}.jpg`)
            })

    }
    async sendUserPointPhoto(data, chatId) {
        let date = Date.now()
        await handlePhoto.mergerUserPoint(data, date)
        axios.get(`${url4}/sendPhoto?chat_id=${chatId}&photo=${process.env.URLSEVER}image/merge/PointUserand${date}.jpg`)
            .then(() => {
                let path = __dirname
                path = path.split('/controller').join('')
                fs.unlinkSync(`${path}/public/image/merge/PointUserand${date}.jpg`)
            })
    }

    async getName(fromId) {
        let getName = await userModel.findOne({ fromId: fromId })
        if (!getName) {
            return null
        } else if (getName.userName) {
            return getName.userName
        } else if (getName.firstName) {
            return getName.firstName
        } else if (getName.lastName) {
            return getName.lastName
        }
    }
}

module.exports = new HandleCommand()
