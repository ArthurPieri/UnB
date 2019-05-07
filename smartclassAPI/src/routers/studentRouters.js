// Requiring packages
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
// Requiring the student model and auth
const Student = require('../models/student')
const auth = require('../middleware/studentAuth')
// Setting router as an express router
const router = new express.Router()
// Requiring all the emails for that user
const {
    sendWelcomeEmail,
    sendFarewellEmail
} = require('../emails/account')

// Public router for signin in a new Student
router.post('/students', async (req, res) => {
        const student = new Student(req.body)

    try{
        await student.save()
        sendWelcomeEmail(student.email, student.name)
        const token = await student.generateAuthToken()
        res.status(201).send({ student, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

// Public router for the student to login
router.post('/students/login', async (req, res) => {
    try{
        const student = await Student.findByCredentials(req.body.enrollment, req.body.password)
        const token = await student.generateAuthToken()
        res.send({ student, token })
    }catch(e){
        res.status(400).send()
    }
})

// Private router for logout
router.post('/students/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Private router for logout all sessions
router.post('/students/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Private router to get profile info
router.get('/students/me', auth, async (req, res) => {
    res.send(req.user)
})

// Private router to edit student
router.patch('/students/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Erro: Atualizações inválidas!')
    }

    try{
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

// Private router to delete student
router.delete('/students/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        sendFarewellEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router