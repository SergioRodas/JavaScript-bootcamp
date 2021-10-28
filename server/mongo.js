const mongoose = require('mongoose')
const password = require('./password')
const { model, Schema} = mongoose

const connectionString = `mongodb+srv://Ericcartman2:${password}@cluster0.qlkdz.mongodb.net/Bootcamp-Js?retryWrites=true&w=majority`


//connection to MongoDb
mongoose.connect(connectionString)
	.then(() => {
		console.log('Database connected')
	})
	.catch(err => {
		console.log(err)
	})

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = model('Note', noteSchema)

// Note.find({}).then(result => {
//     console.log(result)
//     mongoose.connection.close()
// })

const note = new Note({
    content: 'MongoDB is incredible',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
    console.log(result)
    mongoose.connection.close()
    })
    .catch(err => {
        console.log(err)
    })