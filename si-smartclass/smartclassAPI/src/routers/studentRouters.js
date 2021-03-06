// Requiring packages
const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const mongoose = require('mongoose')
// Requiring the student model and auth
const Subject = require('../models/subject')
const Student = require('../models/student')
const auth = require('../middleware/auth')
// Setting router as an express router
const router = new express.Router()
// Requiring all the emails for that user
const {
    sendWelcomeEmail,
    sendFarewellEmail
} = require('../emails/account')

// ------------------------------------------------------
//  CRUD STUDENT
// ------------------------------------------------------

// Public router for signin in a new Student
router.post('/students', async (req, res) => {
    const student = new Student(req.body)

    try{
        await student.save()
        // It is the function from acount.js to send emails
        sendWelcomeEmail(student.email, student.name)
        // It is the method defined on the student model
        const token = await student.generateAuthToken()
        res.status(201).send({ student, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

// Public router for the student to login
router.post('/students/login', async (req, res) => {
    try{
        // It is the function defined on the student model
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

// ------------------------------------------------------
//  PROFILE PIC STUDENT
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
router.post('/students/me/profilePic', auth, upload.single('profilePic'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.profilePic = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

// Private router to delete the profile pic
router.delete('/students/me/profilePic', auth, async (req, res) => {
    try{
        req.user.profilePic = undefined
        await req.user.save()
        res.send()    
    }catch(e){
        res.status(500).send(e)
    }
})

// Public Router to get a Students profile Pic
router.get('/students/:id/profilePic', async (req, res) => {
    try{
        const student = await Student.findById(req.params.id)

        if(!student || !student.avatar){
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(student.avatar)
    }catch(e){
        res.status(404).send()
    }
})

// ------------------------------------------------------
//  SUBJECTS FOR STUDENTS
// ------------------------------------------------------

// Private post subject
router.post('/students/me/subject/:id', auth, async (req, res) => {
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
        res.status(201).send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


// Private Get all 'my' subjects
router.get('/students/me/subjects', auth, async (req, res) => {
    try {
        const student = await Student.findById(req.user._id)
        let subjects = student.subjects
        let query = {
            _id: {
                $in: []
            }
        };
        let query2 = {
            _id: {
                $in: [
                    mongoose.Types.ObjectId('5d106a69d9000bfaf27edd69'),
                    mongoose.Types.ObjectId('5d106649287503f83b499687')
                ]
            }
        };
        subjects.forEach(x => {
            query._id.$in.push(mongoose.Types.ObjectId(x._id))
        })
        let x = Subject.find(query, (err, resp) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(resp)
            }
        });
    } catch (e) {
        res.status(500).send()
    }
})

// TO-DO
// Private post attendance to subject
router.post('/students/me/subjects/:id', auth, async (req, res) => {
    try{
        const subject = await Subject.findById(req.params.id)
        const student = await Student.findById(req.user._id)

        const getSecondsFromDay = (time) => {
            const d = new Date(time);
            return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
        };
        const now = Date.now();
        const sec = getSecondsFromDay(now)
        const lessonHasStarted = sec >= subject.startHour
        const lessonHasFinished = sec >= subject.endHour
        const correctDay = subject.days.some(x => {
            const d = new Date(now);
            return x === d.getDay();
        });
        
        let stdntAttnd = student.subjects.filter(x => x._id.toString() === req.params.id)[0].attendance
        stdntAttnd = stdntAttnd.filter(x => {
            const date = new Date(x);
            const time = new Date(now);
            return date.getFullYear() === time.getFullYear() && date.getDate() === time.getDate() && time.getMonth() === date.getMonth()
        })
        const {code, lat, lng} = req.body
        // console.log("chamou", subject, student);

        if(!subject) {
            return res.status(404).send('Matéria não encontrada')
        }

        
        if (subject.registrationCode != code) {
            return res.status(401).send('Código Inválido')
        }
        if (lessonHasStarted && !lessonHasFinished && correctDay) {
            if (stdntAttnd.length === 0) {
                student.confirmAttendance(req.params.id, now);
                res.send('Presença confirmada!')
            } else {
                return res.status(401).send('Você ja marcou presença na aula de hoje')
            }
        } else {
            return res.status(401).send('Não é possível marcar presença pois não está no horário da aula')
        }
    }catch(e){
        return res.status(404).send(e)
    }
})

// TO DO
// #### Read student class skips
// Tipo de request: GET 
// Uri: /students/me/subjects/:id/attendance
// Header: Bearer authToken
// Body: none
// Status code: 200, 400, 404, 500

module.exports = router