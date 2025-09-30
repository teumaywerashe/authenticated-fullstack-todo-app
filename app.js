require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connection')
const tasks = require('./route/todorouter')
const user = require('./route/authRouter')
const app = express()
    // const cors = require('cors')


app.use(express.static('./public'))
app.use(express.json())

const PORT = 3000
app.use('/api/v1/', user, tasks)

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => console.log('server listing on port', PORT))
    } catch (error) {
        console.log(error.message);
    }

}
start();