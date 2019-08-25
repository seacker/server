const router = require('express').Router()
// const Controller = require('../controllers/seat')
const SeatController = require('../controllers/seat.js')
const authentication = require('../middlewares/authentication.js')

// router.get('/test', Controller.test)
router.get('/', SeatController.fetchData)
router.post('/', SeatController.create)
router.patch('/changeState/:id', authentication, SeatController.updateStatusSeat)

module.exports = router