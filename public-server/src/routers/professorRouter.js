const express = require('express')
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
        const professor = await Professor.findByCredentials(req.body.email, req.body.password)
        res.send(professor)
    }catch(e){
        res.status(400).send()
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

router.get('professor/:id', async (req, res) => {
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

router.patch('professor/:id', async (req, res) => {
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
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router