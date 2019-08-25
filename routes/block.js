const router = require('express').Router()
const Controller = require('../controllers/block')

// router.get('/', Controller.test)
router.post('/', Controller.createBlock)

module.exports = router