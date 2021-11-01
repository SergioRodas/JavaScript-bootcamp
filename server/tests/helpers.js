const { app } = require('../index')
const supertest = require('supertest')

const api = supertest(app)

const initialNotes = [
    {
        content: 'Aprendiendo FullStack JS con Midudev',
        important: true,
        date: new Date()
    },
    {
        content: 'Este año voy a conseguir trabajo',
        important: true,
        date: new Date()
    }
]

const getAllContentFromNotes = async () => {
    const response = await api.get('/api/notes')

    return {
        response,
        contents: response.body.map(note => note.content)}
}

module.exports = {
    api,
    initialNotes,
    getAllContentFromNotes
}