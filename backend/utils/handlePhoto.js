const axios = require('axios')
const { once } = require('events')
const fs = require('fs')
const merge = require('merge-images')
const { createCanvas, Canvas, Image } = require('canvas')
const decode = require('node-base64-image').decode
const sharp = require('sharp')
const url1 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getUserProfilePhotos`
const url2 = `http://api.telegram.org/bot${process.env.BOT_TOKEN}/getFile?file_id=`
const url3 = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}`

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

    async compoundPhoto(fromIdSend, fromIdReceive) {
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



    }

    async sendProfilePhoto(fileId) {
        await axios.get(`${url2}`)
    }


}


module.exports = new Photo()