import express from 'express'

import { config } from 'dotenv'

import '../config/bull'

config()

const app = express()

const PORT = process.env.WORKER_ROUTE || 8082
const HOST = process.env.HOST || 'localhost'
app.listen(+PORT, HOST, () => console.log(`Worker Server on PORT ${PORT} at ${HOST}`))

import './jobs/send-mail'
