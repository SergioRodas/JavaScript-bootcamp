require('dotenv').config()
require('./mongo')

const express = require('express')
const Sentry = require('@sentry/node')
const Tracing = require("@sentry/tracing")
const cors = require('cors')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')

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

app.use('/api/notes', notesRouter)

app.use('/api/users', usersRouter)

app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }