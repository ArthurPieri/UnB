const express = require('express')
const Subject = require('../models/subject')
// Getting the Auth middleware
const studentAuth = require('../middleware/studentAuth')
const profAuth = require('../middleware/profAuth')
// Setting up a new router
const router = new express.Router()

// ------------------------------------------------------
//  CRUD SUBJECT
// ------------------------------------------------------

// Private CREATE a new subject
// Reminder to change auth!
router.post('/subjects', async(req, res) => {
    const subject = new Subject(req.body)

    try{
        await subject.save()
        res.status(201).send({ subject })
    }catch(e){
        res.status(400).send(e)
    }
})

// Private GET all subjects
// Reminder to change auth!
router.get('/subjects/all', async (req, res) => {   
    try{
        const subjects = await Subject.find({})
        res.send(subjects)
    }catch(e){
        res.status(500).send()
    }
    
})

// Private GET one Subject
// Reminder to change auth!
router.get('/subjects/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const subject = await Subject.findOne({ _id})

        if (!subject){
            return res.status(404).send()
        }
        res.send(subject)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router