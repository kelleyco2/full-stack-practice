require('dotenv').config()

const express = require('express')
const session = require('express-session')
const massive = require('massive')
const bodyParser = require('body-parser')

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env

const auth = require('./Auth')

const app = express()

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

app.post('/auth/login', auth.login)
app.post('/auth/register', auth.register)
app.get('/auth/logout', auth.logout)
app.get('/auth/currentUser', auth.getCurrentUser)

app.listen(SERVER_PORT, () => {
    console.log('Listening on port', SERVER_PORT)
})