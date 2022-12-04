import { config } from 'dotenv'

import IEnvironment from "../interfaces/config/environment"

config()

export default {
  HOST: process.env.HOST,
  API_PORT: +(process.env?.API_PORT as string),
  CRON_PORT: +(process.env.CRON_PORT as string),
  WORKER_PORT: +(process.env.WORKER_PORT as string),
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: +(process.env.REDIS_PORT as string),
  JWT_SECRET: process.env.JWT_SECRET,
} as IEnvironment
