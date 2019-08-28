const Seat = require('../models/seat.js')

class Controller {
    static create(req, res){
        const {blockName, index, coorX, coorY} = req.body
        const newSeat = {blockName, index, coorX, coorY}
        Seat.create(newSeat)
            .then(data => {
                console.log(data)
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err)
            })
        // console.log(newSeat)
        // Seat.create(newSeat)
        //     .then(create=> {
        //         // res.status(201).json(create)
        //         console.log(create)
        //         console.log("aku berhasil di create")
        //     })
        //     .catch(err => {
        //         console.log(err, "error nich")
        //         res.status(500).json({
        //             message : err
        //         })
        //     })  
    }

    static updateStatusSeat(req, res){
        const id = req.params.id
        Seat.findById(id)
            .then(found => {
               console.log(found)
                if(found){
                    if(found.taker){
                        console.log(found, 'ini ada takernya')
                        // delete found.taker;
                        // found.taker = {}
                        console.log(found, "ini foun updatedddd")
                        Seat.updateOne({_id : id}, {taker : null}, {new: true})
                            .then(updated => {
                                console.log(updated)
                                res.status(200).json(updated)
                            })
                    } else {
                        console.log(found, 'ini gakada takernyaaaa')
                        console.log(req.decoded.id)

                        let updateTaker = {taker : req.decoded.id}
                        Seat.findByIdAndUpdate(id, updateTaker, {new : true})
                            .then(updated => {
                                console.log(updated)
                                res.status(200).json(updated)
                            })
                    }
                    found.taker = {}
                    
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