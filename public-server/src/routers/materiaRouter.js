const express = require('express')
// Getting the materia model
const Materia = require('../models/materia')
// Setting up the router
const router = new express.Router()

router.post('/materias', async (req, res) => {
    const materia = new Materia(req.body)

    try{
        await materia.save()
        res.status(201).send(materia)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/materias', async (req, res) => {
    try{
        const materias = await Materia.find({})
        res.send(materias)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/materias/:id', async (req, res) => {
    const _id = req.params.id
    try{
    const materia = await Materia.findById(_id)
    if (!materia){
        return res.status(404).send()
    } 
    res.send(materia)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/materias/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nomeCompleto', 'email', 'cpf', 'telefone', 'password', 'materias', 'matricula' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid update')
    }

    try{
        const materia = await Materia.findById(req.params.id)

        updates.forEach((update) => materia[update] = req.body[update])

        await materia.save()
        // const materia = await materia.findByIdAndUpdate(req.params.id)

        if(!materia) {
            return res.status(404).send()
        }
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router