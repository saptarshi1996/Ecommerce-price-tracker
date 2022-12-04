import express from 'express'

import { config } from 'dotenv'

import authRoute from './routes/auth'
import userRoute from './routes/user'

import authMiddleware from './middlewares/auth'

import IUser from '../interfaces/models/user'

import '../packages/bull'

config()

const app = express()

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

app.use(express.json())
app.use(express.urlencoded({
  extended: false,
}))

app.use('/auth', authRoute)
app.use('/user', authMiddleware, userRoute)

const PORT = process.env.API_PORT || 8080
const HOST = process.env.HOST || 'localhost'
app.listen(+PORT, HOST, () => console.log(`Api Server on PORT ${PORT} at ${HOST}`))
