const router = require('express').Router()
const Controller = require('../controllers/seat')

router.get('/test', Controller.test)
router.post('/', Controller.create)
router.patch('/changeState/:id', Controller.changeState)

module.exports = router