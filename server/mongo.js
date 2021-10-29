const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI


//connection to MongoDb
mongoose.connect(connectionString)
	.then(() => {
		console.log('Database connected')
	})
	.catch(err => {
		console.log(err)
	})

process.on('uncaughtException', () => {
	mongoose.connection.disconnect()
})