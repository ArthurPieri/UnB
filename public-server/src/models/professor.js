// Requiring mongoose
const mongoose = require('mongoose')

// Creating Professor model
const Professor = mongoose.model('professor', {
// Setting the 'fields'
    matricula: {
// Saying that matricula must be a string
        type: String,
// Remove all the extra spaces
        trim: true,
// Setting it as required, mongoose will not save if it is empty
        required: true,
// Must be at least 6 characteres long
        minlength: 6,
// Must not be longer than 10 characteres long
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
    },
    materias: {
        type: String
    }
})

// Exporting Professor model
module.exports = Professor