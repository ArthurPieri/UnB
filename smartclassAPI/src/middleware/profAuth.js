// Requiring Jsonweb token and student auth
const jwt = require('jsonwebtoken')
const Prof = require('../models/professor')

// Setting up the auth function
const auth = async (req, res, next) => {
    try{
        // Grabbing the token from the header of the request
        const token = req.header('Authorization').replace('Bearer ', '')
        // Decoding the token to grab the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Searching for the user in the database
        const prof = await Prof.findOne({ _id: decoded._id, 'tokens.token': token })

        // If the user is not found, throw a new error
        if(!prof){
            throw new Error()
        }

        // Passing the token and user to the function with next
        req.token = token
        req.user = prof
        next()
    }catch(e){
        // Error user unauthorized
        res.status(401).send({ error: 'Por favor faça o login'})
    }
}

// Exporting the professor auth
module.exports = auth