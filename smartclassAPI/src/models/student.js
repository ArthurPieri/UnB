// requiring all the packages
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Setting up the student Schema for mongoose
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    enrollment: {
        type: String,
        required: [true, 'Matrícula é obrigatório'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email é obrigatório'],
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error ('Porfavor forneça um email valido')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatório'],
        trim: true,
        minlength: 8
    },
    tokens: [{
        token: String
    }],
    profilePic: {
        type: Buffer
    },
    subjects:[{
        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
        },
        day: {
            type: String
        },
        attendance: {
            type: Boolean,
            default: false
        }
    }]
})

// Removing password, tokens and profilePic from the response object
studentSchema.methods.toJSON = function () {
    // Setting this as user to make easier to understand the code
    const user = this
    // creating a new object with the user
    const userObj = user.toObject()

    // Removing password, tokens and profile pic
    delete userObj.password
    delete userObj.tokens
    delete userObj.profilePic

    // Returning the new object without exposing some informations
    return userObj
}

// Setting up the method to create the Auth Token
studentSchema.methods.generateAuthToken = async function () {
    // Setting this as a variable to make easier
    const student = this
    // Creating the token with JsonWebToken
    const token = jwt.sign({ _id: student._id.toString() }, process.env.JWT_SECRET)

    // Adding the token to the users tokens array
    student.tokens = student.tokens.concat({ token })
    // Saving the user
    await student.save()

    // Returning the token to the client
    return token
}

// Setting up the method to find a student by enrollment
studentSchema.statics.findByCredentials = async (enrollment, password) => {
    // Searching the user by the enrollment provided
    const student = await Student.findOne({ enrollment })
    // If the user is not found
    if(!student){
        throw new Error('Matrícula ou senha invalida(s)')
    }

    // Verifying it the provided password equals the password that was saved in the database
    const isMatch = await bcrypt.compare(password, student.password)

    // If the password provided is not the one in the database
    if(!isMatch){
        throw new Error('Matrícula ou senha invalida(s)')
    }

    // If everything goes well, return the student
    return student
}

// Hash the plain text password before saving to database
studentSchema.pre('save', async function (next){
    const student = this

    if(student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }

    next()
})

// Setting the mongoose Model for Student
const Student = mongoose.model('Student', studentSchema)

// Exporting the student model
module.exports = Student