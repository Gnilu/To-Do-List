const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://nilunilu:gnjNilu411@cluster0.qajkxxs.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
} )
.then(()=> console.log('Connected to MongoDB'))
.catch(err => console.error('could not connect to /mongoDB:', err))


app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findById(id)
    .then(todo => {
        if(!todo) return res.status(404).json({error:'Todo not found'})
        todo.done = !todo.done;
        return todo.save()    
    })
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: err.message}))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete( id)
    .then (result => {
        if(!result) return res.status(404).json({error:'Todo not found'})
    res.json({message: 'Todo deleted'})
})
    .catch(err => res.status(500).json({error: err.message}))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({task})
     .then(result => res.json(result))
     .catch(err => res.status(500).json({error: err.message}))
})

app.listen(3001, ()=> {
    console.log("Server is Running")
})