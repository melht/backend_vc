const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:  String,
        required: [true, "Por favor teclea tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Por favor teclea tu email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Por favor teclea tu password"]
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // para que marque la hora en que se hizo
})

module.exports = mongoose.model('User', userSchema)