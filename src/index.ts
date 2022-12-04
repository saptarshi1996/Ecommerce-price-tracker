import express from 'express'

import { config } from 'dotenv'

config()

const app = express()

const PORT = process.env.PORT || 8081
const HOST = process.env.HOST || 'localhost'
app.listen(+PORT, HOST, () => console.log(`Server on PORT ${PORT} at ${HOST}`))
