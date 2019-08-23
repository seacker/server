const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const urlmongo = 'mongodb://localhost:27017/sampleDB'
const router = require('./routes')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', router)

app.listen(port, () => {
    console.log('Running on port: ', port)
    mongoose.connect(urlmongo, {useNewUrlParser: true})
    .then( () => {
        console.log('Connected to DB')
    })
})