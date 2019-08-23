const router = require('express').Router()
const Controller = require('../controllers/seat')

router.get('/test', Controller.test)

module.exports = router