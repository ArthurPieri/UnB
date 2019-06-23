const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middleware/auth')
const profAuth = require('../middleware/profAuth')
// Getting the professor model
const Professor = require('../models/professor')
// Setting up the router
const router = new express.Router()
// Requiring all the emails for that user
const {
    sendWelcomeEmail,
    sendFarewellEmail
} = require('../emails/account')

// Public Router
// Create Professor
router.post('/professor', async (req, res) => {
    const professor = new Professor(req.body)

    try{
        await professor.save()
        // It is the function from acount.js to send emails
        sendWelcomeEmail(professor.email, professor.name)
        // It is the method defined on the student model
        const token = await professor.generateAuthToken()
        res.status(201).send({ professor, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

// Public Router
// Login Professor
router.post('/professor/login', async (req, res) => {
    try{
        // It is the function defined on the student model
        const professor = await Professor.findByCredentials(req.body.enrollment, req.body.password)
        const token = await professor.generateAuthToken()
        res.send({ professor, token })
    }catch(e){
        res.status(400).send()
    }
})

// Private router for logout
router.post('/professor/logout', auth, async (req, res) => {
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
router.post('/professor/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = []
        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

// Private
// Read all professors
router.get('/professor', auth , async (req, res) => {
    try{
        const professors = await Professor.find({})
        res.send(professors)
    }catch(e){
        res.status(500).send(e)
    }
})

// Private
// Read one professor
router.get('/professor/:id', auth , async (req, res) => {
    const _id = req.params.id
    try{
    const professor = await Professor.findById(_id)
    if (!professor){
        return res.status(404).send()
    } 
    res.send(professor)
    }catch(e){
        res.status(500).send()
    }
})

// Private Professor router
// Edit one professor
router.patch('/professor/:id', profAuth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'telefone', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid update')
    }

    try{
        const professor = await Professor.findById(req.params.id)

        updates.forEach((update) => professor[update] = req.body[update])

        await professor.save()
        // const professor = await professor.findByIdAndUpdate(req.params.id)

        if(!professor) {
            return res.status(404).send()
        }

        res.send(professor)
    }catch(e){
        res.status(500).send()
    }
})

// Private professor router
// Delete my profile professor
router.delete('/professor/me', async (req, res) => {
    try {
        const professor = await Professor.findByIdAndDelete(req.user._id)

        if (!professor){
            return res.status(404).send()
        }

        res.send(professor)
    } catch (e) {
        res.status(500).send(e)
    }
})

// ------------------------------------------------------
//  PROFILE PIC Professor
// ------------------------------------------------------

// Setting multer to deal with the images
const upload = multer({
    limits: {
        fileSize: 2048000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Por favor envie uma imagem'))
        }

        cb(undefined, true)
    }
})

// Private router to upload the profile pic
router.post('/professor/me/profilePic', auth, upload.single('profilePic'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.profilePic = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// Private router to delete the profile pic
router.delete('/professor/me/profilePic', auth, async (req, res) => {
    try{
        req.user.profilePic = undefined
        await req.user.save()
        res.send()    
    }catch(e){
        res.status(500).send(e)
    }
})

// Public Router to get a professor's profile Pic
router.get('/professor/:id/profilePic', async (req, res) => {
    try{
        const professor = await Professor.findById(req.params.id)

        if(!professor || !professor.avatar){
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(professor.avatar)
    }catch(e){
        res.status(404).send()
    }
})

// ------------------------------------------------------
//  SUBJECTS FOR PROFESSOR
// ------------------------------------------------------

// Private post subject
router.post('/professor/me/subject/:id', auth, async (req, res) => {
    let subjects = req.user.subjects
    let populatedSubjects = []

    populatedSubjects = subjects.map((sub) => {
        return sub._id
    })

    if(populatedSubjects.toString().includes(req.params.id)){
        return res.status(400).send('Erro: Matéria já cadastrada')
    }

    try{
        req.user.subjects.push({_id:req.params.id})
        req.user.save()
        res.status(204).send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

// Private Get all 'my' subjects
router.get('/professor/me/subjects', auth, async (req, res) => {
    try {
        const professor = await Professor.findById(req.user._id)
        let subjects = professor.subjects
        let populatedSubjects = []

        populatedSubjects = subjects.map(async function (sub) {
            return Subject.findById(sub._id) 
        })

        res.send(await Promise.all(populatedSubjects))
    } catch (e) {
        res.status(500).send()
    }

})

module.exports = router