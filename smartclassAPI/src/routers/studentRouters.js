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

module.exports = router