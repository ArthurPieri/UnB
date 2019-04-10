// Requiring mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    // Defining the filds
        matricula: {
    // stating that matricula is a string
            type: String,
    // Setting mongoose to trim, take off spaces
            trim: true,
    // Setting the fild as required, mongoose will not safe if it is blank
            required: true,
    // Needs to be at least 6 characteres long
            minlength: 6,
    // Most not be longer than 10 characteres long
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
        cpf: {
            type: String,
            trim: true,
            maxlength: 14
        },
        telefone:{
            type: String,
            trim: true,
            minlength: 8
        },
    // Will be changed
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

userSchema.pre('save', async function (){
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

    // Creating the User model
const User = mongoose.model('users', userSchema)

// Exporting the User model
module.exports = User