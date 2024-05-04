const mongoose = require('mongoose')

const eventoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    nombre: {
        type: String,
        required: [true, "Por favor escribe un nombre"]

    },
    descripcion: {
        type: String,
        required: [true, "Por favor teclea una descripcion"]
    }
}, {
    timestamps: true
})

// Primera letra mayus y singular. Cuando se manda aparece en minusculas y plural
module.exports = mongoose.model('Evento', eventoSchema)