class Controller {
    static test(req, res) {
        res.status(200).json({
            message: 'Seat route example'
        })
    }
}

module.exports = Controller