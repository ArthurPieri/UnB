// Requiring mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Creating professor schema so we can use monggose middleware
const professorSchema = new mongoose.Schema({
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
            maxlength: 10,
    // There can be only one professor with the proveided matricula
            unique: true
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

professorSchema.statics.findByCredentials = async (email, password) => {
    const professor = await Professor.findOne({ email })
    if(!professor){
        throw new Error('Unable to login')
    }
       
    const isMatch = await bcrypt.compare(password, professor.password)
      
    if(!isMatch){
        throw new Error('Unable to login')
    }
      
    return professor
}
        
// Hash the plain text password before saving   

professorSchema.pre('save', async function () {
    const professor = this

    if(professor.isModified('password')){
        professor.password = await bcrypt.hash(professor.password, 8)
    }
})

// Creating Professor model
const Professor = mongoose.model('professor', professorSchema)

// Exporting Professor model
module.exports = Professor