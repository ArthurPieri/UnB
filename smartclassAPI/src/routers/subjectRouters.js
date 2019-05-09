const express = require('express')
const Subject = require('../models/subject')
// Getting the Auth middleware
const studentAuth = require('../middleware/studentAuth')
const profAuth = require('../middleware/profAuth')
const auth = require('../middleware/auth')
// Setting up a new router
const router = new express.Router()

// ------------------------------------------------------
//  CRUD SUBJECT
// ------------------------------------------------------

// Private Add a new subject
// Reminder to change autho to profAuth
router.post('/subjects', async(req, res) => {
    const subject = new Subject(req.body)

    try{
        await subject.save()
        res.status(201).send({ subject })
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router