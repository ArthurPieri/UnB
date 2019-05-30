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
        const subjects = await Subject.find({})
        res.send(subjects)
    }catch(e){
        res.status(500).send()
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
    const allowedUpdates = ['address', 'professors', 'enrollmentkey']
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


module.exports = router