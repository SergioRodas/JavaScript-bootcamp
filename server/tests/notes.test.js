const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index')
const Note = require('../models/Note')

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

beforeEach(async () => {
    await Note.deleteMany({})

    const note1 = new Note(initialNotes[0])
    await note1.save()

    const note2 = new Note(initialNotes[1])
    await note2.save()

})

test('notes are returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('thre are two notes', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

test('thre first note is about Bootcamp with Midudev', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('Aprendiendo FullStack JS con Midudev')
})

test('some note should talk about the job', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('Este año voy a conseguir trabajo')
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})