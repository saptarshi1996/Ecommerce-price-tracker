import express, { Application } from 'express'
import cors from 'cors'

import apiRouter from '../routes/api.route'

import IUser from '../interfaces/models/user.interface'

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

export const getApplication = async (): Promise<Application> => {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({
    extended: false
  }))
  app.use(cors())

  app.use('/api', apiRouter)

  return app
}
