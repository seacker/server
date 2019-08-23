const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    nik: {
        type: String,
        validate: [
            {
                validator: function(nik) {
                    return new Promise( (resolve, reject) => {
                        User.findOne({
                            nik
                        })
                        .then( (user) => {
                            user ? resolve(false) : resolve(true)
                        })
                        .catch( (err) => {
                            reject(err)
                        })
                    })
                },
                message: props => `NIK <${props.value}> already registered`
            }
        ]
    },
    password: String,
})

userSchema.pre('save', function(next){
    let user = this
    let salt = bcrypt.genSaltSync(8)
    var hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User