const User = require('../models/user')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const {sign} = require('../helpers/jwt')

class Controller {
    static test(req, res) {
        res.status(200).json({
            message: 'User route example'
        })
    }

    static login(req, res) {
        console.log('masuk login coba route')
        if (req.body.nik) {
            User.findOne({
                nik: req.body.nik
            })
            .then( (user) => {
                if (user) {
                    // console.log(user)
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        console.log("berhasil ke compare")
                        console.log(user)
                        console.log("nyawwwwwwww22")
                        let userLogin={
                            id : user._id,
                            nik : user.nik
                        }
                        const token = sign(userLogin)
                        console.log(token)
                        res.status(200).json({
                            user,
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
            .catch(err => {
                console.log("masuk error sini")
                console.log(err)
                res.status(400).json({
                    message: err.message
                })
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