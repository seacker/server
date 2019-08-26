const Meeting = require('../models/meetingRoom')

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