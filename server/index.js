require('dotenv').config()

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')
const fs = require('fs')
const AWS = require('aws-sdk')
const fileType = require('file-type')
const bluebird = require('bluebird')
const multiparty = require('multiparty')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, ACCESS_KEY, SECRET_ACCESS_KEY } = process.env

const auth = require('./Auth')
const advert = require('./Ad')

const app = express()

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

AWS.config.setPromisesDependency(bluebird)

const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
    const params = {
        ACL: 'public-read',
        Body: buffer,
        Bucket: 'project-moonlight-kh',
        ContentType: type.mime,
        Key: `${name}.${type.ext}`
    }
    return s3.upload(params).promise()
}

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(bodyParser.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

//s3
app.post('/upload', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, async (error, fields, files) => {
        if(error) throw new Error(error)
        try {
            const path = files.file[0].path
            const buffer = fs.readFileSync(path)
            const type = fileType(buffer)
            const timeStamp = Date.now().toString()
            const fileName = `bucketfolder/${timeStamp}-lg`
            const data = await uploadFile(buffer, fileName, type)
            return res.status(200).send(data)
        } catch(error) {
            return res.status(400).send(error)
        }
    })
})

//auth
app.post('/auth/login', auth.login)
app.post('/auth/register', auth.register)
app.get('/auth/logout', auth.logout)
app.get('/auth/currentUser', auth.getCurrentUser)

app.post('/advert', advert.addToDB)

app.listen(SERVER_PORT, () => {
    console.log('Listening on port', SERVER_PORT)
})