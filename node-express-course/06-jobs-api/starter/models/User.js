const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'please prov valid name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'please prov valid name'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'please prov valid name'],
        minlength: 6
    },

})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('User', userSchema)