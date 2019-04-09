const mongoose = require('mongoose')

const Materia = mongoose.model('materia', {
    codigo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 6
    },
    nome: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2
    },
    local: {
        type: String,
        required: true,
    },
    professor: {
        type: String
    }
})

module.exports = Materia