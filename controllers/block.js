const Block = require('../models/block')

class BlockController{
    static createBlock(req, res){
        const {name} = req.body
        Block.create({name})
            .then(created => {
                res.status(201).json(created)
            })
            .catch(err => {
                res.status(500).json({
                    message : err
                })
            })
    }

}

module.exports = BlockController