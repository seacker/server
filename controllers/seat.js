const Seat = require('../models/user.js')

class Controller {
    static create(req, res){
        const {block, index} = req.body
        const newSeat = {block, index}
        Seat.create(newSeat)
            .then(create=> {
                res.status(201).json(create)
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })  
    }

    static fetchData(req, res){
        const id = req.params.id
        Seat.findById
    }

    static updateStatusSeat(req, res){

    }
    static test(req, res) {
        res.status(200).json({
            message: 'Seat route example'
        })
    }
}

module.exports = Controller