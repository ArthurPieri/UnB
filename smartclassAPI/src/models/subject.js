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
        trim: true,
        required: [true, 'Por favor, informe a turma']
    },
    address: [{
        address: {
            type: String,
            trim: true
        },
        latitude: {
            type: String,
            trim: true
        },
        longitude: {
            type: String,
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

// Setting up the method to verify if the subject already exists
subjectSchema.pre('save', async function (next) {
    const subject = this
    const subj = await Subject.findOne({
        name: subject.name,
        registrationCode: subject.registrationCode,
        class: subject.class,
        semester: subject.semester
    })

    if(subj){
        throw new Error()
    }

    next()    
})

// TO DO
// Generate code

const Subject = mongoose.model('Subjects', subjectSchema)

module.exports = Subject