require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')

const notFoundMiddlewear = require('./middleware/not-found')
const errorMiddlewear = require('./middleware/error-handler')

// middlewear
app.use(express.json())

// routes

app.get('/', (req, res) => {
    res.send('<h1> Store API </h1> <a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productRouter)

// products route


app.use(notFoundMiddlewear)
app.use(errorMiddlewear)

const port = process.env.PORT || 4333

const start = async() => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()