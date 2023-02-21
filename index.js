const express = require('express')
const app = express()
const activity = require('./routes/activity');
const todo = require('./routes/todo');
const PORT = 3000

app.get('/', (req, res) => {
    res.send('Welcome to To-do Management Service')
})

app.use('/todolist.api.devcode.gethired.id/activity-groups', activity)

app.use('/todolist.api.devcode.gethired.id/todo-items', todo)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})