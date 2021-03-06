const router = require('express').Router()
const bookedController = require('../controllers/meetingRoom.js')
const authentication = require('../middlewares/authentication.js')

router.post('/', authentication, bookedController.bookRoom)
router.get('/', authentication, bookedController.getSchedule)

module.exports = router