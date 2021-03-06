const mongoose = require('mongoose')
const {server} = require('../index')
const Note = require('../models/Note')

const { api, initialNotes, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
    await Note.deleteMany({})

    //// parallel

    // const notesObject = initialNotes.map(note => new Note(note))
    // const promises = notesObject.map(note => note.save())
    // await Promise.all(promises)

    // sequential

    for(const note of initialNotes) {
        const noteObject = new Note(note)
        await noteObject.save()
    }
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
    const { contents } = await getAllContentFromNotes()
    expect(contents).toContain('Este año voy a conseguir trabajo')
})

test('a valid note can be added', async () => {
    const newNote = {
        content: 'Proximamente TDD',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllContentFromNotes()
    
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
})

test('note without content is not added', async () => {
    const newNote = {
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

    const response = await api.get('/api/notes')
    
    expect(response.body).toHaveLength(initialNotes.length)
})

test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNotes()
    const {body: notes} = firstResponse
    const noteToDelete = notes[0]
    await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
        
    const { contents, response: secondResponse } = await getAllContentFromNotes()
    
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)

    expect(contents).not.toContain(noteToDelete.content)
})

test('a note that do not exist can not be deleted', async () => {
    await api
        .delete(`/api/notes/1234`)
        .expect(400)
        
    const { response } = await getAllContentFromNotes()
    
    expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})