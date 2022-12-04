import express from 'express'

import { config } from 'dotenv'

import './tasks/revoke-verification'

config()

const app = express()

const PORT = process.env.CRON_PORT || 8081
const HOST = process.env.HOST || 'localhost'
app.listen(+PORT, HOST, () => console.log(`Cron Server on PORT ${PORT} at ${HOST}`))
