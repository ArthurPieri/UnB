// Requiring Jsonweb token, professor and student model
const jwt = require('jsonwebtoken')
const Prof = require('../models/professor')
const Student = require('../models/student')

// Setting up the auth function
const auth = async (req, res, next) => {
    try{
        // Grabbing the token from the header of the request
        const token = req.header('Authorization').replace('Bearer ', '')
        // Decoding the token to grab the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Searching for the user in the database
        const student = await Student.findOne({ _id: decoded._id, 'tokens.token': token })

        // If the user is not found, throw a new error
        if(!student){
            const professor = await Prof.findOne({ _id: decoded._id, 'tokens.token': token })

            if(!professor) {
                throw new Error()
            }

            req.token = token
            req.user = professor
            next()
        }

        // Passing the token and user to the function with next
        req.token = token
        req.user = student
        next()
    }catch(e){
        // Error user unauthorized
        res.status(401).send({ error: 'Por favor faça o login'})
    }
}

// Exporting the student auth
module.exports = auth