const Seat = require('../models/seat.js')

class Controller {
    static create(req, res){
        const {blockName, index, coorX, coorY} = req.body
        const newSeat = {blockName, index, coorX, coorY}
        Seat.create(newSeat)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
            })  
    }

    static updateStatusSeat(req, res){
        console.log('update status')
        const id = req.params.id
        Seat.findById(id)
            .then(found => {
               console.log(found)
                if(found){
                    if(found.taker){
                        console.log("ada taker")
                        Seat.updateOne({_id : id}, {taker : null}, {new: true})
                            .then(updated => {
                                console.log("success update apus taker")
                                res.status(200).json(updated)
                            })
                    } else {
                        console.log("gak ada takernya")
                        let flag = false
                        console.log(req.decoded.id)
                        Seat.find({taker : req.decoded.id})
                            .then(found => {
                                console.log(found)
                                if(found.length > 0){
                                    console.log(found)
                                    res.status(400).json({
                                        message : `Cannot checkin because u already checkin`
                                    })
                                } else {
                                    console.log("tidak found")
                                    let updateTaker = {taker : req.decoded.id}
                                    Seat.findByIdAndUpdate(id, updateTaker, {new : true})
                                        .then(updated => {
                                            console.log("success update nambah taker")
                                            res.status(200).json(updated)
                                    })
                                    console.log(found)
                                }
                            })
                            
                    }
                } else {
                    console.log("test 123")
                }
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })
            
    }

    static fetchData(req, res){
        Seat.find({}).populate('blockName').populate('taker')
            .then(allSeat => {
                res.status(200).json(allSeat)
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    message : err
                })
            })
    }
    static test(req, res) {
        res.status(200).json({
            message: 'Seat route example'
        })
    }

    static getOneSeat(req, res){
        Seat.findById(req.params.id).populate('blockName')
            .then(found => {
                res.status(200).json(found)
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })
    }

    static addManyData(req, res){
        for (let i = 1; i <= 30; i++) {
            Seat.create({
                blockName : `5d61fe5639d4fd25b42c1dce`,
                index : i
            })
            .then(created => {
                console.log(created)
            })
            .catch(err => {
                res.status(500).json({
                    message : `liat console`
                })
            })

        }

    }
}

module.exports = Controller