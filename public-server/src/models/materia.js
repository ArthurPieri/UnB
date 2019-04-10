// Requiring mongoose
const mongoose = require('mongoose')

const materiaSchema = new mongoose.Schema({
    // Setting up the 'fields'
        codigo: {
    // Setting that codigo must be a string
            type: String,
    // Setting that it is a required field, mongoose will not save unless this field is provided
            required: true,
    // Removing extra spaces
            trim: true,
    // it must not be longer than 7
            maxlength: 7
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
        },
        monitores:{
            type: Array
        }
    })

    // Setting up the model for Materia
const Materia = mongoose.model('materia', materiaSchema)

// Exporting Materia model
module.exports = Materia