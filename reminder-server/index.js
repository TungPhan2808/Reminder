require('dotenv').config()
require('./services/schedule')
const express = require('express')
const app = express()
const cors = require('cors')
const connection = require('./db/connect')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const authentication = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler ')
const notFound = require('./middlewares/notFound')

const taskRoute = require('./routes/taskRoute')
const authRoute = require('./routes/authRoute')
const voiceRoute = require('./routes/voiceRoute')

const PORT = process.env.PORT || 3000

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tasks', authentication, taskRoute)
app.use('/api/v1/voice', authentication, voiceRoute)

app.use(notFound)
app.use(errorHandler)

const start = async () => {
  try {
    const dbResp = await connection(process.env.MONGO_URL)
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
