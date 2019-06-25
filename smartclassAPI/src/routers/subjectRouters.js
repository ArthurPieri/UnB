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

// Private READ all subjects
// Reminder to change auth!
router.get('/subjects/all', async (req, res) => {   
    try{
        const subjects = await Subject.find({}, null, {sort: {name: 1}})
        res.send(subjects)
    }catch(e){
        res.status(500).send(e)
    }
    
})

// Private READ one Subject
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

// Private UPDATE one subject
router.patch('subjects/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['address', 'professors', 'enrollmentkey', 'address', 'latitude', 'longitude']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Erro: Atualização não permitida')
    }

    try{
        const subject = await Subject.findOne({ _id})
        if (!subject) {
            return res.status(404).send()
        }

        updates.forEach((update) => subject[update] = req.body[update])
        await subject.save()
        res.send(subject)
    }catch(e){
        res.status(400).send(e)
    }
})

// Private DELETE one subject
router.delete('/subjects/:id', async (req, res) => {
    const _id = req.params.id
    try{
        const subject = await Subject.findOneAndDelete({_id})

        if (!subject) {
            return res.status(404).send()
        }

        res.send(subject)
    }catch (e){
        res.status(500).send(e)
    }
})

// Private generate authCode for subject
router.get('/subjects/:id/code', profAuth, async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id)

        if(!subject){
            return res.status(404).send()
        }

        const code = await subject.generateCode()

        subject.skipAttendance()

        res.send(code)
    }catch (e) {
        return res.status(500).send(e)
    }
})

// TO DO

// #### Add new Professor to subject  
// Tipo de request: POST 
// Uri: /subjects/:id/professor
// Header: Bearer authToken (Professor)
// Body: {
//     professor: _id
// }
// Status code: 200, 400, 404, 500

module.exports = router