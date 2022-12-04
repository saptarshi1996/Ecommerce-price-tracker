import express from 'express'

import authRoute from './routes/auth'
import userRoute from './routes/user'

import authMiddleware from './middlewares/auth'

import environment from '../config/environment'

import IUser from '../interfaces/models/user'

import '../packages/bull'

const {
  HOST,
  API_PORT,
} = environment

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

app.listen(+API_PORT, HOST, () => console.log(`Api Server on PORT ${API_PORT} at ${HOST}`))
