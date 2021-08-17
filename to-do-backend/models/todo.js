const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/todo'
console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })
const todoSchema = new mongoose.Schema({
    text: String,
    isCompleted: Boolean,
    date: Date
})

todoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('ToDo', todoSchema)