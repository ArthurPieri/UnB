// Requiring all the packages
const mongoose = require('mongoose')

// Setting up the subject schema for mongoose
const subjectSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Nome da matéria é obrigatório'],
        trim: true
    },
    registrationCode: {
        type: String,
        required: [true, 'Código da disciplina é obrigatório'],
        trim: true
    },
    class: {
        type: String,
        maxlength: 2,
        trim: true
    },
    address: [{
        address: {
            type: String,
            required: true,
            trim: true
        },
        latitude: {
            type: String,
            required: true,
            trim: true
        },
        longitude: {
            type: String,
            required: true,
            trim: true
        }
    }],
    professors: [{
        professor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Professor'
        }
    }],
    semester:{
        type: String,
        required: true
    },
    enrollmentKey:{
        type: String
    }
})

const Subject = mongoose.model('Subjects', subjectSchema)

module.exports = Subject