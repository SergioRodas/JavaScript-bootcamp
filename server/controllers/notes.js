const notesRouter = require('express').Router()

const Note = require('../models/Note')

notesRouter.get('/', async (request, response) => {
	const notes = await Note.find({})
		response.json(notes)
})
notesRouter.get('/:id', (request, response, next) => {
	const { id } = request.params
	Note.findById(id)
		.then(note => {
			return note ? response.json(note) : response.status(404).end()
		}).catch(next)
})

notesRouter.put('/:id', (request, response, next) => {
	const {id} = request.params
	const note = request.body
	const newNoteInfo = {
		content: note.content,
		important: note.important
	}
	Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
		.then(result => {
			response.json(result)
		})
})

notesRouter.delete('/:id', async (request, response, next) => {
	try {
			const {id} = request.params
		await Note.findByIdAndDelete(id)
		response.status(204).end()
	} catch (error) {
		next(error)
	}

})

notesRouter.post('/', async (request, response, next) => {
	const note = request.body

	if (!note.content) {
		return response.status(400).json({
			error: 'required "content" field is missing',
		})
	}

	const newNote = new Note({
		content: note.content,
		date: new Date(),
		important: note.important || false
	})
	
	// newNote.save().then(savedNote => {
	// 	response.json(savedNote)
	// }).catch(err => next(err))

	try {	
		const savedNote = await newNote.save()
		response.json(savedNote)
	} catch (error) {
		next(error)
	}
})

module.exports = notesRouter