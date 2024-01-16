require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect')

// middlewear
app.use(express.json())

// routes
app.get('/', (req,res) => {
    res.send('Task Manager App')
})

app.use('/api/v1/tasks', tasks)

const port = 4501

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is Listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
