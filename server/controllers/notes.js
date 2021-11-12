const notesRouter = require('express').Router()

const Note = require('../models/Note')
const User = require('../models/User')

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
	const {content, important = false, userId} = request.body

	const user = await User.findById(userId)

	if (!content) {
		return response.status(400).json({
			error: 'required "content" field is missing',
		})
	}

	const newNote = new Note({
		content,
		date: new Date(),
		important,
		user: user._id
	})
	
	// newNote.save().then(savedNote => {
	// 	response.json(savedNote)
	// }).catch(err => next(err))

	try {	
		const savedNote = await newNote.save()
		user.notes = user.notes.concat(savedNote._id)
		await user.save()
		response.json(savedNote)
	} catch (error) {
		next(error)
	}
})

module.exports = notesRouter