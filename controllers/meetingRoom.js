const Meeting = require('../models/meetingRoom')
const CronJob = require('cron').CronJob
const sendEmail = require('../helpers/nodemailer')

new CronJob('0 8 * * *', function() {

    Meeting.find({}).populate('UserBook')
    .then(schedules =>{
        console.log(schedules)
        schedules.forEach(schedule => {
            console.log(new Date().toDateString(), '+++')
            console.log(schedule.date.toDateString(), '---')
            console.log(schedule.date.toDateString() === new Date().toDateString(), '====')
            if(schedule.date.toDateString() === new Date().toDateString()){
                let subject = "Reminder Meeting Schedule"
                let rooms = ''
                schedule.arrRooms.forEach(room => {
                    rooms += room + ' '
                })
                    let textToSend = `<html>
                        <body>
                        <h2>Dear ${schedule.UserBook.name},</h2>
                        <h4>You have meeting schedule on ${schedule.startBook} at room ${rooms}, please inform your participant
                        to attend on time !!</h4>
                        </body>
                        </html>`
                sendEmail(schedule.UserBook.email, subject, textToSend)
            } else {
                console.log('gak ada meeting')
            }
        })       
    })
    .catch(err =>{
        console.log('error cron get meeting schedule');
        console.log(err);
        
    })

  }, null, true, 'Asia/Singapore');

class MeetingBook{

    static bookRoom (req, res){
        console.log(req.decoded.id)
        const {date, arrRooms, startBook, endBook} = req.body
        const arrRoomsSplitted = arrRooms.split(',')
        const newBooking = {
            date, arrRooms : arrRoomsSplitted, startBook, endBook, UserBook : req.decoded.id
        }
        console.log(newBooking)
        Meeting.create(newBooking)
            .then(booked => {
                res.status(201).json(booked)
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })
    }

    static cancel(req, res){
        Meeting.findByIdAndDelete(req.params.id)
            .then(deleted => {
                res.status(200).json(deleted)
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })
    }
}
module.exports = MeetingBook