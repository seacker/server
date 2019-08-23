class Controller {
    static test(req, res) {
        res.status(200).json({
            message: 'User route example'
        })
    }
}

module.exports = Controller