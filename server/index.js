const express = require('express')
const app = express()

//body-parser
app.use(express.json())

let notes = [
    {
        "id": 1,
        "content": "Tengo que continuar con las clases del FullStack Bootcamp JS",
        "date": "2021-10-26T20:40:098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "Continuar con el curso de Three.js",
        "date": "2021-10-26T20:45:098Z",
        "important": true
    },
    {
        "id": 3,
        "content": "Realizar curso de A-frame",
        "date": "2021-10-26T20:48:098Z",
        "important": false
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    }else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if(!note || !note.content) {
        return response.status(400).json({
            error: 'note.content is missing'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: note.content,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }
    notes = [...notes, newNote]

    response.status(201).json(newNote)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})