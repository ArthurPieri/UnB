const express = require('express')
// Getting the user model
const Aluno = require('../models/aluno')
// Setting up the router
const router = new express.Router()

router.post('/alunos', async (req, res) => {
    const aluno = new Aluno(req.body)

    try{
        await aluno.save()
        res.status(201).send(aluno)
    }catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/alunos/login', async (req, res) => {
    try{
        const aluno = await Aluno.findByCredentials(req.body.email, req.body.password)
        res.send(aluno)
    }catch(e){
        res.status(400).send()
    }
})

router.get('/alunos', async (req, res) => {
    try{
        const alunos = await Aluno.find({})
        res.send(alunos)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('alunos/:id', async (req, res) => {
    const _id = req.params.id
    try{
    const aluno = await Aluno.findById(_id)
    if (!aluno){
        return res.status(404).send()
    } 
    res.send(aluno)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('alunos/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nomeCompleto', 'email', 'cpf', 'telefone', 'password', 'materias', 'matricula' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid update')
    }

    try{
        const aluno = await Aluno.findById(req.params.id)

        updates.forEach((update) => aluno[update] = req.body[update])

        await aluno.save()
        // const user = await User.findByIdAndUpdate(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router