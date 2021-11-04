const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const {body} = request
    const {username, name, password} = body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        password: passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter