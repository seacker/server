const jwt = require('jsonwebtoken')

module.exports = {
    sign(payload){
        return jwt.sign(payload, process.env.SECRET_KEY)
    },
    verify(payload){
        return jwt.verify(payload, process.env.SECRET_KEY)
    }
} 