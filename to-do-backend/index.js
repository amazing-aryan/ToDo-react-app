const express = require('express')
// const bodyparser = require('body-parser')
const cors = require('cors')
const ToDo = require('./models/todo')

const app = express()
// app.use(bodyparser.json())
app.use(express.json())
app.use(cors())

app.post('/todo/item', (req, res, next) => {
    const body = req.body
    if (!body.text) return res.status(400).json({
        error: 'incomplete information, pls send full info' // rephrase it
    })
    const todo = new ToDo({
        text: body.text,
        isCompleted: body.isCompleted,
        date: new Date()
    })
    ToDo.findOne({ "text": body.text }, (err, returnedtodo) => {
        if (err) console.log(err);
        if (returnedtodo) {
            res.status(409).json({
                error: "A todo item with same title already exists"
            })
        } else {
            todo.save()
                .then(returnedtodo => {
                    res.json(returnedtodo)
                })
                .catch(error => next(error))
        }
    })
})

app.get('/todo/items', (req, res) => {
    ToDo.find({}).then(todolist => {
        res.json(todolist)
    })
})

app.get('/todo/item/:id', (req, res, next) => {
    ToDo.findById(req.params.id)
        .then(todo => {
            if (todo) {
                res.json(todo)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.put('/todo/item/:id', (request, response, next) => {
    const body = request.body

    const todo = {
        text: body.text,
        isCompleted: body.isCompleted,
    }

    ToDo.findByIdAndUpdate(request.params.id, todo, { new: true })
        .then(updatedTodo => {
            response.json(updatedTodo)
        })
        .catch(error => next(error))
})

app.delete('/todo/item/:id', (request, response, next) => {
    ToDo.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = 8081
app.listen(PORT, () => {
    console.log('Server is running...')
})