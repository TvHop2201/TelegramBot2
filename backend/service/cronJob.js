const fs = require('fs')
const path = require('path')
const findRemove = require('find-remove')

class CronJob {
    deleteImage() {
        const result = findRemove(path.join(__dirname, '../public/image/merge'), {
            age: { seconds: 86400 },
            limit: 100,
            extensions: ['.jpg'],
            ignore: '11111111.jpg'
        })
        const result2 = findRemove(path.join(__dirname, '../public/image/crop'), {
            age: { seconds: 86400 },
            limit: 100,
            extensions: ['.jpg'],
            ignore: ['11111111.jpg', '1232185869_1.jpg']
        })
        const result3 = findRemove(path.join(__dirname, '../public/image/'), {
            age: { seconds: 86400 },
            limit: 100,
            extensions: ['.jpg'],
            ignore: ['11111111.jpg', 'profile.jpg', 'pointOne.jpg', 'point.jpg']
        })

        console.log('merge file: ', result)
        console.log('crop file: ', result2)
        console.log('image file: ', result3)

        let date = new Date().toLocaleString()
        let text = `\n\n${date}\nmerge file:${JSON.stringify(result)}\ncrop file:${JSON.stringify(result2)}\nimage file:${JSON.stringify(result3)}\n`
        fs.appendFile(path.join(__dirname, '../log/deleteImage.txt'), text, function (err) {
            if (err) throw err;
            console.log('save to log/deleteImage.txt');
        });
    }
}

module.exports = new CronJob