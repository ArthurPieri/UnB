// Setting up express and mongoose
const express = require('express')
require('./db/mongoose')

// Setting up the Routers
const studentRouter = require('./routers/studentRouters')
const subjectRouter = require('./routers/subjectRouters')
// Setting up express
const app = express()

// Starting to use the routers
app.use(express.json())
app.use(studentRouter)
app.use(subjectRouter)

module.exports = app