const express = require('express')
// Getting the user model
const User = require('../models/users')
// Setting up the router
const router = new express.Router()

router.post('/users', async (req, res => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    }catch(e){
        res.status(400).send(e)
    }
}))

router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('users/:id', async (req, res) => {
    const _id = req.params.id
    try{
    const user = await User.findById(_id)
    if (!user){
        return res.status(404).send()
    } 
    res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['nomeCompleto', 'email', 'cpf', 'telefone', 'password', 'materias', 'matricula' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Error: invalid update')
    }

    try{
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])

        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
    }catch(e){

    }
})

module.exports = router