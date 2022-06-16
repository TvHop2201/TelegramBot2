const axios = require('axios')
const { once } = require('events')
const fs = require('fs')
const sharp = require('sharp')
const userModel = require('../model/user')
const FormData = require('form-data')
const url1 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`
const url2 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=`
const url3 = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}`
const url4 = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`

class Photo {
    async getProfilePhotoId(fromId) {
        let path = []
        fs.readdirSync('./public/image').forEach(index => {
            let temp = index.split('.jpg')[0]
            path = [...path, temp]
        })
        let check = path.includes(`${fromId}`)

        if (!check) {
            const data = await axios.get(`${url1}?user_id=${fromId}`)
            if (!data.data.result.photos[0]) {
                this.cropPhoto('profile', fromId)
            } else {
                let fileId
                for (const index of data.data.result.photos[0]) {
                    fileId = index.file_id
                }
                const data1 = await axios({
                    method: 'get',
                    url: `${url2}${fileId}`
                })
                const filePath = data1.data.result.file_path
                const data3 = await axios({
                    method: 'get',
                    url: `${url3}/${filePath}`,
                    responseType: 'stream'
                })
                let stream = data3.data.pipe(fs.createWriteStream(`public/image/${fromId}.jpg`))
                await once(stream, 'finish');
                this.cropPhoto(fromId, fromId)
            }
        }
    }


    cropPhoto(photoSource, fromId) {
        const width = 400,
            r = width / 2,
            circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}.jpg`)
    }

    async compoundPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage) {
        let path = []
        fs.readdirSync('./public/image/crop').forEach(index => {
            let temp = index.split('.jpg')[0]
            path = [...path, temp]
        })
        let checkSend = path.includes(`${fromIdSend}`)
        let checkReceive = path.includes(`${fromIdReceive}`)

        if (!checkSend) {
            this.getProfilePhotoId(fromIdSend)
        }
        if (!checkReceive) {
            this.getProfilePhotoId(fromIdReceive)
        }

        let ok = `${userNameReceive} Đã Nhận Được ${pointChange} Điểm`
        let text = Buffer.from(
            `<svg width="1000" height="950">
                <style>
                    .title { fill: #fbbf24; font-size: 75px; font-weight: bold;}
                    .title2 { fill: #ffff; font-size: 60px; font-weight: bold;}
                </style>
                <text x="27%" y="80%" class="title">CHÚC MỪNG</text>
                <text x="0%" y="90%" class="title2">${ok}</text>
                <text x="0%" y="100%" class="title2">message : ${pointMessage}</text>
            </svg>`);

        await sharp('./public/image/body.jpg')
            .composite([
                { input: `./public/image/crop/${fromIdSend}.jpg`, left: 124, top: 600 },
                { input: `./public/image/crop/${fromIdReceive}.jpg`, left: 754, top: 600 },
                { input: text }
            ])
            .toFile(`./public/image/saveImage/${fromIdSend}_${fromIdReceive}.jpg`)

    }

    async sendProfilePhoto(chatId, fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage) {
        //this.compoundPhoto( fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage)
    }



}


module.exports = new Photo()