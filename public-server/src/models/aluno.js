// Requiring mongoose
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const alunoSchema = new mongoose.Schema({
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
            maxlength: 10,
    // Defining that can only be one user with the matricula provided
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

alunoSchema.statics.findByCredentials = async (email, password) => {
    const aluno = await Aluno.findOne({ email })
    if(!aluno){
        throw new Error('Unable to login')
    }
   
    const isMatch = await bcrypt.compare(password, aluno.password)
  
    if(!isMatch){
        throw new Error('Unable to login')
    }
  
    return aluno
}
    
// Hash the plain text password before saving    
alunoSchema.pre('save', async function (next){
    const aluno = this

    if(aluno.isModified('password')) {
        aluno.password = await bcrypt.hash(aluno.password, 8)
    }

    next()
})

    // Creating the User model
const Aluno = mongoose.model('alunos', alunoSchema)

// Exporting the User model
module.exports = Aluno