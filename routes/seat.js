const router = require('express').Router()

router.get('/test', (req, res) => {
    res.status(200).json({
        message: 'Test route seat'
    })
})

module.exports = router