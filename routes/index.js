const router = require('express').Router()
const userRoute = require('./user')
const seatRoute = require('./seat')

router.use('/users', userRoute)
router.use('/seat', seatRoute)

module.exports = router