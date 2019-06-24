// Setting up express and mongoose
const express = require('express')
require('./db/mongoose')

// Setting up the Routers
const studentRouter = require('./routers/studentRouters')
const subjectRouter = require('./routers/subjectRouters')
const profRouter = require('./routers/professorRouter')
// Setting up express
const app = express()

// Starting to use the routers
app.use(express.json())
app.use(studentRouter)
app.use(subjectRouter)
app.use(profRouter)

module.exports = app