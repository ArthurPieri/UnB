// requiring all the packages
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Setting up the professor Schema for mongoose
const profSchema = new mongoose.Schema({
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
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    }]
})

// Removing password, tokens and profilePic from the response object
profSchema.methods.toJSON = function () {
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
profSchema.methods.generateAuthToken = async function () {
    // Setting this as a variable to make easier
    const prof = this
    // Creating the token with JsonWebToken
    const token = jwt.sign({ _id: prof._id.toString() }, process.env.JWT_SECRET)

    // Adding the token to the users tokens array
    prof.tokens = prof.tokens.concat({ token })
    // Saving the user
    await prof.save()

    // Returning the token to the client
    return token
}

// Setting up the method to find a professor by enrollment
profSchema.statics.findByCredentials = async (enrollment, password) => {
    // Searching the user by the enrollment provided
    const prof = await Professor.findOne({ enrollment })
    // If the user is not found
    if(!prof){
        throw new Error('Matrícula ou senha invalida(s)')
    }

    // Verifying it the provided password equals the password that was saved in the database
    const isMatch = await bcrypt.compare(password, prof.password)

    // If the password provided is not the one in the database
    if(!isMatch){
        throw new Error('Matrícula ou senha invalida(s)')
    }

    // If everything goes well, return the professor
    return prof
}

// Hash the plain text password before saving to database
profSchema.pre('save', async function (next){
    const prof = this

    if(prof.isModified('password')) {
        prof.password = await bcrypt.hash(prof.password, 8)
    }

    next()
})

// Setting the mongoose Model for Professor
const Professor = mongoose.model('Professor', profSchema)

// Exporting the professor model
module.exports = Professor