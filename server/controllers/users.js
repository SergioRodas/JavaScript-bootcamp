const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/User')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', {
        // 1 to indicate the contents that I want to be added
        content: 1, 
        date: 1
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    try {
        const {body} = request
        const {username, name, password} = body
            
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            name,
            password: passwordHash
        })
    
        const savedUser = await user.save()
    
        response.status(201).json(savedUser) 
    } catch (error) {
        response.status(400).json(error)
    }
})

module.exports = usersRouter