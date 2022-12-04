import Queue from 'bull'

import Constant from '../config/constants'
import environment from '../config/environment'

const {
  REDIS_HOST,
  REDIS_PORT,
} = environment

const worker: Record<string, any> = {}
const queueConfig = Constant.QueueConfig

Object.keys(queueConfig).forEach((queue: string) => {
  worker[queue] = new Queue(queueConfig[queue], {
    redis: `redis://${REDIS_HOST}:${REDIS_PORT}`,
  })
})

export default worker
