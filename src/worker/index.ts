import express from 'express'

import environment from '../config/environment'

import '../packages/bull'

import './jobs/send-mail'

const {
  HOST,
  WORKER_PORT,
} = environment

const app = express()

app.listen(+WORKER_PORT, HOST, () => console.log(`Worker Server on PORT ${WORKER_PORT} at ${HOST}`))
