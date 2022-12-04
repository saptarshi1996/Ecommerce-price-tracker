import express from 'express'

import environment from '../config/environment'

import './tasks/revoke-verification'

const {
  HOST,
  CRON_PORT,
} = environment

const app = express()

app.listen(+CRON_PORT, HOST, () => console.log(`Cron Server on PORT ${CRON_PORT} at ${HOST}`))
