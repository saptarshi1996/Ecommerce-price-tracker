import express from 'express'

import { config } from 'dotenv'

import authRoute from './routes/auth'

config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false,
}))

app.use('/auth', authRoute)

const PORT = process.env.PORT || 8081
const HOST = process.env.HOST || 'localhost'
app.listen(+PORT, HOST, () => console.log(`Server on PORT ${PORT} at ${HOST}`))
