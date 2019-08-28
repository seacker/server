if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3001
const cors = require('cors')
const urlmongo = 'mongodb+srv://database:database@database-c6k6t.gcp.mongodb.net/seacker?retryWrites=true&w=majority'
const router = require('./routes')
const urllocal = `mongodb://localhost:27017/seacker`
const CornJob = require('cron').CronJob
const Meeting = require('./models/meetingRoom')

new CornJob(`59 23 * * *`, function(){
    // console.log('test')
    Meeting.find({})
        .then(data => {
            data.forEach(schedule => {
                console.log(schedule)
                Meeting.updateOne({_id : schedule._id}, {UserBook : null}, {new: true})
                .then(updated => {
                    console.log('success updated')
                })
                console.log("already reset")
            })
        })
        .catch(err => {
            console.log(err)
        })
}, null, true, 'Asia/Singapore')

mongoose.connect(urlmongo, {useNewUrlParser: true, useFindAndModify : false})
.then(() => {
    console.log('mongoodb connected')
})
.catch(err => {
    console.log('mongoodb error')
    console.log(err)
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', router)


app.listen(port, () => {
    console.log('Running on port: ', port)
})