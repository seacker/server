const router = require('express').Router()
const userRoute = require('./user')
const seatRoute = require('./seat')
const blockRoute = require('./block')

router.use('/users', userRoute)
router.use('/seat', seatRoute)
router.use('/blocks', blockRoute)

module.exports = router