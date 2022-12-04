import Queue from 'bull'

import { config } from 'dotenv'

config()

import Constant from './constants'

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
