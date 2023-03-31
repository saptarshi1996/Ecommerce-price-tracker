import { config } from 'dotenv'

import IEnvironment from '../interfaces/config/environment.interface'

config()

const environment: IEnvironment = {
  PORT: +(process.env.PORT as string),
  HOST: process.env.HOST as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  MIDDLEWARE_SECRET: process.env.MIDDLEWARE_SECRET as string
}

export default environment
