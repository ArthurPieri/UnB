const mongoose = require('mongoose')

const Professor = mongoose.model('professor', {
    matricula: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        maxlength: 10
    },
    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true
    },
    telefone:{
        type: String,
        trim: true,
        minlength: 8
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Senha não pode conter "Password"')
            }
        },
        validate(value) {
            if (value.toLowerCase().includes('senha')) {
                throw new Error('Senha não pode conter "senha"')
            }
        },
        validate(value) {
            if (value.toLowerCase().includes('123456')) {
                throw new Error('Senha não pode conter "123456"')
            }
        }
    },
    materias: {
        type: String
    }
})

module.exports = Professor