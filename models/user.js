const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    email : {
        type : String,
    required : true,
    validate : [{
      validator : function(email){
        return User.findOne({email : email})
        .then(data => {
          if(data) return false
          else return true
        })
        .catch(err => {
          throw err
        })
      }
    },
    {
      validator : function(email){
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      },
      message: props => `Email is invalid`
    }]
    },
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