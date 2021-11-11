const { model, Schema} = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    password: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

userSchema.plugin(uniqueValidator)

const User = model('User', userSchema)
module.exports = User
