const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')

// routes
app.get('/', (req,res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

const port = 4501

app.listen(port, console.log(`Server is Listening on port ${port}...`))


