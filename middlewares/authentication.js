const {verify} = require('../helpers/jwt.js')

module.exports = (req, res, next) => {
    console.log("masuk oten")
    console.log(req.headers)
    if(req.headers.hasOwnProperty('token')){
        console.log("ada tokennnnnn")
        try {
            const decoded = verify(req.headers.token)
            req.decoded = decoded
            next()
        } 
        catch (err) {
            res.status(400).json({
                message : `Bad Request`
            })
        }
    } else {
        res.status(403).json({
            message : `Forbidden Page`
        })
    }
}