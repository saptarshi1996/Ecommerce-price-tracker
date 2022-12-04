import Queue from 'bull'

import { config } from 'dotenv'

import Constant from '../config/constants'

config()

const {
  REDIS_HOST,
  REDIS_PORT,
} = process.env

const worker: Record<string, any> = {}
const queueConfig = Constant.QueueConfig

Object.keys(queueConfig).forEach((queue: string) => {
  worker[queue] = new Queue(queueConfig[queue], {
    redis: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  })
})

export default worker
