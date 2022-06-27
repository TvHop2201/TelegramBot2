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
        try {
            let path = []
            fs.readdirSync('./public/image').forEach(index => {
                let temp = index.split('.jpg')[0]
                path = [...path, temp]
            })
            let check = path.includes(`${fromId}`)
            if (check === false) {
                const data = await axios.get(`${url1}?user_id=${fromId}`)
                if (data.data.result.photos.length == 0) {
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
                    await this.cropPhoto(fromId, fromId)
                }
            }

        } catch (error) {
            console.log("error getProfilePhotoId", error.message)
        }

    }


    async cropPhoto(photoSource, fromId) {
        const width = 400,
            r = width / 2,
            circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);
        await sharp(`public/image/${photoSource}.jpg`)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(`public/image/crop/${fromId}.jpg`)
    }

    async getName(fromId) {
        let getName = await userModel.findOne({ fromId: fromId })
        if (getName.userName) {
            return getName.userName
        } else if (getName.firstName) {
            return getName.firstName
        } else if (getName.lastName) {
            return getName.lastName
        }
    }

    async compoundPhoto(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date) {
        try {
            console.log(fromIdSend, fromIdReceive, userNameReceive, pointChange, pointMessage, date)
            let userNameSend = await this.getName(fromIdSend)
            console.log(userNameSend)
            let path = []
            fs.readdirSync('./public/image/crop').forEach(index => {
                let temp = index.split('.jpg')[0]
                path = [...path, temp]
            })
            let checkSend = path.includes(`${fromIdSend}`)
            let checkReceive = path.includes(`${fromIdReceive}`)
            if (!checkSend) {
                this.getProfilePhotoId(fromIdSend)
                    .then(async () => {
                        let ok = `${userNameReceive} Đã Nhận Được ${pointChange} Điểm`
                        let text = Buffer.from(
                            `<svg width="1280" height="1920">
                                <style>
                                    .title1 { fill: #ffff; font-size: 75px; font-weight: bold;}
                                    .title2 { fill: #a3e635; font-size: 75px; font-weight: bold;}
                                    .title3 { fill: #ffff; font-size: 60px; font-weight: bold;}
                                </style>
                                <text x="200px" y="900px" class="title1">${userNameSend}</text>
                                <text x="800px" y="900px" class="title1">${userNameReceive}</text>
                                <text x="400px" y="1300px" class="title2">CHÚC MỪNG</text>
                                <text x="200px" y="1500px" class="title3">${ok}</text>
                                <text x="200px" y="1600px" class="title3">message : ${pointMessage}</text>
                            </svg>`);

                        await sharp('./public/image/body.jpg')
                            .composite([
                                { input: `./public/image/crop/${fromIdSend}.jpg`, left: 100, top: 400 },
                                { input: `./public/image/crop/${fromIdReceive}.jpg`, left: 780, top: 400 },
                                { input: text }
                            ])
                            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
                    })
            }
            if (!checkReceive) {
                this.getProfilePhotoId(fromIdReceive)
                    .then(async () => {
                        let ok = `${userNameReceive} Đã Nhận Được ${pointChange} Điểm`
                        let text = Buffer.from(
                            `<svg width="1280" height="1920">
                                <style>
                                    .title1 { fill: #ffff; font-size: 75px; font-weight: bold;}
                                    .title2 { fill: #a3e635; font-size: 75px; font-weight: bold;}
                                    .title3 { fill: #ffff; font-size: 60px; font-weight: bold;}
                                </style>
                                <text x="200px" y="900px" class="title1">${userNameSend}</text>
                                <text x="800px" y="900px" class="title1">${userNameReceive}</text>
                                <text x="400px" y="1300px" class="title2">CHÚC MỪNG</text>
                                <text x="200px" y="1500px" class="title3">${ok}</text>
                                <text x="200px" y="1600px" class="title3">message : ${pointMessage}</text>
                            </svg>`);

                        await sharp('./public/image/body.jpg')
                            .composite([
                                { input: `./public/image/crop/${fromIdSend}.jpg`, left: 100, top: 400 },
                                { input: `./public/image/crop/${fromIdReceive}.jpg`, left: 780, top: 400 },
                                { input: text }
                            ])
                            .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
                    })
                    .catch(err => console.log(err))
            }
            if (checkReceive === true && checkSend === true) {
                let ok = `${userNameReceive} Đã Nhận Được ${pointChange} Điểm`
                let text = Buffer.from(
                    `<svg width="1280" height="1920">
                        <style>
                            .title1 { fill: #ffff; font-size: 75px; font-weight: bold;}
                            .title2 { fill: #a3e635; font-size: 75px; font-weight: bold;}
                            .title3 { fill: #ffff; font-size: 60px; font-weight: bold;}
                        </style>
                        <text x="200px" y="900px" class="title1">${userNameSend}</text>
                        <text x="800px" y="900px" class="title1">${userNameReceive}</text>
                        <text x="400px" y="1300px" class="title2">CHÚC MỪNG</text>
                        <text x="200px" y="1500px" class="title3">${ok}</text>
                        <text x="200px" y="1600px" class="title3">message : ${pointMessage}</text>
                    </svg>`);

                await sharp('./public/image/body.jpg')
                    .composite([
                        { input: `./public/image/crop/${fromIdSend}.jpg`, left: 100, top: 400 },
                        { input: `./public/image/crop/${fromIdReceive}.jpg`, left: 780, top: 400 },
                        { input: text }
                    ])
                    .toFile(`./public/image/merge/${fromIdSend}and${fromIdReceive}and${date}.jpg`)
            }
        } catch (err) {
            console.log("err ", err.message)
        }
    }



}
module.exports = new Photo()