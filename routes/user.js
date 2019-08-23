const router = require('express').Router()

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Test route user'
    })
})

module.exports = router