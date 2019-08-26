const router = require('express').Router()
const userRoute = require('./user')
const seatRoute = require('./seat')
const blockRoute = require('./block')
const bookRoute = require('./booking')



router.use('/users', userRoute)
router.use('/seat', seatRoute)
router.use('/blocks', blockRoute)
router.use('/booking', bookRoute)

module.exports = router