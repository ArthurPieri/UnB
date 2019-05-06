// Setting up express and mongoose
const express = require('express')
require('./db/mongoose')

// Setting up the Routers
const studentRouter = require('')
    // add other routers
// Setting up express
const app = express()

// Starting to use the routers
app.use(express.json())
app.use(studentRouter)

module.exports = app