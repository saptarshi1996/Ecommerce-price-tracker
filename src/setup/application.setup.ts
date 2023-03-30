import express, { Application } from 'express'
import cors from 'cors'

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

  return app
}
