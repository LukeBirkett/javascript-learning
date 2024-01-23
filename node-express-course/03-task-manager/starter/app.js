require('dotenv').config()
const express = require('express')
const app = express()
const tasks = require('./routes/tasks.js')
const connectDB = require('./db/connect')
const notFound = require('./middlewear/not-found')
const errorHandlerMiddlewear = require('./middlewear/error-handler')

// middlewear
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddlewear)

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
