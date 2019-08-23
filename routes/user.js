const router = require('express').Router()
const Controller = require('../controllers/user')

router.get('/test', Controller.test)

module.exports = router