// Setting up express, cors and mongoose
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
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(studentRouter)
app.use(subjectRouter)
app.use(profRouter)

module.exports = app