const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const HttpException = require('./utils/HttpException.utils')
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');

// Init Express
const app = express()

// Init Environment
dotenv.config()

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json())

// enabling cors for all requests by using cors middleware
app.use(cors())

// Enable pre-flight
app.options('*', cors())

const port = Number(process.env.PORT || 3331)

app.use(`/api/v1/users`, userRouter)

// 404 Error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found!')
    next(err)
})

// app.use(errorMiddleware)

// Starting the Server
app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app