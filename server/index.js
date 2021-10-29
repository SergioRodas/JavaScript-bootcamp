require('dotenv').config()
require('./mongo')

const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require("@sentry/tracing")
const cors = require('cors')
const Note = require('./models/Note')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

const app = express()

//Cross-origin resource sharing
app.use(cors())

//Body-parser
app.use(express.json())

//Serve static files
app.use('/images', express.static('images'))

// const logger = require('./loggerMiddleware')
// app.use(logger)

Sentry.init({
	dsn: "https://0a561992474b4d39899cd66b1c8b9509@o1055616.ingest.sentry.io/6041725",
	integrations: [
	  // enable HTTP calls tracing
	  new Sentry.Integrations.Http({ tracing: true }),
	  // enable Express.js middleware tracing
	  new Tracing.Integrations.Express({ app }),
	],
  
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
  })


app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})
app.get('/api/notes', (request, response) => {
	Note.find({}).then(notes => {
		response.json(notes)
	})
})
app.get('/api/notes/:id', (request, response, next) => {
	const { id } = request.params
	Note.findById(id)
		.then(note => {
			return note ? response.json(note) : response.status(404).end()
		}).catch(next)
})

app.put('/api/notes/:id', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response, next) => {
	const {id} = request.params
	Note.findByIdAndDelete(id).then(() => {
		response.status(204).end()
	}).catch(error => next(error))
})

app.post('/api/notes', (request, response) => {
	const note = request.body

	if (!note.content) {
		return response.status(400).json({
			error: 'required "content" field is missing',
		})
	}

	const newNote = new Note({
		content: note.content,
		date: new Date(),
		important: typeof note.important !== 'undefined' ? note.important : false
	})

	newNote.save().then(savedNote => {
		response.json(savedNote)
	})
})

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})