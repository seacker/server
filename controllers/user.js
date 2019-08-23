const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {
    static test(req, res) {
        res.status(200).json({
            message: 'User route example'
        })
    }

    static login(req, res) {
        if (req.body.nik) {
            User.findOne({
                nik: req.body.nik
            })
            .then( (user) => {
                if (user) {
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({ nik: user.nik, id: user.id})
                        res.status(200).json({
                            token
                        })
                    } else {
                        console.log("Error password doesn't match")
                        res.status(400).json({
                            message: 'Unidentified NIK / Password'
                        })
                    }
                } else {
                    console.log('Error NIK not found')
                    res.status(400).json({
                        message: 'Unidentified NIK / Password'
                    })
                }
            })
        } else {
            res.status(400).json({
                message: 'NIK is required and must be filled'
            })
        }
    }
    
    static register(req, res) {
        User.create({
            name: req.body.name,
            nik: req.body.nik,
            password: req.body.password
        })
        .then( (user) => {
            res.status(200).json(user)
        })
        .catch( (err) => {
            res.status(err.code).json({
                message: err.message
            })
        })
    }
}

module.exports = Controller