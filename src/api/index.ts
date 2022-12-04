import express from 'express'

import authRoute from './routes/auth'
import userRoute from './routes/user'
import productRoute from './routes/product'

import authMiddleware from './middlewares/auth'

import environment from '../config/environment'

import IUser from '../interfaces/models/user'

import '../packages/bull'

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}

const {
  HOST,
  API_PORT,
} = environment

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: false,
}))

app.use('/auth', authRoute)
app.use('/user', authMiddleware, userRoute)
app.use('/product', authMiddleware, productRoute)

app.listen(+API_PORT, HOST, () => console.log(`Api Server on PORT ${API_PORT} at ${HOST}`))
