const express = require('express')
const auth = require('../middleware/auth')
// Getting the professor model
const Professor = require('../models/professor')
// Setting up the router
const router = new express.Router()

router.post('/professor', async (req, res) => {
    const professor = new Professor(req.body)

    try{
        await professor.save()
        res.status(201).send(professor)
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/professor/login', async (req, res) => {
    try{
        const professor = await Professor.findByCredentials(req.body.matricula, req.body.password)
        res.send(professor)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/professor', async (req, res) => {
    try{
        const professors = await Professor.find({})
        res.send(professors)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/professor/:id', async (req, res) => {
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

router.patch('/professor/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nomeCompleto', 'email', 'telefone', 'password', 'materias', 'matricula' ]
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

router.delete('/professor/:id', async (req, res) => {
    try {
        const professor = await Professor.findByIdAndDelete(req.params.id)

        if (!professor){
            return res.status(404).send()
        }

        res.send(professor)
    } catch (e) {
        res.status(500).send(e)
    }
})

// VERIFICAR E FAZER O QUE FALTA
// ### Crud Professor 

// #### Create professor 
// Tipo de request: POST 
// Uri: /professor
// Header: none
// Body: {
//     name: required,
//     enrollment: required ("matricula"),
//     email: required,
//     password: required,
//     registrationCode: required
// }
// Status code: 201, 400

// #### Login professor 
// Tipo de request: POST
// Uri: /professor/login
// Header: none
// Body: {
//     enrollment: required,
//     password: required
// }
// Status code: 200, 400

// #### Logout professor 
// Tipo de request: POST
// Uri: /professor/logout
// Header: authToken
// Body: none
// Status code: 200, 500

// #### Logout all sessions professor 
// Tipo de request: POST
// Uri: /professor/logoutAll
// Header: authToken
// Body: none
// Status code: 200, 500

// #### Get professor profile
// Tipo de request: GET
// Uri: /professor/me
// Header: authToken
// Body: none
// Status code: 200, 400

// #### Edit professor 
// Tipo de request: PATCH
// Uri: /professor/me
// Header: authToken
// Body: {
//      name,
//      email,
//      password
// }
// Status code: 200, 400

// ### Professor profile pic

// #### Upload PP 
// Tipo de request: POST
// Uri: /professor/me/profilePic
// Header: authToken
// Body: {
//     buffer: ("image")
// }
// Status code:

// #### Delete PP
// Tipo de request: DELETE
// Uri: /professor/me/profilePic
// Header: authToken
// Body: none
// Status code: 204, 500

// #### Get PP
// Tipo de request: GET
// Uri: /professor/:id/profilePic
// Header: none
// Body: none
// Status code: 200, 404

// ### Professor Subjects

// #### Get all Professor's subjects
// Tipo de request: GET
// Uri: /professor/me/subjects
// Header: authToken
// Body: none
// Status code: 200, 500


module.exports = router