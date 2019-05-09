// Requiring Jsonweb token and student auth
const jwt = require('jsonwebtoken')
const Student = require('../models/student')
const Prof = require('../models/professor')

const auth = async (req, res, next) => {
    try {
        // Grabbing the token from the header of the request
        const token = req.header('Authorization').replace('Bearer ','')
        // Decoding the token to grab the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Searching for the student first in the database
        const student = await Student.findOne({ _if: decoded._id, 'tokens.token': token})

        // If the student is not find, try the professor
        if(!student){
            const prof = await Prof.findOne({ _id: decoded._id, 'tokens.token': token })
            // If the professor is also not found, throw a new error
            if(!prof) {
                throw new Error()
            }
            // Passing the token and professor to the function with next()
            req.token = token
            req.user = prof
            next()
        }

        // If the student is found, pass the token and student to the function with next()
        req.token = token
        req.user = student
        next()
    }catch(e){
        res.status(401).send({ error: 'Por favor faça o login'})
    }
}

// Exporting the auth
module.exports = auth