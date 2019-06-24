// Requiring all the packages
const mongoose = require('mongoose')
const Student = require('./student')

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
    },
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
    },
    startHour:{
        type: Number,
        required: true
    },
    endHour:{
        type: Number,
        required: true
    },
    days:[{
        day:{
        type: String,
        required: true
        }
    }],
    authCode:{
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
        semester: subject.semester,
        authCode: subject.authCode
    })

    if(subj){
        throw new Error()
    }

    next()    
})

// Generate code for attendance 
subjectSchema.methods.generateCode = async function () {
    const code = Math.random().toString(36).slice(-8)
    this.authCode = code
    await this.save()
    return this.authCode
}

subjectSchema.methods.skipAttendance = async function () {
    const students = await Student.find({
        subjects:[
            {
                _id: this._id
            }
        ] 
    })

    students.forEach((student) => {
        const studentsLenght = students.length

        for(i = 0; i < studentsLenght; i++){
            if (student.subjects[i].id == this._id){
                student.subjects[i].attendance.push({
                    day: new Date()
                })
            }    
        }
        student.save()
    })
}

const Subject = mongoose.model('Subjects', subjectSchema)

module.exports = Subject